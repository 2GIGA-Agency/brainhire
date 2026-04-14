'use client';

import { Button } from '@/components/ui-kit/Button';
import { Typography } from '@/components/ui-kit/Typography';
import { useAppSelector } from '@/store/store';
import axios from '@/utils/axios';
import { PinInput } from '@chakra-ui/react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from './style.module.scss';
import { decodeFromHex, encodeToHex } from '@/utils/hexFormatter';
import { BackButton } from '@/components/shared/BackButton';

export const ClientTwoStep = () => {
	const registrationData = useAppSelector((state) => state.registration);
	const [referrer, setReferrer] = useState('');
	const { email } = useParams();
	const decodedEmail = decodeFromHex(email as string);
	const [errorMessage, setErrorMessage] = useState('');
	const [loading, setLoading] = useState(false);
	const [successMessage, setSuccessMessage] = useState('');
	const [isVerifyingCode, setVerifyingCode] = useState(false);
	const [pinValue, setPinValue] = useState(['', '', '', '']);

	const requestBody = referrer
		? {
				referrer,
				code: parseInt(pinValue.join('')),
				...registrationData,
			}
		: {
				code: parseInt(pinValue.join('')),
				...registrationData,
			};


	useEffect(() => {
		if (typeof window !== 'undefined') {
			const params = new URLSearchParams(window.location.search);
			setReferrer(params.get('referrer') as string);
		}
	}, []);

	const handleVerifyCode = async () => {
		if (pinValue.join('').length !== 4) {
			setErrorMessage('Введите корректный 4-значный код');
			return;
		}

		try {
			setVerifyingCode(true);
			const response = await axios.post('/api/email/verify_code/', requestBody);

			const email = encodeToHex(response.data.email);
			const password = encodeToHex(response.data.password);
			const domain = encodeToHex(response.data.domain);
			setVerifyingCode(false);
			window.location.href = `${window.location.protocol}//${response.data.domain}/success/${email}/${password}/${domain}`;
		} catch (err) {
			setErrorMessage('Ошибка при проверке кода');
			setVerifyingCode(false);
			console.error('Ошибка при проверке кода: ', err);
		}
	};

	const handleResendCode = async () => {
		if (loading) return;

		setPinValue(['', '', '', '']);
		setErrorMessage('');
		setSuccessMessage('');
		setLoading(true);

		try {
			await axios.post('/api/email/send_code/', { email: decodedEmail });

			setSuccessMessage('Код успешно отправлен повторно');
		} catch (error) {
			console.error('Ошибка при повторной отправке кода:', error);
			setErrorMessage('Не удалось отправить код. Попробуйте позже.');
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<BackButton />
			<div className={styles.container}>
				<Image src="/icons/Logo.svg" alt="" width={150} height={50} className={styles.logo} />
				<Typography variant="h4" className={styles.title}>
					Проверьте вашу почту
				</Typography>
				<Typography variant="body-text" className={styles.subtitle}>
					Мы только что отправили на <strong>{decodedEmail}</strong> код для входа
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

				<Button variant="primary" fullWidth onClick={handleVerifyCode} disabled={isVerifyingCode}>
					{isVerifyingCode ? 'Проверка...' : 'Подтвердить'}
				</Button>

				<button className={styles.resendLink} disabled={loading} onClick={handleResendCode}>
					{loading ? 'Отправка...' : 'Выслать код еще раз'}
				</button>
			</div>
		</>
	);
};
