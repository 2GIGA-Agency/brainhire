// components/ProfitCard/ProfitCard.tsx
'use client';

import { Typography } from '@/components/ui-kit';
import Image from 'next/image';
import React from 'react';
import styles from './style.module.scss';

interface ProfitCardProps {
	iconSrc: string;
	title: string;
	content: string | React.ReactElement;
	className?: string;
	animated?: boolean;
}

export const ProfitCard = ({
	iconSrc,
	title,
	content,
	className = '',
	animated = false,
}: ProfitCardProps) => {
	return (
		<div className={`${styles.profitCard} ${className} ${animated ? styles.animated : ''}`}>
			<Image src={iconSrc} width={80} height={80} alt="" className={styles.partnersImg} />
			<Typography variant="h3" className={styles.cardTitle}>
				{title}
			</Typography>
			<div className={styles.line}></div>
			<Typography variant="body-md" className={styles.cardContent}>{content}</Typography>
		</div>
	);
};
