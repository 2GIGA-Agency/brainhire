import React from 'react';
import styles from './style.module.scss';
import { Typography } from '@/components/ui-kit';
import { caseStudiesData } from '@/app/case/mockData';
import { CaseCard } from '../CaseCard';
import Link from 'next/link';
import { CategoryFilter } from '@/components/shared/CategoryFilter';

// 2. Серверные компоненты в App Router могут принимать searchParams как пропс
interface CaseStudiesProps {
	searchParams: {
		category?: string;
	};
}

export const CaseStudies = ({ searchParams }: CaseStudiesProps) => {
	// 3. Логика фильтрации выполняется на сервере
	const selectedCategory = searchParams.category;
	const filteredCases = selectedCategory
		? caseStudiesData.filter((item) => item.category === selectedCategory)
		: caseStudiesData;

	// 4. Список категорий также генерируется на сервере
	const categories = ['all', ...new Set(caseStudiesData.map((item) => item.category))];

	return (
		<div className={styles.container}>
			<header className={styles.header}>
				<Typography variant="h1" className={styles.title}>
					Кейсы из практики рекрутеров и эйчаров
				</Typography>
				<Typography variant="h2" as="p" color="text-secondary" className={styles.subtitle}>
					Рекрутинг – это не просто подбор персонала, а стратегический процесс, влияющий на успех
					компании...
				</Typography>
			</header>

			<div className={styles.filters}>
				{/* 5. Вставляем клиентский компонент, передавая ему список категорий */}
				<CategoryFilter title="Ниша" categories={categories} />
			</div>

			<main className={styles.grid}>
				{/* 6. Отображаем отфильтрованный на сервере список */}
				{filteredCases.map((item) => (
					<Link href={`/case/${item.id}`} key={item.id}>
						<CaseCard titleSized={true} item={item} />
					</Link>
				))}
			</main>
		</div>
	);
};
