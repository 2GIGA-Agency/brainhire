'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import styles from './VideoPlayer.module.scss';

interface VideoPlayerProps {
	url: string;
	previewImage?: string;
	previewAlt?: string;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
	url,
	previewImage = '/images/videoPreview.avif',
	previewAlt = 'Video presentation',
}) => {
	const [showPreview, setShowPreview] = useState(true);
	const videoRef = useRef<HTMLVideoElement>(null);

	const handlePlay = () => {
		setShowPreview(false);
		// Проверяем, что ссылка на элемент существует, и вызываем play()
		if (videoRef.current) {
			videoRef.current.play();
		}
	};

	return (
		<div className={styles.videoContainer}>
			{showPreview && (
				<div className={styles.previewContainer} onClick={handlePlay}>
					<Image
						src={previewImage}
						alt={previewAlt}
						priority
						fill
						className={styles.previewImage}
					/>
					<div className={styles.playOverlay}>
						<button className={styles.playButton}>
							<svg
								width="80"
								height="80"
								viewBox="0 0 24 24"
								fill="currentColor"
								className={styles.playIcon}
							>
								<path d="M8 5v14l11-7z" />
							</svg>
							<div className={styles.pulseEffect}></div>
							<div className={styles.pulseEffect}></div>
						</button>
					</div>
				</div>
			)}

			<video
				ref={videoRef} // Привязываем ref к элементу video
				className={`${styles.iframe} ${showPreview ? styles.hidden : ''}`}
				src={url}
				title="Video player"
				controls // Оставляем стандартные контролы для управления после запуска
			/>
		</div>
	);
};
