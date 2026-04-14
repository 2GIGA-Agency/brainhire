'use client';

import React, { useState, ReactNode } from 'react';
import styles from './Accordion.module.scss';
import Image from 'next/image';
import { Typography } from '@/components/ui-kit/Typography';

interface AccordionProps {
	title: string;
	children: ReactNode; // Вместо content используем children
	isOpen?: boolean;
}

export const Accordion: React.FC<AccordionProps> = ({ title, children, isOpen = false }) => {
	const [open, setOpen] = useState(isOpen);
	const img = open ? '/icons/minus.svg' : '/icons/plus.svg';
	const toggleAccordion = () => {
		setOpen(!open);
	};

	return (
		<div className={styles.accordion}>
			<button className={styles.accordionHeader} onClick={toggleAccordion} aria-expanded={open}>
				<Typography variant="body-lg" className={styles.titleFaq}>
					{title}
				</Typography>
				<span className={`${styles.icon} ${open ? styles.open : ''}`}>
					<Image src={img} alt="" width={20} height={20} priority />
				</span>
			</button>
			{open && <div className={styles.accordionContent}>{children}</div>}
		</div>
	);
};
