// src/components/CaseResultsChart/CaseResultsChart.tsx
'use client';

import React from 'react';
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import styles from './style.module.scss';
import { CaseItem } from '@/components/sections/main';
import { Typography } from '@/components/ui-kit';

// Тип для пропсов, извлекаем его из основного типа CaseItem
type MetricsProps = {
	metrics: CaseItem['details']['results']['chartsAndMetrics'];
};

// Кастомный тултип для графика, как на макете
const CustomTooltip = ({ active, payload, label }: any) => {
	if (active && payload && payload.length) {
		return (
			<div className={styles.customTooltip}>
				<p className={styles.tooltipLabel}>{label}</p>
				<p className={styles.tooltipValue}>{`${payload[0].value} чел/мес`}</p>
			</div>
		);
	}
	return null;
};

export const CaseResultsChart: React.FC<MetricsProps> = ({ metrics }) => {
	if (!metrics) {
		return null;
	}

	const { mainHighlights, growthChart } = metrics;

	return (
		<section className={styles.wrapper}>
			<div className={styles.chartSide}>
				<ResponsiveContainer width="100%" height={300}>
					<BarChart data={growthChart.data} margin={{ top: 5, right: 0, left: -20, bottom: 5 }}>
						<XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fontSize: 14 }} />
						<YAxis tickLine={false} axisLine={false} tick={{ fontSize: 14 }} />
						<Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
						<Bar dataKey="value" fill="#5470C6" radius={[8, 8, 0, 0]} barSize={30}>
							{/* Можно использовать <Cell> если нужны разные цвета, но здесь один */}
						</Bar>
					</BarChart>
				</ResponsiveContainer>
			</div>

			<div className={styles.metricsSide}>
				{mainHighlights.map((highlight, index) => (
					<div key={index} className={styles.highlightBlock}>
						<Typography variant="h2" color="brand-primary" className={styles.highlightValue}>
							{highlight.value}
						</Typography>
						<Typography variant="body-md" color="text-secondary">
							{highlight.label}
						</Typography>
					</div>
				))}

				<hr className={styles.divider} />

				<div className={styles.growthBlock}>
					<Typography variant="h2" className={styles.growthTitle}>
						{growthChart.title}
					</Typography>
					<Typography variant="body-md" color="text-secondary">
						{growthChart.description}
					</Typography>
				</div>
			</div>
		</section>
	);
};
