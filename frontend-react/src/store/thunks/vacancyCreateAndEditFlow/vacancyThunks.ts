import { VacancyInfoState } from '@/store/slices/vacancyCreation/vacancyInfoSlice';
import {
	createTestToVacancy,
	updateTest,
} from '@/store/thunks/vacancyCreateAndEditFlow/testingThunks';
import {
	createInterviewForVacancy,
	updateInterview,
} from '@/store/thunks/vacancyCreateAndEditFlow/interviewThunks';
import axios from '@/utils/axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '../../store';

import { Vacancy } from '@/app/(lk)/vacancy/types';
import { CompanyChoiceState } from '@/store/slices/vacancyCreation/companySlice';
import { createLimitToVacancy } from '@/store/thunks/limitThunks';
import { addInvalidQuestionKey } from '@/store/slices/vacancyCreation/interviewSlice';
import { setCurrentStep } from '@/store/slices/vacancyCreation/vacancyCreationSlice';
import { TemplateCategoryKey } from '@/store/slices/vacancyCreation/vacancySettings/types';
import { brainApi } from '@/store/rtkQuery/api';

export const createOrEditVacancy = createAsyncThunk<
	Vacancy,
	{ isCreate: boolean; vacancyId?: string },
	{ state: RootState; dispatch: AppDispatch; rejectValue: string }
