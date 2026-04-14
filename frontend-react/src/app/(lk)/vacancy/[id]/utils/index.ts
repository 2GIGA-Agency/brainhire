import hhReference from '@/hh_vacancy_field_reference.json';
import { paymentFormat } from '@/utils/formatSalary';
import { Vacancy, VacancyData } from '../types';

type EntryVacancyData = Partial<Vacancy> | null;

export function candidateName(last_name?: string, first_name?: string, middle_name?: string) {
	if (!last_name && !first_name && !middle_name) return 'В обработке';

	return `${last_name} ${first_name} ${middle_name ?? ''}`;
}

export function formatVacancyData(vacancy: EntryVacancyData): VacancyData {
	const formatDate = (dateString?: string): string => {
		if (!dateString) return 'Нет даты';
		return new Date(dateString)
			.toLocaleString('ru-RU', {
				year: 'numeric',
				month: '2-digit',
				day: '2-digit',
				hour: '2-digit',
				minute: '2-digit',
			})
			.replace(',', '');
	};

	const employmentName = (): string => {
		const employmentType = hhReference.employment.find(
			(type) => type.id === vacancy?.type_employment
		);
		return employmentType ? employmentType.name : '';
	};

	const experienceName = () => {
		const experienceType = hhReference.experience.find(
			(type) => type.id === vacancy?.required_work_experience
		);
		return experienceType ? experienceType.name : '';
	};

	const rawFilter: any = (vacancy as any)?.company_filter;

	const mapFilterSection = (section: any): string[] => {
		if (!section) return [];
		if (Array.isArray(section)) {
			return section.filter((c) => typeof c === 'string') as string[];
		}
		if (section && typeof section === 'object' && Array.isArray(section.companies)) {
			return section.companies.filter((c: unknown) => typeof c === 'string') as string[];
		}
		return [];
	};

	return {
		companyName: vacancy?.company?.company_name as string,
		createdAt: formatDate(vacancy?.create_date ?? ''),
		vacancyTitle: vacancy?.vacancy_name as string,
		positionLevel: vacancy?.active_interview?.level_candidate || vacancy?.level_candidate || '',
		employmentType: employmentName(),
		format: vacancy?.work_format ?? '',
		schedule: vacancy?.work_schedule ?? '',
		salary: paymentFormat(vacancy?.payment_per_month_range),
		experience: experienceName(),
		regions: vacancy?.areas?.map((item) => item.text) ?? [],
		skills: vacancy?.skills ?? [],
		selectableSkills:
			vacancy?.selectable_skills?.map((group) => ({
				minCount: group.min_count ?? 1,
				skills: group.skills ?? [],
			})) ?? [],
		companyFilter: {
			whitelist: mapFilterSection(rawFilter?.whitelist),
			blacklist: mapFilterSection(rawFilter?.blacklist),
		},
		hrBotActive: Boolean(vacancy?.hr_bot_active),
		hrBotMandatoryQuestions: vacancy?.hr_bot_mandatory_questions,
		hrBotRedFlags: vacancy?.hr_bot_red_flags,
		hrBotAdditionalInfo: vacancy?.hr_bot_extra_information,
		pdf: vacancy?.pdf,
		video_url: vacancy?.video_url,
	};
}
