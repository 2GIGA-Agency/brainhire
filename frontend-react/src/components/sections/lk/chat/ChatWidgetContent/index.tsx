'use client';

import { useCallback, useEffect, useMemo, useRef, useState, memo } from 'react';
import { Box, Flex, createListCollection } from '@chakra-ui/react';
import { BsBoxArrowInLeft, BsBoxArrowInRight, BsArrowLeft } from 'react-icons/bs';
import { IoResizeOutline } from 'react-icons/io5';
import { HiOutlineX } from 'react-icons/hi';
import Link from 'next/link';
import clsx from 'clsx';

import {
	useLazyGetChatsQuery,
	useGetChatQuery,
	useMarkMessagesAsViewedMutation,
	useSendMessageMutation,
	useGetUnreadCountQuery,
	useDeleteMessageMutation,
	useGetVacanciesForChatQuery,
} from '@/store/rtkQuery/api';
import { IChatListItem, MessageOut, SendMessageRequest } from '@/types/Chat';

import { COLORS } from '@/constants/colors';
import { Typo } from '@/components/shared/Typo/Typo';
import { BaseSpinner } from '@/components/shared/BaseSpinner/BaseSpinner';
import { ChatList } from '../ChatList';
import { ChatArea } from '../ChatArea';
import { ChatFilterPanel } from '../ChatFilterPanel';
import styles from '../ChatWidget/ChatWidget.style.module.scss';
import {
	defaultChatFilters,
	selectChatFilters,
	setFilters,
	selectSearchQuery,
	setSearchQuery,
} from '@/store/slices/chatSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { ChatFilterIcon } from '../ChatFilterIcon';
import { buildChatQueryParams, mergeChatItems, resolveErrorMessage } from './utils';
import { PAGE_SIZE } from './const';

// --- Интерфейс пропсов ---
interface ChatWidgetContentProps {
	isMobileView: boolean;
	selectedTopicId: string | null;
	onSelectChat: (topicId: string) => void;
	onBack: () => void;
	onClose: () => void;
	onHeaderMouseDown: (e: React.MouseEvent<HTMLElement>) => void;
	isExpanded: boolean;
	onToggleChatArea: () => void;
}

