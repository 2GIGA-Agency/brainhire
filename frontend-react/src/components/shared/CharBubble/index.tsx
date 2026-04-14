import { Text } from '@chakra-ui/react';
import React from 'react';
import styles from './ChatBubble.module.scss';
interface ChatBubbleProps {
	children: React.ReactNode;
	fromUser?: boolean;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({ children, fromUser = false }) => {
	const containerClassName = fromUser ? `${styles.container} ${styles.fromUser}` : styles.container;

	return (
		<div className={containerClassName}>
			<div className={styles.bubble}>
				<Text textStyle="md" fontWeight={500}>
					{children}
				</Text>
			</div>
		</div>
	);
};
