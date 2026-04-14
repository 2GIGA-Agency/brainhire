import { useAudio } from '@/hooks/useAudio';
import { selectVideoInterviewAttemptData, setCurrentStep } from '@/store/slices/interviewFlow';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { Button, Flex } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { AvatarWithBubble } from '../AvatarWithBubble';
import { InterviewSteps } from '@/store/types';

const step = [
	{
		audioName: 'example_question_answer',
		content: (
			<>
				В следующем этапе интервью вам будут задаваться вопросы, на которые необходимо ответить
				голосом. Постарайтесь дать полный и осмысленный ответ, который раскроет ваш опыт и подход
				к решению задач.
				<br />
				<b>Вопрос:</b> Как вы обычно справляетесь с ситуациями, требующими работы в сжатые сроки?
				<br />
				<b>Ответ:</b> Я организую работу, используя тайм-боксинг и инструменты вроде Trello для
				отслеживания прогресса. Например, при подготовке отчета для клиента за сутки до срока я
				перераспределил задачи, провел стендапы и создал резервный план. В результате отчет был
				готов на 6 часов раньше, снизив количество исправлений на 30% и повысив доверие клиента к
				нашей команде.
			</>
		),
		button: {
			content: 'Все понятно',
			action: 'next' as const,
			bgColor: '#FF7401',
		},
	},
	{
		audioName: 'start',
		content: (
			<>
				Пожалуйста, не используйте помощь Google, AI-инструментов и других ресурсов при ответе на
				вопросы.
				<br />
				Когда будете готовы, нажмите кнопку ниже
			</>
		),
		button: {
			content: 'Перейти к вопросам',
			action: setCurrentStep(InterviewSteps.VIDEO_INTERVIEW),
			bgColor: '#4299E1',
		},
	},
];

const baseAudioFiles = {
	start: '/audio/start.mp3',
	example_question_answer: '/audio/example_question_answer.mp3',
};

export function PreInterview() {
	const dispatch = useAppDispatch();

	const videoInterviewAttempt = useAppSelector(selectVideoInterviewAttemptData);

	if (
		videoInterviewAttempt &&
		videoInterviewAttempt.interview_start &&
		!videoInterviewAttempt.interview_finish
	) {
		dispatch(setCurrentStep(InterviewSteps.VIDEO_INTERVIEW));
	}

	const [currentStepIdx, setCurrentStepIdx] = useState(0);
	const currentStep = step[currentStepIdx];
	const { action, content, bgColor } = currentStep.button;
	const { playAudio, stopAudio } = useAudio({ audioFiles: baseAudioFiles });

	useEffect(() => {
		playAudio(currentStep.audioName);

		return () => {
			stopAudio();
		};
	}, [currentStep.audioName]);

	const handleButtonClick = () => {
		if (action === 'next') {
			setCurrentStepIdx((prev) => prev + 1);
		} else {
			dispatch(action);
		}
	};

	return (
		<Flex direction="column" gap="32px" alignItems="center">
			<AvatarWithBubble text={currentStep.content} />
			<Button mt="auto" onClick={handleButtonClick} size="md" bgColor={bgColor}>
				{content}
			</Button>
		</Flex>
	);
}
