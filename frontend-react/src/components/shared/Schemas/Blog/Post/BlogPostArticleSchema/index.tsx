'use client';

import { Post } from '@/app/blog/types';
import Script from 'next/script';

interface Props {
	post: Post;
	categorySlug: string;
}

// Функция для очистки контента от HTML и шорткодов (например, {{cta}}) для schema
const cleanContent = (html: string) => {
	if (!html) return '';
	// Удаляем шорткоды {{...}}
	let text = html.replace(/\{\{.*?\}\}/g, '');
	// Удаляем HTML теги
	text = text.replace(/<[^>]*>?/gm, '');
	// Обрезаем до разумных пределов (Google не требует весь текст, но начало важно)
	return text.slice(0, 5000);
};

const BlogPostArticleSchema = ({ post, categorySlug }: Props) => {
	const articleUrl = `https://brainhire.ru/blog/${categorySlug}/${post.slug}`;
	const categoryName = post.category?.name || 'Блог';

	const schema = {
		'@context': 'https://schema.org',
		'@type': 'BlogPosting', // Более специфичный тип, чем просто Article
		headline: post.postname,
		description: post.meta_description || cleanContent(post.content).slice(0, 160),
		image: post.image ? [post.image] : [],
		datePublished: post.time_published,
		dateModified: post.time_published, // Если есть поле updated_at, используйте его здесь
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
			'@id': articleUrl,
		},
		articleBody: cleanContent(post.content),
		wordCount: cleanContent(post.content).split(' ').length,

		// Реализация CreativeWorkSeries через isPartOf
		isPartOf: {
			'@type': 'CreativeWorkSeries',
			name: `Блог BRaiN HR: ${categoryName}`,
			url: `https://brainhire.ru/blog/${categorySlug}`,
		},
	};

	return (
		<Script
			id={`article-schema-${post.id}`}
			type="application/ld+json"
			strategy="afterInteractive"
			dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
		/>
	);
};

export default BlogPostArticleSchema;
