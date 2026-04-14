// VideoInterview.tsx
import { useVideo } from '@/hooks/useVideoInterviewVideo'; // Ensure path is correct
import {
	selectCandidateInterviewId,
	selectCurrentVideoInterviewQuestionIdx,
	selectVideoInterviewQuestions,
	selectStartInterviewData,
	setCurrentStep,
	setIsVideoInterviewPart,
	setNextInterviewQuestion,
	selectIsVideoInterviewAttempt,
} from '@/store/slices/interviewFlow';
import { useAppDispatch, useAppSelector } from '@/store/store';
import axios from '@/utils/axios';
import { serverLog } from '@/utils/cameraLogger'; // Assuming serverLog is available here or pass from hook
import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react'; // Removed useState for isCameraInitialized

import { useAudio } from '@/hooks/useAudio'; // Ensure path is correct
import { sendAntiFrod } from '@/store/thunks/interviewFlow/antiFrodThunk';
import { AvatarWithBubble } from '../AvatarWithBubble';
import { UserWithBubble } from '../UserWithBubble';
import { InterviewSteps } from '@/store/types';

const baseAudioFiles = {}; // Initialize and populate as before

export const VideoInterview = () => {
	const dispatch = useAppDispatch();

	const interviewId = useAppSelector(selectCandidateInterviewId);
	const timePerAnswer =
		useAppSelector(selectStartInterviewData)?.vacancy_with_interview.active_interview
			.time_per_answer;
	const questions = useAppSelector(selectVideoInterviewQuestions);
	const currentQuestionIdx = useAppSelector(selectCurrentVideoInterviewQuestionIdx);
	const isVideoInterviewAttempt = useAppSelector(selectIsVideoInterviewAttempt);

	const questionsLength = questions.length;

	const [isButtonDisabled, setIsButtonDisabled] = useState(true);

	const currentQuestion = questions[currentQuestionIdx];

	const {
		initializeVideo,
		startRecording,
		stopRecording,
		isRecording,
		timeLeft,
		analyserQuestion,
	} = useVideo();

	const videoElRef = useRef<HTMLVideoElement>(null);
	const { playAudio, stopAudio, countdownTimer } = useAudio({ audioFiles: baseAudioFiles });

	// Функция отвечающая за начало интервью
	const startInterview = async () => {
		// Установка имён аудио-файлов
		const questionAudio = questions.reduce(
			(acc, question, index) => {
				const fileName = `question_${index + 1}`;
				acc[fileName] = question.question_audio_link;
				return acc;
			},
			{} as Record<string, string>
		);
		Object.assign(baseAudioFiles, questionAudio);

		// Отправка инициализирующих запросов при первой попытке прохождения интервью
		if (!isVideoInterviewAttempt) {
			try {
				await axios.patch(`/api/candidates/current_interview/${interviewId}/`, {
					interview_start: true,
				});
				serverLog('Interview marked as started via API.');

				await axios.patch(`/api/candidates/current_interview/${interviewId}/`, {
					state_questions: 1,
				});
				serverLog('Initial question state set to 1 via API.');
			} catch (error: any) {
				serverLog('startInterview: API error during initial setup', error.message || error);
			}
		}

		// Инициализация видео-элемента и его синхронизация с веб-камерой пользователя
		if (videoElRef.current) {
			try {
				serverLog('startInterview: Initializing video and analyser (first time).');
				await initializeVideo(videoElRef.current);
				serverLog('startInterview: Video and analyser initialized successfully.');
			} catch (error) {
				serverLog('startInterview: CRITICAL - Failed to initialize video', error);
				return;
			}
		} else {
			serverLog(
				'startInterview: videoElRef.current is null. Video cannot be initialized at this stage.'
			);
		}

		await loadNextQuestion(currentQuestionIdx + 1);
	};

	const loadNextQuestion = async (questionNumber: number) => {
		const audioKey = `question_${questionNumber}`;

		if (videoElRef.current) {
			await initializeVideo(videoElRef.current);
		}

		// Проигрываем аудио, после проигрывания начинаем запись с камеры и блокируем на 5 секунд кнопку для отправки видео-ответа
		playAudio(audioKey, () => {
			setTimeout(() => setIsButtonDisabled(false), 5000);
			startRecording((timePerAnswer || 1) * 60, (recordedChunks, actualMimeType) => {
				setIsButtonDisabled(true);
				moveToNextQuestion(questionNumber);
				sendVideo(Number(questionNumber), recordedChunks, actualMimeType);
			});
		});
	};

	// Функция для очистки данных о текущем вопросе и переходу к следующему
	const moveToNextQuestion = async (questionNumber: number) => {
		if (isRecording) {
			stopRecording(); // This will trigger onStop (and thus sendVideo with current chunks)
		}
		stopAudio();

		const nextQuestionTargetIndex = questionNumber + 1;

		if (questionNumber >= questionsLength) {
			dispatch(setCurrentStep(InterviewSteps.SCORING));
			return;
		}

		dispatch(setNextInterviewQuestion());

		await axios.patch(`/api/candidates/current_interview/${interviewId}/`, {
			state_questions: nextQuestionTargetIndex,
		});

		await loadNextQuestion(nextQuestionTargetIndex);
	};

	// Отправка видео на бек
	async function sendVideo(
		answerIndex: number,
		chunksToSend: Blob[],
		mimeTypeFromRecorder: string
	) {
		dispatch(sendAntiFrod());

		const blobMimeType = mimeTypeFromRecorder || 'video/webm';
		const videoBlob = new Blob(chunksToSend, { type: blobMimeType });

		// Если ничего не записалось по какой-либо причине
		if (!videoBlob.size) {
			serverLog('sendVideo: Blob created but is empty, chunks might have been empty or invalid.', {
				answerIndex,
				chunksLength: chunksToSend.length,
				blobMimeType,
			});
			return;
		}

		// Отправка данных будет осуществляться в FormData, т.к. надо отправлять видео-файл
		const formData = new FormData();
		formData.append('candidate_interview_id', interviewId || '');
		formData.append('media_name', `answer_${answerIndex}`);

		let fileExtension = 'webm'; // По умолчанию
		if (blobMimeType.includes('mp4')) {
			fileExtension = 'mp4';
		} else if (blobMimeType.includes('webm')) {
			fileExtension = 'webm';
		}

		formData.append('media_data', videoBlob, `answer_${answerIndex}.${fileExtension}`);

		try {
			await axios.post('/api/candidates/current_interview/video/', formData, {
				headers: { 'Content-Type': 'multipart/form-data' },
			});
		} catch (e) {
			console.error(e);
		}
	}

	useEffect(() => {
		startInterview();
		dispatch(setIsVideoInterviewPart(true));

		return () => {
			dispatch(setIsVideoInterviewPart(false));
			serverLog('VideoInterview component unmounting. Performing cleanup.');
			stopAudio();
		};
	}, []);

	return (
		<Box mt={3}>
			<AvatarWithBubble text={currentQuestion?.question || 'Загрузка вопроса...'} mt={12} />

			<UserWithBubble isRecording={isRecording} analyser={analyserQuestion} videoRef={videoElRef} />

			<Flex alignItems={'center'} flexDirection={'column'}>
				{countdownTimer > 0 && (
					<Text fontSize="16px" lineHeight="24px" color="#38B2AC" fontWeight="500">
						Запись голосового ответа начнётся через {countdownTimer}
					</Text>
				)}

				{isRecording && (
					<Text fontSize="16px" lineHeight="24px" color="#38B2AC" fontWeight="500">
						Запись автоматически завершится через {Math.floor(timeLeft / 60)}:
						{timeLeft % 60 < 10 ? `0${timeLeft % 60}` : timeLeft % 60}
					</Text>
				)}

				<Button
					onClick={() => stopRecording()}
					disabled={isButtonDisabled || !isRecording}
					size="md"
					bgColor="#FF7401"
					color="white"
					fontSize="16px"
					lineHeight="24px"
					_hover={{ bgColor: '#E06500' }}
					mt={4}
				>
					{currentQuestionIdx + 1 >= questionsLength ? 'Завершить' : 'Перейти к следующему вопросу'}
				</Button>
			</Flex>
		</Box>
	);
};
