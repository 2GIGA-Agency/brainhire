'use client';

import Script from 'next/script';

interface Props {
	id: number | string;
	title: string;
}

const CaseBreadcrumbsSchema = ({ id, title }: Props) => {
	const schema = {
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
				name: 'Кейсы',
				item: 'https://brainhire.ru/cases',
			},
			{
				'@type': 'ListItem',
				position: 3,
				name: title,
				item: `https://brainhire.ru/case/${id}`,
			},
		],
	};

	return (
		<Script
			id={`case-breadcrumbs-schema-${id}`}
			type="application/ld+json"
			strategy="afterInteractive"
			dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
		/>
	);
};

export default CaseBreadcrumbsSchema;
