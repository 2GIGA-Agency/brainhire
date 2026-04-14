'use client';

import { Button } from '@/components/ui-kit/Button';
import { Input } from '@/components/ui-kit/Input';
import { Typography } from '@/components/ui-kit/Typography';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import styles from './style.module.scss';
import { BackButton } from '@/components/shared/BackButton';

export const ClientLogin: React.FC = () => {
	const router = useRouter();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [errorMessage, setErrorMessage] = useState('');
	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		setIsClient(true);
	}, []);

	if (!isClient) return null;

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setErrorMessage('');

		if (!email || !password) {
			setErrorMessage('Заполните все поля');
			return;
		}

		if (typeof yaCounter99950315 !== 'undefined') {
			yaCounter99950315.reachGoal('sent_form_SelectDomain_form__ef_Zj');
		}

		try {
			const response = await axios.post('/api/token/', {
				username: email,
				password,
			});

			if (typeof window !== 'undefined') {
				localStorage.setItem('access', response.data.access);
				localStorage.setItem('refresh', response.data.refresh);
			}

			router.push('/vacancy');
		} catch (error) {
			if (axios.isAxiosError(error) && error.response?.status === 401) {
				console.error(error);
				setErrorMessage(error.response.data.detail);
			} else {
				setErrorMessage('Произошла ошибка. Попробуйте позже.');
			}
		}
	};

	return (
		<>
			<BackButton />
			<div className={styles.loginContainer}>
				<div className={styles.logo}>
					<Image src="/icons/Logo.svg" alt="" width={150} height={50} />
				</div>
				<Typography variant="h4" className={styles.title}>
					Вход в аккаунт
				</Typography>
				<Typography variant="body-text" className={styles.subtitle} margin="0 0 32px">
					Добро пожаловать! Введите ваши данные
				</Typography>

				<form
					className={`SelectDomain_form__ef_Zj ${styles.form}`}
					onSubmit={handleSubmit}
					autoComplete="on"
				>
					{errorMessage && (
						<Typography variant="body-text" className={styles.error}>
							{errorMessage}
						</Typography>
					)}

					<Input
						className={styles.emailInput}
						label="Email"
						autoComplete="email"
						placeholder="Введите ваш email"
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<Input
						className={styles.passInput}
						label="Пароль"
						type="password"
						autoComplete="password"
						placeholder="Введите ваш пароль"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>

					<Link href="/forgot-password" className={styles.forgotPassword}>
						<Typography variant="body-xss-bold" color="brand-primary">
							Забыли пароль?
						</Typography>
					</Link>

					<Button variant="primary" type="submit" fullWidth>
						Войти
					</Button>
				</form>

				<Typography variant="body-text" className={styles.registerText}>
					У вас нет аккаунта? <Link href="/signup">Регистрация</Link>
				</Typography>
			</div>
		</>
	);
};
