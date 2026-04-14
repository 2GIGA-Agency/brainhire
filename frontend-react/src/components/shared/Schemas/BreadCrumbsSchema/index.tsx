// components/JsonLd/BreadcrumbsSchema.tsx
'use client';

import Script from 'next/script';
import React from 'react';

// 1. Определяем тип для одного элемента "хлебной крошки"
type Crumb = {
	name: string; // Текст, который будет отображаться (например, "Блог")
	item: string; // Относительный URL страницы (например, "/blog")
};

// 2. Определяем тип для пропсов нашего компонента
type BreadcrumbsSchemaProps = {
	crumbs: Crumb[];
};

const BreadcrumbsSchema: React.FC<BreadcrumbsSchemaProps> = ({ crumbs }) => {
	const baseUrl = 'https://brainhire.ru';

	// Создаем "Главную" страницу, которая будет всегда первым элементом
	const homeCrumb = {
		'@type': 'ListItem',
		position: 1,
		name: 'Главная',
		item: `${baseUrl}/`,
	};

	// Динамически создаем остальные элементы на основе переданных пропсов
	const pageCrumbs = crumbs.map((crumb, index) => ({
		'@type': 'ListItem',
		// Позиция начинается с 2, так как 1-я позиция уже занята
		position: index + 2,
		name: crumb.name,
		item: `${baseUrl}/${crumb.item}`,
	}));

	// Собираем все элементы в один массив для схемы
	const itemList = [homeCrumb, ...pageCrumbs];

	const BREADCRUMBS_DATA = {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: itemList,
	};

	return (
		<Script
			id="breadcrumbs-schema"
			type="application/ld+json"
			strategy="afterInteractive"
			dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMBS_DATA) }}
		/>
	);
};

export default BreadcrumbsSchema;
