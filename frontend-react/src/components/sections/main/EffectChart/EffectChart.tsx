'use client';

import { Typography } from '@/components/ui-kit/Typography';
import { useEffect, useState } from 'react';
import { Bar, BarChart, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import styles from './EffectChart.module.scss';

// Данными могут быть любые числа в диапазоне 0–100.
// Для наглядности возьмем 60, 70, 80, как на графике.
const data = [
	{ name: 'Эффективность', value: 62 },
	{ name: 'Затраты', value: 78 },
	{ name: 'Скорость найма', value: 89 },
];

const COLORS = ['#66ceb2', '#9ee3ee', '#aeb8c4'];

export const EffectChart = () => {
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		function handleResize() {
			setIsMobile(window.innerWidth < 540);
		}
		handleResize(); // вызвать при первой загрузке
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	return (
		<section className={styles.effectChart}>
			<div className={styles.container}>
				<Typography variant="h2" className={styles.heading}>
					Эффект от внедрения <strong>ИИ</strong> в процесс найма
				</Typography>
				<div className={styles.text}>
					<Typography variant="subtitle" margin="0 0 15px">
						Компании использующие <strong>ИИ</strong> в работе:
					</Typography>
					<Typography variant="body-sm" color="text-secondary" margin="0 0 10px">
						<span className={styles.percent}>62%</span> повысили общую эффективность
					</Typography>
					<Typography variant="body-sm" color="text-secondary" margin="0 0 10px">
						<span className={styles.percent}>78%</span> сократили расходы
					</Typography>
					<Typography variant="body-sm" color="text-secondary" margin="0 0 10px">
						<span className={styles.percent}>89%</span> увеличили скорость найма
					</Typography>
				</div>

				<div className={styles.chartContainer}>
					<ResponsiveContainer width="100%" height={300}>
						<BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
							<XAxis dataKey="name" tick={{ fontSize: isMobile ? 9 : 12 }} />
							<YAxis domain={[0, 100]} />
							<Tooltip
								formatter={(value) => [`${value}%`]}
								labelFormatter={(label) => `${label}`}
							/>
							<Bar dataKey="value" radius={[10, 10, 0, 0]}>
								{data.map((entry, index) => (
									<Cell key={`cell-${index}`} fill={COLORS[index]} />
								))}
							</Bar>
						</BarChart>
					</ResponsiveContainer>
				</div>
				<Typography variant="body-sm" color="text-secondary" margin="20px 0">
					*ai.gov.ru - 2024 Искусственный интеллект в HR и данные опросов Mercer, LinkedIn,
					HeadHunter, Workable
				</Typography>
				{/* <Typography variant="h6" className={styles.description}>
					Идеальный джоб-оффер — это не просто предложение о работе, а ключевой инструмент для
					привлечения и удержания талантливых специалистов. В статье разберем, какие элементы должны
					быть в оффере, чтобы он был убедительным, прозрачным и выгодным как для работодателя, так
					и для кандидата.
				</Typography> */}
			</div>
		</section>
	);
};
