// GET /api/chat-hh/chats
export interface GetChatsQueryParams {
	page?: number;
	page_size?: number;
	unread_only?: boolean;
	vacancy?: string[];
	query?: string;
}

export interface IChatListItem {
	topic_id: string;
	tenant: string;
	resume_id: string | null;
	vacancy_hh_id: string;
	brain_vacancy_active_id: string | null;
	last_message_at: string;
	last_sync_at: string | null;
	status: string;
	candidate_id: string | null;
	first_name: string | null;
	last_name: string | null;
	unread_count: number;
	last_message_text: string | null;
	last_message_direction: 'applicant' | 'employer' | null;
	last_message_status: 'pending' | 'sent' | 'failed' | null;
	last_message_created_by: 'hh' | 'brain' | null;
}

export interface GetChatsResponse {
	items: IChatListItem[];
}

// GET /api/chat-hh/chats/{topic_id}
export interface MessageOut {
	id: number;
	topic_id: string;
	tenant: string;
	hh_message_id: string;
	created_at: string;
	direction: 'applicant' | 'employer';
	text: string | null;
	attachments_json: object | null;
	brain_read: boolean;
	brain_read_at: string | null;
	delivery_status: 'pending' | 'sent' | 'failed';
	delivery_error: string | null;
	created_by: 'hh' | 'brain';
	can_delete: boolean;
}

export type GetChatResponse = MessageOut[];

// GET /api/chat-hh/chats/unread_count
export interface GetUnreadCountQueryParams {
	direction?: 'applicant' | 'employer' | 'any';
}

export interface GetUnreadCountResponse {
	tenant: string;
	unread_chats: number;
}

// PUT /api/chat-hh/chats/{topic_id}/messages/viewed
export interface MarkMessagesAsViewedResponse {
	updated: number;
}

// GET /api/chat-hh/messages
export interface GetMessagesQueryParams {
	topic_id: string;
	page?: number;
	page_size?: number;
}

export interface GetMessagesResponse {
	items: MessageOut[];
}

// POST /api/chat-hh/messages/send
export interface SendMessageRequest {
	topic_id: string;
	text: string;
}

export interface SendMessageResponse {
	status: 'queued' | 'failed' | 'sent';
	outbox_id: number;
	idempotency_key: string;
	message_id?: number;
}

// GET /api/chat-hh/messages/status
export interface GetMessageStatusQueryParams {
	idempotency_key: string;
}

export interface GetMessageStatusResponse {
	status: 'pending' | 'sent' | 'failed';
	last_error: string | null;
	http_code: number | null;
	hh_error_code: string | null;
	attempts: number;
	next_attempt_at: string | null;
	message: MessageOut | null;
}

// POST /api/chat-hh/messages/requeue
export interface RequeueMessageRequest {
	message_id?: number;
	idempotency_key?: string;
}

export interface RequeueMessageResponse {
	status: 'queued';
	outbox_id: number;
	idempotency_key: string;
	message_id: number;
}

// DELETE /api/chat-hh/messages/{id}
export interface DeleteMessageResponse {
	deleted: boolean;
}

// Error responses
export interface ErrorResponse {
	detail: string;
}

// /api/chat-hh/vacancies/
export interface Vacancy {
	vacancy_name: string;
	vacancy_hh_id: string;
}
export type GetVacanciesResponse = Vacancy[];
