'use client';

import { QuestionList } from '@/components/shared/QuestionList';
import { Test } from '@/store/slices/vacancyCreation/testingSlice';
import { Box, Flex, Text } from '@chakra-ui/react';

// Определяем интерфейс для ответа кандидата
export interface CandidateAnswer {
	id: number; // Уникальный идентификатор ответа
	attempt: number; // Идентификатор попытки теста
	question: number; // Идентификатор вопроса
	selected_answer: number; // Идентификатор выбранного ответа
	question_text: string; // Текст вопроса
	selected_answer_text: string; // Текст выбранного ответа
	is_correct: boolean; // Флаг правильности ответа
}

// Определяем интерфейс для попытки теста
export interface TestAttempt {
	id: number; // Уникальный идентификатор попытки
	candidate: string; // UUID кандидата
	test: number; // Идентификатор теста
	started_at: string; // Дата и время начала теста (ISO строка)
	finished_at: string; // Дата и время завершения теста (ISO строка)
	score: number; // Общий балл за тест
	candidate_answers: CandidateAnswer[]; // Массив ответов кандидата
}

interface Props {
	test: Test;
	attempt: TestAttempt;
}

export const CandidatesTestingResults = ({ test, attempt }: Props) => {
	const formattedQuestions =
		test?.questions.map((question, idx) => ({
			id: question.id,
			label: `${question.order}. ${question.text}`,
			questionList: question.answers.map((answer) => ({
				id: answer.id,
				label: answer.text,
				correct: answer.is_correct,
				selectedAnswer: attempt?.candidate_answers[idx].selected_answer,
			})),
		})) || [];

	return (
		<>
			<Flex gap="8px" alignItems="center">
				Оценка тестирования:{' '}
				<Text
					color="white"
					padding="2px 8px"
					fontSize="12px"
					fontWeight="500"
					lineHeight="24px"
					borderRadius="6px"
					bgColor="green.400"
				>
					{attempt?.score}
				</Text>
			</Flex>
			{formattedQuestions.map((i, idx) => {
				return (
					<Box mt="32px" key={idx}>
						<Text fontSize="16px" lineHeight="24px" fontWeight="600" mb="16px">
							{i.label}
						</Text>
						<QuestionList items={i.questionList} />
					</Box>
				);
			})}
		</>
	);
};
