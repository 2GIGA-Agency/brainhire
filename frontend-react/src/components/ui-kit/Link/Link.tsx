import Image from 'next/image';
import NextLink from 'next/link';
import React from 'react';
import { Typography } from '../Typography';
import styles from './Link.module.scss';

interface LinkComponentProps {
	href: string;
	text: string;
	className?: string;
	withoutArrow?: boolean;
}

export const Link: React.FC<LinkComponentProps> = ({
	href,
	text,
	className = '',
	withoutArrow = false,
}) => {
	return (
		<NextLink href={href} className={`${styles.link} ${className}`}>
			<Typography variant="body-text" className={styles.text}>
				{text}
			</Typography>
			{!withoutArrow && (
				<Image
					src="/icons/arrow_right.svg"
					alt="→"
					width={16}
					height={16}
					className={styles.icon}
				/>
			)}
		</NextLink>
	);
};
