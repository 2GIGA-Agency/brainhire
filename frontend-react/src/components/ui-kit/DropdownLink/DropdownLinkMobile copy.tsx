'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import { Typography } from '../Typography';
import styles from './DropdownLink.module.scss';

interface DropdownLinkItem {
	icon: string;
	title: string;
	description: string;
	link: string;
}

interface DropdownLinkProps {
	title: string;
	margin?: string;
	padding?: string;
	items: DropdownLinkItem[];
}

export const DropdownLinkMobile: React.FC<DropdownLinkProps> = ({
	title,
	items,
	padding,
	margin,
}) => {
	const [isOpen, setIsOpen] = useState(false);

	const handleClick = () => {
		setIsOpen((prev) => !prev);
	};

	return (
		<div className={styles.dropdown} style={{ margin, padding }}>
			<div className={styles.titleContainer} onClick={handleClick}>
				<Typography variant="h4">{title}</Typography>
				<Image
					src="icons/arrow_header.svg"
					alt=""
					width={30}
					height={20}
					className={isOpen ? styles.open : styles.closed}
					unoptimized
				/>
			</div>

			<div
				className={`${styles.menu} ${isOpen ? styles.menuOpen : styles.menuClosed}`}
				aria-expanded={isOpen}
			>
				{items.map((item, index) => (
					<a href={item.link} key={index} className={styles.item}>
						<Image src={item.icon} alt={item.title} width={20} height={20} />
						<div>
							<span className={styles.itemTitle}>{item.title}</span>
							<p className={styles.itemDescription}>{item.description}</p>
						</div>
					</a>
				))}
			</div>
		</div>
	);
};
