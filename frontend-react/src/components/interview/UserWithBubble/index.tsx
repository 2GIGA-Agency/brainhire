import { Box } from '@chakra-ui/react';
import styles from './styles.module.scss';
import { AudioBars } from '@/components/shared/AudioBars';
import { CameraPreview } from '@/components/shared/CameraPreview';
import React from 'react';
import { useResize } from '@/hooks/useResize';

interface Props {
	isRecording: boolean;
	analyser: AnalyserNode | null;
	videoRef: React.RefObject<HTMLVideoElement | null>;
}

export function UserWithBubble({ isRecording, analyser, videoRef }: Props) {
	const [width] = useResize();

	const barWidth = width < 770 ? width / 2 : 300;
	const barHeight = width < 770 ? barWidth / 2.5 : 120;

	return (
		<Box className={styles.container}>
			<div className={styles.barContainer}>
				{isRecording && analyser && (
					<AudioBars analyser={analyser} width={barWidth} height={barHeight} />
				)}
			</div>
			<CameraPreview videoRef={videoRef} />
		</Box>
	);
}
