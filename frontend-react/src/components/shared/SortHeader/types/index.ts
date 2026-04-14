export interface SortHeaderProps {
	sortType: string;
	title: string;
	ordering: Ordering;
}

export interface Ordering {
	order: string;
	value: number;
}
