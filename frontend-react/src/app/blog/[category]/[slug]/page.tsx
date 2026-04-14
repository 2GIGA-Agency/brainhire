import { Typography } from '@/components';
import { LikeShare } from '@/components/sections/blog/LikeShare';
import { PopularArticles } from '@/components/sections/blog/PopularArticles';
import { Blog } from '@/components/sections/main';
import { Author, TryBanner } from '@/components/ui-kit';
import { Breadcrumb } from '@/components/ui-kit/Breadcrumb';
import { Metadata } from 'next';
import Image from 'next/image';
import { PostsResponse } from '../../types';
import styles from './BlogPost.module.scss';
import { Spinner } from '@/components/shared/Spinner';
import BlogPostWebPageSchema from '@/components/shared/Schemas/Blog/Post/BlogPostWebPageSchema';
import BlogPostBreadcrumbsSchema from '@/components/shared/Schemas/Blog/Post/BlogPostBreadCrumbsSchema';
import BlogPostArticleSchema from '@/components/shared/Schemas/Blog/Post/BlogPostArticleSchema';
import WebSiteSchema from '@/components/shared/Schemas/WebSiteSchema';
import OrganizationSchema from '@/components/shared/Schemas/OrganizationSchema';

interface Props {
	params: { category: string; slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { category, slug } = await params;

	const res = await fetch('https://blog.kreorg.ru/posts/', { cache: 'no-store' });

	const data: PostsResponse = await res.json();
	const post = data.find((item) => item.slug === slug);
	const canonicalUrl = `https://brainhire.ru//blog/${category}/${slug}`;

	if (!post) {
		return {
			title: 'Статья не найдена',
			description: 'Запрошенная статья не была найдена на сервере.',
		};
	}

	return {
		title: post.meta_title,
		description: post.meta_description,
		alternates: {
			canonical: canonicalUrl,
		},
	};
}

export default async function BlogPostPage({ params }: Props) {
	const { category, slug } = await params;
	const res = await fetch('https://blog.kreorg.ru/posts/', { cache: 'no-store' });
	const data: PostsResponse = await res.json();

	const post = data.find((item) => item.slug === slug);

	if (!post) {
		return <Spinner />;
	}

	return (
		<>
			<OrganizationSchema />
			<WebSiteSchema />
			<BlogPostWebPageSchema post={post} categorySlug={category} />
			<BlogPostBreadcrumbsSchema post={post} categorySlug={category} />
			{/* Здесь находится Article и CreativeWorkSeries */}
			<BlogPostArticleSchema post={post} categorySlug={category} />
			<article>
				<div className={styles.container}>
					<Breadcrumb
						links={[
							{
								name: post.category.name,
								url: `/blog/${category}`,
							},
							{ name: post.postname },
						]}
					/>
					<div className={styles.stats}>
						<Typography variant="body-xss-regular" color="text-primary">
							{new Date(post.time_published).toLocaleDateString('ru-RU')}
						</Typography>
						<div className={styles.vertical} />
						<div className={styles.likes}>
							<Image
								src="/icons/like2.svg"
								alt="likes"
								width={20}
								height={20}
								className={styles.icon}
							/>
							<Typography variant="body-xss-regular" color="text-primary">
								{post.likes}
							</Typography>
						</div>
					</div>

					<div className={styles.blogContainer}>
						<div className={styles.article}>
							<Typography variant="h1" color="text-primary" className={styles.titleContainer}>
								{post.postname}
							</Typography>
							<Author {...post} />

							{post.content.split('{{cta}}').flatMap((htmlChunk, idx, arr) => {
								const elements = [
									<div
										key={`html-${idx}`}
										dangerouslySetInnerHTML={{ __html: htmlChunk }}
										className={styles.articleContent}
									/>,
								];

								if (idx < arr.length - 1) {
									elements.push(
										<TryBanner
											key={`cta-${idx}`}
											title="Увеличьте скорость создания резюме вместе с Brainhire"
											description="Создавайте профессиональные резюме быстрее и проще вместе с Brainhire! Используйте умные технологии, чтобы выделиться среди кандидатов и найти работу мечты."
											buttonText="Попробовать функционал"
										/>
									);
								}

								return elements;
							})}
							<LikeShare postId={post.id} />
						</div>
						<aside className={styles.sidebar}>
							<PopularArticles
								articles={data.sort((a, b) => a.likes - b.likes).slice(1, 12)}
								title="Популярные статьи"
							/>
						</aside>
					</div>
				</div>
				<Blog title="Другие статьи по теме" similar />
			</article>
		</>
	);
}
