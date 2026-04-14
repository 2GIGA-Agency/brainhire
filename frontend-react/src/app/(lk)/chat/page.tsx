'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Block } from '@/components/shared/Block';
import { Typo } from '@/components/shared/Typo/Typo';
import { createListCollection } from '@chakra-ui/react';
import clsx from 'clsx';
import { useMediaQuery } from '@/utils/useMediaQuery';

import styles from './style.module.scss';
import { COLORS } from '@/constants/colors';
import { ChatList } from '@/components/sections/lk/chat/ChatList';
import { ChatArea } from '@/components/sections/lk/chat/ChatArea';
import { ChatFilterPanel } from '@/components/sections/lk/chat/ChatFilterPanel';
import { BaseSpinner } from '@/components/shared/BaseSpinner/BaseSpinner';
import { IChatListItem, GetChatsQueryParams, MessageOut, SendMessageRequest } from '@/types/Chat';

import {
	useLazyGetChatsQuery,
	useGetChatQuery,
	useMarkMessagesAsViewedMutation,
	useSendMessageMutation,
	useGetUnreadCountQuery,
	useDeleteMessageMutation,
	useGetVacanciesForChatQuery,
} from '@/store/rtkQuery/api';
import { toggleChatWidgetShow, selectIsChatWidgetShow } from '@/store/slices/appSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';
import {
	defaultChatFilters,
	selectChatFilters,
	selectSelectedTopicId,
	selectSearchQuery,
	setFilters,
	setSelectedTopicId,
	setSearchQuery,
} from '@/store/slices/chatSlice';
import { ChatFilterIcon } from '@/components/sections/lk/chat/ChatFilterIcon';

const PAGE_SIZE = 20;

const resolveErrorMessage = (error: unknown, fallback: string) => {
	const responseData =
		(error as any)?.response?.data ?? (error as any)?.data ?? (error as any)?.error?.data;
	if (typeof responseData === 'string') return responseData;
	if (responseData?.detail && typeof responseData.detail === 'string') return responseData.detail;
	const message = (error as any)?.message ?? (error as any)?.error;
	if (typeof message === 'string') return message;
	return fallback;
};

