// components/Profile/components/PasswordChangeBlock/PasswordChangeBlock.tsx
'use client';

import React, { useState } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { Block } from '@/components/shared/Block';
import { LkField } from '@/components/shared/LkField';
import { LkInput } from '@/components/shared/LkInput';
import { LkButton } from '@/components/shared/LkButton';
import { Typo } from '@/components/shared/Typo/Typo';
import { COLORS } from '@/constants/colors';
import { toaster } from '@/components/ui/toaster';
import axios from '@/utils/axios';
import styles from './style.module.scss';

interface PasswordChangeBlockProps {
	onPasswordChanged: () => void; // Колбэк для вызова refetch в родителе
}

export const PasswordChangeBlock: React.FC<PasswordChangeBlockProps> = ({ onPasswordChanged }) => {
	const [currentPassword, setCurrentPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const isPasswordValid =
		currentPassword.trim() !== '' &&
		newPassword.trim() !== '' &&
		confirmPassword.trim() !== '' &&
		newPassword === confirmPassword;

	const savePassword = () => {
		const promise = axios.put('/api/password/change/', {
			old_password: currentPassword,
			new_first_password: newPassword,
			new_secondary_password: confirmPassword,
		});

		toaster.promise(promise, {
			success: { title: 'Пароль обновлён' },
			error: { title: 'Ошибка при обновлении, попробуйте позже...' },
			loading: { title: 'Обновление пароля...' },
		});

		promise.then(() => {
			setCurrentPassword('');
			setNewPassword('');
			setConfirmPassword('');
			onPasswordChanged();
		});
	};

	return (
		<Block heading="Пароль" subHeadingText="Вы можете сменить ваш пароль">
			<Flex direction="column" gap="24px" mb="24px">
				<LkField label="Текущий пароль" required={true}>
					<LkInput
						placeholder="Введите текущий пароль"
						type="password"
						value={currentPassword}
						onChange={(e) => setCurrentPassword(e.target.value)}
					/>
				</LkField>
				<LkField label="Новый пароль" required={true}>
					<LkInput
						placeholder="Введите новый пароль"
						type="password"
						value={newPassword}
						onChange={(e) => setNewPassword(e.target.value)}
					/>
				</LkField>
				<LkField label="Подтвердите новый пароль" required={true}>
					<LkInput
						placeholder="Подтвердите новый пароль"
						type="password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
					/>
				</LkField>
			</Flex>
			<Box className={styles.saveButton}>
				<LkButton heightSize="medium" disabled={!isPasswordValid} onClick={savePassword}>
					<Typo weight="semibold" color={COLORS.WHITE}>
						Сохранить пароль
					</Typo>
				</LkButton>
			</Box>
		</Block>
	);
};
