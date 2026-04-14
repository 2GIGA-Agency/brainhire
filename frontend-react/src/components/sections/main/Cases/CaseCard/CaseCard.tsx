import React from 'react';
import styles from './CaseCard.module.scss';
import { Typography } from '@/components/ui-kit';
import { ClockIcon } from '@icons/TSXIcons';
import { CaseItem } from '../types';

interface CaseCardProps {
	item: CaseItem;
	titleSized?: boolean;
}

export const CaseCard: React.FC<CaseCardProps> = ({ item, titleSized = false }) => {
	return (
		<div className={styles.card}>
			{/* <Image src={item.image} alt={item.title} className={styles.image} /> */}
			<div className={styles.content}>
				<div className={styles.meta}>
					<span className={styles.category}>{item.category}</span>
					<Typography variant="body-xs" color="text-secondary">
						{item.date}
					</Typography>
				</div>
				<Typography variant={`${titleSized ? `h2` : 'h3'}`} className={styles.title}>
					{item.title}
				</Typography>
				<Typography variant="body-md" color="text-secondary" className={styles.description}>
					{item.description}
				</Typography>
			</div>
			<div className={styles.footer}>
				<div className={styles.author}>
					{/* <Image src={item.author.avatar} alt={item.author.name} className={styles.avatar} /> */}
					<Typography variant="body-sm">{item.author.name}</Typography>
				</div>
				<div className={styles.stats}>
					<div className={styles.statItem}>
						<ClockIcon />
						<Typography variant="body-sm" color="text-secondary">
							{item.readTime} мин
						</Typography>
					</div>
				</div>
			</div>
		</div>
	);
};
