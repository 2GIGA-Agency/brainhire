'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { Typography } from '../Typography';
import styles from './Breadcrumb.module.scss';
import NextLink from 'next/link';

const PATH_TITLE_MAP: Record<string, string> = {
	'/contacts': 'Контакты',
	'/about': 'О компании',
	'/tariffs': 'Тарифы',
	'/partner': 'Партнерская программа',
	'/blog': 'Блог',
	'/referral': 'Партнёрская программа',
};

interface Props {
	lastLink?: string;
	links?: { name: string; url?: string }[];
}

export const Breadcrumb: React.FC<Props> = ({ links, lastLink }) => {
	const pathname = usePathname();
	const pageTitle = PATH_TITLE_MAP[pathname];

	return (
		<nav className={styles.breadcrumb}>
			<ul>
				<li>
					<Link href="/">
						<div className={styles.home}>
							<Image src="/icons/home.svg" alt="Home" width={16} height={16} unoptimized />
							<Typography variant="body-xss-regular" color="text-secondary" as="span">
								Главная
							</Typography>
						</div>
					</Link>
				</li>

				{pageTitle && (
					<li>
						<Typography variant="body-xss-regular" color="text-primary" as="span">
							{pageTitle}
						</Typography>
					</li>
				)}

				{pathname.includes('/blog/') && (
					<li>
						<Typography variant="body-xss-regular" color="text-primary" as="span">
							<NextLink href="/blog">Блог</NextLink>
						</Typography>
					</li>
				)}

				{links?.length &&
					links.map((i, idx) => (
						<li key={idx}>
							<Typography variant="body-xss-regular" color="text-primary" as="span">
								{i.url ? (
									<NextLink href={i.url}>{i.name}</NextLink>
								) : (
									<Typography variant="body-xss-regular" color="text-primary" as="span">
										{i.name}
									</Typography>
								)}
							</Typography>
						</li>
					))}
				{lastLink && (
					<li>
						<Typography variant="body-xss-regular" color="text-primary" as="span">
							{lastLink}
						</Typography>
					</li>
				)}
			</ul>
		</nav>
	);
};
