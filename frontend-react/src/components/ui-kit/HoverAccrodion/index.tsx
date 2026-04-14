'use client';

import React, { useState, ReactNode } from 'react';
import styles from './style.module.scss';
import { Typography } from '@/components/ui-kit/Typography';

interface HoverAccordionProps {
	title: string;
	children: ReactNode;
	iconClosed: ReactNode;
	iconOpen: ReactNode;
	className?: string; // Добавляем возможность передать внешний класс
}

export const HoverAccordion: React.FC<HoverAccordionProps> = ({
	title,
	children,
	iconClosed,
	iconOpen,
	className,
}) => {
	const [isOpen, setIsOpen] = useState(false);

	const handleMouseEnter = () => {
		setIsOpen(true);
	};

	const handleMouseLeave = () => {
		setIsOpen(false);
	};

	return (
		// Передаем внешний className и вешаем обработчики
		<div
			className={`${styles.accordion} ${className || ''}`}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			{/* Заголовок теперь стилизуется как обычная ссылка в шапке */}
			<div className={styles.accordionHeader} aria-expanded={isOpen}>
				<Typography variant="body-sm" as="span" className={styles.title}>
					{title}
				</Typography>
				<span className={styles.icon}>
					{/* Показываем нужную иконку в зависимости от состояния */}
					{isOpen ? iconOpen : iconClosed}
				</span>
			</div>
			{/* 
        Управляем видимостью контента через классы, а не через условный рендеринг.
        Это нужно для плавной анимации появления/исчезновения.
      */}
			<div className={`${styles.accordionContent} ${isOpen ? styles.open : ''}`}>{children}</div>
		</div>
	);
};
