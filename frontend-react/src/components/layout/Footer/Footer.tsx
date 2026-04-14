import { SocialMedia, Typography } from '@/components/ui-kit';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import styles from './Footer.module.scss';
import {
	AD_CONSENT_LINK,
	PERSONAL_DATA_CONSENT_LINK,
	PRIVACY_POLICY_LINK,
	PRODUCT_DESCRIPTION_LINK,
	USER_AGREEMENT_LINK,
	USER_INSTRUCTIONS_LINK,
} from '@/constants/links';

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

export const Footer = async () => {
	return (
		<footer className={styles.footer}>
			<div className={styles.container}>
				<div className={styles.top}>
					<div className={styles.column}>
						<Link href="/recruiting">
							<Typography variant="body-sm" as="span">
								Рекрутинг
							</Typography>
						</Link>
					</div>

					<div className={styles.column}>
						<Link href="/#solutions">
							<Typography className={styles.title} variant="body-sm" as="span">
								Решения
							</Typography>
						</Link>
						<ul>
							<li>
								<Link href="/#solution1">Создание вакансий за секунды</Link>
							</li>
							<li>
								<Link href="/#solution2">Автоматическая публикация вакансий</Link>
							</li>
							<li>
								<Link href="/#solution3">ИИ-анализ резюме и скоринг кандидатов</Link>
							</li>
							<li>
								<Link href="/#solution4">Автоматические приглашения</Link>
							</li>
							<li>
								<Link href="/#solution5">Первичное ИИ-видеоинтервью</Link>
							</li>
							<li>
								<Link href="/#solution6">Realtime интервью с ИИ-аватаром и оценка мимики</Link>
							</li>
						</ul>
					</div>

					<div className={styles.column}>
						<Link href="/about">
							<Typography className={styles.title} variant="body-sm" as="span">
								Компания
							</Typography>
						</Link>
						<ul>
							<li>
								<Link href="/about">О нас</Link>
							</li>
							<li>
								<Link href="/partner">Партнёрская программа</Link>
							</li>
							<li>
								<Link href="/#questions">Вопросы и ответы</Link>
							</li>
						</ul>
					</div>

					<div className={styles.column}>
						<Link href="/about">
							<Typography className={styles.title} variant="body-sm" as="span">
								Контакты
							</Typography>
						</Link>
						<p>
							<a href="tel:+74958591070">+7 (495) 859-10-70</a>
						</p>
						<p className={styles.small}>Служба поддержки</p>
						<p>
							<strong>Электронная почта</strong>
						</p>
						<a href="mailto:info@brainhire.ru" className={styles.small}>
							info@brainhire.ru
						</a>
						<p>
							<strong>Адрес</strong>
						</p>
						<p className={styles.small}>
							142005 Московская область, г. Домодедово, мкр. Центральный, ул. Кирова, д. 7, к.1,
							пом. 0011, офис 5
						</p>
						<div className={styles.socials}>
							<SocialMedia items={social} />
						</div>
					</div>
				</div>
			</div>

			<div className={styles.bottom}>
				<div className={styles.container}>
					<div className={styles.logo}>
						<Image src="/icons/Logo.svg" alt="" width={100} height={30} />
					</div>
					<div className={styles.legal}>
						<Link href={PERSONAL_DATA_CONSENT_LINK} target="_blank" rel="noopener noreferrer">
							Согласие на обработку данных
						</Link>
						<Link href={USER_AGREEMENT_LINK} target="_blank" rel="noopener noreferrer">
							Пользовательское соглашение
						</Link>
						<Link href={PRIVACY_POLICY_LINK} target="_blank" rel="noopener noreferrer">
							Политика конфиденциальности
						</Link>
						<Link href={AD_CONSENT_LINK} target="_blank" rel="noopener noreferrer">
							Согласие на рассылки
						</Link>
						<Link href={USER_INSTRUCTIONS_LINK} target="_blank" rel="noopener noreferrer">
							Инструкция по установке и эксплуатации ПО
						</Link>
						<Link href={PRODUCT_DESCRIPTION_LINK} target="_blank" rel="noopener noreferrer">
							Описание функциональных характеристик ПО
						</Link>
					</div>
					<div className={styles.copyright}>
						&copy; ООО «НДК», ОГРН 1225000105010. Все права защищены.
					</div>
				</div>
			</div>
		</footer>
	);
};
