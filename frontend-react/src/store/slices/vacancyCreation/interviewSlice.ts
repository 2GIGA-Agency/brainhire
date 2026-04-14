// src/store/slices/interviewSlice.ts
import { RootState } from '@/store/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';

// Интерфейс для ответов (хорошего и плохого)
export interface Answer {
	good: string;
	bad: string;
}

// Интерфейс для вопроса с ответами
export interface QuestionWithAnswers {
	question: string;
	answer: Answer;
	ai: boolean;
}

// Интерфейс для всего объекта
export interface InterviewQuestions {
	[key: string]: QuestionWithAnswers;
}

// Основной интерфейс для состояния интервью
export interface InterviewState {
	id: string; // Уникальный идентификатор интервью
	min_score: number; // Минимальный проходной балл
	time_per_answer: number; // Время на ответ (в минутах)
	level_candidate: string; // Уровень кандидата (например, "Senior")
	what_checking: string; // Что проверяется (например, "mostly-hard-skills")
	save_audio: boolean; // Флаг для сохранения аудио
	save_video: boolean; // Флаг для сохранения видео
	questions: InterviewQuestions; // Список вопросов
	root_id: string; // Идентификатор корневого объекта
	version: number; // Версия интервью
	is_active: boolean; // Флаг активности интервью
	vacancy: string; // Идентификатор вакансии
	aiQuestionsAmount: number; // Количество вопросов для генерации ИИ
	maxQuestionsAmount: number; // Общее максимальное количество вопросов
	message: string;
	invalidQuestionKeys: string[]; // Массив ключей невалидных вопросов
	isActive: boolean; // Флаг активности видеоинтервью
}

// Начальное состояние
const initialState: InterviewState = {
	id: '', // Пустой идентификатор по умолчанию
	min_score: 5, // Минимальный проходной балл по умолчанию
	time_per_answer: 2.0, // Время на ответ по умолчанию
	level_candidate: 'Middle', // Уровень кандидата по умолчанию
	what_checking: 'mostly-hard-skills', // Что проверяется по умолчанию
	save_audio: false, // Не сохранять аудио по умолчанию
	save_video: false, // Не сохранять видео по умолчанию
	questions: {}, // Пустой список вопросов по умолчанию
	root_id: uuid(), // Пустой корневой идентификатор по умолчанию
	version: 1, // Версия по умолчанию
	is_active: true, // Интервью активно по умолчанию
	vacancy: '', // Пустой идентификатор вакансии по умолчанию
	aiQuestionsAmount: 10, // Количество вопросов для генерации ИИ по умолчанию
	maxQuestionsAmount: 20, // Общее количество вопросов
	message: '',
	invalidQuestionKeys: [], // Пустой массив невалидных ключей по умолчанию
	isActive: false, // Видеоинтервью не активно по умолчанию
};

