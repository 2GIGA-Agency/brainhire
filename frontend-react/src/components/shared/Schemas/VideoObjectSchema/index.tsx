// components/JsonLd/VideoSchema.jsx
'use client';

import Script from 'next/script';

const VIDEO_SCHEMA = {
	'@context': 'https://schema.org',
	'@type': 'VideoObject',
	// Название, которое может отображаться в результатах поиска
	name: 'Обзор платформы BRaiN HR: Автоматизация рекрутинга с помощью ИИ',
	// Описание содержания видео
	description:
		'Демонстрационное видео, показывающее ключевые этапы работы AI-платформы BRaiN HR: от создания вакансии и скоринга резюме до проведения Real-time интервью с ИИ-аватаром.',
	// Прямая ссылка на видеофайл
	contentUrl: 'https://storage.yandexcloud.net/brain-public/media/video_landing.mp4',
	// URL превью должен быть абсолютным (полным)
	thumbnailUrl: 'https://brainhire.ru/images/videoPreview.avif',

	uploadDate: '2024-10-10T09:00:00+03:00',

	publisher: {
		'@type': 'Organization',
		name: 'BRaiN HR',
		logo: {
			'@type': 'ImageObject',
			// ИЗМЕНЕНО: URL логотипа должен быть прямым, а не ссылкой на Google Drive
			url: 'http://brainhire.ru/icons/Logo.svg',
		},
	},
	// Рекомендуемое поле: продолжительность видео в формате ISO 8601
	// Очень рекомендую раскомментировать и указать реальную длительность
	duration: 'PT2M15S', // Пример: 1 минута 35 секунд.
};

const VideoSchema = () => {
	return (
		<Script
			id="video-schema"
			type="application/ld+json"
			strategy="afterInteractive"
			dangerouslySetInnerHTML={{ __html: JSON.stringify(VIDEO_SCHEMA) }}
		/>
	);
};

export default VideoSchema;
