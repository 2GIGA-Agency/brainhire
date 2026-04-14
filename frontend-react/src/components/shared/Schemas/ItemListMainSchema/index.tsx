// components/JsonLd/ItemListSchema.jsx
'use client';

// ItemList схема для главной страницы лендинга

import Script from 'next/script';

const ITEMLIST_SCHEMA = {
	'@context': 'https://schema.org',
	// Используем тип "HowTo" для описания процесса работы платформы
	'@type': 'HowTo',
	name: 'Как работает платформа автоматизации рекрутинга BRaiN HR',
	description:
		'Полный цикл автоматизации найма: от создания вакансии до финального интервью с помощью искусственного интеллекта.',
	// Указываем, что результатом является "Наем квалифицированного сотрудника"
	yield: {
		'@type': 'Thing',
		name: 'Наем квалифицированного сотрудника',
	},
	// Перечисляем шаги процесса
	step: [
		{
			'@type': 'HowToStep',
			name: 'Создание вакансии',
			text: 'Искусственный интеллект создает привлекательный и эффективный текст вакансии на основе ваших требований.',
			// Ссылка на соответствующий якорь на странице, если он есть
			url: 'https://brainhire.ru/#vacancy-creation', // <-- Замените на реальный ID блока, если он существует
			item: {
				'@type': 'Service',
				name: 'Генерация вакансий с помощью ИИ',
			},
		},
		{
			'@type': 'HowToStep',
			name: 'Публикация на Job-площадках',
			text: 'Автоматическое размещение созданной вакансии на ведущих платформах для поиска работы, включая hh.ru, Avito, Работа.ру и SuperJob.',
			url: 'https://brainhire.ru/#publication',
			item: {
				'@type': 'Service',
				name: 'Интеграция с Job-площадками',
			},
		},
		{
			'@type': 'HowToStep',
			name: 'Сорсинг и скоринг кандидатов',
			text: 'ИИ активно ищет релевантных кандидатов и автоматически анализирует их резюме, присваивая баллы соответствия (скоринг).',
			url: 'https://brainhire.ru/#sourcing-scoring',
			item: {
				'@type': 'Service',
				name: 'ИИ-анализ и скоринг резюме',
			},
		},
		{
			'@type': 'HowToStep',
			name: 'Видеоинтервью',
			text: 'Проведение первичного отбора с помощью асинхронных видеоинтервью. Кандидаты записывают ответы на ваши вопросы в удобное для них время.',
			url: 'https://brainhire.ru/#video-interview',
			item: {
				'@type': 'Service',
				name: 'Асинхронные ИИ-видеоинтервью',
			},
		},
		{
			'@type': 'HowToStep',
			name: 'Real-time интервью',
			text: 'Финальное собеседование с умным ИИ-аватаром, который ведет диалог в реальном времени, анализирует ответы и soft-skills кандидата.',
			url: 'https://brainhire.ru/#real-time-interview',
			item: {
				'@type': 'Service',
				name: 'Real-time интервью с ИИ-аватаром',
			},
		},
	],
};

const ItemListSchema = () => {
	return (
		<Script
			id="itemlist-schema-howto"
			type="application/ld+json"
			strategy="afterInteractive"
			dangerouslySetInnerHTML={{ __html: JSON.stringify(ITEMLIST_SCHEMA) }}
		/>
	);
};

export default ItemListSchema;
