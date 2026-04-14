// CameraMicCheck.tsx
import { checkMediaPermissions, getMediaWithLogging, serverLog } from '@/utils/cameraLogger';
import * as faceapi from 'face-api.js';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import styles from './CheckVideo.module.scss';

interface CameraMicCheckProps {
	onPassed: () => void;
}

export const CheckVideo: React.FC<CameraMicCheckProps> = ({ onPassed }) => {
	const videoRef = useRef<HTMLVideoElement | null>(null);

	const [statusMessage, setStatusMessage] = useState<string>('Ожидание проверки...');
	const [alertType, setAlertType] = useState<'info' | 'success' | 'danger'>('info');
	const [cameraPassed, setCameraPassed] = useState<boolean>(false);
	const [faceDetected, setFaceDetected] = useState<boolean>(false);
	const [permissionsGiven, setPermissionsGiven] = useState<boolean>(false);
	const [isClickToButton, setIsClickToButton] = useState<boolean>(false);

	const lastDetectionTimeRef = useRef<number>(Date.now());

	// Handle Safari permission result event
	const onSafariResult = useCallback((e: Event) => {
		const detail = (e as CustomEvent).detail;
		if (detail.camera && detail.microphone) {
			setPermissionsGiven(true);
			setStatusMessage('Разрешения получены!');
			setAlertType('success');
		} else {
			setPermissionsGiven(false);
			setStatusMessage('Разрешения не получены!');
			setAlertType('danger');
		}
		setIsClickToButton(false);
	}, []);

	// Load face-api models and attach Safari listener
	useEffect(() => {
		faceapi
			.loadSsdMobilenetv1Model('/models')
			.catch((err) => console.error('Failed to load model', err));
		window.addEventListener('safari-permission-result', onSafariResult);
		return () => {
			window.removeEventListener('safari-permission-result', onSafariResult);
		};
	}, [onSafariResult]);

	// Safari hack: trigger custom button
	const clickToButton = useCallback(async () => {
		const safariDebugButton = document.getElementById('safari-debug-button');
		if (safariDebugButton) {
			setIsClickToButton(true);
			await new Promise<void>((resolve) => {
				safariDebugButton.addEventListener('click', () => resolve(), { once: true });
				safariDebugButton.click();
			});
		}
	}, []);

	// Request permissions and start detection
	const checkPermissions = useCallback(async () => {
		try {
			const permissions = await checkMediaPermissions();
			serverLog('Camera permissions check result', permissions);

			const allowCamera =
				permissions.camera === 'granted' ||
				(permissions.isSafari && permissions.camera !== 'denied');

			if (allowCamera) {
				const stream = await getMediaWithLogging({ video: true, audio: true });
				if (videoRef.current) {
					videoRef.current.srcObject = stream;
					await videoRef.current.play();
				}
				setStatusMessage('Доступ разрешён!');
				setAlertType('success');
				setCameraPassed(true);
				detectFace();
			} else if (permissions.isSafari) {
				setStatusMessage('Ожидание подтверждения доступа в Safari...');
				setAlertType('info');
				// standard retry below
				setTimeout(async () => {
					try {
						const updated = await checkMediaPermissions();
						serverLog('Safari retry permission check', updated);
						if (updated.camera === 'granted' || updated.camera !== 'denied') {
							const retryStream = await getMediaWithLogging({ video: true, audio: true });
							if (videoRef.current) {
								videoRef.current.srcObject = retryStream;
								await videoRef.current.play();
							}
							setStatusMessage('Доступ разрешён!');
							setAlertType('success');
							setCameraPassed(true);
							detectFace();
						} else {
							throw new Error('Не удалось получить доступ к камере и микрофону');
						}
					} catch (retryErr: any) {
						serverLog('Safari retry also failed', retryErr);
						setStatusMessage('Ошибка: ' + retryErr.message);
						setAlertType('danger');
					}
				}, 1000);
			} else {
				throw new Error('Не удалось получить доступ к камере и микрофону');
			}
		} catch (err: any) {
			serverLog('Camera permission check failed', err);
			setStatusMessage('Ошибка: ' + err.message);
			setAlertType('danger');
		}
	}, []);

	// Face detection loop
	const detectFace = useCallback(() => {
		const options = new faceapi.SsdMobilenetv1Options();
		const tick = async () => {
			const video = videoRef.current;
			if (video && !video.paused && !video.ended) {
				try {
					const detection = await faceapi.detectSingleFace(video, options);
					if (detection) {
						lastDetectionTimeRef.current = Date.now();
						setFaceDetected(true);
					} else if (Date.now() - lastDetectionTimeRef.current > 3000) {
						setFaceDetected(false);
					}
				} catch (e) {
					console.error('Face detection error', e);
				}
			}
			requestAnimationFrame(tick);
		};
		requestAnimationFrame(tick);
	}, []);

	// Cleanup media on unmount
	useEffect(() => {
		return () => {
			const video = videoRef.current;
			if (video && video.srcObject) {
				(video.srcObject as MediaStream).getTracks().forEach((t) => t.stop());
			}
		};
	}, []);

	return (
		<div className={styles.container}>
			<div className={styles.card}>
				<div className={styles.header}>
					<h3>Проверка камеры и микрофона</h3>
				</div>
				<div className={styles.body}>
					<div className={styles.videoWrapper}>
						<video ref={videoRef} autoPlay muted playsInline className={styles.video} />
					</div>

					<div className={styles.actions}>
						{!cameraPassed &&
							(permissionsGiven ? (
								<button onClick={checkPermissions} className={styles.btnPrimary}>
									Проверить камеру
								</button>
							) : (
								<button
									onClick={clickToButton}
									className={styles.btnPrimary}
									disabled={isClickToButton}
								>
									Дать разрешения
								</button>
							))}

						{cameraPassed && (
							<button onClick={onPassed} className={styles.btnSuccess} disabled={!faceDetected}>
								Далее
							</button>
						)}
					</div>

					{statusMessage && (!cameraPassed || faceDetected) && (
						<div className={`${styles.alert} ${styles[`alert_${alertType}`]}`}>{statusMessage}</div>
					)}

					{cameraPassed && !faceDetected && (
						<div className={styles.alertWarning}>
							Лицо не обнаружено в кадре более 3 секунд. Пожалуйста, поместите своё лицо в область
							камеры.
						</div>
					)}
				</div>
			</div>
		</div>
	);
};
