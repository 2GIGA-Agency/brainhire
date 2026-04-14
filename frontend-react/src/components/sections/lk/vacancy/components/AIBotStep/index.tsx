'use client';

import Image from 'next/image';
import { Box, Flex } from '@chakra-ui/react';
import { RadioButtonGroup } from '@/components/ui-kit/RadioButtonGroup';
import { Block } from '@/components/shared/Block';
import { LkTextarea } from '@/components/shared/LkTextarea';
import { LkButton } from '@/components/shared/LkButton';
import { Typo } from '@/components/shared/Typo/Typo';
import { Tip } from '@/components/shared/Tip';
import { COLORS } from '@/constants/colors';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { selectIsTipsShow } from '@/store/slices/appSlice';
import {
	addVacancyBotQuestion,
	deleteVacancyBotQuestion,
	setVacancyBotActive,
	setVacancyBotAdditionalInfo,
	setVacancyBotCandidateMessage,
	setVacancyBotGenerateAutomaticQuestions,
	updateVacancyBotQuestionEvaluation,
	updateVacancyBotQuestionText,
	updateVacancyBotQuestionType,
	VacancyBotEvaluationStrategy,
	VacancyBotQuestionType,
	selectVacancyBot,
} from '@/store/slices/vacancyCreation/vacancyBotSlice';
import { AiBotQuestionItem } from './components/AiBotQuestionItem';

const TEXTAREA_PROPS = {
	maxLength: 3000,
	autoResize: true,
};

const RADIO_ITEMS = [
	{ label: 'Да', value: 'yes' },
	{ label: 'Нет', value: 'no' },
];

const QUESTION_TOOLTIP =
	'Эти вопросы бот обязательно задаёт кандидатам в ходе собеседования.';
const ADDITIONAL_INFO_TOOLTIP =
	'Поделитесь важным контекстом по вакансии, чтобы бот лучше оценивал ответы и мог отвечать на вопросы кандидата.';
const CANDIDATE_MESSAGE_TOOLTIP =
	'Текст, который бот отправит кандидату после диалога перед сообщением о возможности задать вопросы по вакансии.';
const renderLabelWithTip = (text: string, tipText: string, showTip: boolean) => (
	<Flex alignItems="center" gap="6px">
		<Typo size="16px" weight="semibold" color={COLORS.GRAY_800}>
			{text}
		</Typo>
		{showTip && (
			<Tip
				questionIconSize={16}
				showArrow
				content={
					<Typo size="14px" weight="regular" color={COLORS.GRAY_700}>
						{tipText}
					</Typo>
				}
				placement="top"
			/>
		)}
	</Flex>
);

