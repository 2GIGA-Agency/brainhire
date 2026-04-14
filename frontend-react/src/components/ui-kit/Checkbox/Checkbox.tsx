'use client';

import React, { useRef, useId } from 'react';
import styles from './Checkbox.module.scss';
import { Typography } from '../Typography';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
	variant?: 'white' | 'gray';
	error?: string;
	withoutMargin?: boolean;
}

export const Checkbox: React.FC<CheckboxProps> = ({
	checked,
	disabled,
	onChange,
	variant = 'grey',
	error,
	withoutMargin = false,
	children,
	tabIndex,
	...props
}) => {
	const inputRef = useRef<HTMLInputElement>(null);
	const id = useId();

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			e.preventDefault();
			inputRef.current?.click();
		}
	};

	return (
		<>
			<div className={styles.checkboxContainer}>
				<label className={`${styles.checkboxWrapper} ${disabled ? styles.disabled : ''}`}>
					<input
						ref={inputRef}
						id={id}
						type="checkbox"
						className={styles.checkboxInput}
						checked={checked}
						disabled={disabled}
						onChange={onChange}
						onKeyDown={handleKeyDown}
						tabIndex={tabIndex}
						{...props}
					/>
					<span
						className={`${styles.checkboxLabel} ${checked ? styles.checked : ''} ${
							disabled ? styles.disabled : ''
						} ${variant === 'gray' ? styles.gray : styles.white}`}
					/>
				</label>
				{children && (
					// ИСПРАВЛЕННЫЙ БЛОК
					<label
						htmlFor={id}
						className={`${styles.textLabel} ${withoutMargin && styles.withoutMargin}`}
					>
						<Typography variant="caption" as="span">
							{children}
						</Typography>
					</label>
				)}
			</div>
			{error && <span className={styles.errorMessage}>{error}</span>}
		</>
	);
};
