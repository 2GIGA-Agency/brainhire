'use client';

import Script from 'next/script';

const REVIEWS_WEBPAGE_SCHEMA = {
	'@context': 'https://schema.org',
	'@type': 'WebPage',
	url: 'https://brainhire.ru/reviews',
	name: 'Отзывы | BRaiN HR',
	description:
		'Отзывы пользователей после использования BRaiN HR. Реальные кейсы сокращения расходов и ускорения найма.',
	isPartOf: {
		'@type': 'WebSite',
		url: 'https://brainhire.ru/',
		name: 'BRaiN HR',
	},
	publisher: {
		'@type': 'Organization',
		name: 'BRaiN HR',
		url: 'https://brainhire.ru/',
		logo: {
			'@type': 'ImageObject',
			url: 'https://drive.google.com/file/d/1nNJWeNX2uyd_b329wqzpylMr7OobwWg-/view?usp=sharing',
		},
	},
	inLanguage: 'ru',
};

const ReviewsWebPageSchema = () => {
	return (
		<Script
			id="reviews-webpage-schema"
			type="application/ld+json"
			strategy="afterInteractive"
			dangerouslySetInnerHTML={{ __html: JSON.stringify(REVIEWS_WEBPAGE_SCHEMA) }}
		/>
	);
};

export default ReviewsWebPageSchema;
