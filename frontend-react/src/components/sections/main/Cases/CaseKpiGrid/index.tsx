// src/components/KpiGrid/KpiGrid.tsx

import React from 'react';
import styles from './style.module.scss';
import { KpiMetric } from '../types';
import { Typography } from '@/components/ui-kit';

interface KpiGridProps {
	kpi: KpiMetric[];
}

export const CaseKpiGrid: React.FC<KpiGridProps> = ({ kpi }) => {
	// Берем только первые 4 элемента на случай, если в данных их больше
	const kpiItems = kpi.slice(0, 4);

	return (
		<section className={styles.wrapper}>
			<div className={styles.grid}>
				{kpiItems.map((item, index) => (
					<div key={index} className={styles.kpiItem}>
						<Typography variant="h2" color="white" className={styles.kpiValue}>
							{item.value}
						</Typography>
						<Typography variant="body-lg" color="white" className={styles.kpiLabel}>
							{item.label}
						</Typography>
					</div>
				))}
			</div>
		</section>
	);
};
