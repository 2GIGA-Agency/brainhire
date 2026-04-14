import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MessageTemplate, TemplateCategoryKey, NullableFile, VacancySettingsState } from './types';
import {
	createVacancyTemplate,
	deleteVacancyTemplate,
	fetchVacancyTemplates,
	updateVacancyTemplate,
} from './thunks';
import { fetchVacancyData } from '@/store/thunks/vacancyCreateAndEditFlow/fetchVacancyData';

// --- Начальное состояние ---

const initialState: VacancySettingsState = {
	isLoadingTemplates: false,
	presentation: false,
	video: null,
	pdf: null,
	video_url: '',
	previousPdf: '',
	previousVideo: '',

	feedback: false,
	reminder: false,
	changePattern: false,

	templateLists: {
		greeting: [],
		reject: [],
		invite: [],
		outbound: [],
		reminder: [],
		feedback: [],
		reject_duplicate: [],
	},
	selectedTemplateIds: {
		greeting: null,
		reject: null,
		invite: null,
		outbound: null,
		reminder: null,
		feedback: null,
		reject_duplicate: null,
	},
};

// --- Slice ---

export const vacancySettingsSlice = createSlice({
	name: 'vacancySettings',
	initialState,
	reducers: {
		setPresentation: (state, action: PayloadAction<boolean>) => {
			state.presentation = action.payload;
		},
		setVideo: (state, action: PayloadAction<NullableFile>) => {
			state.video = action.payload;
		},
		setPreviousVideo: (state, action: PayloadAction<string>) => {
			state.previousVideo = action.payload;
		},
		setPdf: (state, action: PayloadAction<NullableFile>) => {
			state.pdf = action.payload;
			if (action.payload) {
				state.presentation = true;
			} else {
				state.previousPdf = ''; 
			}
		},
		setPreviousPdf: (state, action: PayloadAction<string>) => {
			state.previousPdf = action.payload;
		},
		setVideoUrl: (state, action: PayloadAction<string>) => {
			state.video_url = action.payload;
			if (action.payload) state.presentation = true;
		},
		resetVacancySettings: () => initialState,

		setFeedback: (state, action: PayloadAction<boolean>) => {
			state.feedback = action.payload;
		},
		setReminder: (state, action: PayloadAction<boolean>) => {
			state.reminder = action.payload;
		},
		setChangePattern: (state, action: PayloadAction<boolean>) => {
			state.changePattern = action.payload;
		},

		selectTemplate: (state, action: PayloadAction<{ type: TemplateCategoryKey; id: string }>) => {
			const { type, id } = action.payload;
			state.selectedTemplateIds[type] = id;
		},
		addTemplate: (
			state,
			action: PayloadAction<{ type: TemplateCategoryKey; template: MessageTemplate }>
		) => {
			// Оставлен для ручного добавления, если нужно без API (опционально)
			const { type, template } = action.payload;
			state.templateLists[type].push(template);
		},
		updateTemplate: (
			state,
			action: PayloadAction<{ type: TemplateCategoryKey; template: MessageTemplate }>
		) => {
			const { type, template } = action.payload;
			const list = state.templateLists[type];
			const index = list.findIndex((t) => t.id === template.id);
			if (index !== -1) list[index] = template;
		},
		deleteTemplate: (state, action: PayloadAction<{ type: TemplateCategoryKey; id: string }>) => {
			const { type, id } = action.payload;
			// Удаляем из списка
			state.templateLists[type] = state.templateLists[type].filter((t) => t.id !== id);

			// Если удаленный шаблон был выбран, переключаемся на системный (или первый доступный)
			if (state.selectedTemplateIds[type] === id) {
				const systemTemplate = state.templateLists[type].find((t) => t.isSystem);
				state.selectedTemplateIds[type] = systemTemplate ? systemTemplate.id : null;
			}
		},
	},
	extraReducers: (builder) => {
		builder
			// --- Fetch Templates ---
			.addCase(fetchVacancyTemplates.pending, (state) => {
				state.isLoadingTemplates = true;
			})
			.addCase(fetchVacancyTemplates.fulfilled, (state, action) => {
				state.isLoadingTemplates = false;
				const fetchedLists = action.payload;
				const isEdit = action.meta.arg.isEdit;

				(Object.keys(fetchedLists) as TemplateCategoryKey[]).forEach((key) => {
					const templates = fetchedLists[key];
					if (templates && templates.length > 0) {
						state.templateLists[key] = templates;

						// Логика выбора по умолчанию ТОЛЬКО для создания (isEdit = false)
						if (isEdit === false) {
							// Берем последний шаблон из списка
							const targetTemplate = templates[1] || templates[0];

							// Устанавливаем его, если выбор еще пуст (чтобы не перетереть ручной выбор юзера, если запрос долгий)
							if (!state.selectedTemplateIds[key]) {
								state.selectedTemplateIds[key] = targetTemplate.id;
							}
						}
					}
				});
			})
			.addCase(fetchVacancyTemplates.rejected, (state) => {
				state.isLoadingTemplates = false;
			})

			// --- Create Template ---
			.addCase(createVacancyTemplate.fulfilled, (state, action) => {
				const { categoryKey, template } = action.payload;

				// 1. Добавляем новый шаблон в список
				state.templateLists[categoryKey].push(template);

				// 2. Сразу делаем его активным (выбираем)
				state.selectedTemplateIds[categoryKey] = template.id;
			})
			.addCase(updateVacancyTemplate.fulfilled, (state, action) => {
				const { categoryKey, template } = action.payload;
				const list = state.templateLists[categoryKey];

				// Находим индекс обновляемого шаблона
				const index = list.findIndex((t) => t.id === template.id);

				// Если нашли — обновляем данные
				if (index !== -1) {
					list[index] = template;
				}
			})
			.addCase(deleteVacancyTemplate.fulfilled, (state, action) => {
				const { categoryKey, id } = action.payload;

				// 1. Удаляем из списка
				state.templateLists[categoryKey] = state.templateLists[categoryKey].filter(
					(t) => t.id !== id
				);

				// 2. Если удалили выбранный шаблон -> переключаемся на безопасный дефолт
				if (state.selectedTemplateIds[categoryKey] === id) {
					const list = state.templateLists[categoryKey];
					// Ищем системный или первый попавшийся
					const defaultTemplate = list.find((t) => t.isSystem) || list[0];
					state.selectedTemplateIds[categoryKey] = defaultTemplate ? defaultTemplate.id : null;
				}
			})
			.addCase(fetchVacancyData.fulfilled, (state, action) => {
				const vacancy = action.payload;

				// 1. Сохраняем ссылки на уже загруженные файлы
				// Проверьте точное название полей с бэкенда (обычно 'pdf' или 'pdf_url')
				state.previousPdf = vacancy.pdf || ''; 
				state.previousVideo = vacancy.video || '';
				state.video_url = vacancy.video_url || '';

				// 2. Логика авто-включения радиокнопки
				// Если есть хоть какой-то файл или ссылка -> включаем презентацию
				if (state.previousPdf || state.previousVideo || state.video_url) {
					state.presentation = true;
				} else {
					state.presentation = false;
				}
			});
	},
});

export const {
	setPresentation,
	setVideo,
	setPreviousVideo,
	setPdf,
	setPreviousPdf,
	setVideoUrl,
	resetVacancySettings,

	setFeedback,
	setReminder,
	setChangePattern,

	selectTemplate,
	addTemplate,
	updateTemplate,
	deleteTemplate,
} = vacancySettingsSlice.actions;

export default vacancySettingsSlice.reducer;
