'use client';

import { Post } from '@/app/blog/types';
import Image from 'next/image';
import NextLink from 'next/link';
import React from 'react';
import { Link } from '../Link';
import { Typography } from '../Typography';
import styles from './Article.module.scss';
import { truncateTextAtWord } from '@/utils/truncateTextAtWord';

function stripHtml(html: string): string {
	// Проверяем, что мы в браузере
	if (typeof window === 'undefined') return html.replace(/<[^>]*>/g, '');

	const doc = new DOMParser().parseFromString(html, 'text/html');
	return doc.body.textContent ?? '';
}

export const Article: React.FC<Post & { variant?: 'expanded' | 'card'; titleSized?: boolean }> = ({
	variant = 'card',
	image,
	image_alt,
	time_published,
	likes,
	category,
	content,
	id,
	postname,
	read_time,
	first_name,
	last_name,
	slug,
	photo,
	titleSized = false,
}) => {
	return (
		<>
			{category?.slug && slug && (
				<NextLink href={`/blog/${category?.slug}/${slug}`}>
					<article className={`${styles.article} ${styles[variant]}`}>
						{image && (
							<div className={styles.imageWrapper}>
								<Image
									src={image}
									alt={image_alt || 'image'}
									width={variant === 'expanded' ? 400 : 300}
									height={variant === 'expanded' ? 250 : 200}
									className={styles.image}
								/>
							</div>
						)}

						<div className={styles.content}>
							<div className={styles.meta}>
								<Typography variant="body-xss" as="span" className={styles.tag}>
									{category?.name}
								</Typography>
								<Typography variant="body-xss" as="span" className={styles.date}>
									{new Date(time_published).toLocaleDateString('ru-RU')}
								</Typography>
							</div>
							<Typography variant={`${titleSized ? `h2` : 'h3'}`} className={styles.title}>
								{postname}
							</Typography>
							<Typography
								variant="body-text"
								color="text-primary"
								className={`${styles.text} ${!image && `${styles.large}`}`}
							>
								{truncateTextAtWord(stripHtml(content), 400)}
							</Typography>
							<div className={styles.footer}>
								<div className={styles.author}>
									<Image
										src={photo ?? ''}
										alt={`${first_name} ${last_name}`}
										width={30}
										height={30}
										className={styles.avatar}
									/>
									<Typography variant="body-sm">{`${first_name} ${last_name}`}</Typography>
								</div>
								<div className={styles.stats}>
									<div className={styles.likes}>
										<Image
											src="/icons/like2.svg"
											alt="→"
											width={20}
											height={20}
											className={styles.icon}
										/>{' '}
										{likes}
									</div>
									<div className={styles.vertical}></div>
									<div className={styles.time}>
										<Image
											src="/icons/time2.svg"
											alt="→"
											width={20}
											height={20}
											className={styles.icon}
										/>{' '}
										{`${read_time} мин`}
									</div>
								</div>
								{variant === 'expanded' && (
									<Link
										href={`/blog/${slug}`}
										text="Читать подробнее"
										className={styles.blogLink}
									/>
								)}
							</div>
						</div>
					</article>
				</NextLink>
			)}
		</>
	);
};
