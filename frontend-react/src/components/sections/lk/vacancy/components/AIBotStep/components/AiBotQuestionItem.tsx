'use client';

import { Box, Flex, createListCollection } from '@chakra-ui/react';
import { Selection } from '@/components/shared/Selection';
import { LkTextarea } from '@/components/shared/LkTextarea';
import { Typo } from '@/components/shared/Typo/Typo';
import { COLORS } from '@/constants/colors';
import { FiTrash2 } from 'react-icons/fi';
import { useMemo } from 'react';
import {
	VacancyBotEvaluationStrategy,
	VacancyBotQuestion,
	VacancyBotQuestionType,
} from '@/store/slices/vacancyCreation/vacancyBotSlice';

type SelectionItem = Record<'label' | 'value', string>;

const questionTypeOptions: { label: string; value: VacancyBotQuestionType }[] = [
	{ label: 'Открытый', value: 'OPEN' },
	{ label: 'Да/Нет', value: 'BINARY' },
	// { label: 'Числовой', value: 'NUMERIC' },
];

const evaluationOptionsDefault: { label: string; value: VacancyBotEvaluationStrategy }[] = [
	{ label: 'Стандартная', value: 'STANDARD' },
	{ label: 'Информационная', value: 'INFO' },
];

const evaluationOptionsByType: {
	BINARY: { label: string; value: VacancyBotEvaluationStrategy }[];
	DEFAULT: { label: string; value: VacancyBotEvaluationStrategy }[];
} = {
	BINARY: [
		{ label: 'Информационная', value: 'INFO' },
		{ label: 'Критическая', value: 'CRITICAL' },
	],
	DEFAULT: evaluationOptionsDefault,
};

const QUESTION_TYPE_COLLECTION = createListCollection<SelectionItem>({
	items: questionTypeOptions.map(({ label, value }) => ({
		label,
		value: value as string,
	})),
});

interface Props {
	question: VacancyBotQuestion;
	index: number;
	onTextChange: (id: string, value: string) => void;
	onTypeChange: (id: string, value: VacancyBotQuestionType) => void;
	onEvaluationChange: (id: string, value: VacancyBotEvaluationStrategy) => void;
	onDelete: (id: string) => void;
}

export const AiBotQuestionItem = ({
	question,
	index,
	onTextChange,
	onTypeChange,
	onEvaluationChange,
	onDelete,
}: Props) => {
	const evaluationCollection = useMemo(() => {
		const items = (
			question.question_type === 'BINARY'
				? evaluationOptionsByType.BINARY
				: evaluationOptionsByType.DEFAULT
		).map<SelectionItem>(({ label, value }) => ({
			label,
			value: value as string,
		}));

		return createListCollection<SelectionItem>({
			items,
		});
	}, [question.question_type]);

	const handleTypeChange = (value: string | string[]) => {
		const next = Array.isArray(value) ? value[0] : value;
		if (next) {
			onTypeChange(question.id, next as VacancyBotQuestionType);
		}
	};

	const handleEvaluationChange = (value: string | string[]) => {
		const next = Array.isArray(value) ? value[0] : value;
		if (next) {
			onEvaluationChange(question.id, next as VacancyBotEvaluationStrategy);
		}
	};

	return (
		<Box border="1px solid #E2E8F0" borderRadius="12px" padding="20px" bg={COLORS.WHITE}>
			<Flex alignItems="center" justifyContent="space-between" mb="14px">
				<Typo size="16px" weight="semibold" color={COLORS.GRAY_800}>
					Вопрос {index}
				</Typo>
				<FiTrash2
					size={18}
					color="#A0AEC0"
					cursor="pointer"
					onClick={() => onDelete(question.id)}
				/>
			</Flex>

			<Flex direction={{ base: 'column', lg: 'row' }} gap="20px" mt="16px" alignItems="stretch">
				<Box flex="1" minW="0" display="flex" flexDirection="column" height="100%">
					<LkTextarea
						placeholder="Введите вопрос, который бот должен задать кандидату"
						value={question.text}
						onChange={(e) => onTextChange(question.id, e.target.value)}
						border="1px solid"
						borderColor="#CBD5E0"
						borderRadius="12px"
						height="100%"
						minHeight={100}
						flex="1"
						minH="0"
						resize="vertical"
					/>
				</Box>
				<Box
					minW="360px"
					display="flex"
					flexDirection="column"
					gap="16px"
					justifyContent="flex-start"
					height="100%"
				>
					<Flex alignItems="center" gap="12px">
						<Typo size="14px" weight="semibold" color={COLORS.GRAY_800} width="160px">
							Тип вопроса
						</Typo>
						<Box flex="1">
							<Selection
								collection={QUESTION_TYPE_COLLECTION}
								value={[question.question_type]}
								placeholder="Выберите тип"
								onChange={handleTypeChange}
							/>
						</Box>
					</Flex>
					<Flex alignItems="center" gap="12px">
						<Typo size="14px" weight="semibold" color={COLORS.GRAY_800} width="160px">
							Стратегия оценки
						</Typo>
						<Box flex="1">
							<Selection
								collection={evaluationCollection}
								value={[question.evaluation_strategy]}
								placeholder="Выберите стратегию"
								onChange={handleEvaluationChange}
							/>
						</Box>
					</Flex>
				</Box>
			</Flex>
		</Box>
	);
};
