import { Header } from '@/components/layout/Header';
import styles from './style.module.scss';
import React from 'react';
import { Footer } from '@/components/layout/Footer';

interface Props {
	children: React.ReactNode;
}

export default function BlogLayout({ children }: Props) {
	return (
		<div>
			<Header />
			<div className={styles.container}>{children}</div>
			<Footer />
		</div>
	);
}
