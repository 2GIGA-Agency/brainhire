import { Post } from '@/app/blog/types';
import { Button } from '@/components/ui-kit/Button';
import { Typography } from '@/components/ui-kit/Typography';
import Link from 'next/link';
import React from 'react';
import styles from './PopularArticles.module.scss';

interface PopularArticlesProps {
	title: string;
	articles: Post[];
}

export const PopularArticles: React.FC<PopularArticlesProps> = ({ title, articles }) => {
	return (
		<div className={styles.popularArticles}>
			<Typography variant="h3">{title}</Typography>
			<ul className={styles.list}>
				{articles.map((article, index) => (
					<li key={index} className={styles.articleItem}>
						<Typography variant="body-xss-regular" color="text-primary">
							{new Date(article.time_published).toLocaleDateString('ru-RU')}
						</Typography>
						<Link
							href={`/blog/${article.category.slug}/${article.slug}`}
							className={styles.articleLink}
						>
							<Typography variant="body-sm">{article.postname}</Typography>
						</Link>
					</li>
				))}
			</ul>
			<Link href="/blog">
				<Button variant="secondary2" fullWidth>
					Смотреть весь блог
				</Button>
			</Link>
		</div>
	);
};
