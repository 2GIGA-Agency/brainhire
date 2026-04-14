import { Typo } from '@/components/shared/Typo/Typo';
import styles from './style.module.scss';
import clsx from 'clsx';
import { COLORS } from '@/constants/colors';
import { IChatListItem } from '@/types/Chat';
import { useGetVacancyDataByIdQuery } from '@/store/rtkQuery/api';
import { SkeletonText } from '@chakra-ui/react';

interface ChatItemProps {
	chat: IChatListItem;
	isSelected: boolean;
	onSelect: () => void;
}

const formatCandidateName = (chat: IChatListItem) => {
	const firstName = chat.first_name?.trim();
	const lastName = chat.last_name?.trim();
	const fullName = [firstName, lastName].filter(Boolean).join(' ');
	return fullName || 'Кандидат без имени';
};

const computeInitials = (chat: IChatListItem) => {
	const firstName = chat.first_name?.trim();
	const lastName = chat.last_name?.trim();
	if (!firstName && !lastName) {
		return '??';
	}
	const firstInitial = firstName?.[0] ?? '';
	const lastInitial = lastName?.[0] ?? '';
	return `${firstInitial}${lastInitial}`.toUpperCase();
};

const formatLastMessageMoment = (isoString?: string | null) => {
	if (!isoString) {
		return '';
	}
	const date = new Date(isoString);
	if (Number.isNaN(date.getTime())) {
		return '';
	}

	const now = new Date();
	const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
	const messageDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());

	// Разница в днях
	const diffTime = today.getTime() - messageDate.getTime();
	const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

	// Сегодня
	if (diffDays === 0) {
		return date.toLocaleTimeString('ru-RU', {
			hour: '2-digit',
			minute: '2-digit',
		});
	}

	// В течение последней недели (но не сегодня)
	if (diffDays > 0 && diffDays <= 7) {
		return date
			.toLocaleDateString('ru-RU', {
				weekday: 'short',
			})
			.replace('.', ''); // Убираем точку после сокращения
	}

	// Ранее чем неделю назад
	return date.toLocaleDateString('ru-RU', {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric',
	});
};

const formatLastMessagePreview = (chat: IChatListItem) => {
	if (!chat.last_message_text) {
		if (chat.last_message_direction === 'employer') {
			return 'Сообщение без текста';
		}
		if (chat.last_message_direction === 'applicant') {
			return 'Сообщение от кандидата';
		}
		return 'Нет сообщений';
	}
	return chat.last_message_text;
};

export function ChatListItem({ chat, isSelected, onSelect }: ChatItemProps) {
	const containerClass = clsx(styles.chatItem, {
		[styles.selected]: isSelected,
	});

	const unreadCount = chat.unread_count;
	const lastMoment = formatLastMessageMoment(chat.last_message_at);
	const messagePreview = formatLastMessagePreview(chat);

	const { data: vacancyData, isLoading } = useGetVacancyDataByIdQuery({
		vacancyId: chat.brain_vacancy_active_id || '',
	});

	return (
		<button type="button" className={containerClass} onClick={onSelect}>
			<div className={styles.avatar}>{computeInitials(chat)}</div>
			<div className={styles.content}>
				<div className={styles.headerRow}>
					<Typo
						size="16px"
						weight="medium"
						lineHeight="20px"
						color={isSelected ? COLORS.WHITE : COLORS.GRAY_800}
					>
						{formatCandidateName(chat)}
					</Typo>
					{lastMoment && (
						<Typo size="12px" lineHeight="16px" color={isSelected ? COLORS.WHITE : COLORS.GRAY_500}>
							{lastMoment}
						</Typo>
					)}
				</div>
				{isLoading ? (
					<SkeletonText noOfLines={1} />
				) : (
					<Typo
						className={styles.vacancyName}
						lineHeight="18px"
						color={isSelected ? COLORS.WHITE : COLORS.GRAY_800}
					>
						{vacancyData?.vacancy_name}
					</Typo>
				)}

				<div className={styles.previewRow}>
					<Typo
						size="14px"
						weight={unreadCount > 0 ? 'semibold' : 'regular'}
						color={isSelected ? COLORS.WHITE : COLORS.GRAY_600}
						className={styles.previewText}
					>
						{messagePreview}
					</Typo>
					{unreadCount > 0 && <span className={styles.unreadBadge}>{unreadCount}</span>}
				</div>
			</div>
		</button>
	);
}
