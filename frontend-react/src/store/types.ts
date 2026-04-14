// ———————— Resume ————————
export interface ResumeSelectableGroupSkill {
	check: boolean;
	description: string;
}

export interface ResumeSelectableGroup {
	check: boolean;
	min_count: number;
	[key: string]: ResumeSelectableGroupSkill | boolean | number;
}

export interface ResumeStackItem {
	check: boolean;
	description: string;
}
export type ResumeStack = Record<string, ResumeStackItem> | ResumeSelectableGroupSkill[];

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
	metrics: ResumeMetrics;
}

export interface ResumeMetrics {
	score: number | null;
	experience: number | null;
	skills: number | null;
	stability: number | null;
	gaps: number | null;
}


export interface CandidateInterviewChat {
	approve: boolean;
	description: string;
	score: number | null;
}

export enum InterviewSteps {
	START,
	REQUIREMENTS,
	CHECK_INTERNET_CONNECTION,
	CHECK_VIDEO,
	CHECK_MICROPHONE,
	PRE_TEST,
	TESTING,
	AFTER_TEST,
	PRE_INTERVIEW,
	VIDEO_INTERVIEW,
	SCORING,
	END_OF_INTERVIEW,
}

// ———————— Candidate Interview Meta ————————
export interface CandidateInterviewMeta {
	average_answers_rating: number | null;
	code_expires_at: string;
}

export interface TestingAnswer {
	id: number;
	text: string;
	is_correct: boolean;
}

export interface TestingQuestion {
	id: number;
	text: string;
	order: number;
	answers: TestingAnswer[];
}

export interface CandidateAnswer {
	id: number;
	attempt: number;
	question: number;
	selected_answer: number;
	question_text: string;
	selected_answer_text: string;
	is_correct: boolean;
}

export interface TestAttemptResponse {
	id: number;
	candidate: string;
	test: number;
	started_at: string;
	finished_at: string;
	score: number;
	candidate_answers: CandidateAnswer[];
}

export interface TestingByVacancyResponse {
	id: number;
	title: string;
	description: string;
	vacancy: string;
	vacancy_name: string;
	questions: TestingQuestion[];
}

export interface CreateTestAttemptPayload {
	candidate: string;
	test: number;
}

export interface CreateTestAttemptResponse {
	// TODO: посмотреть ответ
}

export interface SendTestQuestionAnswerArgs {
	question: number;
	selected_answer: number;
	last?: boolean;
}

export interface SendTestQuestionAnswerPayload {
	candidate: string; // candidate_id
	question: number; // question_id
	selected_answer: number; // selected_answer_id
}

