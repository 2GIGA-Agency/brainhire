import { SocialMedia, Typography } from '@/components';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { SolutionForm } from '@/components/sections/main';
import { Breadcrumb } from '@/components/ui-kit/Breadcrumb';
import styles from './Contacts.module.scss';
import WebSiteSchema from '@/components/shared/Schemas/WebSiteSchema';
import OrganizationSchema from '@/components/shared/Schemas/OrganizationSchema';
import WebPageSchema from '@/components/shared/Schemas/WebPageSchema';
import BreadcrumbsSchema from '@/components/shared/Schemas/BreadCrumbsSchema';
import { MapContainer } from './MapContainer';

const social = {
	vk: {
		href: 'https://vk.com/brain_hr',
		icon: '/icons/vk.svg',
	},
	instagram: {
		href: 'https://www.instagram.com/brain_hire/',
		icon: '/icons/instagram.svg',
	},
	telegram: {
		href: 'https://t.me/BRaiN_HR',
		icon: '/icons/telegram.svg',
	},
	facebook: {
		href: 'https://www.facebook.com/profile.php?id=61572491862186',
		icon: '/icons/facebook.svg',
	},
	linkedin: {
		href: 'https://www.linkedin.com/company/105875559/admin/lk/',
		icon: '/icons/linkedin.svg',
	},
};

export const metadata = {
	title: 'Контактные данные | BRaiN HR',
	description:
		'Контакты компании BRaiN HR. Контактные данные главного офиса и службы поддержки. Юридическая информация и адрес.',
	alternates: {
		canonical: `https://brainhire.ru/contacts`,
	},
};

const breadcrumbsData = [{ name: 'Контакты', item: 'contacts' }];

export default function Contacts() {
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
				</div>
				<div className={styles.container}>
					<div className={styles.info}>
						<Typography variant="h1" className={styles.title}>
							Контакты
						</Typography>
						<div className={styles.infoContainer}>
							<div className={styles.infoContainerText}>
								<Typography variant="h2" className={styles.h4VisualStyle}>
									Офис ООО «НДК»
								</Typography>
								<Typography variant="body-xs" margin="0 0 18px">
									Адрес:{' '}
									<Typography variant="body-text" as="span">
										142005 Московская область, г. Домодедово, мкр. Центральный, ул. Кирова, д. 7,
										к.1, пом. 0011, офис 5
									</Typography>
								</Typography>

								<Typography variant="body-xs" margin="0 0 18px">
									Телефон офиса:{' '}
									<Typography variant="body-text" as="span">
										<a href="tel:+74958591070">+7 (495) 859-10-70</a>
									</Typography>
								</Typography>
								<Typography variant="body-xs" margin="0 0 18px">
									Электронная почта: 
									<Typography variant="body-text" as="span">
										<a href="mailto:info@brainhire.ru">info@brainhire.ru</a>
									</Typography>
								</Typography>
								<Typography variant="body-xs" margin="0 0 18px">
									Время работы:{' '}
									<Typography variant="body-text" as="span">
										Пн-Пт с 10:00 до 18:00
									</Typography>
								</Typography>
								<Typography variant="body-xs" margin="0 0 18px">
									ИНН:{' '}
									<Typography variant="body-text" as="span">
										5009132924
									</Typography>
								</Typography>
								<Typography variant="body-xs">
									ОГРН:{' '}
									<Typography variant="body-text" as="span">
										1225000105010
									</Typography>
								</Typography>
							</div>

							<MapContainer />
						</div>

						<Typography variant="h2" className={styles.h4VisualStyle} margin="32px 0">
							Поддержка клиентов
						</Typography>
						{/* <Typography variant="body-xs" margin="0 0 18px">
							Служба поддержки:{' '}
							<Typography variant="body-text" as="span">
								+7 (495) 859-10-70
							</Typography>
						</Typography> */}
						<Typography variant="body-xs" margin="0 0 18px">
							Электронная почта:{' '}
							<Typography variant="body-text" as="span">
								<a href="mailto:support@brainhire.ru">support@brainhire.ru</a>
							</Typography>
						</Typography>

						<Typography variant="body-text" as="span" margin="0 0 18px">
							Сотрудники поддержки ответят вам в рабочее время: Пн-Пт с 10:00 до 19:00
						</Typography>

						<Typography variant="h2" className={styles.h4VisualStyle} margin="32px 0">
							Социальные сети
						</Typography>
						<SocialMedia items={social} />
					</div>
				</div>

				<SolutionForm title="Проведём демо для вас" theme="light" />
				<Footer />
			</div>
		</>
	);
}
