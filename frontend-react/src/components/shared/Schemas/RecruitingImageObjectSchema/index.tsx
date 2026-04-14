'use client';

import Script from 'next/script';

// Собираем ключевые изображения со страницы в массив
const IMAGES_SCHEMA = [
	{
		'@context': 'https://schema.org',
		'@type': 'ImageObject',
		contentUrl: 'https://brainhire.ru/images/laptop.png',
		license: 'https://brainhire.ru/', // Ссылка на лицензию или главную (если авторские права ваши)
		acquireLicensePage: 'https://brainhire.ru/recruiting',
		creditText: 'BRaiN HR',
		creator: {
			'@type': 'Organization',
			name: 'BRaiN HR',
		},
		copyrightNotice: 'BRaiN HR',
		name: 'Интерфейс системы BRaiN HR: Создание вакансий',
		description: 'Дашборд рекрутера с инструментами генерации вакансий и аналитикой.',
		caption: 'ИИ-генерация вакансий за секунды',
	},
	{
		'@context': 'https://schema.org',
		'@type': 'ImageObject',
		contentUrl: 'https://brainhire.ru/images/land3.avif',
		name: 'Автоматизация HR-процессов',
		description: 'Иллюстрация оптимизации работы HR-отделов с помощью BRaiN HR.',
		caption: 'Оптимизация работы HR-специалистов',
	},
	{
		'@context': 'https://schema.org',
		'@type': 'ImageObject',
		contentUrl: 'https://brainhire.ru/images/land6.png',
		name: 'Дашборд руководителя в BRaiN HR',
		description: 'Аналитика для руководителей компаний и агентств по найму.',
		caption: 'Снижение затрат на найм',
	},
	// Можно добавить изображения из слайдера Hero, если они несут смысловую нагрузку
	{
		'@context': 'https://schema.org',
		'@type': 'ImageObject',
		contentUrl: 'https://brainhire.ru/images/land1_mini.avif',
		name: 'Массовый подбор персонала с ИИ',
		caption: 'Автоматизация массового подбора',
	},
];

const RecruitingImagesSchema = () => {
	return (
		<Script
			id="recruiting-images-schema"
			type="application/ld+json"
			strategy="afterInteractive"
			dangerouslySetInnerHTML={{ __html: JSON.stringify(IMAGES_SCHEMA) }}
		/>
	);
};

export default RecruitingImagesSchema;