export const ChatWidgetContent = memo(function ChatWidgetContent({
	isMobileView,
	selectedTopicId,
	onSelectChat,
	onBack,
	onClose,
	onHeaderMouseDown,
	isExpanded,
	onToggleChatArea,
}: ChatWidgetContentProps) {
	const dispatch = useAppDispatch();

	// Берем searchQuery из Redux store через селектор
	const searchQuery = useAppSelector(selectSearchQuery);
	const appliedFilters = useAppSelector(selectChatFilters);

	const [chatsState, setChatsState] = useState<{
		items: IChatListItem[];
		isLoading: boolean;
		loadError: string | null;
		page: number;
		hasMore: boolean;
	}>({ items: [], isLoading: false, loadError: null, page: 1, hasMore: true });

	const chatsStateRef = useRef(chatsState);
	const searchQueryRef = useRef(searchQuery);

	useEffect(() => {
		chatsStateRef.current = chatsState;
	}, [chatsState]);

	useEffect(() => {
		searchQueryRef.current = searchQuery;
	}, [searchQuery]);

	const areFiltersActive = JSON.stringify(appliedFilters) !== JSON.stringify(defaultChatFilters);
	const [isFilterVisible, setIsFilterVisible] = useState(false);
	const initialLoadRef = useRef(true);

	// RTK Query Hooks
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

	// Производные состояния
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

	// Логика загрузки и управления данными
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
				// Если это не дозагрузка (append), очищаем массив `items`
				items: append ? prev.items : [],
			}));

			try {
				const params = buildChatQueryParams(page, query, PAGE_SIZE, activeFilters);
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
					items: [], // Очищаем и в случае ошибки
				}));
			}
		},
		[triggerGetChats]
	);

	// Эффекты
	useEffect(() => {
		if (initialLoadRef.current) return;
		loadChats({ query: searchQuery, activeFilters: appliedFilters });
	}, [appliedFilters, searchQuery, loadChats]);

	useEffect(() => {
		// Загружаем с начальными значениями из store
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

	// Обработчики событий
	const handleApplyFilters = useCallback(
		(newFilters: typeof appliedFilters) => {
			dispatch(setFilters(newFilters));
			setIsFilterVisible(false);
		},
		[dispatch]
	);

	// Обработчик изменения поискового запроса
	const handleSearchChange = useCallback(
		(query: string) => {
			dispatch(setSearchQuery(query));
		},
		[dispatch]
	);

	const handleLoadMore = useCallback(() => {
		// Используем ref для доступа к актуальному состоянию
		const currentState = chatsStateRef.current;
		const currentSearchQuery = searchQueryRef.current;

		if (currentState.isLoading || !currentState.hasMore) {
			return;
		}

		loadChats({
			page: currentState.page + 1,
			append: true,
			query: currentSearchQuery,
			activeFilters: appliedFilters,
		});
	}, [loadChats, appliedFilters]);

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
			} catch {}
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
						items: prev.items.map((chat) =>
							chat.topic_id === selectedTopicId
								? {
										...chat,
										last_message_at: newLastMessage?.created_at ?? chat.last_message_at,
										last_message_text: newLastMessage?.text ?? 'Нет сообщений',
										last_message_direction: newLastMessage?.direction ?? null,
										last_message_status: newLastMessage?.delivery_status ?? null,
										last_message_created_by: newLastMessage?.created_by ?? null,
									}
								: chat
						),
					}));
				}
			} catch (error) {
				console.error('Failed to delete message:', error);
			}
		},
		[deleteMessage, selectedTopicId, messages]
	);

	const handleChatSelect = useCallback(
		(topicId: string) => {
			onSelectChat(topicId);
		},
		[onSelectChat]
	);

	const handleToggleFilters = () => setIsFilterVisible((prev) => !prev);

	return (
		<>
			<header className={styles.widgetHeader} onMouseDown={onHeaderMouseDown}>
				{isMobileView && selectedTopicId && (
					<button
						type="button"
						className={styles.backButton}
						onClick={onBack}
						aria-label="Назад к списку чатов"
					>
						<BsArrowLeft size="24px" />
					</button>
				)}
				<Typo size="18px" weight="semibold" color={COLORS.GRAY_800}>
					Чаты
				</Typo>
				<div className={styles.headerControls}>
					<button
						type="button"
						className={clsx(styles.headerButton, areFiltersActive && styles.isActive)}
						onClick={handleToggleFilters}
						aria-label="Фильтр"
					>
						<ChatFilterIcon />
					</button>
					<button
						type="button"
						className={styles.headerButton}
						onClick={onToggleChatArea}
						aria-label={isExpanded ? 'Свернуть' : 'Развернуть'}
					>
						{isExpanded ? <BsBoxArrowInRight size="24px" /> : <BsBoxArrowInLeft size="24px" />}
					</button>
					<Link
						href="/chat"
						onClick={onClose}
						rel="noopener noreferrer"
						className={styles.headerButton}
						aria-label="Развернуть на всю страницу"
						onKeyDown={(e) => {
							if (e.key === ' ') {
								e.preventDefault();
								onClose();
								// Имитируем клик по ссылке
								e.currentTarget.click();
							}
						}}
					>
						<IoResizeOutline size="24px" />
					</Link>
					<button
						type="button"
						className={styles.headerButton}
						onClick={onClose}
						aria-label="Закрыть чат"
					>
						<HiOutlineX size="20px" />
					</button>
				</div>
			</header>

			<Box
				className={clsx(
					styles.widgetBody,
					isMobileView && !!selectedTopicId && styles.showChatAreaMobile
				)}
			>
				<Box className={styles.sidebar}>
					{isFilterVisible ? (
						<ChatFilterPanel
							initialFilters={appliedFilters}
							vacancyCollection={vacancyCollection}
							isVacanciesLoading={isVacanciesLoading}
							onApplyFilters={handleApplyFilters}
						/>
					) : (
						<ChatList
							chats={chatsState.items}
							isLoading={chatsState.isLoading}
							error={chatsState.loadError}
							onSelect={handleChatSelect}
							selectedTopicId={selectedTopicId}
							onSearchChange={handleSearchChange}
							searchValue={searchQuery}
							onLoadMore={handleLoadMore}
							hasMore={chatsState.hasMore}
							unreadCount={unreadData?.unread_chats ?? 0}
							isUnreadCountLoading={isUnreadCountLoading}
							reduced={true}
						/>
					)}
				</Box>
				<Box className={styles.content}>
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
							vacancyId={selectedChat.brain_vacancy_active_id || ''}
							onDeleteMessage={handleDeleteMessage}
							isMobile={true}
							withBackButton={false}
						/>
					) : (
						<Flex
							direction="column"
							align="center"
							justify="center"
							h="100%"
							p={4}
							textAlign="center"
						>
							{chatsState.isLoading ? (
								<BaseSpinner />
							) : (
								<>
									<Typo size="16px" weight="medium" color={COLORS.GRAY_800}>
										Начните общение
									</Typo>
									<Typo size="14px" color={COLORS.GRAY_500} mt={1}>
										Выберите чат из списка, чтобы открыть переписку.
									</Typo>
								</>
							)}
						</Flex>
					)}
				</Box>
			</Box>
		</>
	);
});
