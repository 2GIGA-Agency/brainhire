// Файл: components/LkInput/LkInput.tsx

'use client';

import { Input, InputProps, InputGroup } from '@chakra-ui/react';
import React, { ChangeEvent, useCallback } from 'react';
import styles from './style.module.scss';

// ИЗМЕНЕНИЕ: Расширяем интерфейс пропсов, добавляя все возможные пропсы от InputMask
export interface LkInputProps extends InputProps {
	type?: 'text' | 'number' | 'email' | 'password' | 'tel';
	placeholder?: string;
	value?: string | number;
	icon?: React.ReactElement;
	hasActions?: boolean;
	min?: number;
	max?: number;
	allowedChars?: RegExp;
	maxLength?: number;
	onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
	onBlur?: () => void;
}

export const InputFilters = {
	onlyLetters: /^[a-zA-Zа-яА-ЯёЁ\s-]+$/,
	onlyNumbers: /^[0-9]+$/,
	alphanumeric: /^[a-zA-Zа-яА-ЯёЁ0-9\s-]+$/,
	noSpecialChars: /^[a-zA-Zа-яА-ЯёЁ0-9\s\-_@.]+$/,
	phoneNumber: /^[0-9+()-]+$/,
	email: /^[a-zA-Z0-9@._-]+$/,
};

export const LkInput = React.memo(
	({
		type = 'text',
		placeholder = '',
		value = '',
		icon,
		onChange,
		onBlur,
		min,
		max,
		maxLength,
		allowedChars,
		// ИЗМЕНЕНИЕ: Явно извлекаем проп 'mask', чтобы использовать его в условии
		mask,
		// ИЗМЕНЕНИЕ: Все остальные пропсы (включая пропсы маски и стандартные) попадают в `...props`
		...props
	}: LkInputProps) => {
		const filterInput = useCallback(
			(inputValue: string): string => {
				let filteredValue = inputValue;

				if (allowedChars) {
					filteredValue = filteredValue
						.split('')
						.filter((char) => allowedChars.test(char))
						.join('');
				}

				if (maxLength !== undefined && filteredValue.length > maxLength) {
					filteredValue = filteredValue.substring(0, maxLength);
				}

				return filteredValue;
			},
			[allowedChars, maxLength]
		);

		const handleChange = useCallback(
			(e: ChangeEvent<HTMLInputElement>) => {
				if (mask) {
					if (onChange) onChange(e);
					return;
				}

				if (type !== 'number' && allowedChars) {
					const filteredValue = filterInput(e.target.value);
					const syntheticEvent = {
						...e,
						target: { ...e.target, value: filteredValue },
						currentTarget: { ...e.currentTarget, value: filteredValue },
					};
					if (onChange) onChange(syntheticEvent);
					return;
				}

				if (onChange) {
					onChange(e);
				}
			},
			[type, allowedChars, filterInput, onChange, mask] // Добавляем mask в зависимости
		);

		const renderInput = () => {
			const commonProps = {
				placeholder,
				value,
				onChange: handleChange,
				onBlur,
				className: styles.input,
				...props,
			};

			switch (type) {
				case 'number':
					return <Input type="number" min={min} max={max} {...commonProps} />;
				case 'email':
					return <Input type="email" autoComplete="email" {...commonProps} />;
				case 'password':
					return <Input type="password" autoComplete="current-password" {...commonProps} />;
				case 'tel':
					return <Input type="tel" autoComplete="tel" {...commonProps} />;
				default:
					return <Input type="text" {...commonProps} />;
			}
		};

		// InputGroup остается без изменений
		return <InputGroup startElement={icon}>{renderInput()}</InputGroup>;
	}
);

LkInput.displayName = 'LkInput';
