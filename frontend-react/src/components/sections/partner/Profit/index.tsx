// components/Profit/Profit.tsx
'use client';

import { Container, Typography } from '@/components/ui-kit';
import React, { useEffect, useRef, useState } from 'react';
import { ProfitCard } from './ProfitCard';
import styles from './Profit.module.scss';

interface Props {
	forWho: string | React.ReactElement;
	rewards: string | React.ReactElement;
	benefits: string | React.ReactElement;
}

export const Profit = ({ forWho, rewards, benefits }: Props) => {
	const [animated, setAnimated] = useState(false);
	const cardsRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				const [entry] = entries;
				if (entry.isIntersecting) {
					setAnimated(true);
				} else {
					setAnimated(false);
				}
			},
			{
				threshold: 0.2,
			}
		);

		const current = cardsRef.current;
		if (current) {
			observer.observe(current);
		}

		return () => {
			if (current) {
				observer.unobserve(current);
			}
		};
	}, []);

	return (
		<Container>
			<Typography variant="h2" className={styles.title}>
				BRaiN HR - партнерство с долей дохода
			</Typography>

			<div className={styles.cards} ref={cardsRef}>
				<ProfitCard
					iconSrc="/icons/partner1.svg"
					title="Для кого"
					content={forWho}
					className={`${styles.card1} ${animated ? styles.animated : ''}`}
					animated={animated}
				/>

				<ProfitCard
					iconSrc="/icons/partner2.svg"
					title="Вознаграждение"
					content={rewards}
					className={`${styles.card2} ${animated ? styles.animated : ''}`}
					animated={animated}
				/>

				<ProfitCard
					iconSrc="/icons/partner3.svg"
					title="Преимущества"
					content={benefits}
					className={`${styles.card3} ${animated ? styles.animated : ''}`}
					animated={animated}
				/>
			</div>
		</Container>
	);
};