>(
	'vacancy/createOrEdit',
	async ({ isCreate, vacancyId }, { getState, dispatch, rejectWithValue }) => {
		const state = getState().vacancyCreation;
		const vacancy = state.vacancyInfo;
		const companyId = state.companyChoice.selectedCompanyId;
		const skills = state.skills.skills;
		const selectableSkillsGroups = state.selectableSkills.groups
			.filter((group) => group.skills.length > 0)
			.map((group) => ({
				min_count: group.minCount,
				skills: group.skills,
			}));
	const limits = state.preview.initialCandidatesAmount;
		const vacancyBot = state.vacancyBot;
		const questionTypeMap: Record<string, string> = {
			OPEN: 'open',
			BINARY: 'binary',
			NUMERIC: 'numeric',
		};
		const evaluationStrategyMap: Record<string, string> = {
			STANDARD: 'scoring',
			INFO: 'info',
			CRITICAL: 'critical',
		};
		const aiBotQuestionsPayload = vacancyBot.questions.reduce<
			{ text: string; type: string; strategy: string }[]
		>((acc, question) => {
			const text = question.text.trim();
			if (!text) return acc;

			acc.push({
				text,
				type: questionTypeMap[question.question_type] || 'open',
				strategy: evaluationStrategyMap[question.evaluation_strategy] || 'scoring',
			});

			return acc;
		}, []);
		const hasAiBotData =
			vacancyBot.isActive ||
			aiBotQuestionsPayload.length > 0 ||
			(vacancyBot.additionalInfo || '').trim().length > 0 ||
			(vacancyBot.candidateMessage || '').trim().length > 0;

		// --- ИЗМЕНЕНИЕ №1: Получаем новые данные из стейта ---
		// Вместо старых ...Text полей, мы получаем объекты templateLists и selectedTemplateIds.
		// Все флаги (feedback, video и т.д.) остаются как были.
		const {
			feedback,
			video,
			presentation,
			video_url,
			pdf,
			reminder,
			changePattern,
			previousPdf,
			previousVideo,
			templateLists,
			selectedTemplateIds,
		} = state.vacancySettings;
		const companyFilter = state.companyFilter;

		// Общая валидация (без изменений)
		const requiredFieldsResult = checkRequiredFields(vacancy, state.companyChoice);
		if (requiredFieldsResult) return rejectWithValue(requiredFieldsResult);

		const checkAndCleanQuestions = async (): Promise<boolean> => {
			const currentState = getState().vacancyCreation;
			const questions = currentState.interview.questions;
			const emptyQuestions = Object.entries(questions).filter(
				([, value]) => value.question.trim().length === 0
			);

			if (emptyQuestions.length > 0) {
				// Сначала добавляем пустые вопросы в список невалидных
				for (const [key] of emptyQuestions) {
					dispatch(addInvalidQuestionKey(key));
				}
				return true; // Были изменения
			}
			return false; // Изменений не было
		};

		const hasEmptyQuestions = await checkAndCleanQuestions();

		// Если есть пустые вопросы, прерываем выполнение
		if (hasEmptyQuestions) {
			dispatch(setCurrentStep('interview'));
			return rejectWithValue(
				`В некоторых вопросах отсутствует текст, добавьте его, либо удалите их`
			);
		}

		// Получаем финальное состояние после всех очисток
		const finalState = getState().vacancyCreation;
		const finalQuestions = finalState.interview.questions;
		const interviewIsActive = finalState.interview.isActive;

		if (Object.entries(finalQuestions).length < 3 && interviewIsActive) {
			// Возвращаем на шаг интервью при недостаточном количестве вопросов
			dispatch(setCurrentStep('interview'));
			return rejectWithValue(
				`Для ${isCreate ? 'создания' : 'редактирования'} вакансии в интервью необходимо указать хотя бы 3 вопроса`
			);
		}

		/**
		 * @param type - Тип шаблона
		 * @param allowCustom - Если false, то принудительно берется системный шаблон, игнорируя выбор пользователя.
		 */
		const getTemplatePayload = (type: TemplateCategoryKey, allowCustom: boolean) => {
			const list = templateLists[type];
			let template = null;

			// Если кастомизация разрешена, пробуем найти выбранный пользователем шаблон
			if (allowCustom) {
				const selectedId = selectedTemplateIds[type];
				template = list.find((t) => t.id === selectedId) || null;
			}

			// Если (кастомизация запрещена) ИЛИ (выбранный шаблон не найден) -> ищем СИСТЕМНЫЙ
			if (!template) {
				template = list.find((t) => t.isSystem) || null;
			}

			if (template) {
				return {
					text: template.content,
					// Если шаблон системный -> отправляем null
					// Если шаблон кастомный -> отправляем числовой ID
					templateId: template.isSystem ? null : Number(template.id),
				};
			}

			// Защита: если список пуст и нет даже системного
			return { text: '', templateId: null };
		};

		// --- Применяем логику флагов ---

		// changePattern влияет на: greeting, reject, invite, outbound, reject_duplicate
		const greetingData = getTemplatePayload('greeting', changePattern);
		const rejectData = getTemplatePayload('reject', changePattern);
		const inviteData = getTemplatePayload('invite', changePattern);
		const outboundData = getTemplatePayload('outbound', changePattern);
		// Добавил reject_duplicate, так как вы упомянули его в условии
		const rejectDuplicateData = getTemplatePayload('reject_duplicate', changePattern);

		// feedback влияет на: feedback
		const feedbackData = getTemplatePayload('feedback', feedback);

		// reminder влияет на: reminder
		const reminderData = getTemplatePayload('reminder', reminder);

		const vacancyPayload = {
			...(isCreate && { company: companyId }),
			vacancy_name: vacancy.vacancy_name,
			type_employment: vacancy.employmentType,
			...(isCreate && { work_schedule: '5/2', work_format: 'Гибрид' }),
			payment_per_month_range: `${vacancy.salaryFrom}, ${vacancy.salaryTo}`,
			level_candidate: vacancy.jobLevel,
			required_work_experience: vacancy.experience,
			description_responsibilities: vacancy.description_responsibilities,
			description_requirements: vacancy.description_requirements,
			description_conditions: vacancy.description_conditions,
			skills: skills,
			selectable_skills: selectableSkillsGroups,
			company_filter: {
				whitelist: {
					companies: companyFilter.whitelist.companies,
					send_reject: companyFilter.whitelist.sendReject,
				},
				blacklist: {
					companies: companyFilter.blacklist.companies,
					send_reject: companyFilter.blacklist.sendReject,
				},
			},
			areas: [vacancy.region],
			professional_roles: [vacancy.specialization],

			send_feedback: feedback,
			send_reminds: reminder,
			templates_texts_change: changePattern,

			greeting_text: greetingData.text,
			greeting_template: greetingData.templateId,

			reject_text: rejectData.text,
			reject_template: rejectData.templateId,

			invite_text: inviteData.text,
			invite_template: inviteData.templateId,

			outbound_invite_text: outboundData.text,
			outbound_invite_template: outboundData.templateId,

			feedback_text: feedbackData.text,
			feedback_template: feedbackData.templateId,

			reminder_text: reminderData.text,
			reminder_template: reminderData.templateId,

			reject_duplicate_text: rejectDuplicateData.text,
			reject_duplicate_template: rejectDuplicateData.templateId,

			presentation: presentation && Boolean(pdf || previousPdf || video || previousVideo || video_url),
			video_url: video_url || '', 
		};

		const saveAiBotSettings = async (vacancyId: string) => {
			if (!hasAiBotData) return;

			const aiBotPayload = {
				vacancy: vacancyId,
				active: vacancyBot.isActive,
				ai_questions: vacancyBot.generateAutomaticQuestions,
				extra_information: vacancyBot.additionalInfo,
				message_after_interview: vacancyBot.candidateMessage,
				mandatory_questions: aiBotQuestionsPayload,
			};

			await axios.post('/api/vacancies/ai_bot_settings/', aiBotPayload);
		};

		let payload: any = vacancyPayload;
		const formData = new FormData();

		Object.entries(payload).forEach(([key, value]) => {
			if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
				formData.append(key, String(value));
			} else if (Array.isArray(value)) {
				if (value.length === 0) {
					formData.append(key, '');
				} else if (typeof value[0] === 'string') {
					formData.append(key, value.join(','));
				} else {
					formData.append(key, JSON.stringify(value));
				}
			} else {
				formData.append(key, JSON.stringify(value));
			}
		});

		if (presentation) {
			if (pdf instanceof File) {
                formData.append('pdf', pdf);
            } else if (!previousPdf) {
                formData.append('pdf', '');
            }
			if (video instanceof File) {
                formData.append('video', video);
            } else if (!previousVideo) {
                formData.append('video', '');
            }
		}

		payload = formData;

		try {
			let response;
			if (isCreate) {
				response = await axios.post<Vacancy>('/api/vacancies/', payload);
			} else {
				response = await axios.patch<Vacancy>(`/api/vacancies/${vacancyId}/`, payload);
			}

			const resultVacancy = response.data;

			await saveAiBotSettings(resultVacancy.id);

			const interviewIsActive = state.interview.isActive;

			if (interviewIsActive) {
				if (isCreate) {
					await dispatch(createInterviewForVacancy(resultVacancy.id));
				} else {
					await dispatch(updateInterview(resultVacancy.id));
				}
			}

			if (state.testing.isTestRequired) {
				if (isCreate) {
					await dispatch(createTestToVacancy(resultVacancy.id));
				} else {
					await dispatch(updateTest(resultVacancy.id));
				}
			}

			if (isCreate) {
				if (limits) {
					await dispatch(
						createLimitToVacancy({
							vacancyId: resultVacancy.root_id,
							limits: Number(limits),
						})
					);
				}
			}

			dispatch(brainApi.util.invalidateTags([{ type: 'Vacancies', id: 'LIST' }]));

			return resultVacancy;
		} catch (error: any) {
			if (error.response && error.response.data) {
				return rejectWithValue(JSON.stringify(error.response.data));
			} else {

				return rejectWithValue(JSON.stringify(error));
			}
		}
	}
);

