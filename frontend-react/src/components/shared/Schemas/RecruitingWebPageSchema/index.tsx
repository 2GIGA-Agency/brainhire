'use client';

import Script from 'next/script';

const RECRUITING_WEBPAGE_SCHEMA = {
	'@context': 'https://schema.org',
	'@type': 'WebPage',
	// URL страницы рекрутинга (из metadata.alternates.canonical)
	url: 'https://brainhire.ru/recruiting',
	// Заголовок из metadata.title
	name: 'BRaiN HR Рекрутинг - ИИ-система автоматизации подбора персонала',
	// Описание из metadata.description
	description:
		'Программа для автоматизации найма персонала с помощью искусственного интеллекта. Автоматический поиск кандидатов и приглашение на первичное интевью. ИИ-анализ резюме и скоринг потенциальных сотрудников.',

	// Ссылка на родительский сайт
	isPartOf: {
		'@type': 'WebSite',
		url: 'https://brainhire.ru/',
		name: 'BRaiN HR',
	},

	// Основная сущность страницы (Организация, предоставляющая сервис)
	mainEntity: {
		'@type': 'Organization',
		name: 'BRaiN HR',
		url: 'https://brainhire.ru/',
	},

	// Основное изображение страницы (взял одну из ключевых картинок из массива solutionsData)
	primaryImageOfPage: {
		'@type': 'ImageObject',
		url: 'https://brainhire.ru/images/laptop.png',
		caption: 'Интерфейс системы BRaiN HR',
	},

	// Издатель (Ваша компания)
	publisher: {
		'@type': 'Organization',
		name: 'BRaiN HR',
		url: 'https://brainhire.ru/',
		logo: {
			'@type': 'ImageObject',
			// Тот же логотип, что и в примере
			url: 'https://drive.google.com/file/d/1nNJWeNX2uyd_b329wqzpylMr7OobwWg-/view?usp=sharing',
		},
	},

	datePublished: '2024-10-10',
	dateModified: new Date().toISOString(),
	inLanguage: 'ru',
};

const RecruitingWebPageSchema = () => {
	return (
		<Script
			id="recruiting-webpage-schema"
			type="application/ld+json"
			strategy="afterInteractive"
			dangerouslySetInnerHTML={{ __html: JSON.stringify(RECRUITING_WEBPAGE_SCHEMA) }}
		/>
	);
};

export default RecruitingWebPageSchema;
