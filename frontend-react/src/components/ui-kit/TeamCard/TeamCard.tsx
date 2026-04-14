'use client';

import Image from 'next/image';
import { FC } from 'react';
import { Typography } from '../Typography';
import styles from './TeamCard.module.scss';

interface TeamCardProps {
	photo: string;
	name: string;
	position: string;
}

export const TeamCard: FC<TeamCardProps> = ({ photo, name, position }) => {
	return (
		<div className={styles.card}>
			<div className={styles.photoWrapper}>
				<Image src={photo} alt={name} width={148} height={197} className={styles.photo} />
			</div>
			<div className={styles.info}>
				<Typography variant="h4">{name}</Typography>
				<Typography variant="body-xs">{position}</Typography>
			</div>
		</div>
	);
};
