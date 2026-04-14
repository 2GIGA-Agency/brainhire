'use client';

import { Post } from '@/app/blog/types';
import Script from 'next/script';

interface Props {
	post: Post;
	categorySlug: string;
}

const BlogPostWebPageSchema = ({ post, categorySlug }: Props) => {
	const url = `https://brainhire.ru/blog/${categorySlug}/${post.slug}`;

	const schema = {
		'@context': 'https://schema.org',
		'@type': 'WebPage',
		url: url,
		name: post.meta_title || post.postname,
		description: post.meta_description,
		primaryImageOfPage: {
			'@type': 'ImageObject',
			url: post.image,
		},
		isPartOf: {
			'@type': 'WebSite',
			url: 'https://brainhire.ru/',
			name: 'BRaiN HR',
		},
		datePublished: post.time_published,
		inLanguage: 'ru',
	};

	return (
		<Script
			id={`webpage-schema-${post.id}`}
			type="application/ld+json"
			strategy="afterInteractive"
			dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
		/>
	);
};

export default BlogPostWebPageSchema;
