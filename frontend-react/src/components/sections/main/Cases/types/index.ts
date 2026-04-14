// src/types/case.ts

// Тип для автора кейса
export interface Author {
	name: string;
	jobTitle: string;
}

// Тип для ключевых показателей (например, "+65%")
export interface KpiMetric {
	value: string;
	label: string;
}

// Тип для основных результатов с графиками
export interface ChartsAndMetrics {
	mainHighlights: KpiMetric[];
	growthChart: {
		title: string;
		description: string;
		data: { name: string; value: number }[]; // Добавлено для данных графика
	};
	kpi: KpiMetric[];
}

// Общий тип для секций с заголовком и списком пунктов
export interface InfoSection {
	intro: string;
	points: string[];
}

// Тип для секции с результатами, расширяющий InfoSection
export interface ResultsSection extends InfoSection {
	chartsAndMetrics: ChartsAndMetrics;
}

// Тип для отзыва клиента
export interface Testimonial {
	quote: string;
	authorName: string;
	authorTitle: string;
}

// Тип для информации о клиенте
export interface ClientInfo {
	name: string;
	industry: string;
	companySize: string;
	collaborationPeriod: string;
}

// Тип, описывающий всю детальную информацию на странице кейса
export interface CaseDetails {
	client: ClientInfo;
	aboutCompany: string;
	problem: InfoSection;
	solution: InfoSection;
	results: ResultsSection;
	testimonial: Testimonial;
}

// Основной тип для одного элемента кейса в списке
export interface CaseItem {
	id: number;
	category: string;
	date: string;
	title: string;
	description: string;
	author: Author;
	readTime: number;
	details: CaseDetails;
}
