'use client';

import Script from 'next/script';
import { Post } from '../../types';

interface Props {
	post: Post;
	categorySlug: string;
}

const BlogPostBreadcrumbsSchema = ({ post, categorySlug }: Props) => {
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
				name: 'Блог',
				item: 'https://brainhire.ru/blog',
			},
			{
				'@type': 'ListItem',
				position: 3,
				name: post.category?.name || 'Категория',
				item: `https://brainhire.ru/blog/${categorySlug}`,
			},
			{
				'@type': 'ListItem',
				position: 4,
				name: post.postname,
				item: `https://brainhire.ru/blog/${categorySlug}/${post.slug}`,
			},
		],
	};

	return (
		<Script
			id={`breadcrumbs-schema-${post.id}`}
			type="application/ld+json"
			strategy="afterInteractive"
			dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
		/>
	);
};

export default BlogPostBreadcrumbsSchema;
