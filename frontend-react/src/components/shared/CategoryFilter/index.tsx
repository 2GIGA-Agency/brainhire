'use client'; // Эта директива делает ТОЛЬКО этот компонент клиентским

import React from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import styles from './style.module.scss'; // Стили можно взять из вашего style.module.scss

interface CategoryFilterProps {
	title: string;
	categories: string[];
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({ title, categories }) => {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	// Определяем текущую активную категорию из URL
	const currentCategory = searchParams.get('category') || 'all';

	const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const newCategory = event.target.value;

		if (newCategory === 'all') {
			// Если выбраны "Все категории", переходим на URL без параметров
			router.push(pathname);
		} else {
			// Иначе, добавляем параметр ?category=...
			router.push(`${pathname}?category=${newCategory}`);
		}
	};

	return (
		<div className={styles.filterGroup}>
			<label htmlFor="niche">{title}</label>
			<select
				id="niche"
				className={styles.select}
				value={currentCategory}
				onChange={handleCategoryChange}
			>
				{categories.map((category) => (
					<option key={category} value={category}>
						{category === 'all' ? 'Все категории' : category}
					</option>
				))}
			</select>
		</div>
	);
};
