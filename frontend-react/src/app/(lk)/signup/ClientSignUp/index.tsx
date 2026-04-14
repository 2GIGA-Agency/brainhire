'use client';

import { FormSelect } from '@/components/shared/Select';
import { Button } from '@/components/ui-kit/Button';
import { Checkbox } from '@/components/ui-kit/Checkbox';
import { Typography } from '@/components/ui-kit/Typography';
import { setRegistrationData } from '@/store/slices/registration';
import { useAppDispatch } from '@/store/store';
import axios from '@/utils/axios';
import { cleanHostRedirect } from '@/utils/cleanHostRedirect';
import { Box, Field, Flex, Input, Text, Textarea } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import styles from './style.module.scss';
import {
	AD_CONSENT_LINK,
	PERSONAL_DATA_CONSENT_LINK,
	PRIVACY_POLICY_LINK,
	USER_AGREEMENT_LINK,
} from '@/constants/links';
import { BackButton } from '@/components/shared/BackButton/BackButton';

type Inputs = {
	first_name: string;
	last_name: string;
	middle_name: string;
	email: string;
	phone: number;
	professional_role: string;
	company: {
		inn: number;
		company_name: string;
		company_description: string;
		size: string;
		hrs_count: string;
		vacancies_in_month: string;
	};
	// Разделяем на три отдельных чекбокса
	privacyPolicyCheck: boolean;
	personalDataCheck: boolean;
	userAgreementCheck: boolean;
	newsletterCheck: boolean;
};

const HRS_COUNT_CHOICES = [
	{ label: '0', value: '0' },
	{ label: '1', value: '1' },
	{ label: 'от 1 до 5 рекрутеров', value: '1-5' },
	{ label: 'от 5 до 10 рекрутеров', value: '5-10' },
	{ label: 'больше 10 рекрутеров', value: '<10' },
];

const VACANCIES_IN_MONTH_CHOICES = [
	{ label: 'от 1 до 5 вакансий', value: '1-5' },
	{ label: 'от 5 до 10 вакансий', value: '5-10' },
	{ label: 'от 10 до 20 вакансий', value: '10-20' },
	{ label: 'от 20 до 40 вакансий', value: '20-40' },
	{ label: 'от 40 до 100 вакансий', value: '40-100' },
	{ label: 'больше 100 вакансий', value: '<100' },
];

const COMPANY_SIZE_CHOICES = [
	{ label: 'до 20 сотрудников', value: '>20' },
	{ label: 'от 20 до 50 сотрудников', value: '20-50' },
	{ label: 'от 50 до 100 сотрудников', value: '50-100' },
	{ label: 'от 100 до 500 сотрудников', value: '100-500' },
	{ label: 'от 500 до 1000 сотрудников', value: '500-1000' },
	{ label: 'от 1000 до 5000 сотрудников', value: '1000-5000' },
	{ label: 'больше 5000 сотрудников', value: '<5000' },
];

