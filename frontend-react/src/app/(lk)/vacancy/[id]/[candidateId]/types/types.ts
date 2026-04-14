import { CandidateChatInfo, CandidateInterviewChat } from '@/store/types';

export interface CandidateOverview {
	id: string;
	first_name: string;
	last_name: string;
	middle_name: string | null;
	email: string;
	phone: string | null;
	area: string;
	status: 'True' | 'False';
	source: string;
	create_date: string;
	resume: Resume;
	candidate_interview: CandidateInterview;
	realtime_interview: RealtimeInterview | null;
	behavior: CandidateEvaluation | null;
	questions: Questions;
	chat: CandidateChatInfo | null;
	chat_interview?: CandidateInterviewChat | null;
	send_reminds: boolean;
}

export interface ExternalCandidateOverview {
	first_name: string;
	last_name: string;
	candidate_interview: Pick<
		CandidateInterview,
		'answers' | 'general_recommendations' | 'answers_rating'
	>;
	question: Record<string, { questions: string }>;
}

export interface GeneralScoring {
	final_comment: string;
	strong_points: string[];
	skills_summary: {
		hard_skills: string[];
		soft_skills: string[];
	};
	areas_for_development: string[];
}

export interface ResumeSelectableGroupSkill {
	check: boolean;
	description: string;
}

export interface ResumeSelectableGroup {
	check: boolean;
	min_count: number;
	[key: string]: ResumeSelectableGroupSkill | boolean | number;
}

export interface ResumeStack {
	selectable_skills: ResumeSelectableGroup[];
}

export interface ResumeJobExperience {
	months: number;
	duration: string;
	end_date: string;
	position: string;
	start_date: string;
	description: string;
	company_name: string;
}

export interface ResumeCompanyListCheck {
	matches: string[];
	companies: string[];
	send_reject: boolean;
}

export interface ResumeCompanyListCheckWithMissing extends ResumeCompanyListCheck {
	missing: string[];
}

export interface ResumeCompanyFilter {
	blacklist: ResumeCompanyListCheck;
	whitelist: ResumeCompanyListCheckWithMissing;
}

export interface Resume {
	id: number;
	pdf_link_s3: string;
	work_experience: boolean;
	stack: ResumeStack | null;
	summary_output: boolean;
	explain: string;
	hh_resume_id: string | null;
	extracted_skills: string[];
	total_experience_months: number;
	relevant_experience_months: number;
	job_experiences: ResumeJobExperience[];
	short_description: string;
	company_filter: ResumeCompanyFilter;
	candidate: string;
}

export interface CandidateInterview {
	id: string;
	answers: Record<
		`answer_${number}`,
		{
			text: string;
			file_url: string;
		}
	>;
	answers_rating: {
		[key in `answer_${number}`]?: {
			score: number;
			rationale: string;
			recommendations: string;
		};
	} & {
		general_scoring: string;
		general_recommendations: string;
	};
	average_answers_rating: string;
	verification_code: number;
	code_expires_at: string;
	interview_start: boolean;
	interview_finish: boolean;
	state_answers: null;
	state_questions: number;
	error: boolean;
	is_feedback_sent: boolean;
	general_recommendations: string;
	general_scoring: GeneralScoring;
	interview: string;
	candidate: string;
}

export interface Questions {
	[key: `question_${number}`]: {
		answer: {
			bad: string;
			good: string;
		};
		question: string;
		question_audio_link: string;
	};
}

export interface BehaviorAnalyzeData {
	non_verbal_analysis: {
		mimicry: string;
		other_significant_signals: string;
	};
	communication_skills: {
		persuasiveness: string;
		clarity_structure_logic: string;
		vocabulary_lexicon_relevance: string;
		naturalness_potential_prompts: string;
	};
	psychological_profile: {
		confidence: string;
		thinking_style: string;
		stress_reaction: string;
		conflict_potential: string;
		communication_style: string;
		emotional_stability: string;
		introversion_extroversion: string;
	};
	summary_and_recommendations: {
		recommendation: string;
		next_steps_focus: string[];
		overall_summary_by_key_parameters: string;
	};
}

export interface CandidateEvaluation {
	processed: boolean;
	data: {
		candidate_analysis: BehaviorAnalyzeData;
	};
}

export interface DialogEntry {
	question: string;
	answer: string;
	stage: string;
}

export interface TimestampEntry {
	tag: string;
	elapsed: Float16Array;
}

export interface RealtimeInterview {
	prompt_created: boolean;
	url_realtime: string;
	start: boolean;
	finish: boolean;
	feedback: string | null;
	url_video_candidate: string | null;
	url_video_avatar: string | null;
	url_dialog: string | null;
	started_at: string | null;
	finished_at: string | null;
	json_dialog: DialogEntry[] | null;
	json_scoring_interview: string | null;
	timestamps_realtime_interview: TimestampEntry | null;
}

// Дополнительные типы для удобства
export type AnswerKey = `answer_${number}`;
export type QuestionKey = `question_${number}`;
export type AnswerRating = CandidateInterview['answers_rating'][AnswerKey];
export type QuestionItem = Questions[QuestionKey];
