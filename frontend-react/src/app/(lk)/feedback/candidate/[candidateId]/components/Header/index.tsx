import Image from 'next/image';
import Link from 'next/link';
import styles from './style.module.scss';

export const Header = () => (
	<header className={styles.header}>
		<Link href="/vacancy" className={styles.logo}>
			<Image src="/icons/Logo.svg" alt="На главную" width={120} height={40} />
		</Link>
	</header>
);
