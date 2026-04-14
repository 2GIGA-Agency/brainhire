// Файл: SolutionForm.tsx

'use client';

import { Button } from '@/components/ui-kit/Button';
import { Checkbox } from '@/components/ui-kit/Checkbox';
import { Input } from '@/components/ui-kit/Input';
import { Typography } from '@/components/ui-kit/Typography';
import axios from '@/utils/axios';
import React, { useEffect, useRef, useState } from 'react';
import styles from './SolutionForm.module.scss';
import {
	AD_CONSENT_LINK,
	PERSONAL_DATA_CONSENT_LINK,
	PRIVACY_POLICY_LINK,
	USER_AGREEMENT_LINK,
} from '@/constants/links';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// Обновленная схема валидации с тремя отдельными чекбоксами
const formSchema = z.object({
	firstName: z.string().min(2, { message: 'Имя должно содержать минимум 2 символа' }),
	company: z.string().min(1, { message: 'Укажите название компании' }),
	email: z.string().email({ message: 'Введите корректный email' }),
	phone: z
		.string()
		.min(1, { message: 'Поле телефона обязательно' })
		.refine(
			(val) => {
				const digits = val.replace(/\D/g, '');
				return digits.length >= 9;
			},
			{ message: 'Введите корректный номер телефона (минимум 9 цифр)' }
		)
		.refine(
			(val) => {
				// Проверка на общее количество символов (включая нецифровые)
				return val.length <= 20;
			},
			{ message: 'Номер телефона должен быть не более 20 символов' }
		),
	// Три отдельных чекбокса для соглашений
	consentPrivacyPolicy: z.boolean().refine((val) => val === true, {
		message: 'Необходимо ознакомиться с политикой обработки персональных данных',
	}),
	consentPersonalData: z.boolean().refine((val) => val === true, {
		message: 'Необходимо дать согласие на обработку персональных данных',
	}),
	consentUserAgreement: z.boolean().refine((val) => val === true, {
		message: 'Необходимо принять пользовательское соглашение',
	}),
	newsletterCheck: z.boolean().optional(),
});

type FormData = z.infer<typeof formSchema>;

interface Props {
	title: string;
	theme?: 'blue' | 'light';
}

