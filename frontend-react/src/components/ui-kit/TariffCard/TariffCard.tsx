'use client';

import Image from 'next/image';
import { FC } from 'react';
import { Typography } from '../Typography';
import styles from './TariffCard.module.scss';

interface TariffCardProps {
	title: string;
	subTitle: string;
	price?: string;
	priceNote?: string;
	avatar: string;
}

export const TariffCard: FC<TariffCardProps> = ({ title, subTitle, price, priceNote, avatar }) => {
	return (
		<div className={styles.card}>
			<div className={styles.avatarWrapper}>
				<Image src={avatar} alt="Avatar" width={46} height={46} className={styles.avatar} />
			</div>

			<div className={styles.cardContent}>
				<Typography variant="body-sm">{title}</Typography>
				<Typography variant="body-xs">{subTitle}</Typography>
			</div>

			{price && (
				<div className={styles.price}>
					<Typography variant="h3" className={styles.priceNumber}>{price}</Typography>
					<Typography variant="body-xss">{priceNote}</Typography>
				</div>
			)}
		</div>
	);
};
