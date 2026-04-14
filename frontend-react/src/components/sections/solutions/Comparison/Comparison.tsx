import { Typography } from '@/components/ui-kit/Typography';
import React from 'react';
import styles from './Comparison.module.scss';
import { ComparisonCard } from './ComparisonCard';

interface ComparisonProps {
	backgroundColor?: string;
}

export const Comparison: React.FC<ComparisonProps> = ({ backgroundColor }) => {
	const manualItems = [
		'30-36 дней на подбор',
		'Ручной монотонный скрининг резюме',
		'Обратная связь с кандидатами задерживается, что вызывает негативное впечатление о компании',
	];

	const automationItems = [
		'7-14 дней на закрытие вакансии',
		'Мгновенный ИИ-анализ, скоринг соответствия требованиям и автоматические приглашения/отказы',
		'Автоматическое ИИ-видеоинтервью с тестированием и прокторингом, доступное кандидатам 24/7',
	];

	return (
		<section
			className={styles.comparison}
			style={backgroundColor ? { backgroundColor } : undefined}
		>
			<Typography variant="h2" className={styles.title}>
				Ускорьте процесс найма с помощью функции автоматизации
			</Typography>

			<div className={styles.blocks}>
				<ComparisonCard title="Ручной метод" items={manualItems} variant="manual" />

				<ComparisonCard
					title="Автоматизация BRaiN HR"
					items={automationItems}
					variant="automation"
				/>
			</div>
		</section>
	);
};
