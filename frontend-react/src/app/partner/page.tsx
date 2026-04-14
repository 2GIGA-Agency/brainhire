import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { BecomePart } from '@/components/sections/partner/BecomePart';
import { Container, Typography } from '@/components/ui-kit';
import { Breadcrumb } from '@/components/ui-kit/Breadcrumb';
import styles from './Partner.module.scss';
import { Profit } from '@/components/sections/partner/Profit';
import { HowToBecomePartner } from '@/components/sections/partner/HowToPartner';
import { DefaultExamples } from '@/components/sections/partner/DefaultExamples/DefaultExamples';
import { SolutionForm } from '@/components/sections/main';

export const metadata = {
	title: 'Партнерская программа | BRaiN HR',
	description:
		'Подключайте клиентов к BRaiN HR и получайте денежные вознаграждения, исходя из их активности и объёмов покупок.',
	alternates: {
		canonical: `https://brainhire.ru/partner`,
	},
};

export default function Partner() {
	return (
		<>
			<Header />
			<Container>
				<Breadcrumb />
				<BecomePart
					text={`Стань частью партнёрской программы`}
					buttonText={'Стать партнёром'}
					isReferral={false}
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
				forWho={`Для партнеров, которые могут привлекать компании c постоянными потребностями в найме и регулярным использованием платформы BRaiN HR.`}
				rewards={
					<>
						<strong>5%</strong> от каждого платежа клиента (выплачивается ежемесячно) <br />
						<br />
						Оплачиваем за вас, чтобы не беспокоиться: НДФЛ (13% от суммы выплаты) и все страховые
						взносы (30%)
					</>
				}
				benefits={`Неограниченный доход, растущий с активностью клиентов, и прямой стимул к взаимодействию, обратной связи и развитию BRaiN HR.`}
			/>
			<DefaultExamples />
			<HowToBecomePartner reduced={true} />
			<SolutionForm title="Свяжитесь с нами" />
			<Footer />
		</>
	);
}
