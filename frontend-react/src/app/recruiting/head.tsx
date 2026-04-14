import { Fragment } from 'react';

export default function Head() {
	const organization = {
		'@context': 'https://schema.org',
		'@type': 'Organization',
		name: 'BrainHire',
		url: 'https://brainhire.ru/',
		foundingDate: '2022',
		founder: {
			'@type': 'Person',
			name: 'Слаутин Олег Геннадьевич',
			url: 'https://brainhire.ru/about',
		},
		logo: {
			'@type': 'ImageObject',
			name: 'Brainhire.ru Логотип',
			description: 'BRaiN HR логотип',
			datePublished: '01.01.2022',
			contentUrl:
				'https://drive.google.com/file/d/1nNJWeNX2uyd_b329wqzpylMr7OobwWg-/view?usp=sharing',
		},
		address: {
			'@type': 'PostalAddress',
			postalCode: '142005',
			addressLocality: 'Московская область, г. Домодедово',
			streetAddress: 'ул. Кирова, д. 7, к.1, пом. 0011, офис 5',
		},
	};

	const webPage = {
		'@context': 'https://schema.org',
		'@type': 'WebPage',
		name: 'BRaiN HR Рекрутинг - ИИ-система автоматизации подбора персонала',
		url: 'https://brainhire.ru/recruiting',
		description:
			'Программа для автоматизации найма персонала с помощью искусственного интеллекта. Автоматический поиск кандидатов и приглашение на первичное интевью. ИИ-анализ резюме и скоринг потенциальных сотрудников.',
	};

	const webSite = {
		'@context': 'https://schema.org',
		'@type': 'WebSite',
		url: 'https://brainhire.ru/',
		name: 'BRaiN HR Рекрутинг - ИИ-система автоматизации подбора персонала',
		description:
		'Программа для автоматизации найма персонала с помощью искусственного интеллекта. Автоматический поиск кандидатов и приглашение на первичное интевью. ИИ-анализ резюме и скоринг потенциальных сотрудников.',
		image: {
			'@type': 'ImageObject',
			name: 'Brainhire.ru Логотип',
			description: 'BRaiN HR логотип',
			datePublished: '01.01.2022',
			contentUrl:
				'https://drive.google.com/file/d/1nNJWeNX2uyd_b329wqzpylMr7OobwWg-/view?usp=sharing',
		},
		potentialAction: {
			'@type': 'SearchAction',
			target: {
				'@type': 'EntryPoint',
				urlTemplate: 'https://brainhire.ru/search/?module=search={query}',
			},
			'query-input': {
				'@type': 'PropertyValueSpecification',
				valueRequired: 'http://schema.org/True',
				valueName: 'query',
			},
		},
	};

	// BreadcrumbList — если требуется хлебные крошки
	const breadcrumbList = {
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
				name: 'Рекрутинг',
				item: 'https://brainhire.ru/recruiting',
			},
		],
	};

	// Пример дополнительных схем для лендинга:
	// Product, FAQPage, ImageObject, VideoObject можно добавить аналогично
	const product = {
		'@context': 'https://schema.org',
		'@type': 'Product',
		name: 'BrainHire Recruiting',
		image: 'https://brainhire.ru/recruiting-image.jpg',
		description:
			'Программа для автоматизации найма персонала с помощью искусственного интеллекта. Автоматический поиск кандидатов и приглашение на первичное интевью. ИИ-анализ резюме и скоринг потенциальных сотрудников.',
		sku: '78910',
		brand: {
			'@type': 'Brand',
			name: 'BrainHire',
		},
		offers: {
			'@type': 'Offer',
			url: 'https://brainhire.ru/recruiting',
			availability: 'https://schema.org/InStock',
		},
	};

	const faq = {
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: [
			{
				'@type': 'Question',
				name: 'Как BRaiN HR оценивает кандидатов?',
				acceptedAnswer: {
					'@type': 'Answer',
					text: 'ИИ анализирует резюме, осуществляет тестирование и видеоинтервью, формируя оценки соискателей.',
				},
			},
			{
				'@type': 'Question',
				name: 'Можно ли интегрировать платформу с другими HR-системами? кандидатов?',
				acceptedAnswer: {
					'@type': 'Answer',
					text: 'BRaiN HR поддерживает интеграцию с ATS, CRM и другими HR-платформами.',
				},
			},
			{
				'@type': 'Question',
				name: 'Сколько стоит использование сервиса? BRaiN HR для массового подбора?',
				acceptedAnswer: {
					'@type': 'Answer',
					text: 'При регистрации вам предоставляется 10 000 приветственных токенов, что позволит обработать 100 кандидатов. Далее – гибкая система тарифов в зависимости от количества купленных токенов.',
				},
			},
		],
	};

	const jsonLdArray = [
		organization,
		webPage,
		webSite,
		breadcrumbList,
		product,
		faq,
		// Добавьте ImageObject и VideoObject, если необходимо
	];

	return (
		<Fragment>
			<title>BRaiN HR Рекрутинг - ИИ-система автоматизации подбора персонала</title>
			<meta
				name="description"
				content="Программа для автоматизации найма персонала с помощью искусственного интеллекта. Автоматический поиск кандидатов и приглашение на первичное интевью. ИИ-анализ резюме и скоринг потенциальных сотрудников."
			/>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdArray) }}
			/>
		</Fragment>
	);
}
