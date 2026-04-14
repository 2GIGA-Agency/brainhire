import { Typography } from '@/components';
import styles from './style.module.scss';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';

export default function DemoSuccess() {
	return (
		<>
			<Header />
			<div className={styles.main}>
				<Typography variant="h1" color="white" className={styles.title}>
					Заявка успешно получена. В ближайшее время наш менеджер свяжется с вами для согласования
					времени проведения демонстрации.
				</Typography>
				<Link href="/">
					<Typography variant="h2" color="white" className={styles.backLink}>
						← Вернуться на главную
					</Typography>
				</Link>
			</div>
		</>
	);
}
