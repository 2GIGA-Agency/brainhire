'use client';

import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import styles from './style.module.scss';
import { Button, Typography } from '@/components';
import { PinInput } from '@chakra-ui/react';
import { useState } from 'react';
import { decodeFromHex } from '@/utils/hexFormatter';

export default function VerifyCode() {
	const { email } = useParams();
	let decodedEmail = '';
	if (typeof email === 'string') {
		decodedEmail = decodeFromHex(email);
	}

	const [pinValue, setPinValue] = useState(['', '', '', '']);
	const router = useRouter();

	const [errorMessage, setErrorMessage] = useState('');
	const [successMessage, setSuccessMessage] = useState('');

	const [isVerifyingCode, setIsVerifyingCode] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const handleVerifyCode = async () => {
		setErrorMessage('');
		if (pinValue.join('').length !== 4) {
			setErrorMessage('Введите корректный 4-значный код');
			return;
		}

		try {
			setIsVerifyingCode(true);
			const verify = await fetch('/api/profiles/password/reset/verify_code/', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					email: decodedEmail,
					code: pinValue.join(''),
				}),
			});

			const verifyData = await verify.json();

			if (!verify.ok) {
				throw new Error(`Ошибка верификации: ${verifyData.error}`);
			}

			const recovery = await fetch('/api/profiles/password/reset/confirm_reset/', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					email: decodedEmail,
					code: pinValue.join(''),
				}),
			});

			const recoveryData = await recovery.json();

			if (!recovery.ok) {
				throw new Error(
					`Верификация прошла успешно, но возникла ошибка восстановления пароля: ${recoveryData.error}`
				);
			}
			setSuccessMessage(
				'В течение 15 минут вы получите письмо на указанную почту с реквизитами доступа'
			);
			setTimeout(() => {
				router.push('/login');
			}, 8000);
		} catch (e: any) {
			console.error(e.message);
			setErrorMessage(e.message);
		} finally {
			setIsVerifyingCode(false);
		}
	};

	const handleResendCode = async () => {
		setErrorMessage('');
		try {
			setIsLoading(true);

			const response = await fetch('/api/profiles/password/reset/request_reset/', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					email: decodedEmail,
				}),
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(`Ошибка восстановления пароля ${data.error}`);
			}
		} catch (e: any) {
			setErrorMessage(e.message);
			console.error(e.message);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className={styles.container}>
			<Image
				src="/icons/Logo.svg"
				alt=""
				width={150}
				height={50}
				className={styles.logo}
			/>
			{!successMessage && (
				<>
					<Typography variant="h4" className={styles.title}>
						Проверьте вашу почту
					</Typography>
					<Typography variant="body-text" className={styles.subtitle}>
						Мы только что отправили на <strong>{decodedEmail}</strong> код для восстановления пароля
					</Typography>

					<PinInput.Root
						value={pinValue}
						onValueChange={(e) => setPinValue(e.value)}
						size="lg"
						autoFocus
						invalid={Boolean(errorMessage)}
						mb={4}
					>
						<PinInput.HiddenInput />
						<PinInput.Control>
							<PinInput.Input index={0} />
							<PinInput.Input index={1} />
							<PinInput.Input index={2} />
							<PinInput.Input index={3} />
						</PinInput.Control>
					</PinInput.Root>
				</>
			)}

			{errorMessage && (
				<Typography variant="body-xs" color="red" margin="0 0 8px">
					{errorMessage}
				</Typography>
			)}

			{successMessage && (
				<Typography variant="body-xs" margin="0 0 20px" color="green">
					{successMessage}
				</Typography>
			)}

			{!successMessage && (
				<Button variant="primary" fullWidth onClick={handleVerifyCode} disabled={isVerifyingCode}>
					{isVerifyingCode ? 'Проверка...' : 'Подтвердить'}
				</Button>
			)}

			{!successMessage && (
				<button className={styles.resendLink} disabled={isLoading} onClick={handleResendCode}>
					{isLoading ? 'Отправка...' : 'Выслать код еще раз'}
				</button>
			)}
		</div>
	);
}
