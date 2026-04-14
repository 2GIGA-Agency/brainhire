// MicrophoneTest.tsx
import { useAudio } from '@/hooks/useAudio';
import { useVideo } from '@/hooks/useVideo';
import {
	retryVideoCheck,
	selectMicrophoneError,
	setCurrentStep,
} from '@/store/slices/interviewFlow';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { sendVideoCheck } from '@/store/thunks/sendVideoCheck';
import { Button, Flex, Text } from '@chakra-ui/react';
import React, { useEffect, useRef } from 'react';
import styles from './CheckMicrophone.module.scss';
import { Tooltip } from '@/components/ui/tooltip';
import { CiCircleQuestion } from 'react-icons/ci';
import { AvatarWithBubble } from '../AvatarWithBubble';
import { UserWithBubble } from '../UserWithBubble';
import { InterviewSteps } from '@/store/types';

export const baseAudioFiles = {
	check_record: '/audio/check_record.mp3',
	check_record_2: '/audio/check_record_2.mp3',
	check_text: '/audio/check_text.mp3',
	example_question_answer: '/audio/example_question_answer.mp3',
	check_error: '/audio/check_error.mp3',
	start: '/audio/start.mp3',
	scoring: '/audio/scoring.mp3',
	scoring_finish: '/audio/scoring_finish.mp3',
	end: '/audio/end.mp3',
};

export const CheckMicrophone = () => {
	const dispatch = useAppDispatch();

	const microphoneError = useAppSelector(selectMicrophoneError);
	const { isLoadingVideoCheck, videoCheckError, videoCheckSuccess, interviewHasTest } =
		useAppSelector((state) => state.interviewFlow);

	const { playAudio, stopAudio, isAudioPlaying, countdownTimer } = useAudio({
		audioFiles: baseAudioFiles,
	});

	const videoRef = useRef<HTMLVideoElement | null>(null);
	const {
		initializeVideo,
		startRecording,
		stopRecording,
		videoChunks,
		isRecording,
		timeLeft,
		analyserQuestion,
	} = useVideo();

	useEffect(() => {
		initializeVideo(videoRef.current);
		playAudio('check_record');
	}, []);

	useEffect(() => {
		if (videoCheckSuccess) {
			playAudio('check_text');
		}

		if (videoCheckError) {
			playAudio('check_error');
		}
	}, [videoCheckSuccess, videoCheckError]);

	const handleSendVideoCheck = (chunks) => {
		dispatch(sendVideoCheck(chunks));
	};

	const handleRetry = () => {
		dispatch(retryVideoCheck());
		playAudio('check_record_2');
	};

	const handleRecording = () => {
		stopAudio();
		if (isRecording) {
			stopRecording();
		} else {
			startRecording(undefined, undefined, handleSendVideoCheck);
		}
	};

	let chatText: React.ReactNode;

	if (videoCheckSuccess) {
		chatText = 'Все хорошо, я вас слышу';
	} else if (!videoCheckSuccess && !videoCheckError) {
		chatText = (
			<>
				Давайте проверим ваш микрофон. Нажмите на кнопку записи и прочитайте текст ниже (не
				торопитесь, произнесите все слова четко):
				<Text fontWeight={600} textStyle="lg" color="rgba(66, 153, 225, 1)" mt={3}>
					Семь раз отмерь, один раз отрежь
				</Text>
			</>
		);
	} else if (videoCheckError) {
		chatText = 'Что-то пошло не так, проверьте доступ к микрофону или произнесите фразу чётче.';
	}

	return (
		<div>
			<>
				<AvatarWithBubble text={chatText} mt={8} />

				{!videoCheckSuccess && (
					<UserWithBubble
						isRecording={isRecording}
						analyser={analyserQuestion}
						videoRef={videoRef}
					/>
				)}
				<Flex justifyContent="center">
					{videoCheckSuccess && (
						<Button
							colorPalette="orange"
							mt={10}
							mx="auto"
							onClick={() => {
								const nextStep = interviewHasTest
									? InterviewSteps.PRE_TEST
									: InterviewSteps.PRE_INTERVIEW;
								dispatch(setCurrentStep(nextStep));
							}}
						>
							Далее
						</Button>
					)}
					{!videoCheckError && !videoCheckSuccess && (
						<Button
							colorPalette="orange"
							mx="auto"
							loading={isLoadingVideoCheck}
							onClick={handleRecording}
						>
							{isRecording ? 'Остановить запись' : 'Начать запись'}
						</Button>
					)}
					{videoCheckError && (
						<Flex gap="8px" alignItems="center">
							<Button
								colorPalette="red"
								mx="auto"
								loading={isLoadingVideoCheck}
								onClick={handleRetry}
							>
								Попробовать еще раз
							</Button>
							<Tooltip content={microphoneError} openDelay={0}>
								<CiCircleQuestion className={styles.tooltip} />
							</Tooltip>
						</Flex>
					)}
				</Flex>
			</>
		</div>
	);
};
