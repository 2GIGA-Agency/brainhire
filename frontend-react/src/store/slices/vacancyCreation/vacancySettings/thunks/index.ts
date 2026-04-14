// --- Async Thunks ---

import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiTemplateItem, MessageTemplate, TemplateCategoryKey } from '../types';
import axios from '@/utils/axios';
import { ApiTemplateCategory } from '../types';

export const fetchVacancyTemplates = createAsyncThunk<
	Record<TemplateCategoryKey, MessageTemplate[]>,
	{ isEdit: boolean },
	{ rejectValue: string }
>('vacancySettings/fetchTemplates', async (_, { rejectWithValue }) => {
	try {
		const response = await axios.get<ApiTemplateCategory[]>('/api/vacancies/templates/messages/');
		const data = response.data;

		const normalizedData: Partial<Record<TemplateCategoryKey, MessageTemplate[]>> = {};

		data.forEach((category) => {
			const stateKey = category.type;
			normalizedData[stateKey] = category.templates.map((tpl) => ({
				id: tpl.id ? String(tpl.id) : `system-${category.type}`,
				title: tpl.name,
				content: tpl.text,
				isSystem: tpl.is_system,
			}));
		});

		return normalizedData as Record<TemplateCategoryKey, MessageTemplate[]>;
	} catch (error) {
		console.error(error);
		return rejectWithValue('Failed to load templates');
	}
});

/**
 * Создание нового шаблона
 */
export const createVacancyTemplate = createAsyncThunk<
	{ categoryKey: TemplateCategoryKey; template: MessageTemplate },
	{ type: TemplateCategoryKey; title: string; content: string },
	{ rejectValue: string }
>('vacancySettings/createTemplate', async ({ type, title, content }, { rejectWithValue }) => {
	try {
		const requestBody = {
			type: type, // Ключи совпадают, маппинг не нужен
			name: title,
			text: content,
		};

		const response = await axios.post<ApiTemplateItem>(
			'/api/vacancies/templates/messages/',
			requestBody
		);

		const createdItem = response.data;

		// Преобразуем ответ API в формат нашего UI
		const newTemplate: MessageTemplate = {
			id: String(createdItem.id),
			title: createdItem.name,
			content: createdItem.text,
			isSystem: createdItem.is_system,
		};

		return { categoryKey: type, template: newTemplate };
	} catch (error) {
		console.error(error);
		return rejectWithValue('Failed to create template');
	}
});

export const updateVacancyTemplate = createAsyncThunk<
	{ categoryKey: TemplateCategoryKey; template: MessageTemplate }, // Возвращаем тип и обновленный шаблон
	{ type: TemplateCategoryKey; id: string; title: string; content: string }, // Аргументы
	{ rejectValue: string }
>('vacancySettings/updateTemplate', async ({ type, id, title, content }, { rejectWithValue }) => {
	try {
		const requestBody = {
			name: title,
			text: content,
		};

		// Предполагаем, что ID передается в URL
		const response = await axios.patch<ApiTemplateItem>(
			`/api/vacancies/templates/messages/${id}/`,
			requestBody
		);

		const updatedItem = response.data;

		// Преобразуем ответ API в MessageTemplate
		const updatedTemplate: MessageTemplate = {
			id: String(updatedItem.id),
			title: updatedItem.name,
			content: updatedItem.text,
			isSystem: updatedItem.is_system,
		};

		return { categoryKey: type, template: updatedTemplate };
	} catch (error) {
		console.error(error);
		return rejectWithValue('Failed to update template');
	}
});

/** DELETE: Удаление шаблона */
export const deleteVacancyTemplate = createAsyncThunk<
	{ categoryKey: TemplateCategoryKey; id: string },
	{ type: TemplateCategoryKey; id: string },
	{ rejectValue: string }
>('vacancySettings/deleteTemplate', async ({ type, id }, { rejectWithValue }) => {
	try {
		await axios.delete(`/api/vacancies/templates/messages/${id}/`);
		// Возвращаем type и id, чтобы редюсер знал, что удалить из стейта
		return { categoryKey: type, id };
	} catch (error) {
		console.error(error);
		return rejectWithValue('Failed to delete template');
	}
});
