interface ProfessionalRole {
	id: string;
	text: string;
	accept_incomplete_resumes: boolean;
}

export type TableTab = 'all' | 'awaiting' | 'reject' | 'invitation' | 'ai_bot' | 'scoring' | 'crash' | 'outbound' | 'incoming';

export interface Vacancy {
	id: string;
	vacancy_name: string;
	type_employment: string;
	level_candidate: string;
	work_schedule: string;
	work_format: string;
	payment_per_month_range: [number, number];
	required_work_experience: string;
	description_responsibilities: string;
	description_requirements: string;
	description_conditions: string;
	skills: string[];
	selectable_skills?: SelectableSkillsGroupApi[];
	company_filter?: {
		whitelist: {
			companies: string[];
			send_reject: boolean;
		};
		blacklist: {
			companies: string[];
			send_reject: boolean;
		};
	};
	professional_roles: ProfessionalRole[];
	areas: Area[];
	user_full_name: string;
	active_interview: ActiveInterview;
	root_id: string;
	version: number;
	is_active: boolean;
	create_date: string;
	vacancy_hh_id: string;
	company: Company;
	user: number;
	number_days: number;
	number_candidates: number;
	number_best_candidates: number;
	pdf: string;
	video_url: string;
}

export interface SelectableSkillsGroupApi {
	mode: 'one' | 'min';
	min_count: number;
	skills: string[];
}

export interface ActiveInterview {
	id: string;
	min_score: number;
	time_per_answer: number;
	level_candidate: string;
	what_checking: string;
	save_audio: boolean;
	save_video: boolean;
	questions: Record<string, Question>;
	root_id: string;
	version: number;
	is_active: boolean;
	vacancy: string;
}

export interface LimitState {
	count_reviews: number;
	id: string;
	limit_reviews: number;
	vacancy_root_id: string;
}

export interface Counters {
	all: number;
	reject: number;
	awaiting: number;
	invitation: number;
	ai_bot: number;
	average_answers_rating: number;
	crash: number;
}

export interface CandidatesParams {
  tab?: TableTab;
  page: number;
  search?: string;
  ordering?: string;
  outbound?: boolean
}

interface Area {
	id: string;
	url: string;
	text: string;
}

interface QuestionAnswer {
	bad: string;
	good: string;
}

interface Question {
	answer: QuestionAnswer;
	question: string;
	question_audio_link: string;
}

interface Company {
	company_description: string;
	company_name: string;
	id: string;
	inn: number;
}

export interface VacancyData {
	companyName: string;
	createdAt?: string;
	vacancyTitle: string;
	positionLevel: string;
	employmentType: string;
	format?: string;
	schedule?: string;
	salary: string;
	experience: string;
	regions: string[];
	skills: string[];
	selectableSkills?: { minCount: number; skills: string[] }[];
	companyFilter?: { whitelist: string[]; blacklist: string[] };
	hrBotActive?: boolean;
	hrBotMandatoryQuestions?: string;
	hrBotRedFlags?: string;
	hrBotAdditionalInfo?: string;
	pdf?: string | null;
	video_url?: string | null;
}
