import { MessageOut } from '@/types/Chat';
import { Typo } from '@/components/shared/Typo/Typo';
import { LkButton } from '@/components/shared/LkButton';
import { COLORS } from '@/constants/colors';
import styles from './style.module.scss';
import { MessagesSkeleton } from '../MessagesSkeleton';
import { useMessageGrouping } from '../../hooks/useMessageGrouping';
import { useChatScroll } from '../../hooks/useChatScroll';
import { MessageBubble } from '../MessageBuble';

interface MessageListProps {
	messages: MessageOut[];
	isLoading: boolean;
	error: string | null;
	onReload: () => void;
	onDeleteMessage: (id: number) => void;
}

export const MessageList = ({
	messages,
	isLoading,
	error,
	onReload,
	onDeleteMessage,
}: MessageListProps) => {
	const groups = useMessageGrouping(messages);
	const scrollAnchorRef = useChatScroll(messages.length, isLoading);

	if (isLoading)
		return (
			<div className={styles.body}>
				<div className={styles.messagesWrapper}>
					<MessagesSkeleton />
				</div>
			</div>
		);

	if (error) {
		return (
			<div className={styles.body}>
				<div className={styles.messagesState}>
					<Typo size="14px" color={COLORS.RED_500}>
						{error}
					</Typo>
					<LkButton onClick={onReload} bg={COLORS.BLUE_400} heightSize="medium">
						Повторить
					</LkButton>
				</div>
			</div>
		);
	}

	if (groups.length === 0) {
		return (
			<div className={styles.body}>
				<div className={styles.messagesState}>
					<Typo size="14px" color={COLORS.GRAY_400}>
						Сообщений пока нет
					</Typo>
				</div>
			</div>
		);
	}

	return (
		<div className={styles.body}>
			<div className={styles.messagesWrapper}>
				<div className={styles.messagesInner}>
					{groups.map((group) => (
						<div key={group.dateLabel} className={styles.group}>
							<div className={styles.dateDivider}>
								<span>{group.dateLabel}</span>
							</div>
							{group.items.map((message) => (
								<MessageBubble key={message.id} message={message} onDelete={onDeleteMessage} />
							))}
						</div>
					))}
					<div ref={scrollAnchorRef} />
				</div>
			</div>
		</div>
	);
};
