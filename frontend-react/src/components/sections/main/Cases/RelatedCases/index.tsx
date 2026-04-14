// src/components/RelatedCases/RelatedCases.tsx
'use client'; // Если используете App Router в Next.js

import React from 'react';
import Link from 'next/link';
import styles from './style.module.scss';
import { Typography } from '@/components/ui-kit';
import { CaseCard } from '../CaseCard';
import { CaseItem } from '../types';

interface RelatedCasesProps {
	allCases: CaseItem[];
	currentCaseId: number;
	count?: number; // Количество отображаемых кейсов
}

export const RelatedCases: React.FC<RelatedCasesProps> = ({
	allCases,
	currentCaseId,
	count = 3,
}) => {
	const filteredCases = allCases.filter((c) => c.id !== currentCaseId);
	const shuffled = [...filteredCases].sort(() => 0.5 - Math.random()).slice(0, count);

	if (shuffled.length === 0) {
		return null;
	}

	return (
		<section className={styles.wrapper}>
			<Typography as="h2" variant="h2" className={styles.title}>
				Похожие кейсы
			</Typography>
			<div className={styles.grid}>
				{shuffled.map((item) => (
					<Link href={`/case/${item.id}`} key={item.id}>
						<CaseCard key={item.id} item={item} />
					</Link>
				))}
			</div>
			<div className={styles.buttonContainer}>
				<Link href="/case" className={styles.button}>
					<Typography variant="body-lg" color="white">
						Показать еще
					</Typography>
				</Link>
			</div>
		</section>
	);
};