const buildChatQueryParams = (
	page: number,
	queryValue: string,
	filters: { vacancy: string[]; unread_only: boolean }
): GetChatsQueryParams => {
	const trimmedQuery = queryValue.trim();
	const params: GetChatsQueryParams = {
		page,
		page_size: PAGE_SIZE,
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

const mergeChatItems = (base: IChatListItem[], incoming: IChatListItem[]) => {
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

export default function ChatPage() {
	const [chatsState, setChatsState] = useState<{
		items: IChatListItem[];
		isLoading: boolean;
		loadError: string | null;
		page: number;
		hasMore: boolean;
	}>({ items: [], isLoading: false, loadError: null, page: 1, hasMore: true });

	const [isFilterVisible, setIsFilterVisible] = useState(false);
	const initialLoadRef = useRef(true);

	const dispatch = useAppDispatch();
	const isChatWidgetShow = useAppSelector(selectIsChatWidgetShow);
	const selectedTopicId = useAppSelector(selectSelectedTopicId);
	const appliedFilters = useAppSelector(selectChatFilters);
	const searchQuery = useAppSelector(selectSearchQuery); // Берем searchQuery из store
	const areFiltersActive = JSON.stringify(appliedFilters) !== JSON.stringify(defaultChatFilters);

	const isMobile = useMediaQuery('(max-width: 1024px)');

	const [triggerGetChats] = useLazyGetChatsQuery();
	const { data: vacanciesData, isLoading: isVacanciesLoading } = useGetVacanciesForChatQuery();
	const {
		data: unreadData,
		isLoading: isUnreadCountLoading,
		refetch: refetchUnreadCount,
	} = useGetUnreadCountQuery();
	const {
		data: messagesData,
		error: messagesQueryError,
		isLoading: isMessagesInitialLoading,
		isFetching: isMessagesFetching,
		refetch: refetchMessages,
		isSuccess: isMessagesSuccess,
	} = useGetChatQuery({ topicId: selectedTopicId ?? '' }, { skip: !selectedTopicId });
	const [markMessagesAsViewed] = useMarkMessagesAsViewedMutation();
	const [sendMessageMutation, { isLoading: isSendingMessage, error: sendErrorData }] =
		useSendMessageMutation();
	const [deleteMessage] = useDeleteMessageMutation();

	const vacancyCollection = useMemo(() => {
		const items =
			vacanciesData?.map((v) => ({ label: v.vacancy_name, value: v.vacancy_hh_id })) ?? [];
		return createListCollection({ items });
	}, [vacanciesData]);

	const selectedChat = useMemo(
		() => chatsState.items.find((chat) => chat.topic_id === selectedTopicId) ?? null,
		[chatsState.items, selectedTopicId]
	);
	const messages: MessageOut[] = messagesData ?? [];
	const messagesLoadError = messagesQueryError
		? resolveErrorMessage(messagesQueryError, 'Не удалось загрузить сообщения')
		: null;
	const sendError = sendErrorData
		? resolveErrorMessage(sendErrorData, 'Не удалось отправить сообщение')
		: null;
	const isMessagesLoading = isMessagesInitialLoading || isMessagesFetching;

	const loadChats = useCallback(
		async ({
			page = 1,
			append = false,
			query,
			activeFilters,
		}: {
			page?: number;
			append?: boolean;
			query: string;
			activeFilters: typeof appliedFilters;
		}) => {
			setChatsState((prev) => ({
				...prev,
				isLoading: true,
				loadError: null,
				items: append ? prev.items : [],
			}));
			try {
				const params = buildChatQueryParams(page, query, activeFilters);
				const data = await triggerGetChats(params).unwrap();
				setChatsState((prev) => ({
					...prev,
					items: append ? mergeChatItems(prev.items, data.items) : data.items,
					isLoading: false,
					loadError: null,
					page,
					hasMore: data.items.length === PAGE_SIZE,
				}));
			} catch (error) {
				setChatsState((prev) => ({
					...prev,
					isLoading: false,
					loadError: resolveErrorMessage(error, 'Не удалось загрузить списки чатов'),
					items: [],
				}));
			}
		},
		[triggerGetChats]
	);

	useEffect(() => {
		if (initialLoadRef.current) return;
		loadChats({ query: searchQuery, activeFilters: appliedFilters });
	}, [appliedFilters, searchQuery, loadChats]);

	useEffect(() => {
		loadChats({ query: searchQuery, activeFilters: appliedFilters });
		initialLoadRef.current = false;
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	useEffect(() => {
		if (!selectedChat || !isMessagesSuccess || selectedChat.unread_count <= 0) return;
		const markAndRefetch = async () => {
			try {
				await markMessagesAsViewed({ topicId: selectedChat.topic_id }).unwrap();
				refetchUnreadCount();
			} catch (e) {
				console.error('Failed to mark messages as viewed', e);
			}
		};
		void markAndRefetch();
		setChatsState((prev) => ({
			...prev,
			items: prev.items.map((chat) =>
				chat.topic_id === selectedChat.topic_id ? { ...chat, unread_count: 0 } : chat
			),
		}));
	}, [selectedChat, isMessagesSuccess, markMessagesAsViewed, refetchUnreadCount]);

	if (isChatWidgetShow) {
		dispatch(toggleChatWidgetShow());
	}

	const handleApplyFilters = useCallback(
		(newFilters: typeof appliedFilters) => {
			dispatch(setFilters(newFilters));
			setIsFilterVisible(false);
		},
		[dispatch]
	);

	const handleBack = useCallback(() => {
		dispatch(setSelectedTopicId(''));
	}, [dispatch]);

	const handleToggleFilters = () => setIsFilterVisible((prev) => !prev);
	const handleChatSelect = useCallback(
		(topicId: string) => {
			return dispatch(setSelectedTopicId(topicId));
		},
		[dispatch]
	);

	const handleSearchChange = useCallback(
		(query: string) => {
			dispatch(setSearchQuery(query));
		},
		[dispatch]
	);

	const handleLoadMore = useCallback(() => {
		if (chatsState.isLoading || !chatsState.hasMore) return;
		loadChats({
			page: chatsState.page + 1,
			append: true,
			query: searchQuery,
			activeFilters: appliedFilters,
		});
	}, [chatsState, loadChats, appliedFilters, searchQuery]);

	const handleReloadMessages = useCallback(async () => {
		if (selectedTopicId) await refetchMessages();
	}, [refetchMessages, selectedTopicId]);

	const handleSendMessage = useCallback(
		async (payload: SendMessageRequest) => {
			const trimmedText = payload.text.trim();
			if (!trimmedText) return;
			try {
				const data = await sendMessageMutation({
					topic_id: payload.topic_id,
					text: trimmedText,
				}).unwrap();
				setChatsState((prev) => ({
					...prev,
					items: prev.items.map((chat) =>
						chat.topic_id === payload.topic_id
							? {
									...chat,
									last_message_text: trimmedText,
									last_message_direction: 'employer',
									last_message_status: data.status === 'failed' ? 'failed' : 'sent',
									last_message_created_by: 'brain',
									last_message_at: new Date().toISOString(),
								}
							: chat
					),
				}));
			} catch {
				// Ошибка отобразится через `sendError`
			}
		},
		[sendMessageMutation]
	);

	const handleDeleteMessage = useCallback(
		async (messageId: number) => {
			if (!selectedTopicId || !messages) return;
			const lastMessage = messages[messages.length - 1];
			const needsPreviewUpdate = lastMessage?.id === messageId;
			const newLastMessage = needsPreviewUpdate ? messages[messages.length - 2] : null;
			try {
				await deleteMessage({ messageId, topicId: selectedTopicId }).unwrap();
				if (needsPreviewUpdate) {
					setChatsState((prev) => ({
						...prev,
						items: prev.items.map((chat) => {
							if (chat.topic_id === selectedTopicId) {
								return {
									...chat,
									last_message_at: newLastMessage?.created_at ?? chat.last_message_at,
									last_message_text: newLastMessage?.text ?? 'Нет сообщений',
									last_message_direction: newLastMessage?.direction ?? null,
									last_message_status: newLastMessage?.delivery_status ?? null,
									last_message_created_by: newLastMessage?.created_by ?? null,
								};
							}
							return chat;
						}),
					}));
				}
			} catch (error) {
				console.error('Failed to delete message:', error);
			}
		},
		[deleteMessage, selectedTopicId, messages]
	);

	return (
		<Block mt={0} pb={0} pt={0} paddingDisabled={true}>
			<div
				className={clsx(styles.layout, isMobile && !!selectedTopicId && styles.showContentMobile)}
			>
				<div className={styles.sidebar}>
					{isFilterVisible ? (
						<ChatFilterPanel
							initialFilters={appliedFilters}
							vacancyCollection={vacancyCollection}
							isVacanciesLoading={isVacanciesLoading}
							onApplyFilters={handleApplyFilters}
						/>
					) : (
						<>
							<button
								type="button"
								className={clsx(styles.filterButton, areFiltersActive && styles.isActive)}
								onClick={handleToggleFilters}
								aria-label="Фильтр"
							>
								<ChatFilterIcon />
							</button>
							<ChatList
								chats={chatsState.items}
								isLoading={chatsState.isLoading}
								error={chatsState.loadError}
								onSelect={handleChatSelect}
								selectedTopicId={selectedTopicId}
								onSearchChange={handleSearchChange}
								searchValue={searchQuery} // Передаем searchQuery из store
								onLoadMore={handleLoadMore}
								hasMore={chatsState.hasMore}
								unreadCount={unreadData?.unread_chats ?? 0}
								isUnreadCountLoading={isUnreadCountLoading}
							/>
						</>
					)}
				</div>
				<div className={styles.content}>
					{selectedChat ? (
						<ChatArea
							key={selectedTopicId}
							chat={selectedChat}
							messages={messages}
							isLoading={isMessagesLoading}
							error={messagesLoadError}
							onSendMessage={handleSendMessage}
							isSending={isSendingMessage}
							sendError={sendError}
							onReload={handleReloadMessages}
							vacancyId={selectedChat?.brain_vacancy_active_id || ''}
							onDeleteMessage={handleDeleteMessage}
							isMobile={isMobile}
							withBackButton={isMobile}
							handleBack={handleBack}
						/>
					) : (
						<div className={styles.placeholder}>
							{chatsState.isLoading ? (
								<BaseSpinner />
							) : (
								<>
									<Typo size="18px" weight="medium" color={COLORS.GRAY_800}>
										Начните общение
									</Typo>
									<Typo size="14px" color={COLORS.GRAY_300} mt={2}>
										Выберите чат из списка чтобы начать переписку
									</Typo>
								</>
							)}
						</div>
					)}
				</div>
			</div>
		</Block>
	);
}
