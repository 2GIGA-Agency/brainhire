'use client';
import React, { useEffect, useState } from 'react';
import styles from './style.module.scss';

interface BackButtonProps {
	path?: string;
	children?: React.ReactNode;
	className?: string;
}

export const BackButton: React.FC<BackButtonProps> = ({
	path = '/',
	children = 'Вернуться на сайт',
	className = '',
}) => {
	const [rootHref, setRootHref] = useState(path);

	useEffect(() => {
		const { hostname, protocol, port } = window.location;
		const parts = hostname.split('.');

		let mainDomain: string;

		if (parts[parts.length - 1] === 'localhost') {
			mainDomain = 'localhost';
		} else if (parts.length > 2) {
			mainDomain = parts.slice(-2).join('.');
		} else {
			mainDomain = hostname;
		}

		const portString = port ? `:${port}` : '';
		const finalUrl = `${protocol}//${mainDomain}${portString}${path}`;

		setRootHref(finalUrl);
	}, [path]);

	return (
		<a href={rootHref} className={`${styles.backLink} ${className}`}>
			<svg
				width="20"
				height="20"
				viewBox="0 0 24 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M15 18L9 12L15 6"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>
			{children}
		</a>
	);
};
