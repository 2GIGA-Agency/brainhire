// src/components/sections/lk/vacancy/create/Interview.tsx
'use client';

import { Block } from '@/components/shared/Block';
import { addQuestion, selectQuestions, selectInterview, setVacancyInterviewActive } from '@/store/slices/vacancyCreation/interviewSlice';

import Image from 'next/image';

import { RadioButtonGroup } from '@/components/ui-kit/RadioButtonGroup';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { InterviewInfo } from './components/InterviewInfo';
import { GenerationSettings } from './components/GenerationSettings';
import { InterviewQuestionsList } from './components/InterviewQuestionsList';
import { Typo } from '@/components/shared/Typo/Typo';
import { COLORS } from '@/constants/colors';
import { LkButton } from '@/components/shared/LkButton';
import { Box, Flex } from '@chakra-ui/react';

const RADIO_ITEMS = [
	{ label: 'Да', value: 'yes' },
	{ label: 'Нет', value: 'no' },
];

export const Interview = () => {
	const dispatch = useAppDispatch();
	const questions = useAppSelector(selectQuestions);

	const handleAddQuestion = () => {
		dispatch(addQuestion());
	};

	const { isActive } = useAppSelector(selectInterview);

	return (
		<>
			<Block
				headingText="Видеоинтервью"
				subHeadingText="Добавьте вопросы вручную или сгенерируйте с помощью ИИ"
			>
				<Flex gap="24px" mt="16px" flexWrap="wrap">
					<Box flex="1" minW="240px" display="flex" flexDirection="column" gap="8px">
						<Typo size="14px" weight="semibold" color={COLORS.GRAY_800}>
							Включить видеоинтервью на вакансию
						</Typo>
						<Typo size="14px" color={COLORS.GRAY_600}>
							Кандидат ответит на вопросы в видеоформате. Ответы будут доступны для просмотра.
						</Typo>
						<RadioButtonGroup
							items={RADIO_ITEMS}
							initialValue={isActive ? 'yes' : 'no'}
							onChange={(event) =>
								dispatch(
									setVacancyInterviewActive(
										(typeof event === 'string' ? event : event?.value) === 'yes'
									)
								)
							}
						/>
					</Box>
				</Flex>

				{isActive && (
					<Box 
						mt="32px"
						bg={COLORS.WHITE}
						display="flex"
						flexDirection="column"
						gap="24px"
					>
						<InterviewInfo />
						<GenerationSettings />
						<InterviewQuestionsList />

						{Object.entries(questions).length > 2 && (
							<LkButton
								bg={COLORS.TEAL_400}
								icon={
									<Image
										src={'/icons/add.svg'}
										width={15}
										height={15}
										alt={'Plus'}
										style={{ marginTop: '1px' }}
									/>
								}
								onClick={handleAddQuestion}
							>
								<Typo size="14px" weight="semibold" color={COLORS.WHITE}>
									Добавить вопрос вручную
								</Typo>
							</LkButton>
						)}
					</Box>
				)}
			</Block>
		</>
	);
};
