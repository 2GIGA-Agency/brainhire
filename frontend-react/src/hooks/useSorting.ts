// src/hooks/useSorting.ts
import { useState, useMemo } from 'react';

export type Ordering<T> = {
	order: keyof T | '';	
	value: 0 | 1 | 2; // 0: unsorted, 1: asc, 2: desc
};

// Определим SortType здесь, чтобы не дублировать в компонентах
export type SortType = 'number' | 'date' | 'string' | 'nestedString';

export const useSorting = <T extends Record<string, any>>(
	// Изменено: initialData -> data для ясности
	data: T[],
	initialOrdering: Ordering<T> = { order: '', value: 0 }
) => {
	const [ordering, setOrdering] = useState<Ordering<T>>(initialOrdering);

	const handleSort = (dataKey: keyof T) => {
		setOrdering((prev) => {
			const nextValue = prev.order === dataKey ? (prev.value + 1) % 3 : 1;
			return {
				order: dataKey,
				value: nextValue as 0 | 1 | 2,
			};
		});
	};

	const sortedData = useMemo(() => {
		if (ordering.value === 0 || !ordering.order) {
			return data;
		}

		const sorted = [...data].sort((a, b) => {
			const aValue = a[ordering.order];
			const bValue = b[ordering.order];

			// Для вложенного объекта company
			if (
				typeof aValue === 'object' &&
				aValue !== null &&
				'company_name' in aValue &&
				typeof bValue === 'object' &&
				bValue !== null &&
				'company_name' in bValue
			) {
				const aCompany = (aValue as any).company_name;
				const bCompany = (bValue as any).company_name;
				return bCompany.localeCompare(aCompany);
			}

			// Определяем тип "на лету" для большей гибкости

			let sortType;

			if (parseFloat(aValue)) {
				sortType = 'number';
			} else {
				sortType =
					typeof aValue === 'number'
						? 'number'
						: !isNaN(new Date(aValue as string).getTime())
							? 'date'
							: 'string';
			}

			switch (sortType) {
				case 'number':
					return Number(parseFloat(bValue)) - Number(parseFloat(aValue));
				case 'date':
					return new Date(bValue as string).getTime() - new Date(aValue as string).getTime();
				case 'string':
					return String(bValue).localeCompare(String(aValue));
				default:
					return 0;
			}
		});

		return ordering.value === 2 ? sorted.reverse() : sorted;
	}, [data, ordering]); // Зависимость от data и ordering

	return { sortedData, ordering, handleSort };
};
