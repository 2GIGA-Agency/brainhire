import { COLORS } from '@/constants/colors';
import { MessageOut } from '@/types/Chat';
import { FaCheck } from 'react-icons/fa';
import styles from './style.module.scss';

export const MessageStatusIcons = ({ status }: { status: MessageOut['delivery_status'] }) => {
	if (status === 'pending') {
		return (
			<div className={styles.messageStatus}>
				<FaCheck size={12} color={COLORS.GRAY_400} />
			</div>
		);
	}
	if (status === 'sent') {
		return (
			<div className={styles.messageStatus}>
				<FaCheck size={12} color={COLORS.GRAY_400} />
				<FaCheck size={12} color={COLORS.GRAY_400} style={{ marginLeft: -4 }} />
			</div>
		);
	}
	if (status === 'failed') {
		return (
			<div className={styles.messageStatus}>
				<FaCheck size={12} color={COLORS.RED_500} />
			</div>
		);
	}
	return null;
};
