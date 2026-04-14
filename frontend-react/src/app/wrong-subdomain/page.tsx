import Link from 'next/link';
import styles from './style.module.scss';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Неверный поддомен',
	robots: {
		index: false,
		follow: false,
	},
};

export default function WrongSubdomain() {
	return (
		<div className={styles.container}>
			<h1>
				Вы попытались использовать неверный поддомен, если вы попали на эту страницу случайно
				обратитесь в техподдержку
			</h1>
			<Link href="/">На главную</Link>
		</div>
	);
}