export const SolutionForm: React.FC<Props> = ({ title, theme = 'blue' }) => {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState('');
	const [success, setSuccess] = useState(false);
	const [agreementsError, setAgreementsError] = useState('');

	const sectionRef = useRef<HTMLElement | null>(null);

	const isLight = theme === 'light';

	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
		watch,
		trigger,
		getValues,
	} = useForm<FormData>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			firstName: '',
			company: '',
			email: '',
			phone: '',
			consentPrivacyPolicy: false,
			consentPersonalData: false,
			consentUserAgreement: false,
			newsletterCheck: false,
		},
		mode: 'onSubmit',
		reValidateMode: 'onChange',
	});

	// Отслеживаем значения чекбоксов для валидации
	const consentPrivacyPolicy = watch('consentPrivacyPolicy');
	const consentPersonalData = watch('consentPersonalData');
	const consentUserAgreement = watch('consentUserAgreement');
	const newsletterCheck = watch('newsletterCheck');

	const onSubmit = async (data: FormData) => {
		setError('');
		setAgreementsError('');

		// Дополнительная проверка на фронтенде
		if (!consentPrivacyPolicy || !consentPersonalData || !consentUserAgreement) {
			setAgreementsError('Необходимо принять все соглашения');
			// Триггерим валидацию всех чекбоксов
			await Promise.all([
				trigger('consentPrivacyPolicy'),
				trigger('consentPersonalData'),
				trigger('consentUserAgreement'),
			]);
			return;
		}

		setIsSubmitting(true);

		if (typeof yaCounter99950315 !== 'undefined') {
			yaCounter99950315.reachGoal('sent_form_SolutionForm_form__JYK9w');
		}

		try {
			const payload = {
				first_name: data.firstName,
				company_name: data.company,
				email: data.email,
				// Отправляем на бэкенд только цифры
				phone: data.phone.replace(/\D/g, ''),
			};

			await axios.post('/api/email/demo/', payload);

			setSuccess(true);
		} catch (error) {
			setError('Произошла ошибка при отправке запроса, попробуйте позже.');
			console.error(error);
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleLinkKeyDown = (e: React.KeyboardEvent<HTMLAnchorElement>, href: string) => {
		if (e.key === ' ' || e.key === 'Spacebar') {
			e.preventDefault();
			window.open(href, '_blank', 'noopener,noreferrer');
		}
	};

	const { onChange: onFirstNameChange, ...restFirstName } = register('firstName');

	const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;
		const filteredValue = value.replace(/[^a-zA-Zа-яА-ЯёЁ\s-]/g, '');
		e.target.value = filteredValue;
		onFirstNameChange(e);
	};

	// Обработчик изменения телефона с фильтрацией символов
	const { onChange: onPhoneChange, ...restPhone } = register('phone');

	const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		// Очищаем значение от неразрешенных символов
		const cleaned = e.target.value.replace(/[^\d()+\-\s]/g, '');

		// Если значение изменилось после очистки, обновляем его
		if (e.target.value !== cleaned) {
			e.target.value = cleaned;
		}

		// Передаем очищенное значение дальше
		onPhoneChange({
			...e,
			target: {
				...e.target,
				value: cleaned,
			},
		} as React.ChangeEvent<HTMLInputElement>);
	};

	const handlePhonePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
		event.preventDefault();
		const pastedText = event.clipboardData.getData('text');

		// Очищаем вставленный текст от неразрешенных символов
		const cleaned = pastedText.replace(/[^\d()+\-\s]/g, '');

		// Ограничиваем длину
		const limited = cleaned.substring(0, 20);

		// Вставляем обработанный текст
		const input = event.target as HTMLInputElement;

		// Получаем текущее значение и вставляем очищенный текст
		const currentValue = input.value;
		const selectionStart = input.selectionStart || 0;
		const selectionEnd = input.selectionEnd || 0;

		const newValue =
			currentValue.substring(0, selectionStart) + limited + currentValue.substring(selectionEnd);
		const finalValue = newValue.replace(/[^\d()+\-\s]/g, '').substring(0, 20);

		input.value = finalValue;

		// Триггерим событие изменения
		const changeEvent = new Event('input', { bubbles: true });
		input.dispatchEvent(changeEvent);
	};

	useEffect(() => {
		if (success) {
			window.location.href = '/demo-success';
		}
	}, [success]);

	return (
		<section
			className={`${styles.solutionForm} ${isLight && styles.light}`}
			id="solutionForm"
			ref={sectionRef}
		>
			<Typography variant="h2" className={`${styles.heading} ${isLight && styles.lightTitle}`}>
				{title}
			</Typography>

			<div className={styles.container}>
				<form
					className={`SolutionForm_form__JYK9w ${styles.form}`}
					onSubmit={handleSubmit(onSubmit)}
					noValidate
				>
					<Input
						label="Как вас зовут?"
						placeholder="Имя"
						{...restFirstName}
						onChange={handleFirstNameChange}
						error={errors.firstName?.message}
						required
					/>

					<Input
						label="Где вы работаете?"
						placeholder="Название компании"
						{...register('company')}
						error={errors.company?.message}
						required
					/>

					<Input
						label="Email"
						placeholder="test@test.com"
						type="email"
						{...register('email')}
						error={errors.email?.message}
						required
					/>

					<Input
						label="Телефон"
						placeholder="+XXXXXXXXXXXX"
						type="tel"
						{...restPhone}
						onChange={handlePhoneChange}
						onPaste={handlePhonePaste}
						error={errors.phone?.message}
						required
					/>

					<div className={styles.checkboxGroup}>
						<Checkbox
							variant="gray"
							checked={consentPrivacyPolicy}
							onChange={(e) => {
								setValue('consentPrivacyPolicy', e.target.checked, { shouldValidate: true });
							}}
							error={errors.consentPrivacyPolicy?.message}
						>
							Я ознакомлен с{' '}
							<a
								href={PRIVACY_POLICY_LINK}
								target="_blank"
								rel="noopener noreferrer"
								className={styles.policy}
								onKeyDown={(e) => handleLinkKeyDown(e, PRIVACY_POLICY_LINK)}
							>
								политикой обработки персональных данных
							</a>
						</Checkbox>

						<Checkbox
							variant="gray"
							checked={consentPersonalData}
							onChange={(e) => {
								setValue('consentPersonalData', e.target.checked, { shouldValidate: true });
							}}
							error={errors.consentPersonalData?.message}
						>
							Я даю согласие на{' '}
							<a
								href={PERSONAL_DATA_CONSENT_LINK}
								target="_blank"
								rel="noopener noreferrer"
								className={styles.policy}
								onKeyDown={(e) => handleLinkKeyDown(e, PERSONAL_DATA_CONSENT_LINK)}
							>
								обработку персональных данных
							</a>
						</Checkbox>

						<Checkbox
							variant="gray"
							checked={consentUserAgreement}
							onChange={(e) => {
								setValue('consentUserAgreement', e.target.checked, { shouldValidate: true });
							}}
							error={errors.consentUserAgreement?.message}
							hasError={!!errors.consentUserAgreement || !!agreementsError}
						>
							Я принимаю условия{' '}
							<a
								href={USER_AGREEMENT_LINK}
								target="_blank"
								rel="noopener noreferrer"
								className={styles.policy}
								onKeyDown={(e) => handleLinkKeyDown(e, USER_AGREEMENT_LINK)}
							>
								пользовательского соглашения
							</a>
						</Checkbox>

						<Checkbox
							variant="gray"
							checked={newsletterCheck}
							onChange={(e) => setValue('newsletterCheck', e.target.checked)}
						>
							Я согласен получать{' '}
							<a
								href={AD_CONSENT_LINK}
								target="_blank"
								rel="noopener noreferrer"
								className={styles.policy}
								onKeyDown={(e) => handleLinkKeyDown(e, AD_CONSENT_LINK)}
							>
								рекламные и информационные рассылки
							</a>
						</Checkbox>
					</div>

					{agreementsError && (
						<Typography variant="body-text" className={styles.agreementsError}>
							{agreementsError}
						</Typography>
					)}

					{error && (
						<Typography variant="body-text" className={styles.error}>
							{error}
						</Typography>
					)}

					<Button variant="primary" type="submit" fullWidth disabled={isSubmitting}>
						{isSubmitting ? 'Отправка...' : 'Свяжитесь с нами'}
					</Button>
				</form>
			</div>
		</section>
	);
};
