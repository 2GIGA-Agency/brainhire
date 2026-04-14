	import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { Typography } from '@/components/ui-kit';
import { Breadcrumb } from '@/components/ui-kit/Breadcrumb';
import styles from './About.module.scss';
import { AchievementsSection } from '@/components/sections/about/Achievements';
import WebSiteSchema from '@/components/shared/Schemas/WebSiteSchema';
import OrganizationSchema from '@/components/shared/Schemas/OrganizationSchema';
import WebPageSchema from '@/components/shared/Schemas/WebPageSchema';
import BreadcrumbsSchema from '@/components/shared/Schemas/BreadCrumbsSchema';
import { TrustIndicators } from '@/components/sections/main';

// const teamMembers = [
// 	{
// 		name: 'Александр Виноградов',
// 		position: 'Директор',
// 		photo: '/images/team1.png',
// 	},
// 	{
// 		name: 'Максим Неклюев',
// 		position: 'Юрист',
// 		photo: '/images/team2.png',
// 	},
// 	{
// 		name: 'Константин Прошкин',
// 		position: 'Архитектор платформы',
// 		photo: '/images/team3.png',
// 	},
// ];

const trustData = [
	{
		title: 'Инфраструктура в России',
		description:
			'При развертывании системы в облаке BRaiN HR, все данные хранятся на наших серверах в РФ',
		backgroundColor: '#E6F4FF',
		icon: '/icons/trust.svg',
		number: '01',
	},
	{
		title: 'Полный контроль',
		description:
			'Вы можете развернуть систему на своих серверах — тогда все данные останутся внутри организации',
		backgroundColor: '#E8E6FF',
		icon: '/icons/trust.svg',
		number: '02',
	},
	{
		title: 'Аккредитация',
		description: 'Реестр отечественного ПО',
		backgroundColor: '#FAE6FF',
		icon: '/icons/trust.svg',
		number: '03',
	},
];

export const metadata = {
	title: 'О сервисе BRaiN HR',
	description:
		'BRaiN HR – платформа для автоматизация hr процессов на базе ИИ. Узнайте больше о нашей компании, миссии, ценностях и профессиональном подходе к созаднию передового ИИ решения по найму персонала.',
	alternates: {
		canonical: `https://brainhire.ru/about`,
	},
};

const breadcrumbsData = [{ name: 'О нас', item: 'about' }];

export default function About() {
	return (
		<>
			{/* --- НАБОР JSON-LD СХЕМ ДЛЯ СТРАНИЦЫ РЕКРУТИНГ--- */}
			<WebSiteSchema />
			<OrganizationSchema />
			<WebPageSchema />
			<BreadcrumbsSchema crumbs={breadcrumbsData} />
			{/* -------------------------------------------------- */}
			<div>
				<Header />
				<div className={styles.container}>
					<Breadcrumb />
					<Typography variant="h1" margin="0 0 32px">
						О BRaiN HR
					</Typography>
					<Typography variant="body-lg" className={styles.h6VisualStyle} margin="0 0 32px">
						Мы работаем в сегменте IT, ориентированном на создание программных решений, основанных
						на внедрении новейших технологий искусственного интеллекта. Для этого конкретного
						продукта (BRaiN HR) мы создали платформу для HR и других специалистов, вовлеченных в
						цикл найма. <br /> <br />
						BRaiN HR — это онлайн-платформа на базе искусственного интеллекта с полным набором
						инструментов для быстрого и качественного автоматизированного подбора персонала.
						Основной функционал включает в себя: автоматизированное описание вакансий, интеграцию с
						сайтами джоб-бордов, возможность разместить вакансию по ссылке, оценку резюме с помощью
						AI (анализ на основе наличия необходимого опыта и навыков) и видеоинтервью с помощью AI,
						которые также оцениваются.
					</Typography>
				</div>
				<section className={styles.mission}>
					<div className={styles.containerMission}>
						<Typography variant="h2" color="white" className={styles.missionHeading}>
							Наша миссия
						</Typography>
						<div className={styles.card}>
							<Typography variant="h3" className={styles.h4VisualStyle}>
								«AI First» для улучшения процесса найма!
							</Typography>
						</div>
					</div>
				</section>
				<TrustIndicators title={'Вы можете нам доверять'} indicatorsData={trustData} />
				<AchievementsSection />
				{/* <div className={styles.team}>
				<div className={styles.teamContainer}>
					<Typography variant="h1" className={styles.teamTitle}>
						Наша команда
					</Typography>
					<div className={styles.specs}>
						{teamMembers.map((item) => (
							<TeamCard key={item.name} {...item} />
						))}
					</div>
				</div>
			</div> */}
				<Footer />
			</div>
		</>
	);
}
