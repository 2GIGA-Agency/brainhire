'use client';
import { Typography } from '@/components/ui-kit';
import { Button } from '@/components/ui-kit/Button';
import Image from 'next/image';
import React, { useState } from 'react';
import styles from './LikeShare.module.scss';
import axios from 'axios';

interface Props {
	postId: number;
}

export const LikeShare: React.FC<Props> = ({ postId }) => {
	const [liked, setLiked] = useState(false);

	const likeIcon = liked ? '/icons/like_filled.svg' : '/icons/heart.svg';

	const handleLike = () => {
		axios.post(`https://blog.kreorg.ru/posts/${postId}/like/`);
		setLiked(!liked);
	};

	const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

	const tgLink = `https://t.me/share/url?url=${encodeURIComponent(currentUrl)}`;
	const vkLink = `https://vk.com/share.php?url=${encodeURIComponent(currentUrl)}`;
	const whatsAppLink = `https://wa.me/?text=${encodeURIComponent(currentUrl)}`;

	return (
		<div className={styles.container}>
			<Button variant="primary" onClick={handleLike} icon={likeIcon}>
				{liked ? 'Убрать лайк' : 'Лайкнуть статью'}
			</Button>

			<div className={styles.share}>
				<Typography variant="body-sm" as="span" color="text-primary">
					Поделиться:
				</Typography>
				<a href={tgLink} target="_blank" rel="noopener noreferrer">
					<Image src="/icons/telegram.svg" alt="Telegram" width={24} height={24} />
				</a>
				<a href={vkLink} target="_blank" rel="noopener noreferrer">
					<Image src="/icons/vk.svg" alt="VK" width={24} height={24} />
				</a>
				<a href={whatsAppLink} target="_blank" rel="noopener noreferrer">
					<Image src="/icons/whatsup.svg" alt="WhatsApp" width={24} height={24} />
				</a>
			</div>
		</div>
	);
};
