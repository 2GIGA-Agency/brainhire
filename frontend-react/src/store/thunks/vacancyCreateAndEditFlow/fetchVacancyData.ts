import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '@/utils/axios';
import {
	setTitle,
	setJobLevel,
	setSpecialization,
	setEmploymentType,
	setSalaryFrom,
	setSalaryTo,
	setExperience,
	// setRegions,
	setResponsibilities,
	setRequirements,
	setConditions,
	setRegion,
} from '@/store/slices/vacancyCreation/vacancyInfoSlice';
import {
	setSelectedTime,
	setAiQuestionsAmount,
	setInterviewQuestions,
	setVacancyInterviewActive,
	resetInterview,
} from '@/store/slices/vacancyCreation/interviewSlice';
import { setSelectedCompany } from '@/store/slices/vacancyCreation/companySlice'; // Импорт для компаний
import { setSkills } from '@/store/slices/vacancyCreation/skillsSlice'; // Импорт для навыков
import { setGroupsFromApi } from '@/store/slices/vacancyCreation/selectableSkillsSlice';
import { fetchTestByVacancyId } from '@/store/thunks/vacancyCreateAndEditFlow/testingThunks'; // Импорт нового Thunk
import {
	setPreviousPdf,
	setPreviousVideo,
	setVideoUrl,
	// --- Новые импорты для настроек ---
	setChangePattern,
	setFeedback,
	setReminder,
	selectTemplate,
} from '@/store/slices/vacancyCreation/vacancySettings/vacancySettingsSlice';
import {
	setVacancyBotActive,
	setVacancyBotAdditionalInfo,
	setVacancyBotCandidateMessage,
	setVacancyBotGenerateAutomaticQuestions,
	setVacancyBotQuestions,
	setVacancyBotRedFlags,
	buildVacancyBotQuestionsFromText,
} from '@/store/slices/vacancyCreation/vacancyBotSlice';
import { VacancyResponse } from '@/store/types';
import { TemplateCategoryKey } from '@/store/slices/vacancyCreation/vacancySettings/types';
import { VacancyBotQuestion } from '@/store/slices/vacancyCreation/vacancyBotSlice';
import { v4 as uuid } from 'uuid';
import {
	setCompanyFilterFromApi,
	resetCompanyFilter,
} from '@/store/slices/vacancyCreation/companyFilterSlice';

const mapHrBotQuestionsFromApi = (questions: any[]): VacancyBotQuestion[] =>
	questions
		.map((question) => {
			const text = `${question?.text ?? ''}`.trim();
			if (!text) {
				return null;
			}
			return {
				id: uuid(),
				text,
				question_type: (question.question_type ?? 'OPEN').toUpperCase(),
				evaluation_strategy: (question.evaluation_strategy ?? 'STANDARD').toUpperCase(),
			};
		})
		.filter((item): item is VacancyBotQuestion => Boolean(item));

const mapAiBotQuestionsFromApi = (questions: any[]): VacancyBotQuestion[] =>
	questions
		.map((question) => {
			const text = `${question?.text ?? ''}`.trim();
			if (!text) return null;

			const typeMap: Record<string, VacancyBotQuestion['question_type']> = {
				open: 'OPEN',
				binary: 'BINARY',
				numeric: 'NUMERIC',
			};

			const strategyMap: Record<string, VacancyBotQuestion['evaluation_strategy']> = {
				scoring: 'STANDARD',
				info: 'INFO',
				critical: 'CRITICAL',
			};

			return {
				id: uuid(),
				text,
				question_type: typeMap[String(question.type || '').toLowerCase()] ?? 'OPEN',
				evaluation_strategy:
					strategyMap[String(question.strategy || '').toLowerCase()] ?? 'STANDARD',
			};
		})
		.filter((item): item is VacancyBotQuestion => Boolean(item));

