export type RejectOption = 'manual' | 'system';

export interface RejectOptionData {
	id: RejectOption;
	title: string;
	description: string[];
	bulletColor?: string;
}
