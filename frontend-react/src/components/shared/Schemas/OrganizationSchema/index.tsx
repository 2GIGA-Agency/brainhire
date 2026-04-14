// components/JsonLd/OrganizationSchema.jsx
'use client';

import Script from 'next/script';

const ORGANIZATION_SCHEMA = {
	'@context': 'https://schema.org',
	'@type': 'Organization',
	name: 'BRaiN HR',
	alternateName: 'Brainhire (Сайт.ру)',
	url: 'https://brainhire.ru/',
	email: 'info@brainhire.ru',
	telephone: '84959703976',
	sameAs: [
		'https://www.instagram.com/brain_hire/',
		'https://vk.com/brain_hr',
		'https://www.facebook.com/profile.php?id=61572491862186',
		'https://t.me/BRaiN_HR',
		'https://tenchat.ru/4439715',
	],
	foundingDate: '2024-10-10',
	address: {
		'@type': 'PostalAddress',
		addressCountry: 'RU',
		postalCode: '142005',
		addressLocality: 'Московская область, г. Домодедово',
		streetAddress: 'ул. Кирова, д. 7, к.1, пом. 0011, офис 5',
	},
	logo: {
		'@type': 'ImageObject',
		name: 'Brainhire.ru Логотип',
		url: 'http://brainhire.ru/icons/Logo.svg',
		contentUrl:
			'https://drive.google.com/file/d/1nNJWeNX2uyd_b329wqzpylMr7OobwWg-/view?usp=sharing',
	},
	image: {
		url: 'http://brainhire.ru/icons/Logo.svg',
		'@type': 'ImageObject',
		name: 'Brainhire.ru Логотип',
		contentUrl:
			'https://drive.google.com/file/d/1nNJWeNX2uyd_b329wqzpylMr7OobwWg-/view?usp=sharing',
	},
};

const OrganizationSchema = () => {
	return (
		<Script
			id="organization-schema"
			type="application/ld+json"
			strategy="afterInteractive"
			dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION_SCHEMA) }}
		/>
	);
};

export default OrganizationSchema;
