import { CandidateAction, TableTab } from '../types';

export const getAvailableActions = (tab: TableTab): CandidateAction[] => {
	switch (tab) {
		case 'all':
			return ['invite', 'reject', 'delete'];
		case 'scoring':
		case 'invitation': // Неполное интервью (предполагаю, что это crash)
		case 'crash': // Неполное интервью (предполагаю, что это outbound)
			return ['reject', 'delete'];
		case 'reject': // Отказ
			return ['invite', 'delete'];
		case 'awaiting':
		default:
			return []; // Действия недоступны
	}
};
