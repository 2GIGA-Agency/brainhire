// components/FeatureSection/FeatureSection.tsx
import React from 'react';
import styles from './style.module.scss';
import { Typography } from '@/components/ui-kit';

// Более абстрактный тип для данных карточки
export interface FeatureCardData {
	id: number;
	icon: React.ReactNode;
	title: string;
	description: string;
}

// Новое имя для props интерфейса
interface FeatureSectionProps {
	title: string;
	subtitle: string;
	cards: FeatureCardData[];
	ctaText?: string;
	ctaLink?: string;
}

// Новое имя компонента: FeatureSection
export const FeatureSection: React.FC<FeatureSectionProps> = ({
	title,
	subtitle,
	cards,
	ctaText,
	ctaLink,
}) => {
	return (
		// Используем новый класс из SCSS модуля
		<section className={styles.featureSection}>
			<div className={styles.container}>
				<Typography variant="h2" as="h2" className={styles.sectionTitle}>
					{title}
				</Typography>

				<Typography variant="body-lg" color="text-secondary" className={styles.sectionSubtitle}>
					{subtitle}
				</Typography>

				{/* Используем новый класс */}
				<div className={styles.featureGrid}>
					{cards.map((card) => (
						// Используем новый класс
						<div key={card.id} className={styles.featureCard}>
							<div className={styles.cardIcon}>{card.icon}</div>
							<Typography variant="h3" as="h3" className={styles.cardTitle}>
								{card.title}
							</Typography>
							<Typography variant="body-md" color="text-secondary">
								{card.description}
							</Typography>
						</div>
					))}
				</div>

				{ctaText && ctaLink && (
					<a href={ctaLink} className={styles.ctaButton}>
						<Typography variant="body-lg" color="white" as="span">
							{ctaText}
						</Typography>
					</a>
				)}
			</div>
		</section>
	);
};
