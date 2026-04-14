import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import Reviews from '@/components/sections/main/Reviews/Reviews';
import styles from './styles.module.scss';
import ReviewsListSchema from '@/components/shared/Schemas/Reviews/ReviewsWebPageSchema';
import WebSiteSchema from '@/components/shared/Schemas/WebSiteSchema';
import OrganizationSchema from '@/components/shared/Schemas/OrganizationSchema';
import ReviewSchema from '@/components/shared/Schemas/Reviews/Review';

export const metadata = {
	title: 'Отзывы | BRaiN HR',
	description: 'Отзывы пользователей после использования BRaiN HR',
	alternates: {
		canonical: `https://brainhire.ru/reviews`,
	},
};

export default function ReviewsPage() {
	return (
		<>
			<ReviewSchema />
			<OrganizationSchema />
			<WebSiteSchema />
			<ReviewsListSchema />
			<Header />
			<div className={styles.container}>
				<Reviews />
			</div>
			<Footer />
		</>
	);
}
