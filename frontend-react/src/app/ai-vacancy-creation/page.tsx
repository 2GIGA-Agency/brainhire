import { Typography } from '@/components';
import { Header } from '@/components/layout/Header';
import { SpeedUpSection } from '@/components/sections/main/SpeedUpSection';
import {
	Hero,
	Clients,
	FeatureListSection,
	WhoBenefits,
	SolutionForm,
	FAQ,
} from '@/components/sections/main';
import style from './style.module.scss';
import { Footer } from '@/components/layout/Footer';

const features = [
	{
		title: 'Мгновенная генерация вакансий',
		description:
			'Искусственный интеллект создаёт полное описание вакансии за 30 секунд. Просто укажите должность и ключевые требования — система сформирует структурированный текст с обязанностями, требованиями и условиями работы. Сгенерированную вакансию можно редактировать или полностью менять на свое усмотрение. Генерация вакансий теперь не требует часов работы рекрутеров',
		image: '/images/LkScreenshots/vacancy_info_generation.avif',
		reverse: true,
	},
	{
		title: 'Умный анализ текста',
		description:
			'Система проводит анализ текста на соответствие лучшим практикам рекрутинга. BRaiN HR проверяет описание вакансии на наличие дискриминационных формулировок, оценивает привлекательность предложения и даёт рекомендации по улучшению. Анализ текста помогает создавать вакансии, которые привлекают больше откликов',
		image: '/images/LkScreenshots/clever_text_analysis.avif',
	},
	{
		title: 'Адаптация под площадки',
		description:
			'Генератор вакансий автоматически адаптирует текст вакансии под требования различных платформ: hh.ru и других популярных площадок. Одно описание вакансии трансформируется в несколько форматов с учётом особенностей каждой площадки',
		image: '/images/LkScreenshots/different_styles.avif',
		reverse: true,
	},
	{
		title: 'SEO-оптимизация текста',
		description:
			'Создание вакансий с учётом поисковой оптимизации увеличивает видимость ваших предложений. ИИ автоматически внедряет релевантные ключевые слова в текст, сохраняя естественность изложения и привлекательность для кандидатов',
		image: '/images/LkScreenshots/seo.avif',
	},
	{
		title: 'Библиотека шаблонов',
		description:
			'Используйте готовые шаблоны для создания вакансий в различных отраслях. Система сохраняет успешные описания вакансий и предлагает их в качестве основы для новых публикаций, ускоряя процесс подбора персонала',
		image: '/images/LkScreenshots/patterns.avif',
		reverse: true,
	},
	{
		title: 'Мультиязычная генерация вакансий нейросетью',
		description:
			'BRaiN HR создаёт текст на нескольких языках одновременно. Генерация вакансий нейросетью на русском, английском и других языках позволяет искать кандидатов на международном рынке без привлечения переводчиков',
		image: '/images/LkScreenshots/different_languages.avif',
	},
];

const tabsData = [
	{
		id: 'hr-specialists',
		label: 'HR-специалистам ',
		content: {
			title: 'Экономьте до 10 часов в неделю на создание вакансий',
			benefits: [
				{ number: '01', title: 'Выгода №1', text: 'Описание выгоды для малого бизнеса...' },
				{ number: '02', title: 'Выгода №2', text: 'Короткое описание...' },
			],
			image: '/images/land3.avif',
		},
	},
	{
		id: 'rekruiting-agencies',
		label: 'Рекрутинговым агентствам ',
		content: {
			title: 'Масштабируйте бизнес без увеличения штата',
			benefits: [
				{ number: '01', title: 'Автоматизация HR', text: 'Описание...' },
				{ number: '02', title: 'Гибкие настройки', text: 'Система адаптируется...' },
			],
			image: '/images/land10.avif',
		},
	},
	{
		id: 'heads-of-departments',
		label: 'Руководителям отделов',
		content: {
			title: 'Размещайте вакансии самостоятельно без ожидания HR',
			benefits: [
				{ number: '01', title: 'Индивидуальная настройка', text: 'Описание...' },
				{ number: '02', title: 'Интеграция с CRM', text: 'Легко соединяется...' },
			],
			image: '/images/land1.avif',
		},
	},
	{
		id: 'start-ups',
		label: 'Стартапам',
		content: {
			title: 'Профессиональные тексты вакансий без найма копирайтера',
			benefits: [
				{ number: '01', title: 'Индивидуальная настройка', text: 'Описание...' },
				{ number: '02', title: 'Интеграция с CRM', text: 'Легко соединяется...' },
			],
			image: '/images/land4.avif',
		},
	},
	{
		id: 'personnel-centers',
		label: 'Кадровым центрам',
		content: {
			title: 'Обрабатывайте больше заказов на вакансии за меньшее время',
			benefits: [
				{ number: '01', title: 'Индивидуальная настройка', text: 'Описание...' },
				{ number: '02', title: 'Интеграция с CRM', text: 'Легко соединяется...' },
			],
			image: '/images/land1.avif',
		},
	},
];

