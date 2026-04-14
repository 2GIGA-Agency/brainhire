import { Block } from '@/components/shared/Block';
import { Box, Tag, Text } from '@chakra-ui/react';
import ReactPlayer from 'react-player';
import { useInView } from 'react-intersection-observer';
import styles from './InterviewAnswer.module.scss';
import { useResize } from '@/hooks/useResize';

interface Props {
	isCommon?: boolean;
	score: number;
	question: string;
	answer: string;
	videoUrl: string;
	isVideoPlaying: boolean;
	onPlayClick: () => void;
}

const mobileBreakPoint = 880;

export const InterviewAnswer = ({
	isCommon = false,
	score,
	question,
	answer,
	videoUrl,
	isVideoPlaying,
	onPlayClick,
}: Props) => {
	const { ref, inView } = useInView({
		threshold: 0.1,
		triggerOnce: true,
	});
	const [width] = useResize();

	const goodAnswerBg = 'green.400';
	const badAnswerBg = 'red.400';
	const middleAnswerBg = 'yellow.400';

	const answerTagColor = score < 4 ? badAnswerBg : score < 7 ? middleAnswerBg : goodAnswerBg;

	const videoWidth = width > mobileBreakPoint ? 480 : width / 1.5;
	const videoHeight = width > mobileBreakPoint ? 320 : width / 1.7;

	return (
		<Block>
			<Box className={styles.answer}>
				<Text className={styles.questionText}>
					{!isCommon && (
						<Tag.Root borderRadius="6px" bgColor={answerTagColor} border="none">
							&nbsp;&nbsp;
						</Tag.Root>
					)}
					&nbsp; {question}
				</Text>
				<Text className={styles.answerText}>
					{typeof answer === 'object' ? JSON.stringify(answer) : answer}
				</Text>
				<Box ref={ref} className={styles.video}>
					{inView && (
						<ReactPlayer
							url={videoUrl}
							width={videoWidth}
							height={videoHeight}
							controls={true}
							playing={isVideoPlaying}
							onPlay={onPlayClick}
						/>
					)}
				</Box>
			</Box>
		</Block>
	);
};
