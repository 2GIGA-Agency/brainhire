import { Typography } from '@/components/ui-kit/Typography';
import Image from 'next/image';
import React from 'react';
import styles from './Card.module.scss';

interface CardProps {
	title: string;
	description: string;
	variant?: 'default' | 'highlighted';
	backgroundColor?: string;
	number?: string;
	icon?: string;
}

export const Card: React.FC<CardProps> = ({
	title,
	description,
	variant = 'default',
	backgroundColor,
	number,
	icon,
}) => {
	return (
		<div
			className={`${styles.card} ${variant === 'highlighted' ? styles.highlighted : ''}`}
			style={{ backgroundColor }}
		>
			{icon && (
				<div className={styles.header}>
					<Image src={icon} alt="Icon" width={46} height={46} />
					{number && <span className={styles.number}>{number}</span>}
				</div>
			)}
			<Typography variant="h3" className={styles.cardTitle}>
				{title}
			</Typography>
			<Typography variant="body-text">{description}</Typography>
		</div>
	);
};