export const fetchVacancyData = createAsyncThunk(
	'vacancy/fetchVacancyData',
	async (vacancyId: string, { dispatch }) => {
		try {
			// Запрос данных о вакансии
			const response = await axios.get<VacancyResponse>(`/api/vacancies/${vacancyId}/`);
			const data = response.data;

			// Обновление данных вакансии
			dispatch(setTitle(data.vacancy_name));
			dispatch(setEmploymentType(data.type_employment));
			dispatch(setSalaryFrom(Number(data.payment_per_month_range[0])));
			dispatch(setSalaryTo(Number(data.payment_per_month_range[1])));
			dispatch(setExperience(data.required_work_experience));
			dispatch(setJobLevel(data.level_candidate || 'Middle'));
			dispatch(setResponsibilities(data.description_responsibilities));
			dispatch(setRequirements(data.description_requirements));
			dispatch(setConditions(data.description_conditions));

			if (data.pdf) {
				dispatch(setPreviousPdf(data.pdf));
			}

			if (data.video) {
				dispatch(setPreviousVideo(data.video));
			}

			if (data.video_url) {
				dispatch(setVideoUrl(data.video_url));
			}

			dispatch(
				setSpecialization({
					id: data.professional_roles[0].id,
					text: data.professional_roles[0].text,
					accept_incomplete_resumes: data.professional_roles[0].accept_incomplete_resumes,
				})
			);

			// Обновление регионов
			// dispatch(setRegions(data.areas.map((area: any) => JSON.stringify(area))));
			dispatch(
				setRegion({ id: data.areas[0].id, text: data.areas[0].text, url: data.areas[0].url })
			);

			// Обновление данных интервью
			if (data.active_interview_id) {
				const activeInterview = (await axios.get(`/api/interviews/${data.active_interview_id}`))
					.data;
				if (activeInterview) {
					dispatch(setSelectedTime(activeInterview.time_per_answer));
					dispatch(setAiQuestionsAmount(5));
					dispatch(setInterviewQuestions(activeInterview));
					dispatch(setVacancyInterviewActive(true));
				} else {
					dispatch(resetInterview());
				}
			} else {
				dispatch(resetInterview());
			}

			// 1. Устанавливаем переключатели
			dispatch(setFeedback(data.send_feedback));
			dispatch(setReminder(data.send_reminds));
			dispatch(setChangePattern(data.templates_texts_change));

			let aiBotSettings: any | null = null;
			if (data.ai_bot_settings_id) {
				try {
					const aiBotResponse = await axios.get(
						`/api/vacancies/ai_bot_settings/${data.ai_bot_settings_id}/`
					);
					aiBotSettings = aiBotResponse.data;
				} catch (error) {
					console.warn('Не удалось загрузить настройки чат-интервью', error);
				}
			}

			// Хелпер для установки ID шаблона.
			// Если backend вернул число -> это кастомный шаблон.
			// Если backend вернул null -> это системный шаблон, формируем ID 'system-type'.
			const restoreTemplateSelection = (type: TemplateCategoryKey, backendId: number | null) => {
				const idToSelect = backendId !== null ? String(backendId) : `system-${type}`;
				dispatch(selectTemplate({ type, id: idToSelect }));
			};

			restoreTemplateSelection('greeting', data.greeting_template);
			restoreTemplateSelection('reject', data.reject_template);
			restoreTemplateSelection('invite', data.invite_template);
			// Внимание: в API поле называется outbound_invite_template, а тип категории 'outbound'
			restoreTemplateSelection('outbound', data.outbound_invite_template);
			restoreTemplateSelection('feedback', data.feedback_template);
			restoreTemplateSelection('reminder', data.reminder_template);
			restoreTemplateSelection('reject_duplicate', data.reject_duplicate_template);

			const apiHrBotQuestions =
				Array.isArray(data.hr_bot_questions) && data.hr_bot_questions.length
					? mapHrBotQuestionsFromApi(data.hr_bot_questions)
					: null;

			const apiAiBotQuestions =
				aiBotSettings?.mandatory_questions?.length
					? mapAiBotQuestionsFromApi(aiBotSettings.mandatory_questions)
					: null;

			dispatch(setVacancyBotActive(aiBotSettings?.active ?? data.hr_bot_active));
			dispatch(
				setVacancyBotQuestions(
					apiAiBotQuestions ??
						apiHrBotQuestions ??
						buildVacancyBotQuestionsFromText(data.hr_bot_mandatory_questions)
				)
			);
			dispatch(setVacancyBotRedFlags(data.hr_bot_red_flags || ''));
			dispatch(
				setVacancyBotAdditionalInfo(
					aiBotSettings?.extra_information || data.hr_bot_extra_information || ''
				)
			);
			dispatch(
				setVacancyBotCandidateMessage(
					aiBotSettings?.message_after_interview || data.hr_bot_candidate_message || ''
				)
			);
			dispatch(
				setVacancyBotGenerateAutomaticQuestions(
					aiBotSettings?.ai_questions ??
						data.hr_bot_enable_ai_questions ??
						aiBotSettings?.active ??
						data.hr_bot_active
				)
			);

			dispatch(setSelectedCompany(data.company.id)); // Устанавливаем выбранную компанию
			dispatch(setSkills(data.skills)); // Устанавливаем обязательные навыки

			// Фильтр по компаниям всегда синхронизируем с данными вакансии
			if (data.company_filter) {
				dispatch(setCompanyFilterFromApi(data.company_filter));
			} else {
				dispatch(resetCompanyFilter());
			}

			// Группы выборочных навыков всегда синхронизируем с данными вакансии
			dispatch(setGroupsFromApi(data.selectable_skills || []));

			// Загрузка теста для вакансии
			await dispatch(fetchTestByVacancyId(vacancyId));

			return data;
		} catch (error) {
			console.error('Ошибка при загрузке данных вакансии:', error);
			throw error;
		}
	}
);
