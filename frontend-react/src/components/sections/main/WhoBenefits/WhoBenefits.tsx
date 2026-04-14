'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui-kit/Button';
import { Typography } from '@/components/ui-kit/Typography';
import styles from './WhoBenefits.module.scss';

// Определяем структуры данных для вкладок:
interface BenefitItem {
	number: string;
	title: string;
	text: string;
}

interface TabContent {
	title: string;
	benefits: BenefitItem[];
	image: string;
}

interface WhoBenefitsTab {
	id: string; // Уникальный идентификатор вкладки
	label: string; // Подпись на кнопке таба
	content: TabContent; // Содержимое для этой вкладки
}

interface WhoBenefitsProps {
	heading: string; // Заголовок всего блока
	tabs: WhoBenefitsTab[]; // Массив вкладок со всем содержимым
}

export const WhoBenefits: React.FC<WhoBenefitsProps> = ({ heading, tabs }) => {
	// Берём первый таб из списка в качестве начального (если tabs не пустой)
	const defaultTabId = tabs.length > 0 ? tabs[0].id : '';
	const [activeTab, setActiveTab] = useState<string>(defaultTabId);

	// Ищем контент для текущего activeTab
	const activeTabData = tabs.find((tab) => tab.id === activeTab);

	if (!activeTabData) {
		// Если вкладка не найдена, не рендерим или рендерим заглушку
		return null;
	}

	return (
		<section className={styles.whoBenefits}>
			<div className={styles.container}>
				<Typography variant="h2" className={styles.heading}>
					{heading}
				</Typography>

				{/* Вкладки */}
				<div className={styles.tabs}>
					{tabs.map((tab) => (
						<button
							key={tab.id}
							className={`${styles.tab} ${activeTab === tab.id ? styles.active : ''}`}
							onClick={() => setActiveTab(tab.id)}
						>
							{tab.label}
						</button>
					))}
				</div>

				{/* Контент активной вкладки */}
				<div className={styles.content}>
					<div className={styles.text}>
						<Typography variant="h3" margin="0 0 20px">
							{activeTabData.content.title}
						</Typography>
						<div className={styles.btn}>
							<Button variant="primary" fullWidth as="link" href="/signup">
								Попробовать бесплатно
							</Button>
						</div>
					</div>
					<div className={styles.imageContainer}>
						<Image
							src={activeTabData.content.image}
							alt=""
							width={500}
							height={300}
							className={styles.img}
							unoptimized
							priority
						/>
					</div>
				</div>
			</div>
		</section>
	);
};
