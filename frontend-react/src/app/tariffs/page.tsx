import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { SolutionForm } from '@/components/sections/main';
import { TariffCard, Typography } from '@/components/ui-kit';
import { Breadcrumb } from '@/components/ui-kit/Breadcrumb';
import styles from './Tariffs.module.scss';

const tariffsData = [
	{
		title: 'Пробный',
		subTitle: '10 000 бесплатных токенов после регистрации',
		avatar: '/icons/trust.svg',
	},
	{
		title: 'Старт',
		subTitle: '100 - 100 000 токенов',
		price: '100₽',
		priceNote: 'за 100 токенов',
		avatar: '/icons/trust.svg',
	},
	{
		title: 'Оптимальный',
		subTitle: '100 001 - 500 000 токенов',
		price: '95₽',
		priceNote: 'за 100 токенов',
		avatar: '/icons/trust.svg',
	},
	{
		title: 'Бизнес',
		subTitle: '500 001+ токенов',
		price: '90₽',
		priceNote: 'за 100 токенов',
		avatar: '/icons/trust.svg',
	},
];

const reasons = [
	{
		number: '01',
		heading: 'Реальные результаты',
		text: 'Ускорение найма на 50-70%',
	},
	{
		number: '02',
		heading: 'Прозрачная оплата',
		text: 'Платите только за количество обработанных кандидатов — никаких других сборов',
	},
	{
		number: '03',
		heading: 'Полный цикл найма',
		text: 'От описания вакансии до видеоинтервью',
	},
	{
		number: '04',
		heading: 'Поддержка',
		text: 'Личные демо, быстрая помощь в чате',
	},
];

export const metadata = {
	title: 'Тарифы и цены | BRaiN HR',
	description:
		'Подберите план, исходя из объема найма и типа бизнеса. У нас гибкий подход, и мы можем сформировать индивидуальный тариф под ваш запрос.',
	alternates: {
		canonical: `https://brainhire.ru/tariffs`,
	},
};

export default function Tariffs() {
	return (
		<div>
			<Header />
			<div className={styles.container}>
				<Breadcrumb />
				<Typography variant="h1" margin="0 0 32px">
					Тарифы
				</Typography>
				<Typography variant="body-lg" className={styles.h6VisualStyle}>
					Подберите план, исходя из объема найма и типа бизнеса. У нас гибкий подход, и мы можем
					сформировать индивидуальный тариф под ваш запрос.
				</Typography>
				<section className={styles.tariffs}>
					<div className={styles.tariffCards}>
						<Typography variant="body-sm" color="brand-primary" margin="0 0 20px">
							100 токенов = 1 обработанный кандидат*
						</Typography>
						{tariffsData.map((item) => (
							<TariffCard key={item.title} {...item} />
						))}
					</div>
					<div className={styles.info}>
						<Typography variant="h3" className={styles.h4VisualStyle} color="brand-primary">
							Почему стоит сотрудничать с нами?
						</Typography>
						<div className={styles.reasons}>
							{reasons.map((item) => (
								<div key={item.heading} className={styles.reason}>
									<Typography variant="body-sm" color="text-primary" className={styles.number}>
										{item.number}
									</Typography>
									<div className={styles.reasonText}>
										<Typography variant="body-sm" color="text-primary" margin="0 0 6px">
											{item.heading}
										</Typography>
										<Typography variant="body-xs" color="text-primary">
											{item.text}
										</Typography>
									</div>
								</div>
							))}
						</div>
					</div>
				</section>
			</div>
			<SolutionForm title="Проведём демонстрацию для вас" />
			<Footer />
		</div>
	);
}
