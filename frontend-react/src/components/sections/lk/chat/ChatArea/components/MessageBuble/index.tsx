import { MessageOut } from '@/types/Chat';
import { Typo } from '@/components/shared/Typo/Typo';
import { COLORS } from '@/constants/colors';
import { FaTrash } from 'react-icons/fa';
import styles from './style.module.scss';
import { formatTimeLabel, MessageStatusIcons } from '../../utils';

interface MessageBubbleProps {
	message: MessageOut;
	onDelete: (id: number) => void;
}

export const MessageBubble = ({ message, onDelete }: MessageBubbleProps) => {
	const isEmployer = message.direction === 'employer';
	const hasFailed = message.delivery_status === 'failed';

	return (
		<div className={isEmployer ? styles.messageOutbound : styles.messageInbound}>
			<div className={styles.bubble}>
				<p className={styles.text}>{message.text || 'Отклик без сопроводительного письма'}</p>
				<div className={styles.footer}>
					<Typo size="14px" color={COLORS.GRAY_800}>
						{formatTimeLabel(message.created_at)}
					</Typo>
					{isEmployer && (
						<div className={styles.statusContainer}>
							<MessageStatusIcons
								status={message.created_by == 'hh' ? 'sent' : message.delivery_status}
							/>
							{hasFailed && (
								<button
									type="button"
									onClick={() => onDelete(message.id)}
									className={styles.deleteButton}
								>
									<FaTrash size={12} color={COLORS.RED_500} />
								</button>
							)}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};
