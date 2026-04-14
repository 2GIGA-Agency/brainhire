export interface CandidateBotContext {
	vacancy_snapshot: {
		vacancy_name?: string;
		bot_mandatory_questions?: string;
		bot_red_flags?: string;
		bot_extra_information?: string;
		[key: string]: unknown;
	};
	resume_text?: string | null;
	limits?: Record<string, unknown>;
}

export interface CandidateBotSession {
	approve: boolean | null;
	score: number | null;
	description: string | null;
}

export interface BotConversationMessage {
	id: string;
	session_id: string;
	direction: 'bot' | 'candidate' | 'recruiter';
	text: string;
	token_usage: number;
	created_at: string;
}

export interface GetChatMessagesParams {
	topic_id: string;
	page?: number;
	page_size?: number;
}

export interface GetChatMessagesResponse {
	items: MessagePort[];
	total: number;
	page: number;
	page_size: number;
	pages: number;
}