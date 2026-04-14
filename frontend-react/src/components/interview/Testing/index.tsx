import { InterviewTestQuestion } from '@/components/interview/InterviewTestQuestion';
import {
	selectCandidateId,
	selectCurrentTestQuestionIdx,
	selectTestingInterviewQuestions,
	setCurrentStep,
	setIsTestingPart,
	setNextTestingQuestion,
} from '@/store/slices/interviewFlow';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { fetchTestingByVacancy } from '@/store/thunks';
import { sendAntiFrod } from '@/store/thunks/interviewFlow/antiFrodThunk';
import { sendTestAnswer } from '@/store/thunks/interviewFlow/testing/sendTestAnswer';
import axios from '@/utils/axios';
import { Box, Button } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { InterviewSteps } from '@/store/types';

export const Testing = () => {
	const [answerId, setAnswerId] = useState(0);

	const dispatch = useAppDispatch();

	const candidateId = useAppSelector(selectCandidateId);
	const questions = useAppSelector(selectTestingInterviewQuestions);
	const currentQuestionIdx = useAppSelector(selectCurrentTestQuestionIdx);

	const isLast = currentQuestionIdx + 1 === questions.length;

	const handleTestVariantClick = (id: number) => {
		setAnswerId(id);
	};

	const handleNextQuestionClick = () => {
		dispatch(sendAntiFrod());
		dispatch(setNextTestingQuestion());
		dispatch(
			sendTestAnswer({
				question: questions[currentQuestionIdx].id,
				selected_answer: answerId,
				last: isLast,
			})
		);
		setAnswerId(0);
		if (isLast) {
			axios.post(`/api/testing/test_attempts/finish/${candidateId}/`);
			dispatch(setCurrentStep(InterviewSteps.AFTER_TEST));
		}
	};

	useEffect(() => {
		dispatch(fetchTestingByVacancy());

		dispatch(setIsTestingPart(true));

		return () => {
			dispatch(setIsTestingPart(false));
		};
	}, [dispatch]);

	return (
		<Box className={styles.testingWrapper}>
			<InterviewTestQuestion
				testQuestion={questions[currentQuestionIdx]}
				onClick={handleTestVariantClick}
			/>
			<Button
				onClick={handleNextQuestionClick}
				margin="32px auto 0"
				size="md"
				bgColor="#4299E1"
				fontSize="16px"
				lineHeight="24px"
				fontWeight="600"
				color="white"
				borderRadius="6px"
				display="block"
				disabled={answerId == 0}
			>
				{isLast ? 'Завершить' : 'Далее'}
			</Button>
		</Box>
	);
};