export const interviewSlice = createSlice({
	name: 'interview',
	initialState,
	reducers: {
		setVacancyInterviewActive: (state, action: PayloadAction<boolean>) => {
			state.isActive = action.payload;
		},
		setMessage: (state, aciton: PayloadAction<string>) => {
			state.message = aciton.payload;
		},
		addQuestion: (state, action: PayloadAction<QuestionWithAnswers | undefined>) => {
			if (Object.entries(state.questions).length == state.maxQuestionsAmount) {
				state.message = `Невозможно добавить больше вопросов, достигнут лимит ${state.maxQuestionsAmount}`;
				return;
			}
			let question = '';
			let answer = { good: '', bad: '' };
			let ai = false;
			if (action.payload) {
				question = action.payload.question;
				answer = action.payload.answer;
				ai = action.payload.ai;
			}
			const lastInd = Object.entries(state.questions).length;
			// Добавляем новый вопрос
			const newQuestion: QuestionWithAnswers = {
				question: question,
				answer: answer,
				ai: ai,
			};

			state.questions[`question_${lastInd + 1}`] = newQuestion;
		},
		updateQuestion: (state, action: PayloadAction<[string, string]>) => {
			// Обновляем текст вопроса по ID
			const [questionKey, updateValue] = action.payload;
			state.questions[questionKey] = { ...state.questions[questionKey], question: updateValue };
		},
		deleteQuestion: (state, action: PayloadAction<string>) => {
			const questionKeyToDelete = action.payload;
			delete state.questions[questionKeyToDelete];
			// Удаляем ключ из массива невалидных вопросов при удалении вопроса
			state.invalidQuestionKeys = state.invalidQuestionKeys.filter(
				(key) => key !== questionKeyToDelete
			);
		},
		deleteQuestionsArray: (state, action: PayloadAction<InterviewQuestions>) => {
			const questionsToDelete = action.payload;
			Object.entries(questionsToDelete).map(([key, value]) => {
				delete state.questions[key];
				// Удаляем ключ из массива невалидных вопросов при удалении вопроса
				state.invalidQuestionKeys = state.invalidQuestionKeys.filter(
					(invalidKey) => invalidKey !== key
				);
			});
		},
		updateKeys: (state) => {
			// 1. Создаем новый объект с переименованными ключами
			const updatedQuestions: InterviewQuestions = {};
			const sortedKeys = Object.keys(state.questions).sort((a, b) => {
				// Извлекаем числовые индексы из ключей (например, "question_1" -> 1)
				const indexA = parseInt(a.split('_')[1], 10);
				const indexB = parseInt(b.split('_')[1], 10);
				return indexA - indexB;
			});

			// Создаем маппинг старых ключей на новые для обновления invalidQuestionKeys
			const keyMapping: { [oldKey: string]: string } = {};

			sortedKeys.forEach((key, index) => {
				// Переименовываем ключи по возрастанию
				const newKey = `question_${index + 1}`;
				updatedQuestions[newKey] = state.questions[key];
				keyMapping[key] = newKey;
			});

			// 2. Обновляем массив невалидных ключей согласно новым именам
			state.invalidQuestionKeys = state.invalidQuestionKeys
				.map((oldKey) => keyMapping[oldKey] || oldKey)
				.filter((key) => updatedQuestions[key]); // Убираем ключи, которых больше нет в вопросах

			// 3. Обновляем состояние с новым объектом
			state.questions = updatedQuestions;
		},
		setInterviewQuestions: (state, action: PayloadAction<InterviewState>) => {
			Object.assign(state, action.payload);
		},
		setSelectedTime: (state, action: PayloadAction<number>) => {
			// Устанавливаем выбранное время
			state.time_per_answer = action.payload;
		},
		setAiQuestionsAmount: (state, action: PayloadAction<number>) => {
			// Устанавливаем количество вопросов от ИИ
			state.aiQuestionsAmount = action.payload;
		},
		resetQuestions: (state) => {
			// Очищаем все вопросы
			state.questions = {};
			// Очищаем массив невалидных ключей
			state.invalidQuestionKeys = [];
		},
		// Добавляем вопрос в список невалидных
		addInvalidQuestionKey: (state, action: PayloadAction<string>) => {
			const questionKey = action.payload;
			if (!state.invalidQuestionKeys.includes(questionKey)) {
				state.invalidQuestionKeys.push(questionKey);
			}
		},
		// Удаляем вопрос из списка невалидных
		removeInvalidQuestionKey: (state, action: PayloadAction<string>) => {
			const questionKey = action.payload;
			state.invalidQuestionKeys = state.invalidQuestionKeys.filter((key) => key !== questionKey);
		},
		// Очищаем все невалидные ключи
		clearInvalidQuestionKeys: (state) => {
			state.invalidQuestionKeys = [];
		},
		// Устанавливаем весь массив невалидных ключей
		setInvalidQuestionKeys: (state, action: PayloadAction<string[]>) => {
			state.invalidQuestionKeys = action.payload;
		},
		resetInterview: () => initialState,
	},
});

export const {
	addQuestion,
	updateQuestion,
	deleteQuestion,
	deleteQuestionsArray,
	updateKeys,
	setSelectedTime,
	setAiQuestionsAmount,
	resetQuestions,
	setInterviewQuestions,
	setMessage,
	addInvalidQuestionKey,
	removeInvalidQuestionKey,
	clearInvalidQuestionKeys,
	setInvalidQuestionKeys,
	resetInterview,
	setVacancyInterviewActive,
} = interviewSlice.actions;

export const selectQuestions = (state: RootState) => state.vacancyCreation.interview.questions;
export const selectSelectedTime = (state: RootState) =>
	state.vacancyCreation.interview.time_per_answer;
export const selectAiQuestionsAmount = (state: RootState) =>
	state.vacancyCreation.interview.aiQuestionsAmount;

export const selectInterview = (state: RootState) => state.vacancyCreation.interview;
export const selectMessage = (state: RootState) => state.vacancyCreation.interview.message;
export const selectInvalidQuestionKeys = (state: RootState) =>
	state.vacancyCreation.interview.invalidQuestionKeys;

export default interviewSlice.reducer;
