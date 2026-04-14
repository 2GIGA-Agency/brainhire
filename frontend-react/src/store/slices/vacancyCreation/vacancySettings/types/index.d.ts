// --- Типы для API ---

export interface ApiTemplateItem {
	id: number | null; // null для системных шаблонов
	type: string;
	name: string;
	text: string;
	is_system: boolean;
	updated_at: string | null;
}

export interface ApiTemplateCategory {
	type: TemplateCategoryKey; // Типы API совпадают с типами стейта (greeting, reject и т.д.)
	title: string;
	templates: ApiTemplateItem[];
}

// --- Типы стейта ---

type NullableFile = File | null | string;

export interface VacancySettingsState {
	isLoadingTemplates: boolean;
	presentation: boolean;
	video: NullableFile;
	pdf: NullableFile;
	video_url: string;
	previousPdf: string;
	previousVideo: string;

	feedback: boolean;
	reminder: boolean;
	changePattern: boolean;

	templateLists: Record<TemplateCategoryKey, MessageTemplate[]>;
	selectedTemplateIds: Record<TemplateCategoryKey, string | null>;
}

export type TemplateCategoryKey =
	| 'greeting'
	| 'reject'
	| 'invite'
	| 'outbound'
	| 'feedback'
	| 'reminder'
	| 'reject_duplicate';

export interface MessageTemplate {
	id: string;
	title: string;
	content: string;
	isSystem: boolean;
}

export type NullableTemplate = MessageTemplate | null;
