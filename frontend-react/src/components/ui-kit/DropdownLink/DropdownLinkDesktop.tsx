'use client';

import Image from 'next/image';
import React, { useRef, useState } from 'react';
import { Typography } from '../Typography';
import styles from './DropdownLinkDesktop.module.scss';

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

export const DropdownLinkDesktop: React.FC<DropdownLinkProps> = ({
	title,
	items,
	padding,
	margin,
}) => {
	const [isOpen, setIsOpen] = useState(false);

	const timeoutRef = useRef<NodeJS.Timeout | null>(null);

	// Функция для открытия меню
	const handleMouseEnter = () => {
		if (timeoutRef.current) clearTimeout(timeoutRef.current);
		setIsOpen(true);
	};

	// Функция для закрытия меню с задержкой
	const handleMouseLeave = () => {
		timeoutRef.current = setTimeout(() => {
			setIsOpen(false);
		}, 200); // 200ms задержка перед закрытием
	};

	return (
		<div className={styles.dropdown} style={{ margin, padding }}>
			<div style={{ textAlign: 'center' }}>
				<Typography
					className={styles.title}
					variant="body-sm"
					as="span"
					onMouseEnter={handleMouseEnter}
					onMouseLeave={handleMouseLeave}
				>
					{title}
				</Typography>
			</div>
			<div
				className={`${styles.menu} ${isOpen ? styles.menuOpen : styles.menuClosed}`}
				aria-expanded={isOpen}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
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
