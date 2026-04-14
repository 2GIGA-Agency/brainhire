import React, { ElementType, forwardRef } from 'react';
import styles from './Typography.module.scss';

type TypographyVariant =
	| 'h1'
	| 'h2'
	| 'h3'
	| 'h4'
	| 'h5'
	| 'h6'
	| 'subtitle'
	| 'body-lg'
	| 'body-md'
	| 'body-sm'
	| 'body-xs'
	| 'body-xss'
	| 'body-xss-bold'
	| 'body-xss-regular'
	| 'body-text'
	| 'caption';

type ColorType =
	| 'text-primary'
	| 'text-secondary'
	| 'brand-primary'
	| 'brand-secondary'
	| 'brand-primary-light'
	| 'brand-primary-white'
	| 'grey-1'
	| 'grey-2'
	| 'grey-3'
	| 'grey-4'
	| 'grey-5'
	| 'grey-500'
	| 'grey-800'
	| 'orange-400'
	| 'blue-1'
	| 'blue-2'
	| 'blue-3'
	| 'violet'
	| 'pink'
	| 'white'
	| 'green'
	| 'red'
	| string;

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
	variant: TypographyVariant;
	as?: ElementType;
	className?: string;
	color?: ColorType;
	margin?: string;
	padding?: string;
}

const headingTags: TypographyVariant[] = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];

export const Typography = forwardRef<HTMLElement, TypographyProps>(
	(
		{ variant, as, className = '', padding, margin, color = 'text-primary', children, ...props },
		ref
	) => {
		// 3. `ref` приходит как второй аргумент
		const defaultElement: ElementType = headingTags.includes(variant)
			? (variant as ElementType)
			: 'p';
		const Component = as || defaultElement;
		const colorClass = color ? styles[color] : '';

		return (
			<Component
				ref={ref} // 4. Передаем ref на реальный DOM-элемент
				className={`${styles[variant]} ${className} ${colorClass}`}
				style={{ margin, padding }}
				{...props}
			>
				{children}
			</Component>
		);
	}
);

Typography.displayName = 'Typography';