const speedUpData = {
	title: 'Ускорьте создание вакансий с помощью искусственного интеллекта',
	blocks: [
		{
			title: 'Ручной метод:',
			content: (
				<>
					<ul style={{ paddingLeft: 15 }}>
						<li>
							<Typography variant="body-lg" color="inherit">
								2-4 часа на подготовку текста одной вакансии
							</Typography>
						</li>
						<li>
							<Typography variant="body-lg" color="inherit">
								Риск ошибок и дискриминационных формулировок
							</Typography>
						</li>
						<li>
							<Typography variant="body-lg" color="inherit">
								Необходимость адаптировать описание вакансии под каждую площадку вручную
							</Typography>
						</li>
					</ul>
					<p>
						<Typography variant="body-lg" color="inherit">
							Сложность поддержания единого стиля текста
						</Typography>
					</p>
				</>
			),
		},
		{
			title: 'Автоматизация BRaiN HR:',
			content: (
				<>
					<ul style={{ paddingLeft: 15 }}>
						<li>
							<Typography variant="body-lg" color="inherit">
								30 секунд на генерацию полного описания вакансии
							</Typography>
						</li>
						<li>
							<Typography variant="body-lg" color="inherit">
								Автоматический анализ текста на соответствие требованиям и best practices
							</Typography>
						</li>
						<li>
							<Typography variant="body-lg" color="inherit">
								Мгновенная адаптация под все площадки размещения вакансий
							</Typography>
						</li>
					</ul>
					<p>
						<Typography variant="body-lg" color="inherit">
							Единый фирменный стиль и профессиональный текст вакансии
						</Typography>
					</p>
				</>
			),
		},
	],
};

const faqData = [
	{
		question: 'Как работает генератор вакансий BRaiN HR?',
		answer:
			'Система использует искусственный интеллект для анализа вашей должности и требований. На основе этих данных ИИ формирует структурированное описание вакансии, включающее обязанности, требования, условия работы и преимущества компании. Весь процесс занимает около 30 секунд',
	},
	{
		question: 'Можно ли редактировать созданный текст вакансии?',
		answer:
			'Да, после того как система завершит создание вакансий, вы можете отредактировать любую часть текста. Генератор создаёт базовую версию, которую можно адаптировать под специфику вашей компании и конкретной позиции',
	},
	{
		question: 'Сколько стоит использование генератора описаний вакансий?',
		answer:
			'Первые 100 кандидатов и создание вакансий для них абсолютно бесплатно. После этого стоимость зависит от выбранного тарифного плана и количества активных вакансий. Свяжитесь с нами для расчёта индивидуального предложения',
	},
];

export default function AiStaffScoring() {
	return (
		<div className={style.container}>
			<Header />
			<Hero
				heading="Создание вакансий с помощью ИИ за секунды"
				subheading="Генератор вакансий BRaiN HR автоматически создаёт профессиональное описание вакансии на основе ваших требований. Сократите время на подготовку текста вакансии с нескольких часов до 30 секунд"
				firstButtonText="Создать вакансию бесплатно"
				secondButtonText="Хочу демонстрацию"
			/>
			<Clients />
			<FeatureListSection
				title={'Автоматическое создание вакансий с помощью ИИ'}
				features={features}
			/>
			<WhoBenefits heading="Кому будет полезен генератор описаний вакансий" tabs={tabsData} />
			<SpeedUpSection speedUpData={speedUpData} />
			<SolutionForm title={'Получите доступ к генератору вакансий'} />
			<FAQ items={faqData} />
			<Footer />
		</div>
	);
}
