import { OutboundSearchResponse } from '@/store/thunks/outboundSearch';
import { ResumeSelectableGroup } from '@/store/types';
import axios, { AxiosError } from 'axios';

export function isStringArray(value: unknown): value is string[] {
	return Array.isArray(value) && value.every((item) => typeof item === 'string');
}

export function isStringTuple(value: unknown): value is [string, string] {
	return (
		Array.isArray(value) &&
		value.length === 2 &&
		typeof value[0] === 'string' &&
		typeof value[1] === 'string'
	);
}

export function isOutboundSearchResponse(obj: any): obj is OutboundSearchResponse {
	return obj && typeof obj.message === 'string' && typeof obj.task_id === 'string';
}

export function isAxiosError<T = any>(value: unknown): value is AxiosError<T> {
	return axios.isAxiosError(value);
}

// Проверка на дефолт ключи при получении списка дефолтных шаблонов сообщений
export function isDefaultPatternKey(key: string): key is keyof DefaultPatterns {
	return (
		key in
		{
			default_greeting_message: true,
			default_reject_message: true,
			default_invite_message: true,
			default_outbound_message: true,
			default_feedback_message: true,
			default_reminder_message: true,
		}
	);
}

// Нужно для проверки в модальном окне просмотра информации о кандидате, т.к. там может прийти либо Record<string, string>, ли объект с selectable_skills
export const hasSelectableSkills = (
	stack: any
): stack is { selectable_skills: ResumeSelectableGroup[] } => {
	return (
		stack &&
		typeof stack === 'object' &&
		'selectable_skills' in stack &&
		Array.isArray(stack.selectable_skills)
	);
};
