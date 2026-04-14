'use client';
import { Typography } from '@/components/ui-kit';
import { useState } from 'react';
import styles from './achievements.module.scss';
import { ContentCard } from './ContentCard';

interface Content {
	[key: string]: {
		link: string;
		external: boolean;
		text: string;
		image?: string;
	}[];
}

const content: Content = {
	one: [
		{
			link: 'https://itspeaker.ru/news/v-rf-poyavilas-novaya-platforma-brain-hr/',
			external: true,
			text: 'Статья itspeaker.ru',
			image: 'https://itspeaker.ru/images/621952993e517e1c5c3ee335c79d62d0.svg',
		},
		{
			link: 'https://www.cnews.ru/news/line/2025-02-14_novaya_platforma_brain_hr',
			external: true,
			text: 'Статья cnews.ru',
			image: 'https://www.cnews.ru/inc/design2019/img/logo.svg',
		},
	],
	two: [
		{
			link: '/accelerator.pdf',
			external: false,
			text: 'Бизнес-акселератор с АБИТ-РосНОУ',
		},
	],
	three: [
		{
			link: '/human-conf-certificate.pdf',
			external: false,
			text: 'Выступление на конференции HUMAN',
		},
	],
};

interface Tab {
	id: keyof typeof content;
	label: string;
	content: {
		title: string;
		benefits: { number: string; title: string; text: string }[];
		image?: string;
	};
}

const tabs: Tab[] = [
	{
		id: 'one',
		label: 'СМИ о Нас',
		content: {
			title:
				'Оптимизация работы автоматизация рутинных задач и точный отбор лучших кандидатов, сокращение времени подбора и снижение затрат',
			benefits: [
				{ number: '01', title: 'Выгода №1', text: 'Описание выгоды для малого бизнеса...' },
				{ number: '02', title: 'Выгода №2', text: 'Короткое описание...' },
			],
			image: '/images/land3.avif',
		},
	},
	{
		id: 'two',
		label: 'Акселератор',
		content: {
			title: 'Снижение затрат на найм, сокращение времени подбора',
			benefits: [
				{ number: '01', title: 'Автоматизация HR', text: 'Описание...' },
				{ number: '02', title: 'Гибкие настройки', text: 'Система адаптируется...' },
			],
			image: '/images/land6.png',
		},
	},
	{
		id: 'three',
		label: 'Сертификаты',
		content: {
			title: 'Ускоренный процесс обработки заявок и формирование кадрового резерва',
			benefits: [
				{ number: '01', title: 'Индивидуальная настройка', text: 'Описание...' },
				{ number: '02', title: 'Интеграция с CRM', text: 'Легко соединяется...' },
			],
			image: '/images/land5.avif',
		},
	},
];

export const AchievementsSection = () => {
	const [activeTab, setActiveTab] = useState<keyof typeof content>(tabs[0].id);

	return (
		<section>
			<div className={styles.container}>
				<Typography variant="h2">Наши достижения</Typography>
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

				{/* Контент */}
				<div className={styles.content}>
					{content[activeTab].map((item) => (
						<ContentCard
							key={item.text}
							external={item.external}
							link={item.link}
							text={item.text}
							image={item.image}
						/>
					))}
				</div>
			</div>
		</section>
	);
};
