import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import styles from './Button.module.scss';

// Даня прости за такое количество secondary, мне в падлу придумывать что-то новое, потом исправим (наверное)
type ButtonVariant =
	| 'primary'
	| 'secondary1'
	| 'secondary2'
	| 'secondary3'
	| 'secondary4' // Продолжить в создании вакансии (Оранжевая с белым текстом)
	| 'secondary5'
	| 'secondary6' // Отмена и Назад на странице создания (серая рамка с белым фоном)
	| 'teal'
	| 'auth';
type ButtonSize = 'L' | 'M' | 'S' | 'XS';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: ButtonVariant;
	size?: ButtonSize;
	disabled?: boolean;
	as?: 'button' | 'link';
	href?: string;
	maxWidth?: string;
	fullWidth?: boolean;
	icon?: string;
}

export const Button: React.FC<ButtonProps> = ({
	variant = 'primary',
	size = 'M',
	disabled = false,
	as = 'button',
	href,
	maxWidth,
	fullWidth = false,
	icon,
	children,
	...props
}) => {
	const classNames = [
		styles.button,
		styles[variant],
		size === 'L' ? styles.large : size === 'S' ? styles.small : size == 'XS' ? styles.xsmall : '',
		disabled ? styles.disabled : '',
		fullWidth ? styles.fullWidth : '',
		icon ? styles.withIcon : '',
	]
		.filter(Boolean)
		.join(' ');

	const style = {
		maxWidth: maxWidth || 'unset',
	};

	const content = (
		<>
			{icon && <Image src={icon} alt="Auth Icon" width={24} height={24} />}
			<span>{children}</span>
		</>
	);

	if (as === 'link' && href) {
		return (
			<Link href={href} className={classNames} style={style}>
				{content}
			</Link>
		);
	}

	return (
		<button className={classNames} disabled={disabled} style={style} {...props}>
			{content}
		</button>
	);
};
