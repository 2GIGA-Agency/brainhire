import { Typography } from '@/components/ui-kit/Typography';
import React from 'react';
import styles from './style.module.scss';

export interface ComparisonCardProps {
	title: string;
	items: string[];
	backgroundColor?: string;
	textColor?: string;
	variant?: 'manual' | 'automation' | 'default';
	className?: string;
}

export const ComparisonCard: React.FC<ComparisonCardProps> = ({
	title,
	items,
	backgroundColor,
	textColor,
	variant = 'default',
	className = '',
}) => {
	const cardStyle: React.CSSProperties = {
		...(backgroundColor && { backgroundColor }),
		...(textColor && { color: textColor }),
	};

	const getVariantClass = () => {
		switch (variant) {
			case 'manual':
				return styles.manual;
			case 'automation':
				return styles.automation;
			default:
				return '';
		}
	};

	return (
		<div className={`${styles.card} ${getVariantClass()} ${className}`} style={cardStyle}>
			<Typography variant="h2" className={styles.title}>
				{title}
			</Typography>
			<ul className={styles.list}>
				{items.map((item, index) => (
					<li key={index}>
						<Typography variant="h5" className={styles.listItem}>{item}</Typography>
					</li>
				))}
			</ul>
		</div>
	);
};
