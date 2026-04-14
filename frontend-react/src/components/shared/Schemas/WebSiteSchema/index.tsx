// components/JsonLd/WebSiteSchema.jsx
'use client';

import Script from 'next/script';

// Константа создается один раз при импорте
const WEBSITE_SCHEMA = {
	'@context': 'https://schema.org',
	'@type': 'WebSite',
	name: 'BRaiN HR',
	alternateName: 'Brainhire - платформа для автоматизации HR-процессов на базе ИИ',
	url: 'https://brainhire.ru/',
	description:
		'Платформа для автоматизации рекрутинга на базе искусственного интеллекта. Нанимайте в 5 раз дешевле и в 5 раз быстрее с помощью ИИ для подбора кандидатов, анализа резюме и проведения собеседований.',
	potentialAction: {
		'@type': 'SearchAction',
		target: {
			'@type': 'EntryPoint',
			urlTemplate: 'https://brainhire.ru/search?q={search_term_string}',
		},
		'query-input': 'required name=search_term_string',
	},
	inLanguage: 'ru',
	copyrightHolder: {
		'@type': 'Organization',
		name: 'BRaiN HR',
		url: 'https://brainhire.ru/',
	},
};

const WebSiteSchema = () => {
	return (
		<Script
			id="website-schema"
			type="application/ld+json"
			strategy="afterInteractive"
			dangerouslySetInnerHTML={{ __html: JSON.stringify(WEBSITE_SCHEMA) }}
		/>
	);
};

export default WebSiteSchema;
