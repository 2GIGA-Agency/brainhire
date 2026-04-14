// components/JsonLd/ProductSchema.jsx
'use client';

import Script from 'next/script';

const PRODUCT_SCHEMA = {
	'@context': 'https://schema.org',
	'@type': 'Product',
	// Название продукта
	name: 'Платформа автоматизации рекрутинга BRaiN HR',
	// Описание продукта
	description:
		'Интегрированная SaaS-платформа на базе искусственного интеллекта для полного цикла подбора персонала: от создания вакансий и скоринга резюме до проведения видеоинтервью с ИИ-аватаром.',
	// Ссылка на изображение продукта (логотип или скриншот интерфейса)
	image: {
		'@type': 'ImageObject',
		name: 'Brainhire.ru Логотип',
		contentUrl:
			'https://drive.google.com/file/d/1nNJWeNX2uyd_b329wqzpylMr7OobwWg-/view?usp=sharing',
	},
	// Бренд, которому принадлежит продукт
	brand: {
		'@type': 'Brand', // Можно использовать 'Brand' или 'Organization'
		name: 'BRaiN HR',
	},
	offers: {
		'@type': 'AggregateOffer', // Используем, так как у вас несколько тарифов
		priceCurrency: 'RUB', // Валюта
		lowPrice: '100', // Самая низкая стартовая цена
		offerCount: '3', // Примерное количество тарифов
	},
};

const ProductSchema = () => {
	return (
		<Script
			id="product-schema"
			type="application/ld+json"
			strategy="afterInteractive"
			dangerouslySetInnerHTML={{ __html: JSON.stringify(PRODUCT_SCHEMA) }}
		/>
	);
};

export default ProductSchema;