// ------------------_Утилитарные фукнции----------------------
export function checkRequiredFields(vacancy: VacancyInfoState, companyChoice: CompanyChoiceState) {
	const vacancyKeysToCheck: (keyof Omit<
		VacancyInfoState,
		'employmentTypesCollection' | 'paymentTypesCollection' | 'experienceCollection'
	>)[] = [
		'vacancy_name',
		'description_responsibilities',
		'description_requirements',
		'description_conditions',
		'region',
		'specialization',
	];

	const requiredFields: { [K in (typeof vacancyKeysToCheck)[number]]?: string } = {
		vacancy_name: 'Название вакансии',
		description_responsibilities: 'Обязанности',
		description_conditions: 'Условия',
		description_requirements: 'Требования',
		region: 'Регион	 показа вакансии',
		specialization: 'Специализация',
	};

	const missingFields: string[] = [];

	const companyId = companyChoice.selectedCompanyId;
	if (!companyId) {
		missingFields.push('Компания');
	}

	for (const key of vacancyKeysToCheck) {
		const value = vacancy[key];
		if (!value || (Array.isArray(value) && value.length === 0)) {
			missingFields.push(requiredFields[key]!);
		}
	}

	if (missingFields.length > 0) {
		return `Отсутствуют обязательные поля: ${missingFields.join(', ')}`;
	} else {
		return null;
	}
}

// Функция в которой будет напоминание об {{link}} в кастомных сообщениях
// без этого у сообщения не будет ссылки на прохождение интервью и рассылка будет по факту безполезна

// interface для необходимой части, ключ-это название свойства, значение - это Tuple где первый элемент - текст, второй - значение, которое обязательно должно быть в тексте
// Пример: outboundInvite: "{{link}}" - в outboundInvite обязательно должно быть {{link}}
interface RequiredPart {
	[key: string]: [string, string];
}
export function checkRequiredParts(parts: RequiredPart) {
	const missingParts: RequiredPart[] = [];

	Object.entries(parts).map(([key, value]) => {
		if (!value[0].includes(value[1])) {
			missingParts.push({ [key]: value });
		}
	});

	const missingPartsMessage = missingParts.reduce((acc, i) => {
		// Название поля
		const key = Object.keys(i)[0];
		// Недостающий фрагмент
		const value = Object.values(i)[0][1];

		acc += `${key} - нет обязательной части ${value}, `;
		return acc;
	}, '');

	if (missingParts.length > 0) {
		return `В следующих сообщениях отсутствуют необходимые части: ${missingPartsMessage}`;
	}
}
