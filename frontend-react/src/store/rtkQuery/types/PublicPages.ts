// Типы для ответа на запрос для публичной страницы вакансии

interface Area {
	id: string;
	url: string;
	text: string;
}

interface Company {
	company_name: string;
	id: string;
	inn: number;
	company_description: string;
}

export interface PublicCompanyFilter {
	whitelist: string[];
	blacklist: string[];
}

export interface PublicVacancyResponse {
	vacancy_name: string;
	create_date: string; // или можно использовать тип Date, если будет преобразование
	company: Company;
	level_candidate: string;
	type_employment: string;
	payment_per_month_range: [number, number]; // Tuple с минимальной и максимальной зарплатой
	required_work_experience: string;
	areas: Area[];
	skills: string[];
	selectable_skills?: {
		min_count?: number;
		skills: string[];
	}[];
	company_filter?: PublicCompanyFilter;
	description_responsibilities: string;
	description_requirements: string;
	description_conditions: string;
	root_id: string;
}

// Типы для ответа на запрос для получения списка кандидатов на публичной странице
interface CandidateInterview {
	average_answers_rating: string; // или number, если будете преобразовывать
	code_expires_at: string; // или Date
}

interface Candidate {
	id: string;
	first_name: string;
	last_name: string;
	source: string;
	candidate_interview: CandidateInterview;
}

export enum PublicCandidatesOrdering {
	AVG_ANSWERS_ASC = 'candidate_interviews__average_answers_rating',
	AVG_ANSWERS_DESC = '-candidate_interviews__average_answers_rating',
	CODE_EXPIRES_ASC = 'candidate_interviews__code_expires_at',
	CODE_EXPIRES_DESC = '-candidate_interviews__code_expires_at',
}

export interface PublicPaginatedCandidatesResponse {
	count: number;
	pages: number;
	per_page: number;
	current_page: number;
	next: string | null;
	previous: string | null;
	results: Candidate[];
}
