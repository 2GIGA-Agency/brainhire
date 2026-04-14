// src/components/CaseInfoBlock/CaseInfoBlock.tsx

import React from 'react';
import styles from './style.module.scss';
import { Typography } from '@/components/ui-kit';

// Пропсы для нашего компонента
interface CaseInfoBlockProps {
	title: string;
	intro: string;
	points: string[];
	backgroundColor: string;
	icon?: React.ReactNode; // Иконка, как на макете (опционально)
}

export const CaseInfoBlock: React.FC<CaseInfoBlockProps> = ({
	title,
	intro,
	points,
	backgroundColor,
	icon,
}) => {
	return (
		<section className={styles.wrapper} style={{ backgroundColor }}>
			<div className={styles.header}>
				{icon && <div className={styles.iconWrapper}>{icon}</div>}
				<Typography as="h2" variant="h3">
					{title}
				</Typography>
			</div>

			<Typography variant="body-md" className={styles.intro}>
				{intro}
			</Typography>

			<ul className={styles.list}>
				{points.map((point, index) => (
					<li key={index} className={styles.listItem}>
						<Typography variant="body-md">{point}</Typography>
					</li>
				))}
			</ul>
		</section>
	);
};
