import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { BecomePart } from '@/components/sections/partner/BecomePart';
import { Container, Typography } from '@/components/ui-kit';
import { Breadcrumb } from '@/components/ui-kit/Breadcrumb';
import styles from './Referral.module.scss';
import { Profit } from '@/components/sections/partner/Profit';
import { HowToBecomePartner } from '@/components/sections/partner/HowToPartner';
import Calculator from '@/components/sections/partner/Calculator';

export const metadata = {
	title: 'Партнерская программа | BRaiN HR',
	description:
		'Подключайте клиентов к BRaiN HR и получайте денежные вознаграждения, исходя из их активности и объёмов покупок.',
	alternates: {
		canonical: `https://brainhire.ru/partner`,
	},
};

export default function Referral() {
	return (
		<>
			<Header />
			<Container>
				<Breadcrumb />
				<BecomePart
					text={`Станьте официальным агентом BRaiN HR`}
					buttonText={'Стать агентом'}
					isReferral={true}
				/>
			</Container>
			<div className={styles.about}>
				<Container>
					<Typography variant="h2" className={styles.textMb}>
						О программе
					</Typography>
					<Typography variant="h3" className={styles.h6VisualStyle}>
						BRaiN HR - это инновационная система для автоматизации рекрутинга с использованием AI
						для скрининга резюме, видеоинтервью и с интеграцией с ведущими job-сайтами.
					</Typography>
					<Typography variant="h3" className={styles.h6VisualStyle}>
						<span className={styles.why}>Почему это важно:</span> Компании экономят время и деньги,
						закрывая вакансии в 3 раза быстрее при меньшем количестве задействованных людей, а
						рекрутеры избавляются от рутины и могут сосредоточиться на стратегических задачах.{' '}
					</Typography>
					<Typography variant="h3" className={styles.h6VisualStyle}>
						<strong>
							Наши партнеры зарабатывают, помогая своему окружению внедрять AI-технологии,
						</strong>{' '}
						чтобы опережать конкурентов и снижать расходы!
					</Typography>
				</Container>
			</div>
			<Profit
				forWho={`Для рекрутеров и HR-агентств, консультантов в сфере HR, бизнес-партнёров и IT-интеграторов, а также всех, кто хочет зарабатывать на инновациях в HR`}
				rewards={`Вознаграждение зависит от вашего уровня в программе и может составлять от 15 до 25%`}
				benefits={`Высокое вознаграждение с платежей клиентов, длительное начисление комиссии, лёгкий старт с поддержкой менеджера и демо-доступ для презентаций.`}
			/>
			<HowToBecomePartner reduced={false} />
			<Calculator />
			{/* <SolutionForm /> */}
			<Footer />
		</>
	);
}
