import {
	addQuestion,
	deleteQuestion,
	deleteQuestionsArray,
	InterviewQuestions,
	InterviewState,
	setMessage,
	updateKeys,
} from '@/store/slices/vacancyCreation/interviewSlice';
import { VacancyInfoState } from '@/store/slices/vacancyCreation/vacancyInfoSlice';
import { RootState } from '@/store/store';
import axios from '@/utils/axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

// Thunk для создания интервью и привязки его к вакансии
export const createInterviewForVacancy = createAsyncThunk(
	'interview/create',
	async (vacancyId: string, { getState, rejectWithValue }) => {
		const state = getState() as RootState;
		const interviewState: InterviewState = state.vacancyCreation.interview;
		const vacancyInfoState: VacancyInfoState = state.vacancyCreation.vacancyInfo;

		// Подготовка данных для отправки
		const interviewPayload = {
			min_score: interviewState.min_score,
			time_per_answer: interviewState.time_per_answer,
			level_candidate: vacancyInfoState.jobLevel,
			what_checking: interviewState.what_checking,
			save_audio: interviewState.save_audio,
			save_video: interviewState.save_video,
			questions: interviewState.questions,
			vacancy: vacancyId, // Привязываем интервью к вакансии
		};

		try {
			if (!interviewState.isActive) {
				return;
			}
			// Отправляем POST-запрос для создания интервью
			const response = await axios.post<InterviewQuestions>('/api/interviews/', interviewPayload);
			return response.data; // Возвращаем данные созданного интервью
		} catch (error: any) {
			return rejectWithValue(
				error.response?.data || error.message || 'Ошибка при создании интервью'
			);
		}
	}
);

// Thunk для обновления интервью
export const updateInterview = createAsyncThunk(
	'interview/update',
	async (vacancyId: string, { getState, rejectWithValue, dispatch }) => {
		const state = getState() as RootState;
		const interviewState: InterviewState = state.vacancyCreation.interview;

		const vacancyInfoState: VacancyInfoState = state.vacancyCreation.vacancyInfo;

		// Подготовка данных для отправки
		const interviewPayload = {
			id: interviewState.id,
			time_per_answer: interviewState.time_per_answer,
			level_candidate: vacancyInfoState.jobLevel,
			questions: interviewState.questions,
			vacancy: vacancyId, // Привязываем интервью к вакансии
		};

		try {
			if (!interviewState.isActive) {
				return;
			}
			if (interviewState.id) {
				return await axios.patch<InterviewQuestions>(
					`/api/interviews/${interviewState.id}/`,
					interviewPayload
				);
			} else {
				return await dispatch(createInterviewForVacancy(vacancyId));
			}
		} catch (error: any) {
			return rejectWithValue(
				error.response?.data || error.message || 'Ошибка при обновлении интервью'
			);
		}
	}
);

// Thunks для генерации вопросов для интервью на этапе создания/обновления вакансии
export const generateInterviewQuestions = createAsyncThunk<
	InterviewQuestions,
	void,
	{ state: RootState; rejectValue: string }
>('intervew/generateInterview', async (_, { getState, dispatch, rejectWithValue }) => {
	const state = getState().vacancyCreation;

	// Получаем имеющиеся данные из state чтобы передать их в запрос для генерации
	const vacancyInfo = state.vacancyInfo;
	const questions = state.interview.questions;
	const skills = state.skills;
	const aiQuestionsAmount = state.interview.aiQuestionsAmount;
	const company = state.companyChoice.selectedCompanyId;

	// Переменные для определения количества вопросов для генерации, чтобы не перейти за лимит (если 15 вопросов маскимум и пользователь создал 11, то будет сгенерировано только 4)
	const maxQuestionsAmount = state.interview.maxQuestionsAmount;
	const userQuestionsAmount = Object.entries(questions).filter(([key, value]) => {
		return value.ai == false;
	}).length;

	const questionsToGenerateAmount =
		userQuestionsAmount + aiQuestionsAmount < maxQuestionsAmount
			? aiQuestionsAmount
			: maxQuestionsAmount - userQuestionsAmount;

	try {
		// Формируем данные для запроса
		const requestData = {
			level_candidate: vacancyInfo.jobLevel,
			question_count: String(questionsToGenerateAmount), // Количество вопросов
			vacancy: {
				...vacancyInfo,
				skills,
				company,
			},
		};
		dispatch(deleteAiQuestions());
		if (questionsToGenerateAmount < aiQuestionsAmount) {
			// Добавляем сообщение о том, что сгенерировано меньше вопросов из-за лимита
			dispatch(
				setMessage(
					`Максимальное количество вопросов: ${maxQuestionsAmount}, вы пытаесь сгенерировать ${aiQuestionsAmount}, при этом добавили вручную ${userQuestionsAmount}. Для сохранения лимита будет сгенерировано ${questionsToGenerateAmount}. Для изменения количества вопросов для генерации, удалите те, которые добавили вручную`
				)
			);
		}

		const response = await axios.post('/api/interviews/question_generation/', requestData);

		// Извлекаем сгенерированные вопросы
		const generatedQuestions: InterviewQuestions = response.data;

		// Добавляем вопросы в состояние
		Object.entries(generatedQuestions).forEach(([key, value]) => {
			dispatch(addQuestion({ ...value, ai: true })); // Добавляем каждый вопрос в список
		});

		return generatedQuestions;
	} catch (error: any) {
		return rejectWithValue(error.message);
	}
});

export const deleteAiQuestions = createAsyncThunk<void, void, { state: RootState }>(
	'interview/deleteAiQuestions',
	(_, { getState, dispatch }) => {
		const questions = getState().vacancyCreation.interview.questions;

		const questionsToDelete = Object.entries(questions).reduce((acc, item) => {
			if (item[1].ai) {
				acc[item[0]] = item[1];
			}
			return acc;
		}, {} as InterviewQuestions);

		dispatch(deleteQuestionsArray(questionsToDelete));
		dispatch(updateKeys());
	}
);

export const deleteQuestionByKey = createAsyncThunk<void, { key: string }, { state: RootState }>(
	'interview/deleteQuestionByKey',
	({ key }, { dispatch }) => {
		dispatch(deleteQuestion(key));
		dispatch(updateKeys());
	}
);
