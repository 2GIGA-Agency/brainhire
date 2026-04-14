'use client';
import { PostsResponse } from '@/app/blog/types';
import { Article } from '@/components/ui-kit/Article';
import { Button } from '@/components/ui-kit/Button';
import { Typography } from '@/components/ui-kit/Typography';
import { useEffect, useState } from 'react';
import styles from './Blog.module.scss';

export interface ArticleProps {
	img: string;
	tag: string;
	date: string;
	title: string;
	text: string;
	author: string;
	authorAvatar: string;
	likes: number;
	time: string;
	url: string;

	variant: 'card' | 'expanded';
}

export interface BlogProps {
	title: string;
	similar?: boolean;
}

export const Blog: React.FC<BlogProps> = ({ title, similar = false }) => {
	const [posts, setPosts] = useState<PostsResponse>([]);

	useEffect(() => {
		const fetchPosts = async () => {
			try {
				const res = await fetch('https://blog.kreorg.ru/posts/');
				if (!res.ok) throw new Error(`Ошибка ${res.status}`);
				const data: PostsResponse = await res.json();
				setPosts(data);
			} catch (err: any) {
				console.error('Не удалось загрузить посты');
			}
		};

		fetchPosts();
	}, []);

	return (
		<section className={styles.blogSection}>
			<div className={styles.container}>
				<Typography variant="h2" className={styles.title} margin="0 0 60px">
					{title}
				</Typography>
				<div className={styles.articles}>
					{!similar && <Article {...posts[0]} variant={'expanded'} />}
					<div className={styles.cards}>
						{posts.map((article, index) => {
							if (index !== 0 && index < 4) return <Article key={index} {...article} />;
						})}
					</div>
				</div>
				<div className={styles.btn}>
					<Button variant="primary" as="link" href="/blog">
						Читать блог
					</Button>
				</div>
			</div>
		</section>
	);
};
