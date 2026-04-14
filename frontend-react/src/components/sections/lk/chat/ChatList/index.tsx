import { useEffect, useRef, useCallback, useState } from 'react';
import { Badge, Flex, SkeletonCircle } from '@chakra-ui/react';
import styles from './style.module.scss';
import { Typo } from '@/components/shared/Typo/Typo';
import { SearchInput } from '@/components/shared/SearchInput';
import { BaseSpinner } from '@/components/shared/BaseSpinner/BaseSpinner';
import { COLORS } from '@/constants/colors';
import { IChatListItem } from '@/types/Chat';
import { ChatListItem } from '../ChatListItem';
import { ChatItemSkeleton } from './components/ChatItemSkeleton';

interface ChatListProps {
	chats: IChatListItem[];
	isLoading: boolean;
	error: string | null;
	selectedTopicId: string | null;
	onSelect: (topicId: string) => void;
	onSearchChange: (value: string) => void;
	searchValue: string;
	onLoadMore: () => void;
	hasMore: boolean;
	unreadCount: number;
	isUnreadCountLoading: boolean;
	reduced?: boolean;
}

export function ChatList({
	chats,
	isLoading,
	error,
	selectedTopicId,
	onSelect,
	onSearchChange,
	searchValue,
	onLoadMore,
	hasMore,
	unreadCount,
	isUnreadCountLoading,
	reduced = false,
}: ChatListProps) {
	const observerRef = useRef<HTMLDivElement | null>(null);
	const [localSearchValue, setLocalSearchValue] = useState(searchValue);
	const searchDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	useEffect(() => {
		setLocalSearchValue(searchValue);
	}, [searchValue]);

	const handleSearchChange = useCallback(
		(value: string) => {
			setLocalSearchValue(value);

			if (searchDebounceRef.current) {
				clearTimeout(searchDebounceRef.current);
			}

			searchDebounceRef.current = setTimeout(() => {
				onSearchChange(value);
			}, 400);
		},
		[onSearchChange]
	);

	useEffect(() => {
		return () => {
			if (searchDebounceRef.current) {
				clearTimeout(searchDebounceRef.current);
			}
		};
	}, []);

	const handleObserver = useCallback(
		(entries: IntersectionObserverEntry[]) => {
			const target = entries[0];
			if (target.isIntersecting && hasMore) {
				onLoadMore();
			}
		},
		[onLoadMore, hasMore]
	);

	useEffect(() => {
		const observer = new IntersectionObserver(handleObserver, {
			root: null,
			rootMargin: '0px',
			threshold: 0.1,
		});

		if (observerRef.current) {
			observer.observe(observerRef.current);
		}

		return () => {
			if (observerRef.current) {
				observer.unobserve(observerRef.current);
			}
		};
	}, [handleObserver]);

	return (
		<div className={styles.chatList}>
			<div className={styles.header}>
				{!reduced && (
					<Flex align="center" gap={4} w="100%">
						<Typo size="20px" weight="semibold">
							Чаты
						</Typo>
						{isUnreadCountLoading ? (
							<SkeletonCircle size="22px" />
						) : unreadCount > 0 ? (
							<Badge colorPalette="red" variant="solid" borderRadius="full" px="2" fontSize="12px">
								<Typo weight="medium" color={COLORS.WHITE}>
									{unreadCount}
								</Typo>
							</Badge>
						) : null}
					</Flex>
				)}

				<SearchInput
					value={localSearchValue}
					onChange={(event) => handleSearchChange(event.target.value)}
					placeholder="Поиск по имени"
				/>
			</div>

			<div className={styles.listWrapper}>
				<div className={styles.list}>
					{isLoading && chats.length === 0 ? (
						<Flex direction={'column'} gap={6}>
							{[...Array(12)].map((_, index) => (
								<ChatItemSkeleton key={index} />
							))}
						</Flex>
					) : chats.length === 0 && !error ? (
						<div className={styles.state}>
							<Typo size="14px" color={COLORS.GRAY_400}>
								Чаты не найдены
							</Typo>
						</div>
					) : (
						chats.map((chat) => (
							<ChatListItem
								key={chat.topic_id}
								chat={chat}
								isSelected={selectedTopicId === chat.topic_id}
								onSelect={() => onSelect(chat.topic_id)}
							/>
						))
					)}

					{hasMore && <div ref={observerRef} style={{ height: '10px' }} />}

					{isLoading && chats.length > 0 && (
						<div className={styles.inlineSpinner}>
							<BaseSpinner />
						</div>
					)}
				</div>
			</div>

			{error && (
				<div className={styles.error}>
					<Typo size="12px" color={COLORS.RED_500}>
						{error}
					</Typo>
				</div>
			)}
		</div>
	);
}
