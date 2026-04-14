import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import styles from './SocialMedia.module.scss';

interface SocialItem {
	href: string;
	icon: string;
}

interface Props {
	items: Record<string, SocialItem>;
}

export const SocialMedia: React.FC<Props> = ({ items }) => {
	return (
		<div className={styles.container}>
			{Object.entries(items).map(([network, data]) => (
				<Link
					href={data.href}
					key={network}
					target="_blank"
					rel="noopener noreferrer"
					aria-label={network}
				>
					<Image src={data.icon} alt={network} width={24} height={24} />
				</Link>
			))}
		</div>
	);
};
