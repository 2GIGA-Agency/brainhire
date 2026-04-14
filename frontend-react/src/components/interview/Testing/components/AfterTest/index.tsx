import { Typo } from '@/components/shared/Typo/Typo';
import { COLORS } from '@/constants/colors';
import { setCurrentStep } from '@/store/slices/interviewFlow';
import { useAppDispatch } from '@/store/store';
import { InterviewSteps } from '@/store/types';
import { Box, Button } from '@chakra-ui/react';
import styles from './style.module.scss';

export function AfterTest() {
	const dispatch = useAppDispatch();

	const handleTestStart = () => {
		dispatch(setCurrentStep(InterviewSteps.PRE_INTERVIEW));
	};

	return (
		<Box className={styles.testingWrapper}>
			<Typo size="18px" weight="medium" color={COLORS.GRAY_800}>
				Спасибо за прохождение тестирования
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
				Перейти к видео-интервью
			</Button>
		</Box>
	);
}
