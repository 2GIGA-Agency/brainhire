import {
	Clients,
	FAQ,
	Hero,
	SolutionForm,
	SolutionsGrid,
	VideoSection,
	WhoBenefits,
} from '@/components/sections/main';

import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import style from './Recruiting.module.scss';
import OrganizationSchema from '@/components/shared/Schemas/OrganizationSchema';
import FaqSchema from '@/components/shared/Schemas/FAQSchema';
import VideoSchema from '@/components/shared/Schemas/VideoObjectSchema';
import BreadcrumbsSchema from '@/components/shared/Schemas/BreadCrumbsSchema';
import RecruitingWebPageSchema from '@/components/shared/Schemas/RecruitingWebPageSchema';
import ProductSchema from '@/components/shared/Schemas/ProductSchema';
import WebSiteSchema from '@/components/shared/Schemas/WebSiteSchema';

const solutionsData = [
	{
		id: 'solution1',
		title: 'Создание вакансий за секунды',
		description:
			'Искусственный интеллект для генерации вакансий. HR-специалисты значительно сокращают время на создание объявлений и могут фокусироваться на стратегических задачах',
		image: '/images/laptop.png',
		gradient: 'gradient-blue',
		isMain: true,
	},
	{
		id: 'solution2',
		title: 'Автоматическая публикация вакансий',
		description:
			'Мгновенная интеграция ведущими сервисами поиска работы, такими как hh.ru, Авито, SuperJob, Работа.ру и Зарплата.ру. После генерации объявления система формирует персональную ссылку на вакансию, которую можно публиковать или пересылать в любом источнике',
		gradient: 'gradient-pink',
		isMain: false,
		textColor: 'black',
	},
	{
		id: 'solution3',
		title: 'ИИ-анализ резюме и скоринг кандидатов ',
		description:
			'Система мгновенно после отклика анализирует поступающие резюме, оценивая соответствие кандидатов требованиям вакансии',
		gradient: 'gradient-gray',
		isMain: false,
	},
	{
		id: 'solution4',
		title: 'Автоматические приглашения',
		description:
			'BRaiN HR автоматически отвергает или приглашает кандидатов на собеседование с ИИ. Это исключает необходимость вручную связываться с каждым кандидатом, повышая эффективность подбора',
		image: '/images/laptop.png',
		gradient: 'gradient-blue',
		isMain: true,
	},
	{
		id: 'solution5',
		title: 'Первичное ИИ-видеоинтервью',
		description:
			'Позволяет стандартизировать интервью, исключая влияние человеческого фактора, и проводить оценку на основе ответов. BRaiN HR выявляет использование сторонних подсказок или программ, гарантируя объективность оценок и честность процесса отбора',
		gradient: 'gradient-pink',
		isMain: false,
		textColor: 'black',
	},
	{
		id: 'solution6',
		title: 'Realtime интервью с ИИ-аватаром и оценка мимики',
		description:
			'Второй раунд интервью с успешными кандидами, где вопросы задаются в реальном времени, исходя из ответов кандидатов. Есть возможность сформировать психологический портрет кандидата на основе языка тела и мимики',
		gradient: 'gradient-gray',
		isMain: false,
	},
];

const tabsData = [
	{
		id: 'small',
		label: 'HR-отделам HR-специалистам',
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
		id: 'medium',
		label: 'Руководителям компаний агентствам',
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
		id: 'large',
		label: 'Рекрутинговым агентствам',
		content: {
			title: 'Ускоренный процесс обработки заявок и формирование кадрового резерва',
			benefits: [
				{ number: '01', title: 'Индивидуальная настройка', text: 'Описание...' },
				{ number: '02', title: 'Интеграция с CRM', text: 'Легко соединяется...' },
			],
			image: '/images/land5.avif',
		},
	},
	{
		id: 'four',
		label: 'IT-компаниям и стартапам',
		content: {
			title: 'Мгновенный найм квалифицированных специалистов',
			benefits: [
				{ number: '01', title: 'Индивидуальная настройка', text: 'Описание...' },
				{ number: '02', title: 'Интеграция с CRM', text: 'Легко соединяется...' },
			],
			image: '/images/land2_5.avif',
		},
	},
	{
		id: 'five',
		label: 'Крупным корпорациям',
		content: {
			title: 'Автоматизация массового подбора персонала на основе AI-аналитики',
			benefits: [
				{ number: '01', title: 'Индивидуальная настройка', text: 'Описание...' },
				{ number: '02', title: 'Интеграция с CRM', text: 'Легко соединяется...' },
			],
			image: '/images/land1.avif',
		},
	},
];

const faqData = [
	{
		question: 'Как BRaiN HR оценивает кандидатов?',
		answer:
			'ИИ анализирует резюме, осуществляет тестирование и видеоинтервью, формируя оценки соискателей.',
	},
	{
		question: 'Можно ли интегрировать платформу с другими HR-системами? кандидатов?',
		answer: 'BRaiN HR поддерживает интеграцию с ATS, CRM и другими HR-платформами.',
	},
	{
		question: 'Сколько стоит использование сервиса? BRaiN HR для массового подбора?',
		answer:
			'При регистрации вам предоставляется 10 000 приветственных токенов, что позволит обработать 100 кандидатов. Далее – гибкая система тарифов в зависимости от количества купленных токенов.',
	},
];

export const metadata = {
	title: 'BRaiN HR Рекрутинг - ИИ-система автоматизации подбора персонала',
	description:
		'Программа для автоматизации найма персонала с помощью искусственного интеллекта. Автоматический поиск кандидатов и приглашение на первичное интевью. ИИ-анализ резюме и скоринг потенциальных сотрудников.',
	alternates: {
		canonical: `https://brainhire.ru/recruiting`,
	},
};

const breadcrumbsData = [{ name: 'Автоматизация рекрутинга', item: 'recruiting' }];

export default function Home() {
	return (
		<>
			{/* --- НАБОР JSON-LD СХЕМ ДЛЯ СТРАНИЦЫ РЕКРУТИНГ--- */}
			<OrganizationSchema />
			<WebSiteSchema />
			<RecruitingWebPageSchema />
			<ProductSchema />
			<RecruitingWebPageSchema />
			<FaqSchema />
			<VideoSchema />
			<BreadcrumbsSchema crumbs={breadcrumbsData} />
			{/* -------------------------------------------------- */}
			<div className={style.container}>
				<Header />
				<Hero
					heading="Автоматизируйте подбор персонала с помощью искусственного интеллекта"
					subheading="Сократите время найма, улучшите качество отбора и снизьте затраты с помощью комплексного решения по автоматизации рекрутинга"
					firstButtonText="100 кандидатов бесплатно"
					secondButtonText="Хочу демонстрацию"
				/>
				<Clients />
				<VideoSection />
				<SolutionsGrid
					title={'Полный цикл автоматизации подбора персонала'}
					solutionsList={solutionsData}
				/>
				<WhoBenefits heading="Кому будет полезен сервис" tabs={tabsData} />
				<SolutionForm title="Проведём демонстрацию для вас" />
				<FAQ items={faqData} />
				<Footer />
			</div>
		</>
	);
}
