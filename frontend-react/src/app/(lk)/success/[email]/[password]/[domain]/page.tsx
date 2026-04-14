'use client';

import { Button } from '@/components/ui-kit';
import { Typography } from '@/components/ui-kit/Typography';
import axios from '@/utils/axios';
import Image from 'next/image';
// import { useParams, useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import React, { useState } from 'react';
import styles from './Success.module.scss';

const Success: React.FC = () => {
	const { email, password } = useParams();
	const [error, setError] = useState('');
	// const router = useRouter();

	const handleClick = async () => {
		try {
			const decodeFromHex = (hex: string) => {
				return hex.match(/.{1,2}/g)?.map((byte) => String.fromCharCode(parseInt(byte, 16))).join("") || "";
			};
			const response = await axios.post(`/api/token/`, {
				username: decodeFromHex(email as string),
				password: decodeFromHex(password as string),
			});

			localStorage.setItem('access', response.data.access);
			localStorage.setItem('refresh', response.data.refresh);

			// router.push('/vacancy');
			window.location.href = `${window.location.origin}/vacancy`;
			// window.location.href = `${window.location.protocol}//${decodeFromHex(domain as string)}/vacancy/`;
		} catch (err) {
			setError('Ошибка при попытке входа. Пожалуйста, попробуй ещё раз чуть позже.');
			console.error(err);
		}
	};

	return (
		<div className={styles.loginContainer}>
			<div className={styles.logo}>
				<Image src="/icons/Logo.svg" alt="" width={150} height={50} />
			</div>
			<Typography variant="h4" className={styles.title} margin='0 0 20px'>
				Ваши данные отправлены в обработку!
			</Typography>
			<Typography variant="body-sm" color="text-secondary" margin='0 0 20px'>
				В течение 15 минут вы получите письмо на указанную почту с реквизитами для доступа.
			</Typography>
			{error && (
				<Typography variant="body-sm" color="red" margin='20px 0'>
					{error}
				</Typography>
			)}
			<Button variant="primary" size="M" onClick={handleClick} fullWidth>
				Войти
			</Button>
		</div>
	);
};

export default Success;