export interface SendTestQuestionAnswerResponse {
	// TODO: посмотреть ответ
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

// ———————— Candidate ————————
export interface Candidate {
	id: string;
	first_name: string;
	last_name: string;
	middle_name: string | null;
	email: string;
	phone: string;
	area: string;
	status: string;
	source: string;
	create_date: string;
	resume: Resume;
	candidate_interview: CandidateInterview;
	chat_interview?: CandidateInterviewChat | null;
	chat: CandidateChatInfo | null;
}

export interface CandidateChatInfo {
	topic_id: string;
}

// ———————— InterviewQuestion ————————
export interface VideoInterviewQuestion {
	question: string;
	question_audio_link: string;
	answer: {
		bad: string;
		good: string;
	};
}

// ———————— ActiveInterview ————————
export interface ActiveInterview {
	id: string;
	min_score: number;
	time_per_answer: number;
	level_candidate: string;
	what_checking: string;
	save_audio: boolean;
	save_video: boolean;
	questions: Record<string, VideoInterviewQuestion>;
	root_id: string;
	version: number;
	is_active: boolean;
	vacancy: string;
}

// ———————— CandidateInterview ————————
export interface CandidateVideoInterview {
	id: string;
	answers: {
		[key: string]: CandidateVideoInterviewAnswer;
	};
	answers_rating: {
		[key: string]: CandidateVideoInterviewAnswerRating;
	};
	average_answers_rating: string;
	verification_code: number;
	code_expires_at: string;
	interview_start: boolean;
	interview_finish: boolean;
	state_answers: number;
	state_questions: number;
	error: boolean;
	is_feedback_sent: boolean;
	interview: string;
	candidate: string;
}

export interface CandidateVideoInterviewAnswers {
	[key: string]: CandidateVideoInterviewAnswer;
}

export interface CandidateVideoInterviewAnswer {
	text: string;
	file_url: string;
}

export interface CandidateVideoInterviewAnswerRating {
	score: number;
	rationale: string;
	recommendations: string;
}

// {
//     "id": "b7470fdb-27d2-45da-9321-be04af8dbd4c",
//     "answers": {
//         "answer_1": {
//             "text": "Опыт крутой, опыт басов, 7 лет опыта подбора, я подхожу охуенно.",
//             "file_url": "https://storage.yandexcloud.net/brain-batch-bucket/test/video/b7470fdb-27d2-45da-9321-be04af8dbd4c/answer_1.mp4?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=YCAJEUPKKnsFLumivejkiFWLz%2F20250510%2Fstorage%2Fs3%2Faws4_request&X-Amz-Date=20250510T155946Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=6d7c46d2e70efc22554dc8fb925e65d61d5c9019820283565a2d988bd6dcbbdb"
//         }
//     },
//     "answers_rating": {},
//     "average_answers_rating": null,
//     "verification_code": 2877,
//     "code_expires_at": "2025-05-10T19:09:44.657884+03:00",
//     "interview_start": true,
//     "interview_finish": false,
//     "state_answers": null,
//     "state_questions": 2,
//     "error": false,
//     "is_feedback_sent": false,
//     "general_recommendations": "",
//     "general_scoring": "",
//     "interview": "db12f1cc-af6b-4aed-adb0-95757c587823",
//     "candidate": "b52e5fe9-68ae-419e-909f-d3a529b823f1"
// }

// ———————— VacancyWithInterview ————————
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

export interface VacancyWithInterview {
	id: string;
	vacancy_name: string;
	type_employment: string;
	work_schedule: string;
	work_format: string;
	payment_per_month_range: [number, number];
	required_work_experience: string;
	description_responsibilities: string;
	description_requirements: string;
	description_conditions: string;
	skills: string[];
	selectable_skills?: SelectableSkillsGroupApi[];
	company_filter?: CompanyFilterApi;
	professional_roles: Array<{
		id: string;
		text: string;
		accept_incomplete_resumes: boolean;
	}>;
	areas: Array<{
		id: string;
		url: string;
		text: string;
	}>;
	user_full_name: string;
	active_interview: ActiveInterview;
	root_id: string;
	version: number;
	is_active: boolean;
	create_date: string;
	vacancy_hh_id: string;
	company: string;
	user: number;
	number_days: number;
	number_candidates: number;
	number_best_candidates: number;
	video_url: null | string;
	video?: string;
	pdf?: string;
}

export interface Vacancy {
	id: string;
	vacancy_name: string;
}

// ———————— Company ————————
export interface Company {
	id: string;
	company_name: string;
	company_description: string;
	inn: number;
	size: number | null;
	hrs_coutn: number | null;
	vacancies_in_month: number | null;
	active_vacancies: Vacancy[];
}

// ———————— Полный ответ API ————————
export interface PersonalInterviewResponse {
	candidate: Candidate;
	vacancy_with_interview: VacancyWithInterview;
	company: Company;
}

export interface SendCodePayload {
	first_name: string;
	last_name: string;
	email: string;
	vacancy_with_interview: VacancyWithInterview;
}

export interface SendCodeResponse {
	candidate_interview_id: string;
}

export interface BulkResponse {
	duplicates_email: string[];
	duplicates_file_name: string[];
	resumes_without_email: string[];
	task_ids: string[];
}

export interface ProfessionalRole {
	id: string;
	text: string;
	accept_incomplete_resumes: boolean;
}

export interface Area {
	id: string;
	text: string;
	url: string;
}

export interface VacancyResponse {
	// Обязательные поля из исходного варианта
	id: string;
	vacancy_name: string;
	type_employment: string;
	work_schedule: string;
	work_format: string;
	payment_per_month_range: string[];
	required_work_experience: string;
	description_responsibilities: string;
	description_requirements: string;
	description_conditions: string;
	level_candidate: string;
	skills: string[];
	selectable_skills?: SelectableSkillsGroupApi[];
	company_filter?: CompanyFilterApi;
	professional_roles: ProfessionalRole[];
	areas: Area[];

