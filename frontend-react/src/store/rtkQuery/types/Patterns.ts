export interface DefaultPatternsResponse {
	default_greeting_message: string;
	default_reject_message: string;
	default_invite_message: string;
	default_outbound_message: string;
	default_feedback_message: string;
	default_reminder_message: string;
}


export type DefaultPatternKey = keyof DefaultPatternsResponse;