import { Typography } from '../Typography';
import Image from 'next/image';
import React from 'react';
import styles from './Author.module.scss';
import { Post } from '@/app/blog/types';

export const Author: React.FC<Post> = ({ first_name, last_name, views, read_time, photo }) => {
	return (
		<div className={styles.author}>
			<Image
				src={photo ?? ''}
				alt={`${first_name} ${last_name}`}
				width={82}
				height={82}
				className={styles.avatar}
			/>
			<div className={styles.details}>
				<Typography variant="h2" className={styles.authorName} margin="0">{`${first_name} ${last_name}`}</Typography>
				{/* <Typography variant="body-text" margin='0'>{authorJob}</Typography> */}
				<div className={styles.meta}>
					<div className={styles.views}>
						<Image src="/icons/views.svg" alt="Views" width={16} height={16} />
						<span>{views.toLocaleString()}</span>
					</div>
					<div className={styles.readTime}>
						<Image src="/icons/time2.svg" alt="Read time" width={16} height={16} />
						<span>{`${read_time} мин`}</span>
					</div>
				</div>
			</div>
		</div>
	);
};
