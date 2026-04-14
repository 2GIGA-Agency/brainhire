import { Typography } from '@/components/ui-kit/Typography';
import Image from 'next/image';
import React from 'react';
import styles from './FeatureBlock.module.scss';
import { Feature } from '@/components/sections/main/Features/FeatureListSection';

export const FeatureBlock: React.FC<Feature> = ({ title, description, image, reverse = false }) => {
	return (
		<div className={`${styles.feature} ${reverse ? styles.reverse : ''}`}>
			<div className={styles.text}>
				<div>
					<Typography variant="h3" margin="0 0 20px">
						{title}
					</Typography>
					<Typography variant="body-text">{description}</Typography>
				</div>
			</div>
			<div className={styles.imageContainer}>
				<Image
					className={styles.image}
					src={image}
					alt={typeof title == 'string' ? title : ''}
					width={400}
					height={250}
					unoptimized
				/>
			</div>
		</div>
	);
};
