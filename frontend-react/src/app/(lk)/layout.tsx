'use client';

import { ReactNode, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Header } from '@/components/layout/lk/Header';

import { Provider } from '@/components/ui/provider';
import { Provider as RTKProvider } from 'react-redux';
import { store } from '@/store/store';
import { Footer } from '@/components/layout/lk/Footer';
import { LkLayout } from './components/LkLayout';
import styles from './layout.module.scss'; // Добавьте этот файл

const hideHeaderOnPages = [
	'/signin',
	'/signup',
	'/twostep',
	'/success',
	'/maintenance',
	'/login',
	'/avito',
	/^\/vacancy\/[0-9a-fA-F-]{36}\/external$/,
	/^\/feedback\/candidate\/[0-9a-zA-Z-]{36}$/,
	'/forgot-password',
];

const hideFooterOnPages: (string | RegExp)[] = ['/avito'];

export default function Lk({ children }: { children: ReactNode }) {
	const pathname = usePathname();

	useEffect(() => {
		const hostname = window.location.hostname;
		const fetchSubdomains = async () => {
			const sharedPages = ['/signin', '/signup'];

			try {
				const response = await fetch(`/api/select_subdomain/`);

				if (response.status === 404) {
					throw new Error('Доступ по данному поддомену запрещён');
				}

				const data = await response.json();

				if (!data.subdomain.length) {
					throw new Error('Ошибка получения поддоменов, попробуйте зайти позже...');
				}

				if (!data.subdomain.includes(hostname.split('.')[0])) {
					throw new Error('Доступ по данному поддомену запрещён');
				}
			} catch (e: unknown) {
				if (e instanceof Error && !sharedPages.includes(window.location.pathname)) {
					if (e.message.includes('Доступ')) {
						// Удаляем поддомен (первую часть hostname)
						const domainParts = hostname.split('.');
						const mainDomain = domainParts.slice(1).join('.'); // Убираем поддомен (первый элемент)

						// Формируем новый URL (сохраняем протокол, путь и хэш)
						const newUrl = `${window.location.protocol}//${mainDomain}/wrong-subdomain`;

						// Переходим на URL без поддомена
						window.location.href = newUrl;
					} else {
						console.error(e.message);
					}
				}
			}
		};

		fetchSubdomains();
	}, []);

	const shouldHideHeader = hideHeaderOnPages.some((path) =>
		typeof path === 'string' ? pathname.startsWith(path) : path.test(pathname)
	);

	const shouldHideFooter = hideFooterOnPages.some((path) =>
		typeof path === 'string' ? pathname.startsWith(path) : path.test(pathname)
	);

	return (
		<RTKProvider store={store}>
			<Provider>
				<div className={styles.layout}>
					{!shouldHideHeader && <Header />}
					<div className={styles.content}>
						<LkLayout>{children}</LkLayout>
					</div>
					{!shouldHideFooter && <Footer />}
				</div>
			</Provider>
		</RTKProvider>
	);
}
