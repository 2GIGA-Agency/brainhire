'use client';

import { testimonialsData } from '@/components/sections/main/Reviews/constants';
import Script from 'next/script';

const ReviewSchema = () => {
	// Создаем массив объектов Review
	const reviewsSchema = testimonialsData.map((item) => ({
		'@context': 'https://schema.org',
		'@type': 'Review',
		// Что именно оценивают
		itemReviewed: {
			'@type': 'SoftwareApplication', // Можно использовать Product или SoftwareApplication
			name: 'BRaiN HR',
			applicationCategory: 'BusinessApplication',
			operatingSystem: 'Web',
			offers: {
				'@type': 'Offer',
				price: '0',
				priceCurrency: 'RUB',
			},
		},
		// Автор отзыва
		author: {
			'@type': 'Person',
			name: item.name,
			jobTitle: item.role,
			// Добавляем компанию, если она указана
			worksFor: item.company
				? {
						'@type': 'Organization',
						name: item.company,
					}
				: undefined,
		},
		// Заголовок и тело отзыва
		name: item.result, // Результат используем как заголовок
		reviewBody: item.text,

		// Оценка. Так как это testimonials, ставим 5 звезд по умолчанию
		reviewRating: {
			'@type': 'Rating',
			ratingValue: '5',
			bestRating: '5',
			worstRating: '1',
		},

		publisher: {
			'@type': 'Organization',
			name: 'BRaiN HR',
		},
	}));

	return (
		<Script
			id="review-schema"
			type="application/ld+json"
			strategy="afterInteractive"
			// Stringify принимает массив объектов, что создаст структуру Graph или List в глазах Google
			dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewsSchema) }}
		/>
	);
};

export default ReviewSchema;
