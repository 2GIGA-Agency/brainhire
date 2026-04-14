'use client';
import React from 'react';
import styles from './Dropdown.module.scss';

interface DropdownProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
	label?: string;
	options: { value: string; label: string }[];
	value: string;
	placeholder?: string;
	error?: string;
	onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const Dropdown: React.FC<DropdownProps> = ({
	label,
	options,
	value,
	placeholder,
	error,
	onChange,
	...props
}) => {
	return (
		<div className={styles['dropdown-wrapper']}>
			{label && <label htmlFor={props.id}>{label}</label>}
			<select className={styles.dropdown} value={value} onChange={onChange} {...props}>
				{placeholder && (
					<option value="" disabled>
						{placeholder}
					</option>
				)}
				{options.map((option) => (
					<option key={option.value} value={option.value}>
						{option.label}
					</option>
				))}
			</select>

			{error && <span className={styles.errorMessage}>{error}</span>}
		</div>
	);
};
