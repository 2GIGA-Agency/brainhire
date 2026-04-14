import { useMemo } from 'react';
import { Block } from '@/components/shared/Block';
import { Typo } from '@/components/shared/Typo/Typo';
import { ContentSpinner } from '@/components/shared/ContentSpinner';
import { CandidateBotSession } from '@/store/types/BotGateway';
import styles from './style.module.scss';
import { getChatBotScore } from '@/utils/chat_bot_score';
import { Tag } from '@chakra-ui/react';

export interface ChatMessage {
	id: number;
	topic_id: string;
	direction: 'applicant' | 'employer';
	text: string | null;
	created_at: string;
	delivery_status: 'pending' | 'sent' | 'failed' | null;
	created_by: 'brain' | 'hh';
}

interface Props {
	session: CandidateBotSession;
	messages: ChatMessage[];
	isLoading: boolean;
}

const trimText = (value?: string | null) => (value ? value.trim() : '');

const formatMessageDate = (dateString: string) => {
	try {
		return new Date(dateString).toLocaleString('ru-RU', {
			day: '2-digit',
			month: '2-digit',
			hour: '2-digit',
			minute: '2-digit',
		});
	} catch {
		return '';
	}
};

export function BotConversationTab({ session, messages, isLoading }: Props) {
	const summary = trimText(session?.description) || 'Сводка появится после завершения диалога.';
	const candidateChatBotStatus = getChatBotScore(session.score || 0);

	const sortedMessages = useMemo(() => {
		return [...messages]
			// 1. Фильтруем пустые сообщения (null или пробелы)
			.filter((msg) => msg.text && msg.text.trim().length > 0)
			.sort(
				(a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
			);
	}, [messages]);

	return (
		<div className={styles.wrapper}>
			{/* Блок с оценкой и саммари */}
			<div className={styles.header}>
				<div className={styles.scoreDetails}>
					<Typo mr={2} weight="medium">{"Оценка чат-интервью"}</Typo>
					<Tag.Root color="white" bg={candidateChatBotStatus.bg} size="lg">
						<Tag.Label>{candidateChatBotStatus.title}</Tag.Label>
					</Tag.Root>
				</div>
				<Block background={'gray.100'}>
					<Typo className={styles.summaryText}>{summary}</Typo>
				</Block>
			</div>

			{/* Блок переписки */}
			<Typo weight="medium" className={styles.chatTitle}>Детализация диалога:</Typo>
			<Block className={styles.chatBlock}>
				<div className={styles.messagesContainer}>
					{isLoading && !sortedMessages.length ? (
						<div className={styles.spinnerWrapper}>
							<ContentSpinner />
						</div>
					) : sortedMessages.length > 0 ? (
						sortedMessages.map((msg) => {
							const isOwn = msg.direction === 'employer';
							
							return (
								<div
									key={msg.id}
									className={`${styles.messageItem} ${isOwn ? styles.own : styles.foreign}`}
								>
									<div className={styles.bubble}>
										{/* text уже гарантированно есть благодаря фильтру */}
										<div className={styles.messageText}>{msg.text}</div>
										<div className={styles.messageMeta}>
											{formatMessageDate(msg.created_at)}
											{isOwn && msg.delivery_status === 'pending' && ' • Отправка...'}
											{isOwn && msg.delivery_status === 'failed' && ' • Ошибка'}
										</div>
									</div>
								</div>
							);
						})
					) : (
						<div className={styles.emptyState}>
							<Typo color="gray.500">История сообщений пуста</Typo>
						</div>
					)}
				</div>
			</Block>
		</div>
	);
}