	send_feedback: boolean;
	templates_texts_change: boolean;
	send_reminds: boolean;

	video_url: string | null;
	user_full_name: string;
	company: Company;
	root_id: string;
	number_days: number;
	number_candidates: number;
	number_best_candidates: number;

	// templates
	greeting_text: string;
	reject_text: string;
	invite_text: string;
	outbound_invite_text: string;
	feedback_text: string;
	reminder_text: string;
	reject_duplicate_text: string;
	// templates ids
	invite_template: null | number;
	reject_template: null | number;
	outbound_invite_template: null | number;
	greeting_template: null | number;
	feedback_template: null | number;
	reminder_template: null | number;
	reject_duplicate_template: null | number;
	ai_bot_settings_id?: number | null;
	hr_bot_active: boolean;
	hr_bot_enable_ai_questions?: boolean;
	hr_bot_mandatory_questions?: string | null;
	hr_bot_red_flags?: string | null;
	hr_bot_extra_information?: string | null;
	hr_bot_candidate_message?: string | null;
	hr_bot_questions?: Array<{
		text?: string;
		question_type?: string;
		evaluation_strategy?: string;
	}>;

	// Опциональные поля из вашего кода (которые проверяются через if)
	pdf?: string;
	video?: string;
	version?: string;

	active_interview_id?: string;
}

// {
//   "candidate": {
//       "id": "a35152f8-dab9-4635-9d8e-b7e31cc81eb4",
//       "first_name": "Никита",
//       "last_name": "Муратов",
//       "middle_name": null,
//       "email": "muratov.nikita1993@gmail.com",
//       "phone": "+7 (999) 810-35-83",
//       "area": "Ярославль",
//       "status": "True",
//       "source": "hh.ru отклик",
//       "create_date": "2025-01-30T13:29:41+03:00",
//       "resume": {
//           "id": 103,
//           "pdf_link_s3": "production/hh_resumes/a35152f8-dab9-4635-9d8e-b7e31cc81eb4/Никита_Муратов.pdf",
//           "work_experience": true,
//           "stack": {
//               "CSS": {
//                   "check": true,
//                   "description": "Упоминается в навыках."
//               },
//               "HTML": {
//                   "check": true,
//                   "description": "Упоминается в навыках."
//               },
//               "React": {
//                   "check": true,
//                   "description": "Упоминается в опыте работы и навыках."
//               },
//               "Redux": {
//                   "check": true,
//                   "description": "Упоминается в навыках."
//               },
//               "JavaScript": {
//                   "check": true,
//                   "description": "Упоминается в опыте работы и навыках."
//               },
//               "TypeScript": {
//                   "check": true,
//                   "description": "Упоминается в навыках."
//               }
//           },
//           "summary_output": true,
//           "explain": "Кандидат имеет более 2 лет опыта работы, что соответствует требованию. Все необходимые технологии (React, JavaScript, HTML, CSS, Redux, TypeScript) присутствуют в его навыках и опыте работы.",
//           "candidate": "a35152f8-dab9-4635-9d8e-b7e31cc81eb4"
//       },
//       "candidate_interview": {
//           "average_answers_rating": "3.62",
//           "code_expires_at": "2025-01-30T18:23:48.381929+03:00"
//       }
//   },
//   "vacancy_with_interview": {
//       "id": "3318a98c-e668-4361-80b1-b1e55be0e7db",
//       "vacancy_name": "Frontend React Developer (Middle+)",
//       "type_employment": "project",
//       "work_schedule": "5/2",
//       "work_format": "Гибрид",
//       "payment_per_month_range": [
//           0,
//           100000
//       ],
//       "required_work_experience": "between1And3",
//       "description_responsibilities": "1. Разработка и поддержка веб-приложений на базе React.<br>   - Создание новых компонентов и функционала.<br>   - Оптимизация существующего кода для повышения производительности.<br><br>2. Взаимодействие с командой дизайнеров и бэкенд-разработчиков.<br>   - Участие в обсуждении и планировании новых фич.<br>   - Интеграция с API и другими внешними сервисами.<br><br>3. Участие в код-ревью и улучшении процессов разработки.<br>   - Проведение ревью кода коллег.<br>   - Внедрение лучших практик и стандартов кодирования.<br><br>4. Обеспечение кроссбраузерной совместимости и адаптивности интерфейсов.<br>   - Тестирование и исправление ошибок в различных браузерах и устройствах.",
//       "description_requirements": "1. Образование и опыт<br>   - Высшее техническое образование (желательно в области IT).<br>   - Опыт работы с React и Vue.<br><br>2. Знания и навыки<br>   - Глубокое понимание JavaScript, TypeScript, HTML, CSS.<br>   - Опыт работы с Redux или другими state management библиотеками.<br>   - Знание Figma будет преимуществом.<br>   - Опыт работы с системами контроля версий (Git).<br><br>3. Личные качества<br>   - Умение работать в команде и самостоятельно.<br>   - Внимательность к деталям и стремление к качеству.<br>   - Готовность к обучению и освоению новых технологий.",
//       "description_conditions": "1. Конкурентоспособная заработная плата в зависимости от опыта и навыков.<br>2. Удалённая работа и гибкий график.<br>3. Профессиональный рост и участие в разработке инновационных продуктов на стыке передовых технологий.<br>4. При успешном выполнении задач проекта возможно оформление в штат.",
//       "skills": [
//           "React",
//           "JavaScript",
//           "HTML",
//           "CSS",
//           "Redux",
//           "TypeScript"
//       ],
//       "professional_roles": [
//           {
//               "id": "96",
//               "text": "Программист, разработчик",
//               "accept_incomplete_resumes": false
//           }
//       ],
//       "areas": [
//           {
//               "id": "1",
//               "url": "https://api.hh.ru/areas/1",
//               "text": "Москва"
//           }
//       ],
//       "user_full_name": "Борис Горштейн",
//       "active_interview": {
//           "id": "83ab3807-4241-4384-a6c9-fa3173841828",
//           "min_score": 5,
//           "time_per_answer": 2.5,
//           "level_candidate": "Middle",
//           "what_checking": "mostly-hard-skills",
//           "save_audio": false,
//           "save_video": false,
//           "questions": {
//               "question_1": {
//                   "answer": {
//                       "bad": "",
//                       "good": ""
//                   },
//                   "question": "Расскажите, как вы оптимизируете производительность крупного React-приложения (например, за счёт использования мемоизации компонентов, использования React Profiler и оптимизации рендеринга), и как определяете, какие участки кода требуют наибольшего внимания?",
//                   "question_audio_link": "https://storage.yandexcloud.net/brain-batch-bucket/production/questions_audio/83ab3807-4241-4384-a6c9-fa3173841828/question_1.mp3?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=YCAJEUPKKnsFLumivejkiFWLz%2F20250425%2Fstorage%2Fs3%2Faws4_request&X-Amz-Date=20250425T062630Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=10c8f4f6672af672f5f94b248571c39fef0638775ad543118b60d020c188a91f"
//               },
//               "question_2": {
//                   "answer": {
//                       "bad": "",
//                       "good": ""
//                   },
//                   "question": "Объясните механику работы Event Loop в JavaScript, включая очередь микрозадач и макрозадач. Как вы учитываете это поведение при написании асинхронного кода и оптимизации приложения?",
//                   "question_audio_link": "https://storage.yandexcloud.net/brain-batch-bucket/production/questions_audio/83ab3807-4241-4384-a6c9-fa3173841828/question_2.mp3?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=YCAJEUPKKnsFLumivejkiFWLz%2F20250425%2Fstorage%2Fs3%2Faws4_request&X-Amz-Date=20250425T062630Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=957e39bc59c63a78653fe4681299817e2c3c9455bd30415e148b33c28fb98cc6"
//               },
//               "question_3": {
//                   "answer": {
//                       "bad": "",
//                       "good": ""
//                   },
//                   "question": "Какие подходы вы используете для обеспечения семантической и доступной (accessible) вёрстки в сложных интерфейсах? Приведите примеры тегов и атрибутов, которые помогают улучшить SEO и UX.",
//                   "question_audio_link": "https://storage.yandexcloud.net/brain-batch-bucket/production/questions_audio/83ab3807-4241-4384-a6c9-fa3173841828/question_3.mp3?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=YCAJEUPKKnsFLumivejkiFWLz%2F20250425%2Fstorage%2Fs3%2Faws4_request&X-Amz-Date=20250425T062630Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=5f901ac86887afde6dc2049bae15156be2aa5a57f5576de475198a9510b7d122"
//               },
//               "question_4": {
//                   "answer": {
//                       "bad": "",
//                       "good": ""
//                   },
//                   "question": "Как вы структурируете свой код, чтобы он был легко масштабируемым и поддерживаемым при работе со сложными стилями (например, методологии BEM, OOCSS, SMACSS)? И какие возможности препроцессоров Sass или LESS считаете наиболее важными в реальных проектах?",
//                   "question_audio_link": "https://storage.yandexcloud.net/brain-batch-bucket/production/questions_audio/83ab3807-4241-4384-a6c9-fa3173841828/question_4.mp3?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=YCAJEUPKKnsFLumivejkiFWLz%2F20250425%2Fstorage%2Fs3%2Faws4_request&X-Amz-Date=20250425T062630Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=e00d18832d580f808b1aa37c8a92a42ab022edd77328e4b3ccda354517beb817"
//               },
//               "question_5": {
//                   "answer": {
//                       "bad": "",
//                       "good": ""
//                   },
//                   "question": "Опишите основные архитектурные решения, позволяющие сохранять удобочитаемость кода и высокую производительность при работе с множеством редьюсеров и экшенов. Как вы используете Redux Middleware (Redux Thunk, Saga и т.д.) для управления сложными асинхронными процессами?",
//                   "question_audio_link": "https://storage.yandexcloud.net/brain-batch-bucket/production/questions_audio/83ab3807-4241-4384-a6c9-fa3173841828/question_5.mp3?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=YCAJEUPKKnsFLumivejkiFWLz%2F20250425%2Fstorage%2Fs3%2Faws4_request&X-Amz-Date=20250425T062630Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=d3a2cce4bc29e8e6244ece4ae5743bb6247e957071dc72687651bcdeb920d736"
//               },
//               "question_6": {
//                   "answer": {
//                       "bad": "",
//                       "good": ""
//                   },
//                   "question": "Расскажите о вашем опыте управления релизами и сложными ветвлениями (branching). В каких случаях и как вы применяете git rebase, git cherry-pick и git merge, чтобы минимизировать конфликты и сохранять историю коммитов удобочитаемой?",
//                   "question_audio_link": "https://storage.yandexcloud.net/brain-batch-bucket/production/questions_audio/83ab3807-4241-4384-a6c9-fa3173841828/question_6.mp3?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=YCAJEUPKKnsFLumivejkiFWLz%2F20250425%2Fstorage%2Fs3%2Faws4_request&X-Amz-Date=20250425T062630Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=8044b08bc296266ee07cfb5c16cf052277842d36833808054b082f5119341a0e"
//               },
//               "question_7": {
//                   "answer": {
//                       "bad": "",
//                       "good": ""
//                   },
//                   "question": "Опишите, как вы используете продвинутые возможности TypeScript (Generics, Union и Intersection Types, Utility Types, Conditional Types) в больших проектах. Каким образом типизация помогает предотвратить ошибки на ранних этапах разработки?",
//                   "question_audio_link": "https://storage.yandexcloud.net/brain-batch-bucket/production/questions_audio/83ab3807-4241-4384-a6c9-fa3173841828/question_7.mp3?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=YCAJEUPKKnsFLumivejkiFWLz%2F20250425%2Fstorage%2Fs3%2Faws4_request&X-Amz-Date=20250425T062630Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=ca86bfbe94c1790bd236adce8d52483fc988040fb514f23a2b6ae797866c34e8"
//               },
//               "question_8": {
//                   "answer": {
//                       "bad": "",
//                       "good": ""
//                   },
//                   "question": "Объясните, как вы типизируете контейнеры и презентационные компоненты, а также колбэки в props. Какие типы/утилиты вы используете для описания сложных структур (например, связанных с Redux store)?",
//                   "question_audio_link": "https://storage.yandexcloud.net/brain-batch-bucket/production/questions_audio/83ab3807-4241-4384-a6c9-fa3173841828/question_8.mp3?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=YCAJEUPKKnsFLumivejkiFWLz%2F20250425%2Fstorage%2Fs3%2Faws4_request&X-Amz-Date=20250425T062630Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=f256488253bd40db803395c4c4f7fb3ef1091470e9d6df9289cb899d1e5f2650"
//               },
//               "question_9": {
//                   "answer": {
//                       "bad": "",
//                       "good": ""
//                   },
//                   "question": "Поделитесь вашим опытом построения и поддержки крупного SPA на React: как вы разделяете код (code splitting) и организуете динамическую подгрузку модулей, чтобы ускорить загрузку страницы и упростить поддержку приложения?",
//                   "question_audio_link": "https://storage.yandexcloud.net/brain-batch-bucket/production/questions_audio/83ab3807-4241-4384-a6c9-fa3173841828/question_9.mp3?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=YCAJEUPKKnsFLumivejkiFWLz%2F20250425%2Fstorage%2Fs3%2Faws4_request&X-Amz-Date=20250425T062631Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=33293ec6ecb2418c9f84ff36783711171ffe09121c1532c7bbe54998dc98a03d"
//               },
//               "question_10": {
//                   "answer": {
//                       "bad": "",
//                       "good": ""
//                   },
//                   "question": "Расскажите, как вы внедряли в своих проектах серверную отрисовку приложений и как оцениваете её влияние на SEO, скорость загрузки, а также на сложность разработки и поддержки.",
//                   "question_audio_link": "https://storage.yandexcloud.net/brain-batch-bucket/production/questions_audio/83ab3807-4241-4384-a6c9-fa3173841828/question_10.mp3?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=YCAJEUPKKnsFLumivejkiFWLz%2F20250425%2Fstorage%2Fs3%2Faws4_request&X-Amz-Date=20250425T062631Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=74ecafdf77dbf13f50947c8321f0f7a6ac3126d761501ae321139a598817224b"
//               },
//               "question_11": {
//                   "answer": {
//                       "bad": "",
//                       "good": ""
//                   },
//                   "question": "Как вы подходите к тестированию сложных интерфейсов и взаимодействий, чтобы покрыть не только функциональные, но и регрессивные сценарии без существенного увеличения времени сборки и деплоя?",
//                   "question_audio_link": "https://storage.yandexcloud.net/brain-batch-bucket/production/questions_audio/83ab3807-4241-4384-a6c9-fa3173841828/question_11.mp3?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=YCAJEUPKKnsFLumivejkiFWLz%2F20250425%2Fstorage%2Fs3%2Faws4_request&X-Amz-Date=20250425T062631Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=6b291911e707fd647121468ee2341a1ae10318580771c692725fb9503b5f15bd"
//               },
//               "question_12": {
//                   "answer": {
//                       "bad": "",
//                       "good": ""
//                   },
//                   "question": "Объясните ваш подход к выявлению, логированию и обработке критических ошибок в продакшене, особенно когда есть риск нарушить работу ключевых пользовательских сценариев.",
//                   "question_audio_link": "https://storage.yandexcloud.net/brain-batch-bucket/production/questions_audio/83ab3807-4241-4384-a6c9-fa3173841828/question_12.mp3?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=YCAJEUPKKnsFLumivejkiFWLz%2F20250425%2Fstorage%2Fs3%2Faws4_request&X-Amz-Date=20250425T062631Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=cef4de06fff556bb4ac5668114e588bfd32b1198fe23cf2e0bac22351b5f9216"
//               },
//               "question_13": {
//                   "answer": {
//                       "bad": "",
//                       "good": ""
//                   },
//                   "question": " Расскажите о вашем методе декомпозиции интерфейса на компоненты в масштабных проектах: как вы управляете повторно используемыми частями, поддерживаете высокую читаемость кода и упрощаете рефакторинг?",
//                   "question_audio_link": "https://storage.yandexcloud.net/brain-batch-bucket/production/questions_audio/83ab3807-4241-4384-a6c9-fa3173841828/question_13.mp3?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=YCAJEUPKKnsFLumivejkiFWLz%2F20250425%2Fstorage%2Fs3%2Faws4_request&X-Amz-Date=20250425T062631Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=06a666410f2c670bbfeadb8521d2ca3dbf502840c606680716545aa19b2ff2f6"
//               }
//           },
//           "root_id": "952e9be9-4365-4ff4-9464-5df43fd84c20",
//           "version": 4,
//           "is_active": true,
//           "vacancy": "3318a98c-e668-4361-80b1-b1e55be0e7db"
//       },
//       "root_id": "4a987830-3b16-4950-b213-13a99cb5726f",
//       "version": 4,
//       "is_active": true,
//       "create_date": "2025-01-29T18:38:28.315458+03:00",
//       "vacancy_hh_id": "116547898",
//       "company": "d2e7a354-a2cf-410c-97c4-0e477c5b70ff",
//       "user": 1,
//       "number_days": 85,
//       "number_candidates": 2921,
//       "number_best_candidates": 20
//   },
//   "company": {
//       "id": "d2e7a354-a2cf-410c-97c4-0e477c5b70ff",
//       "company_name": "ООО \"НДК\"",
//       "company_description": "Компания Neural Development Kit — это передовой разработчик в сфере искусственного интеллекта и нейросетей, стремящийся к инновациям и созданию технологий будущего уже сегодня.\n\nМы специализируемся на разработке высокотехнологичных продуктов, которые способны преобразить различные отрасли, будь то медицина, финансы, промышленность или образование. Используя последние достижения в области машинного обучения и глубоких нейронных сетей, Neural Development Kit предлагает клиентам интеллектуальные системы, способные решать самые сложные задачи, автоматизировать процессы и выводить бизнес на новый уровень эффективности. \n\nНаша команда состоит из лучших специалистов в области ИИ, чья экспертиза позволяет нам реализовывать проекты любой сложности. Мы гордимся своей способностью не только разрабатывать передовые решения, но и внедрять их с учетом специфики бизнеса каждого клиента. Постоянное стремление к совершенству и инновациям делает Neural Development Kit лидером на рынке интеллектуальных технологий.",
//       "inn": 5009132924
//   }
// }
