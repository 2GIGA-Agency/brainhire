'use client';

import Script from 'next/script';
import { CaseItem } from '@/components/sections/main'; // Убедитесь, что импорт типа правильный

interface Props {
	study: CaseItem;
}

const CaseWebPageSchema = ({ study }: Props) => {
	// Формируем краткое содержание для schema
	const articleBody = `
		Проблема: ${study.details.problem.intro}. 
		Решение: ${study.details.solution.intro}. 
		Результат: ${study.details.results.intro}
	`;

	const schema = {
		'@context': 'https://schema.org',
		'@type': 'WebPage',
		url: `https://brainhire.ru/case/${study.id}`,
		name: `${study.title} | Кейс BRaiN HR`,
		description: study.description,

		// Основной контент страницы — это Статья (Кейс)
		mainEntity: {
			'@type': 'Article',
			headline: study.title,
			description: study.description,
			articleBody: articleBody,
			author: {
				'@type': 'Person',
				name: study.author.name,
				jobTitle: study.author.jobTitle,
			},
			// Если у кейса есть дата публикации в моках, добавьте её сюда.
			// Если нет, можно использовать dateModified страницы или опустить.
			datePublished: '2024-01-01',
			publisher: {
				'@type': 'Organization',
				name: 'BRaiN HR',
				logo: {
					'@type': 'ImageObject',
					url: 'https://drive.google.com/file/d/1nNJWeNX2uyd_b329wqzpylMr7OobwWg-/view?usp=sharing',
				},
			},
		},
		isPartOf: {
			'@type': 'WebSite',
			url: 'https://brainhire.ru/',
			name: 'BRaiN HR',
		},
	};

	return (
		<Script
			id={`case-webpage-schema-${study.id}`}
			type="application/ld+json"
			strategy="afterInteractive"
			dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
		/>
	);
};

export default CaseWebPageSchema;
