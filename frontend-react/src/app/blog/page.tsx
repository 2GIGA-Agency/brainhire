import { Typography } from '@/components';
import { PopularArticles } from '@/components/sections/blog/PopularArticles';
import { Article } from '@/components/ui-kit/Article';
import { Breadcrumb } from '@/components/ui-kit/Breadcrumb';
import styles from './style.module.scss';
import { PostsResponse } from './types';
import { Categories } from '@/components/sections/blog/Categories';
import BlogWebPageSchema from '@/components/shared/Schemas/Blog/BlogWebPageSchema';
import BlogListSchema from '@/components/shared/Schemas/Blog/BlogListSchema';
import BlogBreadcrumbsSchema from '@/components/shared/Schemas/Blog/BlogBreadCrumbsSchema';
import OrganizationSchema from '@/components/shared/Schemas/OrganizationSchema';
import WebSiteSchema from '@/components/shared/Schemas/WebSiteSchema';

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

export const metadata = {
	title: 'Блог | BRaiN HR',
	description:
		'Блог компании BRaiN HR. Рассказываем об автоматизации рекрутинга, онбординга и других HR процессов с помощью искусственного интеллекта',
	alternates: {
		canonical: `https://brainhire.ru/blog`,
	},
	openGraph: {
		title: 'Блог | BRaiN HR',
		description: 'Блог компании BRaiN HR. Рассказываем об автоматизации HR-процессов',
		url: `https://brainhire.ru//blog`,
		siteName: 'BRaiN HR',
		locale: 'ru_RU',
		type: 'website',
	},
};

export const getPosts = async (): Promise<PostsResponse> => {
	try {
		const res = await fetch('https://blog.kreorg.ru/posts/', {
			next: { revalidate: 300 }, // Ревалидация каждые 5 минут
		});

		if (!res.ok) throw new Error(`Ошибка ${res.status}`);
		return await res.json();
	} catch (error) {
		console.error('Ошибка при загрузке постов:', error);
		return [];
	}
};

export default async function BlogPost() {
	const posts = await getPosts();
	const categories = Array.from(
		new Map(
			posts.map((i) => [i.category.slug, { slug: i.category.slug, name: i.category.name }])
		).values()
	);

	return (
		<main>
			<BlogWebPageSchema />
			{/* Передаем посты в схему списка */}
			<BlogListSchema posts={posts} />
			<BlogBreadcrumbsSchema />
			<OrganizationSchema />
			<WebSiteSchema />
			<Breadcrumb />
			<Typography variant="h1" color="text-primary" className={styles.titleContainer}>
				Блог
			</Typography>
			<div className={styles.blogContainer}>
				<div className={styles.cards}>
					{posts.map((article, index) => (
						<Article titleSized={true} key={index} {...article} variant="card" />
					))}
				</div>

				<aside className={styles.sidebar}>
					<Categories categories={categories} />

					<PopularArticles articles={posts} title="Популярные статьи" />

					{/* <SubscribeCard /> */}
				</aside>
			</div>
		</main>
	);
}
