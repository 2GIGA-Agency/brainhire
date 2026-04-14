'use client';

import Script from 'next/script';
import { Post } from '@/app/blog/types'; // Убедитесь, что импорт типа правильный

interface Props {
	posts: Post[];
}

// Вспомогательная функция для очистки HTML тегов (аналог вашей stripHtml, но безопасная для JSON)
const cleanText = (html: string) => {
	if (!html) return '';
	return html.replace(/<[^>]*>?/gm, '').slice(0, 160) + '...';
};

const BlogListSchema = ({ posts }: Props) => {
	const schema = {
		'@context': 'https://schema.org',
		'@type': 'Blog',
		name: 'Блог BRaiN HR',
		description: 'Статьи об автоматизации HR-процессов',
		url: 'https://brainhire.ru/blog',
		// Мапим посты в сущности BlogPosting
		blogPost: posts.map((post) => ({
			'@type': 'BlogPosting',
			headline: post.postname,
			// Формируем описание из контента, удаляя HTML теги
			description: cleanText(post.content),
			image: post.image ? [post.image] : undefined,
			datePublished: post.time_published,
			dateModified: post.time_published, // Если есть поле update, лучше использовать его
			author: {
				'@type': 'Person',
				name: `${post.first_name} ${post.last_name}`,
				image: post.photo,
			},
			publisher: {
				'@type': 'Organization',
				name: 'BRaiN HR',
				logo: {
					'@type': 'ImageObject',
					url: 'https://drive.google.com/file/d/1nNJWeNX2uyd_b329wqzpylMr7OobwWg-/view?usp=sharing',
				},
			},
			mainEntityOfPage: {
				'@type': 'WebPage',
				'@id': `https://brainhire.ru/blog/${post.category.slug}/${post.slug}`,
			},
			url: `https://brainhire.ru/blog/${post.category.slug}/${post.slug}`,
		})),
	};

	return (
		<Script
			id="blog-list-schema"
			type="application/ld+json"
			strategy="afterInteractive"
			dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
		/>
	);
};

export default BlogListSchema;
