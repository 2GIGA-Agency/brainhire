import { Candidate } from '@/store/types';

import { ICandidateStatus, ICandidateStatusTitles } from '../types';

// Формирование личной ссылки на интервью
export const commonPersonalLink = (id: string) => {
	const hash = encodeURIComponent(id);
	return `${window.location.protocol}//${window.location.host}/interview/personal/${hash}`;
};

// Данные для статуса кандидата
export const getCandidateStatusData = (candidate: Candidate): ICandidateStatus => {
	let status = {} as ICandidateStatus;

	if (candidate.candidate_interview?.average_answers_rating != null) {
		status = {
			bg: 'rgba(56, 178, 172, 1)',
			title: ICandidateStatusTitles.PROCESS,
		};
	} else if (candidate.status?.startsWith('bot_')) {
		status = {
			bg: 'rgba(94, 92, 226, 1)',
			title: ICandidateStatusTitles.AI_BOT,
		};
	} else if (candidate.status === 'True') {
		status = {
			bg: 'rgba(236, 201, 75, 1)',
			title: ICandidateStatusTitles.INVITE,
		};
	} else if (candidate.status === 'False') {
		status = {
			bg: 'rgba(245, 101, 101, 1)',
			title: ICandidateStatusTitles.REJECT,
		};
	}
	return status;
};

export const truncateText = (text: string, maxLength: number = 20): string => {
	if (!text) return '-';
	if (text.length <= maxLength) return text;
	return `${text.substring(0, maxLength - 3)}...`;
};

// Функция для имени и фамилии (убираем отчество)
export const candidateName = (lastName?: string, firstName?: string, maxLength: number = 25): string => {
	if (!lastName && !firstName) return 'Имя не указано';
	const fullName = `${lastName || ''} ${firstName || ''}`.trim();
	return truncateText(fullName, maxLength);
};
