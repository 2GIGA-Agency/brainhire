import { useState, useRef, useCallback, useEffect } from 'react';

interface UseVideoHook {
	initializeVideo: (videoElement: HTMLVideoElement | null) => Promise<void>;
	startRecording: (
		mainTimerSeconds?: number,
		onStopCallback?: (recordedChunks: Blob[], actualMimeType: string) => void
	) => Promise<void>;
	stopRecording: () => void;
	isRecording: boolean;
	timeLeft: number;
	analyserQuestion: AnalyserNode | null;
}

export function useVideo(): UseVideoHook {
	const videoStreamRef = useRef<MediaStream | null>(null);
	const mediaRecorderRef = useRef<MediaRecorder | null>(null);
	const videoChunksRef = useRef<Blob[]>([]);
	const actualMimeTypeRef = useRef<string>('');

	const audioCtxRef = useRef<AudioContext | null>(null);
	const analyserRef = useRef<AnalyserNode | null>(null);

	const [isRecording, setIsRecording] = useState(false);
	const [timeLeft, setTimeLeft] = useState(0);

	// Refs для таймера
	const timerRef = useRef<number | null>(null);
	const timerDeadlineRef = useRef<number | null>(null);

	const [analyserNode, setAnalyserNode] = useState<AnalyserNode | null>(null);

	const initializeVideo = useCallback(async (videoElement: HTMLVideoElement | null) => {
		try {
			if (
				!videoStreamRef.current ||
				videoStreamRef.current.getTracks().some((track) => track.readyState === 'ended')
			) {
				if (videoStreamRef.current) {
					videoStreamRef.current.getTracks().forEach((t) => t.stop());
				}

				const stream = await navigator.mediaDevices.getUserMedia({
					audio: true,
					video: { width: { ideal: 640 }, height: { ideal: 480 }, frameRate: { ideal: 30 } },
				});
				videoStreamRef.current = stream;

				if (audioCtxRef.current) {
					await audioCtxRef.current.close();
				}
				audioCtxRef.current = new AudioContext();
				analyserRef.current = null;
			}

			const stream = videoStreamRef.current;
			if (!stream) {
				throw new Error('Не удалось получить медиа-поток.');
			}

			if (videoElement && videoElement.srcObject !== stream) {
				videoElement.srcObject = stream;
				videoElement.playsInline = true;
				videoElement.muted = true;
				videoElement.play();
			}

			if (stream.getAudioTracks().length > 0 && audioCtxRef.current && !analyserRef.current) {
				const analyser = audioCtxRef.current.createAnalyser();
				analyser.fftSize = 512;
				const source = audioCtxRef.current.createMediaStreamSource(stream);
				source.connect(analyser);

				analyserRef.current = analyser;
				setAnalyserNode(analyser);
			}
		} catch (err) {
			console.error('Ошибка при инициализации видео:', err);
			alert(
				'Не удалось получить доступ к камере и микрофону. Проверьте разрешения в настройках браузера и обновите страницу.'
			);
			throw err;
		}
	}, []);

	const stopRecording = useCallback(() => {
		if (mediaRecorderRef.current?.state === 'recording') {
			mediaRecorderRef.current.stop();
		}
		// Очистка таймера происходит здесь и в onstop, что надежно
		if (timerRef.current) {
			clearInterval(timerRef.current);
			timerRef.current = null;
		}
	}, []);

	const startRecording = useCallback(
		async (
			mainTimerSeconds = 60,
			onStopCallback?: (recordedChunks: Blob[], actualMimeType: string) => void
		) => {
			if (!videoStreamRef.current || !videoStreamRef.current.active) {
				alert('Ошибка: Камера не готова для записи. Попробуйте обновить страницу.');
				return;
			}

			const preferredMimeTypes = [
				'video/webm;codecs=vp9,opus',
				'video/webm;codecs=vp8,opus',
				'video/webm',
			];

			let recorder: MediaRecorder | null = null;
			const stream = videoStreamRef.current;

			for (const mimeType of preferredMimeTypes) {
				if (MediaRecorder.isTypeSupported(mimeType)) {
					try {
						recorder = new MediaRecorder(stream, { mimeType });
						break;
					} catch (e) {
						console.error(`Не удалось создать MediaRecorder с mimeType: ${mimeType}`, e);
					}
				}
			}

			if (!recorder) {
				try {
					recorder = new MediaRecorder(stream);
				} catch (e) {
					console.error('Не удалось создать MediaRecorder даже с настройками по умолчанию.', e);
					alert(
						'Не удалось инициализировать запись видео. Ваш браузер может не поддерживать эту функцию.'
					);
					setIsRecording(false);
					return;
				}
			}

			mediaRecorderRef.current = recorder;
			actualMimeTypeRef.current = recorder.mimeType;
			console.log(`Начало записи. Фактический mimeType: ${actualMimeTypeRef.current}`);

			videoChunksRef.current = [];

			recorder.ondataavailable = (event) => {
				if (event.data.size > 0) {
					videoChunksRef.current.push(event.data);
				}
			};

			recorder.onstop = () => {
				setIsRecording(false);
				if (timerRef.current) {
					clearInterval(timerRef.current);
					timerRef.current = null;
				}
				if (onStopCallback) {
					onStopCallback(videoChunksRef.current, actualMimeTypeRef.current);
				}
			};

			recorder.onerror = (event) => {
				console.error('Ошибка MediaRecorder:', event);
				stopRecording();
			};

			recorder.start();
			setIsRecording(true);

			setTimeLeft(mainTimerSeconds); // Устанавливаем начальное значение для UI

			// Вычисляем и сохраняем точное время окончания
			const deadline = Date.now() + mainTimerSeconds * 1000;
			timerDeadlineRef.current = deadline;

			if (timerRef.current) {
				clearInterval(timerRef.current);
			}

			// Запускаем интервал для обновления UI
			timerRef.current = window.setInterval(() => {
				const remainingMs = timerDeadlineRef.current ? timerDeadlineRef.current - Date.now() : 0;

				if (remainingMs <= 0) {
					// Когда время вышло, останавливаем запись. stopRecording очистит таймер.
					stopRecording();
					setTimeLeft(0);
				} else {
					// Обновляем UI, вычисляя оставшееся время относительно deadline
					setTimeLeft(Math.ceil(remainingMs / 1000));
				}
			}, 250); // Интервал можно сделать чаще для плавности, на точность это не влияет
		},
		[stopRecording]
	); // Добавляем stopRecording в зависимости

	useEffect(() => {
		const stream = videoStreamRef.current;
		const audioCtx = audioCtxRef.current;

		return () => {
			if (mediaRecorderRef.current?.state === 'recording') {
				mediaRecorderRef.current.stop();
			}
			if (stream) {
				stream.getTracks().forEach((track) => track.stop());
			}
			if (audioCtx && audioCtx?.state !== 'closed') {
				audioCtx.close();
			}
			if (timerRef.current) {
				clearInterval(timerRef.current);
			}
		};
	}, []);

	return {
		initializeVideo,
		startRecording,
		stopRecording,
		isRecording,
		timeLeft,
		analyserQuestion: analyserNode,
	};
}
