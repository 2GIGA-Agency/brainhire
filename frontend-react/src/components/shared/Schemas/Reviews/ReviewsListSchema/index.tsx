'use client';

import { testimonialsData } from '@/components/sections/main/Reviews/constants';
import Script from 'next/script';

const ReviewsListSchema = () => {
	// Формируем JSON-LD объект
	const schema = {
		'@context': 'https://schema.org',
		'@type': 'Product',
		name: 'BRaiN HR',
		description: 'ИИ-система автоматизации подбора персонала.',
		brand: {
			'@type': 'Brand',
			name: 'BRaiN HR',
		},
		// Генерируем массив отзывов
		review: testimonialsData.map((item) => ({
			'@type': 'Review',
			author: {
				'@type': 'Person',
				name: item.name,
				jobTitle: item.role,
				worksFor: item.company
					? {
							'@type': 'Organization',
							name: item.company,
						}
					: undefined,
			},
			reviewBody: item.text,
			// Используем поле "результат" как заголовок отзыва, так как он кратко описывает суть
			name: item.result,
			itemReviewed: {
				'@type': 'Product',
				name: 'BRaiN HR',
			},
		})),
	};

	return (
		<Script
			id="reviews-list-schema"
			type="application/ld+json"
			strategy="afterInteractive"
			dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
		/>
	);
};

export default ReviewsListSchema;
