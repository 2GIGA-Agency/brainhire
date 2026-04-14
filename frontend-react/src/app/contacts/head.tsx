// app/contacts/head.tsx
import { Fragment } from 'react';

export default function Head() {
	// Organization: данные об организации BrainHire
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

	// WebPage: данные о странице "Контакты"
	const webPage = {
		'@context': 'https://schema.org',
		'@type': 'WebPage',
		name: 'Контакты',
		url: 'https://brainhire.ru/contacts',
		description:
			'Контакты компании BRaiN HR. Контактные данные главного офиса и службы поддержки. Юридическая информация и адрес.',
	};

	// WebSite: данные о сайте
	const webSite = {
		'@context': 'https://schema.org',
		'@type': 'WebSite',
		url: 'https://brainhire.ru/',
		name: 'Brainhire.ru - официальный сайт платформы BRaiN HR',
		description:
			'BRaiN HR — это онлайн-платформа на базе искусственного интеллекта с полным набором инструментов для быстрого и качественного автоматизированного подбора персонала. Основной функционал включает в себя: автоматизированное описание вакансий, интеграцию с сайтами джоб-бордов, возможность разместить вакансию по ссылке, оценку резюме с помощью AI (анализ на основе наличия необходимого опыта и навыков) и видеоинтервью с помощью AI, которые также оцениваются.',
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

	// BreadcrumbList: хлебные крошки
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
				name: 'Контакты',
				item: 'https://brainhire.ru/contacts',
			},
		],
	};

	// Собираем все объекты в массив (их можно объединить в один скрипт)
	const jsonLdArray = [organization, webPage, webSite, breadcrumbList];

	return (
		<Fragment>
			<title>Контактные данные | BRaiN HR</title>
			<meta
				name="description"
				content="Контакты компании BRaiN HR. Контактные данные главного офиса и службы поддержки. Юридическая информация и адрес."
			/>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdArray) }}
			/>
		</Fragment>
	);
}
