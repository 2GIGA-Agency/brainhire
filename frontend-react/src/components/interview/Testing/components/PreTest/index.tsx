import { Typo } from '@/components/shared/Typo/Typo';
import { COLORS } from '@/constants/colors';
import {
	selectIsTestingAttempt,
	selectTestAttemptData,
	setCurrentStep,
} from '@/store/slices/interviewFlow';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { createTestAttempt } from '@/store/thunks/interviewFlow/testing/createTestAttempt';
import { InterviewSteps } from '@/store/types';
import { Box, Button } from '@chakra-ui/react';
import styles from './style.module.scss';

export function PreTest() {
	const dispatch = useAppDispatch();

	const testAttemptData = useAppSelector(selectTestAttemptData);

	const isTestAttempt = useAppSelector(selectIsTestingAttempt);

	const handleTestStart = () => {
		dispatch(createTestAttempt());
	};

	if (isTestAttempt) {
		dispatch(setCurrentStep(InterviewSteps.TESTING));
	}

	if (testAttemptData?.finished_at) {
		dispatch(setCurrentStep(InterviewSteps.PRE_INTERVIEW));
		return;
	}

	return (
		<Box className={styles.testingWrapper}>
			<Typo size="18px" weight="medium" color={COLORS.GRAY_800}>
				Перед прохождением основного интервью, Вам предлагается пройти тест с выбором ответов
			</Typo>
			<Button
				display="block"
				onClick={handleTestStart}
				margin="32px auto 0"
				size="md"
				bgColor="#4299E1"
				fontSize="16px"
				lineHeight="24px"
				fontWeight="600"
				color="white"
				borderRadius="6px"
			>
				Пройти тест
			</Button>
		</Box>
	);
}
