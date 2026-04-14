'use client';

import { Button } from '@/components/ui-kit/Button';
import { Input } from '@/components/ui-kit/Input';
import { Typography } from '@/components/ui-kit/Typography';
import Image from 'next/image';
import React, { useState } from 'react';
import axios from '@/utils/axios';
import styles from './SelectDomain.module.scss';
import { BackButton } from '@/components/shared/BackButton';

const SelectDomain: React.FC = () => {
	const [domain, setDomain] = useState('');
	const [errorMessage, setErrorMessage] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	// const router = useRouter();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setErrorMessage('');
		setIsLoading(true);

		try {
			await axios.post('/api/select_tenant/', { name: domain });

			// Перенаправление на subdomain
			window.location.href = `${window.location.protocol}//${domain}.${window.location.host}/signin`;
			// router.push('/signin')
		} catch (error) {
			if (axios.isAxiosError(error) && error.response?.data?.error) {
				setErrorMessage(error.response.data.error);
			} else {
				setErrorMessage('Произошла ошибка. Попробуйте позже.');
			}
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className={styles.authContainer}>
			<BackButton />
			<div className={styles.logo}>
				<Image src="/icons/Logo.svg" alt="" width={150} height={50} />
			</div>
			<Typography variant="h4" className={styles.title}>
				Авторизация
			</Typography>
			<Typography variant="body-text" className={styles.subtitle}>
				Введите домен BRaiN HR
			</Typography>

			<form className={styles.form} onSubmit={handleSubmit}>
				{errorMessage && (
					<Typography variant="body-text" className={styles.error}>
						{errorMessage}
					</Typography>
				)}

				<Input
					label="Домен BRaiN HR"
					placeholder="bh000"
					value={domain}
					onChange={(e) => setDomain(e.target.value)}
					suffix=".brainhire.ru"
				/>

				<Button variant="primary" type="submit" fullWidth disabled={isLoading || !domain}>
					{isLoading ? 'Загрузка...' : 'Войти'}
				</Button>
			</form>

			<Typography variant="body-text" className={styles.registerText}>
				Еще не зарегистрированы? <a href="/signup">Регистрация</a>
			</Typography>
		</div>
	);
};

export default SelectDomain;