export const ClientSignUp: React.FC = () => {
	const dispatch = useAppDispatch();
	const router = useRouter();

	const methods = useForm<Inputs>({
		defaultValues: {
			privacyPolicyCheck: false,
			personalDataCheck: false,
			userAgreementCheck: false,
			newsletterCheck: false,
		},
	});
	const {
		register,
		handleSubmit,
		control,
		setError: setFormError,
		formState: { errors },
		setValue,
		watch,
	} = methods;

	useEffect(() => {
		cleanHostRedirect();
	}, []);

	// Отслеживаем значения всех чекбоксов
	const privacyPolicyCheck = watch('privacyPolicyCheck');
	const personalDataCheck = watch('personalDataCheck');
	const userAgreementCheck = watch('userAgreementCheck');
	const newsletterCheck = watch('newsletterCheck');

	// Проверяем, все ли обязательные чекбоксы отмечены
	const areAllRequiredCheckboxesChecked =
		privacyPolicyCheck && personalDataCheck && userAgreementCheck;

	const [queryParam, setQueryParam] = useState('');

	useEffect(() => {
		if (typeof window !== 'undefined') {
			const params = new URLSearchParams(window.location.search);
			setQueryParam(params.get('referrer') || '');
		}
	}, []);

	const referrerQuery = queryParam ? `?referrer=${queryParam}` : '';

	const onSubmit: SubmitHandler<Inputs> = async (data) => {
		if (typeof yaCounter99950315 !== 'undefined') {
			yaCounter99950315.reachGoal('sent_form_SignUp_form__J_nFy');
		}

		try {
			const encodeToHex = (str: string) => {
				return str
					.split('')
					.map((char) => char.charCodeAt(0).toString(16))
					.join('');
			};

			const encodedEmail = encodeToHex(data.email);

			await axios.post('/api/email/send_code/', { email: data.email });

			dispatch(setRegistrationData(data));

			router.push(`/twostep/${encodedEmail}${referrerQuery}`);
		} catch (error: any) {
			const message =
				error.response?.data?.error || 'Произошла ошибка на сервере, попробуйте позже';

			setFormError('email', {
				type: 'server',
				message,
			});
		}
	};

	const handleLinkKeyDown = (e: React.KeyboardEvent<HTMLAnchorElement>, url: string) => {
		if (e.key === ' ') {
			e.preventDefault();
			e.stopPropagation();
			window.open(url, '_blank');
		}
	};

	return (
		<Box className={styles.loginContainer}>
			<BackButton />
			<Box className={styles.logo}>
				<Image src="/icons/Logo.svg" alt="" width={150} height={50} />
			</Box>
			<Typography variant="h4" className={styles.title} margin="0 0 32px">
				Регистрация
			</Typography>

			<FormProvider {...methods}>
				<form onSubmit={handleSubmit(onSubmit)} className={`SignUp_form__J_nFy ${styles.form}`}>
					{/* ... (все поля Input и Select остаются без изменений) ... */}
					<Box className={styles.personal_info_grid}>
						<Flex direction="column" justifyContent="center">
							{/* Личные данные */}
							<Field.Root invalid={!!errors.first_name}>
								<Field.Label>
									Имя
									<Field.RequiredIndicator />
								</Field.Label>
								<Input
									bg="white"
									placeholder="Иван"
									tabIndex={1}
									{...register('first_name', { required: 'Пожалуйста, введите имя' })}
								/>
								<Box className={styles.fieldError}>
									<Field.ErrorText>{errors.first_name?.message}</Field.ErrorText>
								</Box>
							</Field.Root>

							<Field.Root invalid={!!errors.last_name}>
								<Field.Label>
									Фамилия
									<Field.RequiredIndicator />
								</Field.Label>
								<Input
									bg="white"
									placeholder="Иванов"
									tabIndex={2}
									{...register('last_name', { required: 'Пожалуйста, введите фамилию' })}
								/>
								<Box className={styles.fieldError}>
									<Field.ErrorText>{errors.last_name?.message}</Field.ErrorText>
								</Box>
							</Field.Root>

							<Field.Root invalid={!!errors.middle_name}>
								<Field.Label>
									Отчество
									<Field.RequiredIndicator />
								</Field.Label>
								<Input
									bg="white"
									placeholder="Иванович"
									tabIndex={3}
									{...register('middle_name', { required: 'Пожалуйста, введите отчество' })}
								/>
								<Box className={styles.fieldError}>
									<Field.ErrorText>{errors.middle_name?.message}</Field.ErrorText>
								</Box>
							</Field.Root>
						</Flex>

						<Flex direction="column" alignItems="center">
							<Field.Root invalid={!!errors.phone}>
								<Field.Label>
									Телефон
									<Field.RequiredIndicator />
								</Field.Label>
								<Input
									bg="white"
									placeholder="89001234567"
									tabIndex={4}
									{...register('phone', {
										required: 'Пожалуйста, введите номер телефона',
										pattern: {
											value: /^(\+?7|8)[\s\-]?\(?\d{3}\)?[\s\-]?\d{3}[\s\-]?\d{2}[\s\-]?\d{2}$/,
											message: 'Неверный формат',
										},
									})}
								/>

								<Box className={styles.fieldError}>
									<Field.ErrorText>{errors.phone?.message}</Field.ErrorText>
								</Box>
							</Field.Root>

							<Field.Root invalid={!!errors.professional_role}>
								<Field.Label>
									Должность
									<Field.RequiredIndicator />
								</Field.Label>
								<Input
									bg="white"
									placeholder="Например, HR-специалист"
									tabIndex={5}
									{...register('professional_role', {
										required: 'Пожалуйста, введите вашу должность',
									})}
								/>
								<Box className={styles.fieldError}>
									<Field.ErrorText>{errors.professional_role?.message}</Field.ErrorText>
								</Box>
							</Field.Root>

							<Field.Root invalid={!!errors.email}>
								<Field.Label>
									Email
									<Field.RequiredIndicator />
								</Field.Label>
								<Input
									bg="white"
									placeholder="ivan.ivanov@example.com"
									tabIndex={6}
									{...register('email', {
										required: 'Пожалуйста, введите email',
										pattern: { value: /^\S+@\S+$/i, message: 'Неверный формат email' },
									})}
								/>
								<Box className={styles.fieldError}>
									<Field.ErrorText>{errors.email?.message}</Field.ErrorText>
								</Box>
							</Field.Root>
						</Flex>
					</Box>

					<Text textStyle="sm" fontWeight="600" mb={1} mt={1}>
						О компании
					</Text>
					<Box className={styles.company_inn}>
						<Field.Root invalid={!!errors.company?.company_name}>
							<Field.Label>
								Название компании
								<Field.RequiredIndicator />
							</Field.Label>
							<Input
								bg="white"
								placeholder="Например, ООО «АйтиПро»"
								tabIndex={7}
								{...register('company.company_name', {
									required: 'Пожалуйста, введите название компании',
								})}
							/>
							<Box className={styles.fieldError}>
								<Field.ErrorText className={styles.fieldError}>
									{errors.company?.company_name?.message}
								</Field.ErrorText>
							</Box>
						</Field.Root>

						<Field.Root invalid={!!errors.company?.inn}>
							<Field.Label>
								ИНН
								<Field.RequiredIndicator />
							</Field.Label>
							<Input
								placeholder="7707083893"
								bg="white"
								tabIndex={8}
								{...register('company.inn', {
									required: 'Пожалуйста, введите ИНН',
									pattern: { value: /^\d+$/, message: 'Неверный формат' },
								})}
							/>
							<Field.ErrorText className={styles.fieldError}>
								{errors.company?.inn?.message}
							</Field.ErrorText>
						</Field.Root>
					</Box>

					{/* Селекты */}
					<FormSelect
						name="company.hrs_count"
						label="Количество рекрутеров"
						control={control}
						rules={{ required: 'Пожалуйста, выберите количество рекрутеров' }}
						options={HRS_COUNT_CHOICES}
						placeholder="Выберите количество"
						tabIndex={9}
					/>

					<FormSelect
						name="company.vacancies_in_month"
						label="Количество вакансий в месяц"
						control={control}
						rules={{ required: 'Пожалуйста, выберите количество вакансий' }}
						options={VACANCIES_IN_MONTH_CHOICES}
						placeholder="Выберите количество вакансий"
						tabIndex={10}
					/>

					<FormSelect
						name="company.size"
						label="Размер компании"
						control={control}
						rules={{ required: 'Пожалуйста, выберите размер компании' }}
						options={COMPANY_SIZE_CHOICES}
						placeholder="Выберите размер компании"
						tabIndex={11}
					/>

					<Field.Root invalid={!!errors.company?.company_description} mb={5}>
						<Field.Label>
							Описание компании
							<Field.RequiredIndicator />
						</Field.Label>
						<Textarea
							placeholder="Напишите пару слов о компании..."
							bg="white"
							tabIndex={12}
							{...register('company.company_description', {
								required: 'Пожалуйста, напишите вкратце чем ваша компания занимается',
							})}
						/>
						<Field.ErrorText>{errors.company?.company_description?.message}</Field.ErrorText>
					</Field.Root>

					{/* === РАЗДЕЛЕННЫЕ ЧЕКБОКСЫ === */}
					<div className={styles.checkboxGroup}>
						{/* Чекбокс 1: Политика обработки персональных данных */}
						<Checkbox
							variant="gray"
							checked={privacyPolicyCheck}
							onChange={(e) =>
								setValue('privacyPolicyCheck', e.target.checked, { shouldValidate: true })
							}
							tabIndex={13}
						>
							Я ознакомлен с{' '}
							<a
								href={PRIVACY_POLICY_LINK}
								target="_blank"
								rel="noopener noreferrer"
								className={styles.policy}
								onKeyDown={(e) => handleLinkKeyDown(e, PRIVACY_POLICY_LINK)}
								tabIndex={14}
							>
								политикой обработки персональных данных
							</a>
						</Checkbox>

						{/* Чекбокс 2: Согласие на обработку персональных данных */}
						<Checkbox
							variant="gray"
							checked={personalDataCheck}
							onChange={(e) =>
								setValue('personalDataCheck', e.target.checked, { shouldValidate: true })
							}
							tabIndex={15}
						>
							Даю согласие на{' '}
							<a
								href={PERSONAL_DATA_CONSENT_LINK}
								target="_blank"
								rel="noopener noreferrer"
								className={styles.policy}
								onKeyDown={(e) => handleLinkKeyDown(e, PERSONAL_DATA_CONSENT_LINK)}
								tabIndex={16}
							>
								обработку персональных данных
							</a>
						</Checkbox>

						{/* Чекбокс 3: Пользовательское соглашение */}
						<Checkbox
							variant="gray"
							checked={userAgreementCheck}
							onChange={(e) =>
								setValue('userAgreementCheck', e.target.checked, { shouldValidate: true })
							}
							tabIndex={17}
						>
							Принимаю условия{' '}
							<a
								href={USER_AGREEMENT_LINK}
								target="_blank"
								rel="noopener noreferrer"
								className={styles.policy}
								onKeyDown={(e) => handleLinkKeyDown(e, USER_AGREEMENT_LINK)}
								tabIndex={18}
							>
								пользовательского соглашения
							</a>
						</Checkbox>

						{/* Чекбокс 4: Рекламные рассылки (необязательный) */}
						<Checkbox
							variant="gray"
							checked={newsletterCheck}
							onChange={(e) => setValue('newsletterCheck', e.target.checked)}
							tabIndex={19}
						>
							Я согласен получать{' '}
							<a
								href={AD_CONSENT_LINK}
								target="_blank"
								rel="noopener noreferrer"
								className={styles.policy}
								onKeyDown={(e) => handleLinkKeyDown(e, AD_CONSENT_LINK)}
								tabIndex={20}
							>
								рекламные и информационные рассылки
							</a>
						</Checkbox>
					</div>

					<Button
						variant="primary"
						type="submit"
						fullWidth
						disabled={!areAllRequiredCheckboxesChecked} // Запрещаем отправку, если не отмечены все обязательные чекбоксы
						tabIndex={21}
					>
						Зарегистрироваться
					</Button>
				</form>
			</FormProvider>

			<Typography variant="body-text" className={styles.registerText}>
				У вас есть аккаунт?{' '}
				<Link href="/signin" onKeyDown={(e) => handleLinkKeyDown(e, `/signin`)} tabIndex={22}>
					Войти
				</Link>
			</Typography>
		</Box>
	);
};
