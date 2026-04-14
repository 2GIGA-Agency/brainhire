// hooks/useMessageGrouping.ts
import { useMemo } from 'react';
import { MessageOut } from '@/types/Chat';
import { formatDateLabel } from '../utils';

export interface MessageGroup {
	dateLabel: string;
	timestamp: number;
	items: MessageOut[];
}

export const useMessageGrouping = (messages: MessageOut[]) => {
	return useMemo<MessageGroup[]>(() => {
		if (!messages.length) return [];
		const map = new Map<string, MessageGroup>();
		const result: MessageGroup[] = [];

		for (const message of messages) {
			const dateLabel = formatDateLabel(message.created_at);
			let group = map.get(dateLabel);
			if (!group) {
				group = { dateLabel, timestamp: new Date(message.created_at).getTime(), items: [] };
				map.set(dateLabel, group);
				result.push(group);
			}
			group.items.push(message);
		}

		return result
			.sort((a, b) => a.timestamp - b.timestamp)
			.map((group) => ({
				...group,
				items: [...group.items].sort(
					(a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
				),
			}));
	}, [messages]);
};
