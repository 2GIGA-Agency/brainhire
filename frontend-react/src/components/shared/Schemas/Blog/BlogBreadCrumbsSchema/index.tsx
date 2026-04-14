'use client';

import Script from 'next/script';

const BREADCRUMBS_SCHEMA = {
	'@context': 'https://schema.org',
	'@type': 'BreadcrumbList',
	itemListElement: [
		{
			'@type': 'ListItem',
			position: 1,
			name: 'Главная',
			item: 'https://brainhire.ru/',
		},
		{
			'@type': 'ListItem',
			position: 2,
			name: 'Блог',
			item: 'https://brainhire.ru/blog',
		},
	],
};

const BlogBreadcrumbsSchema = () => {
	return (
		<Script
			id="blog-breadcrumbs-schema"
			type="application/ld+json"
			strategy="afterInteractive"
			dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMBS_SCHEMA) }}
		/>
	);
};

export default BlogBreadcrumbsSchema;
