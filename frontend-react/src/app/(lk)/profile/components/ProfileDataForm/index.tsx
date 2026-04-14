// components/Profile/ProfileDataForm/ProfileDataForm.tsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Box } from '@chakra-ui/react';
import { Block } from '@/components/shared/Block';
import { LkField } from '@/components/shared/LkField';
import { InputFilters, LkInput } from '@/components/shared/LkInput';
import { LkButton } from '@/components/shared/LkButton';
import { Tips } from '../Tips';
import InputMaskWrapper from '@/components/shared/InputMaskWrapper';
import { Typo } from '@/components/shared/Typo/Typo';
import { COLORS } from '@/constants/colors';
import axios from '@/utils/axios';
import { toaster } from '@/components/ui/toaster';
import styles from './style.module.scss';
import { isEmailValid } from '@/utils/isEmailValid';

// Определяем тип для данных, которые компонент будет получать
interface ProfileData {
	first_name: string;
	last_name: string;
	middle_name: string;
	professional_role: string;
	email: string;
	phone: string;
}

// Определяем пропсы компонента
interface ProfileDataFormProps {
	initialData: ProfileData;
	onSaveSuccess: (updatedData: ProfileData) => void;
}

export const ProfileDataForm: React.FC<ProfileDataFormProps> = ({ initialData, onSaveSuccess }) => {
	// Состояния для полей ввода
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [middleName, setMiddleName] = useState('');
	const [role, setRole] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');

	// Ref для хранения предыдущих (изначальных) значений для сравнения
	const prevValuesRef = useRef<ProfileData | null>(null);

	// Эффект для синхронизации состояния с пропсами при их изменении
	useEffect(() => {
		if (initialData) {
			setFirstName(initialData.first_name);
			setLastName(initialData.last_name);
			setMiddleName(initialData.middle_name || '');
			setRole(initialData.professional_role);
			setEmail(initialData.email);
			setPhone(initialData.phone);

			// Сохраняем начальные значения в ref только один раз или при смене initialData
			if (!prevValuesRef.current || prevValuesRef.current.email !== initialData.email) {
				prevValuesRef.current = initialData;
			}
		}
}, [initialData]);

	// Проверяем, произошли ли изменения в данных профиля
	const hasChanges =
		prevValuesRef.current &&
		(firstName.trim() !== prevValuesRef.current.first_name ||
			lastName.trim() !== prevValuesRef.current.last_name ||
			(middleName || '').trim() !== (prevValuesRef.current.middle_name || '') ||
			(role || '').trim() !== (prevValuesRef.current.professional_role || '') ||
			email !== prevValuesRef.current.email ||
			phone !== prevValuesRef.current.phone);

	// Функция для сохранения данных профиля
	const saveProfile = () => {
		const lastNameValue = lastName.trim();
		const firstNameValue = firstName.trim();
		const middleNameValue = middleName.trim();
		const roleValue = role.trim();

		const validationErrors: string[] = [];

		if (firstNameValue === '') {
			validationErrors.push('Поле "Имя" не может быть пустым.');
		}

		if (lastNameValue === '') {
			validationErrors.push('Поле "Фамилия" не может быть пустым.');
		}

		if (!isEmailValid(email)) {
			validationErrors.push('Пожалуйста, введите корректный Email адрес.');
		}

		if (phone.includes('_')) {
			validationErrors.push('Пожалуйста, введите полный номер телефона.');
		}

		// 2. Если массив с ошибками не пуст, показываем их все и прерываем выполнение
		if (validationErrors.length > 0) {
			toaster.error({
				title: 'Введённые данные содержат ошибки',
				description: (
					<ul style={{ listStylePosition: 'inside' }}>
						{validationErrors.map((error, index) => (
							<li style={{ marginTop: '3px' }} key={index}>
								{error}
							</li>
						))}
					</ul>
				),
			});
			return; // Прерываем выполнение функции
		}

		const promise = axios.put<ProfileData>('/api/profiles/', {
			last_name: lastNameValue,
			first_name: firstNameValue,
			middle_name: middleNameValue || '',
			professional_role: roleValue,
			phone: phone,
			email: email,
		});

		toaster.promise(promise, {
			success: { title: 'Информация о пользователе обновлена' },
			error: { title: 'Ошибка при обновлении, попробуйте позже...' },
			loading: { title: 'Обновление информации о пользователе...' },
		});

		promise.then((res) => {
			const updatedData = res.data;
			// Обновляем ref новыми сохраненными данными, чтобы кнопка "Сохранить" стала неактивной
			prevValuesRef.current = {
				...updatedData,
				middle_name: updatedData.middle_name || '',
			};
			// Вызываем колбэк для родительского компонента
			onSaveSuccess(updatedData);
		});
	};

	return (
		<Block headingText="Общие данные" subHeadingText="Вы можете отредактировать свои данные">
			<Box className={styles.userEditFields}>
				<Box className={styles.userEditFieldsFio}>
					<LkField label="Фамилия" required>
						<LkInput
							allowedChars={InputFilters.onlyLetters}
							value={lastName}
							onChange={(e) => setLastName(e.target.value)}
						/>
					</LkField>
					<LkField label="Имя" required>
						<LkInput
							allowedChars={InputFilters.onlyLetters}
							value={firstName}
							onChange={(e) => setFirstName(e.target.value)}
						/>
					</LkField>
					<LkField label="Отчество">
						<LkInput
							allowedChars={InputFilters.onlyLetters}
							value={middleName}
							onChange={(e) => setMiddleName(e.target.value)}
						/>
					</LkField>
				</Box>

				<LkField label="Должность" required>
					<LkInput
						allowedChars={InputFilters.alphanumeric}
						value={role}
						onChange={(e) => setRole(e.target.value)}
					/>
				</LkField>
				<LkField label="Email" required>
					<LkInput
						allowedChars={InputFilters.email}
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</LkField>
				<LkField label="Телефон" required>
					<InputMaskWrapper
						mask="+7 (___) ___-__-__"
						replacement={{ _: /\d/ }}
						showMask={true}
						type="tel"
						value={phone}
						onChange={(e) => setPhone(e.target.value)}
					/>
				</LkField>
				<LkField label="Показывать подсказки?">
					<Tips />
				</LkField>
			</Box>
			<Box className={styles.saveButton}>
				<LkButton
					heightSize="medium"
					disabled={!hasChanges} // Кнопка заблокирована, если нет изменений
					onClick={saveProfile}
				>
					<Typo weight="semibold" color={COLORS.WHITE}>
						Сохранить изменения
					</Typo>
				</LkButton>
			</Box>
		</Block>
	);
};
