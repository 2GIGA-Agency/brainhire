import { setCurrentStep } from '@/store/slices/interviewFlow';
import { useAppDispatch } from '@/store/store';
import { checkMediaPermissions, getMediaWithLogging, serverLog } from '@/utils/cameraLogger';
import { addSafariDebugButton, createSafariDiagnosticReport } from '@/utils/safariCameraDebug';
import { Alert, Button, Flex, Text } from '@chakra-ui/react';
import * as faceapi from '@vladmandic/face-api';
import React, { useEffect, useRef, useState } from 'react';
import styles from './CheckVideo.module.scss';
import { InterviewSteps } from '@/store/types';

export const CheckVideo: React.FC = () => {
	const videoRef = useRef<HTMLVideoElement | null>(null);
	const animationId = useRef<number | null>(null);
	const [statusMessage, setStatusMessage] = useState('Ожидание проверки...');
	const [alertType, setAlertType] = useState<'info' | 'success' | 'error'>('info');
	const [cameraPassed, setCameraPassed] = useState(false);
	const [faceDetected, setFaceDetected] = useState(false);
	const [cameraCheckLoading, setCameraCheckLoading] = useState(false);
	const [showAlert, setShowAlert] = useState(false);
	const dispatch = useAppDispatch();

	// 1. Добавляем флаг загрузки модели
	const [isModelLoaded, setIsModelLoaded] = useState(false);

	const lastDetectionTime = useRef<number>(Date.now());

	const onSafariResult = (e: CustomEvent) => {
		const res = e.detail;
		if (res.camera && res.microphone) {
			setStatusMessage('Разрешения получены!');
			setAlertType('success');
		} else {
			setStatusMessage('Разрешения не получены!');
			setAlertType('error');
		}
	};

	useEffect(() => {
		const loadModel = async () => {
			try {
				console.log('Начинаю загрузку моделей...');
				await faceapi.nets.ssdMobilenetv1.loadFromUri('/models');

				setIsModelLoaded(true);
				setStatusMessage('Ожидание проверки...');
			} catch (err) {
				console.error('Ошибка при загрузке face api', err);
				// Если webgl не поддерживается, пробуем cpu (медленно, но работает)
				try {
					console.log('Попытка переключиться на CPU...');

					await faceapi.nets.ssdMobilenetv1.loadFromUri('/models');
					setIsModelLoaded(true);
				} catch (cpuErr: any) {
					setStatusMessage('Ошибка инициализации ИИ');
					setAlertType('error');
				}
			}
		};

		addSafariDebugButton(createSafariDiagnosticReport);
		loadModel();

		loadModel();
		window.addEventListener('safari-permission-result', onSafariResult as EventListener);

		return () => {
			window.removeEventListener('safari-permission-result', onSafariResult as EventListener);
			if (animationId.current) cancelAnimationFrame(animationId.current);
		};
	}, []);

	// const clickToButton = async () => {
	// 	const safariDebugButton = document.getElementById('safari-debug-button');

	// 	if (safariDebugButton) {
	// 		setIsClickToButton(true);
	// 		await new Promise<void>((resolve) => {
	// 			safariDebugButton.addEventListener('click', () => resolve(), { once: true });
	// 			safariDebugButton.click();
	// 		});
	// 	} else {
	// 		await checkPermissions();
	// 	}
	// };

	const detectFace = () => {
		// 3. Дополнительная защита внутри функции
		if (!isModelLoaded) {
			console.warn('Модель еще не загружена, пропускаем детекцию');
			return;
		}

		// Создаем опции один раз перед циклом, чтобы не создавать мусор
		// minConfidence - порог уверенности (0.5 = 50%)
		const options = new faceapi.SsdMobilenetv1Options({ minConfidence: 0.5 });

		const runDetection = async () => {
			const videoEl = videoRef.current;

			// Проверяем readyState видео (HAVE_ENOUGH_DATA = 4)
			if (videoEl && !videoEl.paused && !videoEl.ended && videoEl.readyState === 4) {
				try {
					const detection = await faceapi.detectSingleFace(videoEl, options);

					if (detection) {
						lastDetectionTime.current = Date.now();
						setShowAlert(false);
						setFaceDetected(true);
					} else if (Date.now() - lastDetectionTime.current > 3000) {
						setShowAlert(true);
						setFaceDetected(false);
					}
				} catch (e) {
					// Ловим ошибки детекции, чтобы не крашить приложение
					console.error('Detection error:', e);
				}
			}
			animationId.current = requestAnimationFrame(runDetection);
		};

		runDetection();
	};

	const checkPermissions = async () => {
		setCameraCheckLoading(true);
		// const safariDebugButton = document.getElementById('safari-debug-button');

		// if (safariDebugButton) {
		// 	setIsClickToButton(true);
		// 	await new Promise<void>((resolve) => {
		// 		safariDebugButton.addEventListener('click', () => resolve(), { once: true });
		// 		safariDebugButton.click();
		// 	});
		// }

		try {
			const permissions = await checkMediaPermissions();
			serverLog('Camera permissions check result', permissions);

			const isSafari = permissions.isSafari;
			if (permissions.camera === 'granted' || (isSafari && permissions.camera !== 'denied')) {
				const stream = await getMediaWithLogging({ video: true, audio: true });
				if (videoRef.current) videoRef.current.srcObject = stream;

				setStatusMessage('Доступ разрешён!');
				setAlertType('success');
				setCameraPassed(true);
				lastDetectionTime.current = Date.now();
				setCameraCheckLoading(false);
				detectFace();
			} else if (isSafari) {
				setStatusMessage('Ожидание подтверждения доступа в Safari...');
				setAlertType('info');
				try {
					const stream = await getMediaWithLogging({ video: true, audio: true });
					if (videoRef.current) videoRef.current.srcObject = stream;

					setStatusMessage('Доступ разрешён!');
					setAlertType('success');
					setCameraPassed(true);
					setCameraCheckLoading(false);
					detectFace();
				} catch (err) {
					setCameraCheckLoading(false);
					serverLog('Standard permission approach failed in Safari', err);
					setTimeout(async () => {
						try {
							setCameraCheckLoading(true);
							const updated = await checkMediaPermissions();
							serverLog('Safari retry permission check', updated);
							console.log(updated);
							if (updated.camera === 'granted' || updated.camera !== 'denied') {
								const retryStream = await getMediaWithLogging({ video: true, audio: true });
								if (videoRef.current) videoRef.current.srcObject = retryStream;

								setStatusMessage('Доступ разрешён!');
								setAlertType('success');
								setCameraPassed(true);
								setCameraCheckLoading(false);
								detectFace();
							} else throw new Error('Не удалось получить доступ к камере и микрофону');
						} catch (retryErr) {
							setCameraCheckLoading(false);
							serverLog('Safari retry also failed', retryErr);
							setStatusMessage('Ошибка: ' + retryErr.message);
							setAlertType('error');
						}
					}, 1000);
				}
			} else {
				setCameraCheckLoading(false);
				throw new Error('Не удалось получить доступ к камере и микрофону');
			}
		} catch (err: any) {
			setCameraCheckLoading(false);
			serverLog('Camera permission check failed', err);
			setStatusMessage('Ошибка: ' + 'Не удалось определить камеру или микрофон на устройстве');
			setAlertType('error');
		}
	};

	const nextStep = () => dispatch(setCurrentStep(InterviewSteps.CHECK_MICROPHONE));

	return (
		<div>
			<Text fontSize="md" fontWeight="semibold" alignSelf="start" pt={6}>
				Проверка камеры и микрофона
			</Text>
			<Flex justifyContent="center" mt={10} mb={10}>
				<div className={styles.videoWrapper}>
					<video ref={videoRef} autoPlay muted playsInline className={styles.video} />
				</div>
			</Flex>
			{!cameraPassed && (
				<div className={styles.centerText}>
					<Button
						onClick={checkPermissions}
						colorPalette="blue"
						className={styles.button}
						//Блокируем кнопку, пока модель не загрузится или идет проверка
						loading={cameraCheckLoading || !isModelLoaded}
						disabled={!isModelLoaded}
					>
						{isModelLoaded ? 'Проверить камеру' : 'Загрузка компонентов...'}
					</Button>
				</div>
			)}

			{cameraPassed && (
				<div className={styles.centerText}>
					<Button onClick={nextStep} colorPalette="orange" disabled={!faceDetected}>
						Далее
					</Button>
				</div>
			)}

			{cameraPassed && !showAlert && !faceDetected && (
				<Alert.Root status="info" mt={5} mb={5}>
					<Alert.Indicator />
					<Alert.Title>
						Происходит настройка камеры. Пожалуйста, убедитесь, что ваше лицо находится в области
						камеры.
					</Alert.Title>
				</Alert.Root>
			)}

			{cameraPassed && showAlert && (
				<Alert.Root status="info" mt={5} mb={5}>
					<Alert.Indicator />
					<Alert.Title>
						Лицо не обнаружено в кадре более 3 секунд. Пожалуйста, поместите своё лицо в область
						камеры.
					</Alert.Title>
				</Alert.Root>
			)}

			{cameraPassed && faceDetected && (
				<Alert.Root status="success" mt={5} mb={5}>
					<Alert.Indicator />
					<Alert.Title>Камера в порядке, можем идти дальше!</Alert.Title>
				</Alert.Root>
			)}

			{alertType === 'error' && statusMessage && (
				<Alert.Root status="error" mt={5} mb={5}>
					<Alert.Indicator />
					<Alert.Title>{statusMessage}</Alert.Title>
				</Alert.Root>
			)}
		</div>
	);
};
