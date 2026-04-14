'use client';

import Script from 'next/script';

const BLOG_WEBPAGE_SCHEMA = {
	'@context': 'https://schema.org',
	'@type': 'CollectionPage', // Для страниц-списков (блог, магазин) лучше использовать CollectionPage
	url: 'https://brainhire.ru/blog',
	name: 'Блог | BRaiN HR',
	description:
		'Блог компании BRaiN HR. Рассказываем об автоматизации рекрутинга, онбординга и других HR процессов с помощью искусственного интеллекта.',
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

const BlogWebPageSchema = () => {
	return (
		<Script
			id="blog-webpage-schema"
			type="application/ld+json"
			strategy="afterInteractive"
			dangerouslySetInnerHTML={{ __html: JSON.stringify(BLOG_WEBPAGE_SCHEMA) }}
		/>
	);
};

export default BlogWebPageSchema;
