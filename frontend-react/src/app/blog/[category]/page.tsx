import { Typography } from '@/components';
import { PopularArticles } from '@/components/sections/blog/PopularArticles';
import { Article } from '@/components/ui-kit/Article';
import { Breadcrumb } from '@/components/ui-kit/Breadcrumb';
import styles from './style.module.scss';
import { Metadata } from 'next';
import { PostsResponse } from '../types';
import { Categories } from '@/components/sections/blog/Categories';

export interface BlogPost {
	id: string;
	title: string;
	subtitle: string;
	author: string;
	authorAvatar: string;
	authorJob: string;
	authorViews: string;
	date: string;
	postname: string;
	readTime: string;
	content1: string;
	content2: string;
	content3: string;
	image: string;
	likes: number;
}

interface Props {
	params: { category: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { category } = await params;
	const canonicalUrl = `https://brainhire.ru/blog/${category}`;

	const res = await fetch('https://blog.kreorg.ru/posts/', {
		next: { revalidate: 300 }, // Ревалидация каждые 5 минут
	});

	if (!res.ok) throw new Error(`Ошибка ${res.status}`);

	const data: PostsResponse = await res.json();
	const categoryPosts = data.filter((item) => item.category.slug === category);

	return {
		title: categoryPosts[0].category.meta_title,
		description: categoryPosts[0].category.meta_description,
		alternates: {
			canonical: canonicalUrl,
		},
	};
}

interface CategoryPostsResponse {
	allPosts: PostsResponse;
	currentCategoryPosts: PostsResponse;
	currentCategoryName: string;
}

export const getPosts = async (categorySlug: string): Promise<CategoryPostsResponse> => {
	try {
		const res = await fetch('https://blog.kreorg.ru/posts/', {
			next: { revalidate: 300 }, // Ревалидация каждые 5 минут
		});

		if (!res.ok) throw new Error(`Ошибка ${res.status}`);

		const data: PostsResponse = await res.json();
		const categoryPosts = data.filter((item) => item.category.slug === categorySlug);
		const currentCategoryName = categoryPosts[0]?.category?.name || categorySlug;

		return { allPosts: data, currentCategoryPosts: categoryPosts, currentCategoryName };
	} catch (error) {
		console.error('Ошибка при загрузке постов:', error);
		return { allPosts: [], currentCategoryPosts: [], currentCategoryName: '' };
	}
};

export default async function BlogPost({ params }: Props) {
	const { category } = await params;
	const { allPosts, currentCategoryPosts, currentCategoryName } = await getPosts(category);
	const categories = Array.from(
		new Map(
			allPosts.map((i) => [i.category.slug, { slug: i.category.slug, name: i.category.name }])
		)
			.values()
			.filter((i) => i.slug !== category)
	);

	return (
		<main>
			<Breadcrumb lastLink={currentCategoryName} />
			<Typography variant="h1" color="text-primary" className={styles.titleContainer}>
				{currentCategoryName}
			</Typography>
			<div className={styles.blogContainer}>
				<div className={styles.cards}>
					{currentCategoryPosts.map((article, index) => (
						<Article key={index} {...article} variant="card" />
					))}
				</div>

				<aside className={styles.sidebar}>
					<Categories categories={categories} />

					<PopularArticles articles={allPosts} title="Популярные статьи" />

					{/* <SubscribeCard /> */}
				</aside>
			</div>
		</main>
	);
}
