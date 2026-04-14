import { useState } from 'react';
import { LkTextarea } from '@/components/shared/LkTextarea';
import { LkButton } from '@/components/shared/LkButton';
import { Typo } from '@/components/shared/Typo/Typo';
import { FiSend } from 'react-icons/fi';
import { COLORS } from '@/constants/colors';
import styles from './style.module.scss';

interface ChatComposerProps {
	onSend: (text: string) => Promise<void>;
	isSending: boolean;
	isDisabled: boolean;
	error: string | null;
}

export const ChatComposer = ({ onSend, isSending, isDisabled, error }: ChatComposerProps) => {
	const [text, setText] = useState('');

	const handleSubmit = async (e?: React.FormEvent) => {
		e?.preventDefault();
		const value = text.trim();
		if (!value || isSending) return;

		try {
			await onSend(value);
			setText('');
		} catch (err: any) {
			// Логика обработки ошибок остается в родителе
		}
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			void handleSubmit();
		}
	};

	return (
		<form className={styles.composer} onSubmit={handleSubmit}>
			{error && (
				<Typo size="12px" color={COLORS.RED_500}>
					{error}
				</Typo>
			)}
			<div className={styles.inputArea}>
				<LkTextarea
					borderRadius={0.5}
					pb={0}
					border={0}
					autoResize
					maxLength={2000}
					value={text}
					minHeight={'44px'}
					onChange={(e) => setText(e.target.value)}
					placeholder="Введите сообщение"
					className={styles.textarea}
					onKeyDown={handleKeyDown}
					disabled={isDisabled || isSending}
				/>
				<div className={styles.composerActions}>
					<LkButton
						borderRadius={0}
						type="submit"
						h={'44px'}
						icon={<FiSend />}
						heightSize="medium"
						disabled={isSending || !text.trim() || isDisabled}
					/>
				</div>
			</div>
		</form>
	);
};
