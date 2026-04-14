// components/JsonLd/WebPageSchema.jsx
'use client';

import Script from 'next/script';

// JSON-LD схема для главной страницы
const WEBPAGE_SCHEMA = {
	'@context': 'https://schema.org',
	'@type': 'WebPage',
	// URL должен точно соответствовать каноническому адресу главной страницы
	url: 'https://brainhire.ru/',
	name: 'BRaiN HR: Платформа для автоматизации рекрутинга на базе ИИ',
	description:
		'Онлайн-платформа на базе искусственного интеллекта с полным набором инструментов для быстрого и качественного автоматизированного подбора персонала.',

	// Указываем, что эта страница является частью всего сайта
	isPartOf: {
		'@type': 'WebSite',
		url: 'https://brainhire.ru/',
		name: 'BRaiN HR',
	},

	// Основной контент страницы посвящен этой организации
	mainEntity: {
		'@type': 'Organization',
		name: 'BRaiN HR',
		url: 'https://brainhire.ru/',
	},

	// Указываем издателя страницы
	publisher: {
		'@type': 'Organization',
		name: 'BRaiN HR',
		url: 'https://brainhire.ru/',
		// Логотип издателя очень важен для Knowledge Graph
		logo: {
			'@type': 'ImageObject',
			url: 'https://drive.google.com/file/d/1nNJWeNX2uyd_b329wqzpylMr7OobwWg-/view?usp=sharing',
		},
	},

	// Дата публикации и последнего обновления страницы
	datePublished: '2024-10-10', // Укажите реальную дату запуска сайта/страницы
	dateModified: new Date().toISOString(), // Автоматически подставляет текущую дату
	inLanguage: 'ru',
};

const WebPageSchema = () => {
	return (
		<Script
			id="webpage-schema"
			type="application/ld+json"
			strategy="afterInteractive"
			dangerouslySetInnerHTML={{ __html: JSON.stringify(WEBPAGE_SCHEMA) }}
		/>
	);
};

export default WebPageSchema;
