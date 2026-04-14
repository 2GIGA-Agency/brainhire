'use client';

import { useAppSelector } from '@/store/store';
import { Box } from '@chakra-ui/react';
import Image from 'next/image';
import React, { PropsWithChildren } from 'react';
import styles from './styles.module.scss';
import {
	selectCurrentVideoInterviewQuestionIdx,
	selectCurrentTestQuestionIdx,
	selectIsTestingPart,
	selectIsVideoInterviewPart,
	selectTestingInterviewQuestions,
	selectVideoInterviewQuestions,
} from '@/store/slices/interviewFlow';
import { Typo } from '../Typo/Typo';
import { COLORS } from '@/constants/colors';

export const InterviewWrapper: React.FC<PropsWithChildren> = ({ children }) => {
	// Информация для номера вопроса
	const testingQuestionsCount = useAppSelector(selectTestingInterviewQuestions).length;
	const currentTestingQuestion = useAppSelector(selectCurrentTestQuestionIdx);

	const videoInterviewQuestionsCount = useAppSelector(selectVideoInterviewQuestions).length;
	const currentVideoInterviewQuestion = useAppSelector(selectCurrentVideoInterviewQuestionIdx);

	const isTestingPart = useAppSelector(selectIsTestingPart);
	const isVideoInterviewPart = useAppSelector(selectIsVideoInterviewPart);

	const isQuestions = isTestingPart || isVideoInterviewPart;

	const currentQuestion = isTestingPart ? currentTestingQuestion : currentVideoInterviewQuestion;
	const questionsAmount = isTestingPart ? testingQuestionsCount : videoInterviewQuestionsCount;

	return (
		<Box minH="100vh" bgImage="url(/images/interview_back.jpg)" bgSize="cover" bgRepeat="no-repeat">
			<Box className={styles.wrapper}>
				<Box
					className={styles.contentBox}
					bg="white"
					borderRadius="lg"
					p={{ base: 4, md: 8 }}
					w="100%"
					maxW="1010px"
					boxShadow="lg"
				>
					<Box className={styles.headerWrapper}>
						<Box className={styles.header}>
							<Image
								src="/icons/Logo.svg"
								alt=""
								width={120}
								height={40}
								className={styles.img}
							/>
							{isQuestions && (
								<Typo mx="auto" fontWeight={600} color={COLORS.BLUE_400}>
									{`Вопрос ${currentQuestion + 1} из ${questionsAmount}`}
								</Typo>
							)}
						</Box>
					</Box>
					{children}
				</Box>
			</Box>
		</Box>
	);
};
