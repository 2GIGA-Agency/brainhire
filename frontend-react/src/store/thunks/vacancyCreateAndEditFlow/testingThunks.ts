// src/store/thunks/testingThunk.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '@/utils/axios';
import { RootState } from '../../store';
import { selectQuestions } from '@/store/slices/vacancyCreation/interviewSlice';
import {
	setGeneratedTest,
	setIsTestRequired,
	Test,
} from '@/store/slices/vacancyCreation/testingSlice';

// Thunk для генерации вопросов для теста через API
export const generateTestQuestions = createAsyncThunk(
	'testing/generateQuestions',
	async (_, { getState, dispatch, rejectWithValue }) => {
		const state = getState() as RootState;

		// Получаем данные о вакансии, навыках и вопросы из интервью
		const vacancyInfo = state.vacancyCreation.vacancyInfo;
		const vacancySkills = state.vacancyCreation.skills;
		const interviewQuestions = selectQuestions(state);

		if (!vacancyInfo || !vacancySkills) {
			return rejectWithValue('Необходимо заполнить информацию о вакансии и навыки');
		}

		const vacancyDescription = `
            ${vacancyInfo.description_responsibilities}
            <br><br>
            ${vacancyInfo.description_requirements}
            <br><br>
            ${vacancyInfo.conditions}
        `.replace(/\n/g, '<br>');

		// Преобразуем вопросы из интервью в требуемый формат
		const formattedQuestions: Record<string, any> = {};
		Object.entries(interviewQuestions).forEach(([key, question], index) => {
			formattedQuestions[`question_${index + 1}`] = {
				answer: {
					good: question.answer.good,
					bad: question.answer.bad,
				},
				question: question.question,
			};
		});

		const requestBody = {
			level_candidate: vacancyInfo.jobLevel,
			questions_count: 10,
			vacancy_description: vacancyDescription,
			vacancy_skills: vacancySkills,
			questions: formattedQuestions,
		};

		try {
			const response = await axios.post<Test>('/api/testing/generate_test/', requestBody, {
				headers: {
					'Content-Type': 'application/json',
				},
			});

			if (response.data) {
				const test: Test = response.data;
				dispatch(setGeneratedTest(test)); // Сохраняем тест в состоянии
				return test;
			}
		} catch (error: any) {
			return rejectWithValue(error.message || 'Ошибка при генерации вопросов');
		}
	}
);

// Thunks для добавления теста при создании вакансии
export const fetchTestByVacancyId = createAsyncThunk(
	'testing/fetchTestByVacancyId',
	async (vacancyId: string, { dispatch }) => {
		try {
			// Запрос данных теста
			const response = await axios.get<Test>(`/api/testing/tests/by_vacancy/${vacancyId}/`);
			const testData = response.data;

			dispatch(setIsTestRequired(true));
			// Обновляем состояние теста
			dispatch(
				setGeneratedTest({
					id: testData.id,
					title: testData.title,
					description: testData.description,
					questions: testData.questions.map((question) => ({
						id: question.id,
						text: question.text,
						order: question.order,
						answers: question.answers.map((answer) => ({
							id: answer.id,
							text: answer.text,
							is_correct: answer.is_correct,
						})),
					})),
					vacancy: testData.vacancy,
					vacancy_name: testData.vacancy_name,
					isGenerating: false,
				})
			);
		} catch (error) {
			console.error('Ошибка при загрузке теста:', error);
		}
	}
);

export const createTestToVacancy = createAsyncThunk(
	'testing/createTestToVacancy',
	async (vacancyId: string, { getState }) => {
		const state = getState() as RootState;
		const testingState = state.vacancyCreation.testing;

		if (testingState.isTestRequired && testingState.generatedTest) {
			const testPayload = {
				vacancy_id: vacancyId,
				test: testingState.generatedTest,
			};

			try {
				await axios.post('/api/testing/tests/', testPayload);
			} catch (testError: any) {
				console.error('Ошибка при создании теста:', testError.message);
			}
		}
	}
);

export const updateTest = createAsyncThunk(
	'test/update',
	async (vacancyId: string, { getState, rejectWithValue }) => {
		const state = getState() as RootState;
		const test = state.vacancyCreation.testing.generatedTest;

		if (state.vacancyCreation.testing.isTestRequired) {
			try {
				const response = await axios.post('/api/testing/tests/', {
					vacancy_id: vacancyId,
					test,
				});
				return response.data;
			} catch (error: any) {
				return rejectWithValue(
					error.response?.data || error.message || 'Ошибка при обновлении теста'
				);
			}
		}
	}
);
