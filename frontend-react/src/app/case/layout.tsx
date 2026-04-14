import { Footer } from '@/components/layout/Footer';
import styles from './style.module.scss';
import { Header } from '@/components/layout/Header';

interface Props {
	children: React.ReactNode;
}

export default function CaseLayout({ children }: Props) {
	return (
		<>
			<Header />
			<div className={styles.container}>{children}</div>
			<Footer />
		</>
	);
}
