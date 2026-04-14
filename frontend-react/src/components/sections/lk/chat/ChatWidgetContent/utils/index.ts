import { GetChatsQueryParams, IChatListItem } from "@/types/Chat";

// --- Вспомогательные функции ---
export const resolveErrorMessage = (error: unknown, fallback: string) => {
	const responseData =
		(error as any)?.response?.data ?? (error as any)?.data ?? (error as any)?.error?.data;
	if (typeof responseData === 'string') return responseData;
	if (responseData?.detail && typeof responseData.detail === 'string') return responseData.detail;
	const message = (error as any)?.message ?? (error as any)?.error;
	if (typeof message === 'string') return message;
	return fallback;
};

export const buildChatQueryParams = (
	page: number,
	queryValue: string,
  page_size: number,
	filters: { vacancy: string[]; unread_only: boolean }
): GetChatsQueryParams => {
	const trimmedQuery = queryValue.trim();
	const params: GetChatsQueryParams = {
		page,
		page_size,
		vacancy: filters.vacancy,
	};
	if (trimmedQuery) {
		params.query = trimmedQuery;
	}
	if (filters.unread_only) {
		params.unread_only = true;
	}
	if (params.vacancy?.length === 0) {
		delete params.vacancy;
	}
	return params;
};

export const mergeChatItems = (base: IChatListItem[], incoming: IChatListItem[]) => {
	const result = [...base];
	const indexMap = new Map(base.map((item, index) => [item.topic_id, index]));
	incoming.forEach((item) => {
		const existingIndex = indexMap.get(item.topic_id);
		if (existingIndex !== undefined) {
			result[existingIndex] = item;
		} else {
			indexMap.set(item.topic_id, result.length);
			result.push(item);
		}
	});
	return result;
};