export const AIBotStep = () => {
	const dispatch = useAppDispatch();
	const { isActive, generateAutomaticQuestions, questions, additionalInfo, candidateMessage } =
		useAppSelector(selectVacancyBot);
	const isTipsShow = useAppSelector(selectIsTipsShow);

	const handleAddQuestion = () => {
		dispatch(addVacancyBotQuestion());
	};

	const handleTextChange = (id: string, value: string) => {
		dispatch(updateVacancyBotQuestionText({ id, text: value }));
	};

	const handleTypeChange = (id: string, value: VacancyBotQuestionType) => {
		dispatch(updateVacancyBotQuestionType({ id, question_type: value }));
	};

	const handleEvaluationChange = (
		id: string,
		value: VacancyBotEvaluationStrategy
	) => {
		dispatch(updateVacancyBotQuestionEvaluation({ id, evaluation_strategy: value }));
	};

	const handleDeleteQuestion = (id: string) => {
		dispatch(deleteVacancyBotQuestion(id));
	};

	return (
		<Block
			headingText="Чат-интервью"
			subHeadingText="Позволяет подготовить настройку обязательных вопросов и дополнительной информации о вакансии"
		>
			<Flex gap="24px" mt="16px" flexWrap="wrap">
				<Box flex="1" minW="240px" display="flex" flexDirection="column" gap="8px">
					<Typo size="14px" weight="semibold" color={COLORS.GRAY_800}>
						Включить бота на вакансию
					</Typo>
					<Typo size="14px" color={COLORS.GRAY_600}>
						Бот поможет задать кандидату уточняющие вопросы и собирать ключевую информацию.
					</Typo>
					<RadioButtonGroup
						items={RADIO_ITEMS}
						initialValue={isActive ? 'yes' : 'no'}
						onChange={(event) =>
							dispatch(
								setVacancyBotActive(
									(typeof event === 'string' ? event : event?.value) === 'yes'
								)
							)
						}
					/>
				</Box>
				{isActive && (
					<Box flex="1" minW="240px" display="flex" flexDirection="column" gap="8px">
						<Typo size="14px" weight="semibold" color={COLORS.GRAY_800}>
							Нужно ли, чтобы бот сгенерировал несколько дополнительных вопросов?
						</Typo>
						<Typo size="14px" color={COLORS.GRAY_600}>
							Дополнительные вопросы формируются на основе вакансии и резюме кандидата.
						</Typo>
						<RadioButtonGroup
							items={RADIO_ITEMS}
							initialValue={generateAutomaticQuestions ? 'yes' : 'no'}
							onChange={(event) =>
								dispatch(
									setVacancyBotGenerateAutomaticQuestions(
										(typeof event === 'string' ? event : event?.value) === 'yes'
									)
								)
							}
						/>
					</Box>
				)}
			</Flex>

			{isActive && (
				<Box
					mt="32px"
					border="1px solid #E2E8F0"
					borderRadius="8px"
					bg={COLORS.WHITE}
					display="flex"
					flexDirection="column"
					gap="24px"
					p="24px"
				>
					<Box>
						{renderLabelWithTip('Обязательные вопросы', QUESTION_TOOLTIP, isTipsShow)}
						<Typo size="14px" color={COLORS.GRAY_600}>
							Добавьте вопросы, которые бот задаёт кандидатам в самом начале диалога.
						</Typo>

						<Flex direction="column" gap="16px" mt="16px">
							{questions.map((question, index) => (
								<AiBotQuestionItem
									key={question.id}
									question={question}
									index={index + 1}
									onTextChange={handleTextChange}
									onTypeChange={(id, value) => handleTypeChange(id, value)}
									onEvaluationChange={(id, value) => handleEvaluationChange(id, value)}
									onDelete={handleDeleteQuestion}
								/>
							))}
						</Flex>

						<Flex alignItems="center" gap="12px" mt="12px">
							<LkButton
								bg={COLORS.TEAL_400}
								icon={
									<Image
										src="/icons/add.svg"
										width={15}
										height={15}
										alt="Добавить"
										style={{ marginTop: '1px' }}
									/>
								}
								onClick={handleAddQuestion}
							>
								<Typo size="14px" weight="semibold" color={COLORS.WHITE}>
									Добавить вопрос
								</Typo>
							</LkButton>
							<Typo size="14px" color={COLORS.GRAY_600}>
								Вопросы идут в том порядке, в котором бот задаст их кандидату.
							</Typo>
						</Flex>
					</Box>

					<Box>
						{renderLabelWithTip(
							'Дополнительная информация по вакансии',
							ADDITIONAL_INFO_TOOLTIP,
							isTipsShow
						)}
						<LkTextarea
							value={additionalInfo}
							onChange={(event) => dispatch(setVacancyBotAdditionalInfo(event.target.value))}
							placeholder="Напишите, что важно знать о вакансии в контексте этого диалога."
							required
							width="100%"
							border="1px solid"
							borderColor="#CBD5E0"
							borderRadius="12px"
							{...TEXTAREA_PROPS}
						/>
					</Box>

					<Box>
						{renderLabelWithTip(
							'Сообщение кандидату',
							CANDIDATE_MESSAGE_TOOLTIP,
							isTipsShow
						)}
						<LkTextarea
							value={candidateMessage}
							onChange={(event) =>
								dispatch(setVacancyBotCandidateMessage(event.target.value))
							}
							placeholder="Сообщение, которое увидит кандидат, если он успешно пройдет собеседование с ботом."
							required
							width="100%"
							border="1px solid"
							borderColor="#CBD5E0"
							borderRadius="12px"
							{...TEXTAREA_PROPS}
						/>
					</Box>
				</Box>
			)}
		</Block>
	);
};
