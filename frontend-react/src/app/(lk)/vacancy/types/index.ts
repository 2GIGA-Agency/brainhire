export type CompaniesResponse = Company[];

export interface Company {
	id: string;
	company: {
		id: string;
		company_name: string;
	};
	vacancy_name: string;
	company_description: string;
	inn: number;
	active_vacancies: Vacancy[];
	create_date: string;
	number_days: number;
	number_candidates: number;
	number_best_candidates: number;
	user_full_name: string;
}

export type Companies = Pick<Company, 'id' | 'company_name' | 'company_description'>;
export type Vacancies = Vacancy & {
	company_name: string;
};

export interface SelectableSkillsGroupApi {
	mode: 'one' | 'min';
	min_count: number;
	skills: string[];
}

export interface CompanyFilterSectionApi {
	companies: string[];
	send_reject: boolean;
}

export interface CompanyFilterApi {
	whitelist: CompanyFilterSectionApi;
	blacklist: CompanyFilterSectionApi;
}

export interface Vacancy {
	id: string;
	root_id: string;
	version: number;
	is_active: boolean;
	vacancy_hh_id: string;
	company: string;
	user_full_name: string;
	vacancy_name: string;
	type_employment: 'full' | 'project';
	work_schedule: string;
	work_format: string;
	payment_per_month_range: [number, number];
	required_work_experience: 'between1And3' | 'between3And6' | 'moreThan6';
	description_responsibilities: string;
	description_requirements: string;
	description_conditions: string;
	skills: string[];
	selectable_skills?: SelectableSkillsGroupApi[];
	company_filter?: CompanyFilterApi;
	create_date: string; // ISO‑8601 дата-время
	professional_roles: ProfessionalRole[];
	areas: Area[];
	number_days: number;
	number_candidates: number;
	number_best_candidates: number;
	hr_bot_active?: boolean;
	hr_bot_mandatory_questions?: string;
	hr_bot_red_flags?: string;
	hr_bot_extra_information?: string;
}

export interface ProfessionalRole {
	id: string;
	text: string;
	accept_incomplete_resumes: boolean;
}

export interface Area {
	id: string;
	url: string;
	text: string;
}

export enum TABLE_TAB {
	ALL = "all",
	ARCHIVE = "archive",
}
