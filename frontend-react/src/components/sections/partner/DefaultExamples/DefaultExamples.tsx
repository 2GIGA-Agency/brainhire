'use client';

import { Container, Typography } from '@/components/ui-kit';
import Image from 'next/image';
import styles from './DefaultExamples.module.scss';

export const DefaultExamples = () => (
	<Container>
		<Typography variant="h2" className={styles.title}>
			Примеры расчетов
		</Typography>
		<Typography variant="h3" className={styles.subTitle}>
			10 компаний, каждая тратит 200 000 руб./месяц:
		</Typography>
		<div className={styles.calculations}>
			<div className={styles.x10}>
				<Image src="/icons/calculate.svg" width={96} height={96} alt="Calculate" />
				<Typography variant="h4" className={styles.x10Text}>
					x10
				</Typography>
			</div>
			<div className={styles.block}>
				<div className={styles.calcData}>
					<Typography variant="body-xss" color="grey-4">
						Процент вознаграждения
					</Typography>
					<Typography variant="subtitle">5%</Typography>
				</div>
				<div className={styles.lineCalc}></div>
				<div className={styles.calcData}>
					<Typography variant="body-xss" color="grey-4">
						Компания тратит в месяц
					</Typography>
					<Typography variant="subtitle">200 000 ₽</Typography>
				</div>
			</div>
			<div className={styles.benefit}>
				<Typography variant="h4" color="white">
					100 000 ₽/месяц
				</Typography>
			</div>
		</div>
		<Typography variant="h3" className={styles.attentionText}>
			<span className={styles.attention}>Важно:</span> Каждый месяц вы будете{' '}
			<strong>продолжать получать 5%</strong> от всех депозитов привлечённых вами клиентов. Сумма
			будет увеличиваться или уменьшаться только в зависимости от активности клиентов.
		</Typography>
	</Container>
);
