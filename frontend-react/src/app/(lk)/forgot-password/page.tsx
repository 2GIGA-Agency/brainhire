'use client';

import Image from 'next/image';
import styles from './style.module.scss';
import { Button, Input, Typography } from '@/components';
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { encodeToHex } from '@/utils/hexFormatter';

export default function ForgotPassword() {
	const [errorMessage, setErrorMessage] = useState('');
	const [email, setEmail] = useState('');
	const [isSending, setIsSending] = useState(false);
	const encodedEmail = encodeToHex(email);

	const router = useRouter();

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		setErrorMessage('');

		try {
			setIsSending(true);
			const response = await fetch('/api/profiles/password/reset/request_reset/', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					email,
				}),
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(`Ошибка восстановления пароля: ${data.error}`);
			}

			router.push(`/forgot-password/${encodedEmail}`);
		} catch (e: any) {
			setErrorMessage(e.message);
			console.error(e.message);
		} finally {
			setIsSending(false);
		}
	};

	return (
		<div className={styles.loginContainer}>
			<div className={styles.logo}>
				<Image src="/icons/Logo.svg" alt="" width={150} height={50} />
			</div>
			<Typography variant="h4" className={styles.title}>
				Восстановление пароля
			</Typography>
			<Typography variant="body-text" className={styles.subtitle} margin="0 0 32px">
				Введите данные для восстановления пароля
			</Typography>

			<form
				onSubmit={handleSubmit}
				className={`SelectDomain_form__ef_Zj ${styles.form}`}
				autoComplete="on"
			>
				{errorMessage && (
					<Typography variant="body-text" color="red" className={styles.error}>
						{errorMessage}
					</Typography>
				)}

				<Input
					className={styles.emailInput}
					type="email"
					label="Email"
					autoComplete="email"
					placeholder="Введите ваш email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>

				<Button disabled={isSending} variant="primary" type="submit" fullWidth>
					{isSending ? 'Выполняется отправка кода...' : 'Восстановить пароль'}
				</Button>
			</form>
		</div>
	);
}
