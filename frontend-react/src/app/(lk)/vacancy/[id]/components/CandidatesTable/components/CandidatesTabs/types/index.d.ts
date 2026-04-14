export type TableTab =
	| 'all'
	| 'awaiting'
	| 'reject'
	| 'invitation'
	| 'ai_bot'
	| 'scoring'
	| 'crash'
	| 'outbound'
	| 'incoming';

export type CandidateAction = 'none' | 'reject' | 'invite' | 'delete';
export type CandidateStatuses = Exclude<CandidateAction, "none" | "delete"> | "handReject" | "handInvite"

export type CandidateActionWithoutNone = Exclude<CandidateAction, 'none'>;

export type CandidateActionsLabels = Record<
	CandidateActionWithoutNone,
	{
		title: string;
		subtitle?: string;
		warning?: string;
		buttonText: string;
		afterActionModalTitle: string;
		afterActionText: string;
	}
>;
