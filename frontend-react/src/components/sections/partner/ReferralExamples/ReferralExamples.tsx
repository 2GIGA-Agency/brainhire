import { Typography } from '@/components/ui-kit';
import styles from './ReferralExamples.module.scss';
import React from 'react';

export const ReferralExamples = () => (
	<>
		<Typography variant="h2" className={styles.calcTitle}>
			Примеры расчетов
		</Typography>
		<div className={styles.examplesContainer}>
			<div className={styles.examplesContainerTitle}>
				<Typography variant="body-lg">
					Зарабатывайте на внедрении AI в HR-процессы компаний!
				</Typography>
			</div>
			<div className={styles.examplesStatuses}>
				<Typography variant="body-lg">Три статуса</Typography>
				<ul className={styles.examplesStatusesList}>
					<li>
						<span className={styles.examplesStatusesMedal}>🥉</span>{' '}
						<Typography variant={'body-xss-bold'}>
							Bronze <span>— 15% комиссии</span>
						</Typography>
					</li>
					<li>
						<span className={styles.examplesStatusesMedal}>🥈</span>{' '}
						<Typography variant={'body-xss-bold'}>
							Silver <span>— 20% комиссии</span>
						</Typography>
					</li>
					<li>
						<span className={styles.examplesStatusesMedal}>🥇</span>{' '}
						<Typography variant={'body-xss-bold'}>
							Gold <span>— 25% комиссии</span>
						</Typography>
					</li>
				</ul>
			</div>
			<div className={styles.examplesCalculations}>
				<Typography variant="body-lg" className={styles.examplesCalculationsTitle}>
					Примеры расчетов
				</Typography>
				<Typography variant="body-lg" className={styles.examplesCalculationsSubtitle}>
					10 компаний, каждая тратит 200 000 руб./месяц:
				</Typography>
				<div className={styles.examplesCalculationsContent}>
					<div className={styles.examplesCalculationsVisual}>
						<span className={styles.examplesCalculationsVisualIcon}>💼</span>
						<span className={styles.examplesCalculationsVisualMultiplier}>x10</span>
					</div>
					<div className={styles.examplesCalculationsItems}>
						<div className={styles.examplesCalculationsItem}>
							<div className={styles.examplesCalculationsItemContent}>
								<Typography variant="body-text" className={styles.examplesCalculationsItemTitle}>
									Процент вознаграждения
								</Typography>
								<Typography variant="body-text" className={styles.examplesCalculationsItemValue}>
									15 %
								</Typography>
							</div>
						</div>
						<div className={styles.examplesCalculationsItem}>
							<div className={styles.examplesCalculationsItemContent}>
								<Typography variant="body-text" className={styles.examplesCalculationsItemTitle}>
									Средние расходы компании
								</Typography>
								<Typography variant="body-text" className={styles.examplesCalculationsItemValue}>
									200 000 ₽/месяц
								</Typography>
							</div>
						</div>
					</div>
					<div className={styles.examplesCalculationsResult}>
						<Typography variant="body-lg">300 000 ₽/месяц</Typography>
					</div>
				</div>
			</div>
		</div>
	</>
);
