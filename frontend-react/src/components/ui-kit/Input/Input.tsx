// Файл: components/ui-kit/Input/Input.tsx

'use client';

import React, { forwardRef } from 'react';
import styles from './Input.module.scss';
import { InputMask } from '@react-input/mask';
import type { ComponentPropsWithoutRef } from 'react';

type InputProps =
	// Добавляем все стандартные атрибуты для <input> (placeholder, type, disabled и т.д.)
	React.InputHTMLAttributes<HTMLInputElement> &
		// Добавляем все пропсы из библиотеки @react-input/mask (mask, replacement, showMask и т.д.)
		ComponentPropsWithoutRef<typeof InputMask> & {
			// Добавляем наши собственные кастомные пропсы
			label?: string;
			margin?: string;
			suffix?: string;
			error?: string;
		};

export const Input = forwardRef<HTMLInputElement, InputProps>((allProps, ref) => {
	// Деструктурируем пропсы, чтобы отделить наши кастомные от остальных
	const {
		label,
		margin,
		suffix,
		style,
		error,
		className,
		// Явно "вытаскиваем" mask, чтобы использовать его в условии
		mask,
		// Все остальные пропсы (стандартные и от маски) остаются в 'restProps'
		...restProps
	} = allProps;

	return (
		<div className={`${styles['input-wrapper']} ${className || ''}`} style={{ margin, ...style }}>
			{label && <label htmlFor={restProps.id}>{label}</label>}
			<div className={styles['input-container']}>
				{mask ? (
					// Если есть маска, используем InputMask
					<InputMask
						// Передаем маску и все остальные пропсы
						mask={mask}
						{...restProps}
						// Корректно передаем ref
						ref={ref}
						className={styles.input}
					/>
				) : (
					// Если маски нет, используем обычный input
					<input className={styles.input} {...restProps} ref={ref} />
				)}
				{suffix && <span className={styles.suffix}>{suffix}</span>}
			</div>
			{error && <span className={styles.errorMessage}>{error}</span>}
		</div>
	);
});

Input.displayName = 'Input';
