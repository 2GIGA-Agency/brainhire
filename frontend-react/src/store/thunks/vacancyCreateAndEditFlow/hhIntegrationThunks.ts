import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// 1. Получение списка активных вакансий пользователя на HH
export const fetchActiveHHVacancies = createAsyncThunk(
	'vacancyHH/fetchActive',
	async (_, { rejectWithValue }) => {
		try {
			const response = await axios.get('/api/hh/vacancy/get_active_hh_vacancies/');
			return response.data; // Ожидаем массив [{id, name, employer_name}, ...]
		} catch (error: any) {
			return rejectWithValue(error.response?.data || 'Ошибка подключения HH');
		}
	}
);

// 2. Проверка, не связана ли уже эта вакансия HH с чем-то на платформе
// УТОЧНИ ЭНДПОИНТ: Т.к. старый не подошел, использую вероятный для проверки
export const checkHHVacancyLinkDuplicate = createAsyncThunk(
	'vacancyHH/checkDuplicate',
	async (hhVacancyId: string, { rejectWithValue }) => {
		try {
			const response = await axios.get(`/api/hh/vacancy/check_hh_link_exists/?hh_id=${hhVacancyId}`);
			return response.data; // Ожидаем { is_linked: boolean, linked_vacancy_name?: string }
		} catch (error: any) {
			return rejectWithValue(error.response?.data?.message || 'Ошибка проверки связи');
		}
	}
);

// 3. Получение полных данных вакансии HH для импорта
export const fetchHHVacancyData = createAsyncThunk(
	'vacancyHH/fetchData',
	async (hhVacancyId: string, { rejectWithValue }) => {
		try {
			const response = await axios.post('/api/hh/vacancy/get_vacancy_data/', {
				vacancy_id: hhVacancyId,
			});
			return response.data;
		} catch (error: any) {
			return rejectWithValue(error.response?.data?.message || 'Ошибка получения данных');
		}
	}
);