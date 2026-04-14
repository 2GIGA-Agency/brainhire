'use client';

import { Button, Typography } from '@/components/ui-kit';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react'; // Добавлен useEffect
import styles from './Header.module.scss';
import { HoverAccordion } from '@/components/ui-kit/HoverAccrodion';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const navItems = [
	{
		label: 'Рекрутинг',
		children: [
			{ label: 'Рекрутинг', href: '/recruiting' },
			{ label: 'ИИ-создание вакансий', href: '/ai-vacancy-creation' },
			{ label: 'ИИ-анализ резюме', href: '/ai-resume-analysis' },
			{ label: 'ИИ-видеоинтервью', href: '/ai-videointerview' },
		],
	},
	{
		label: 'Оценка персонала',
		children: [{ label: 'ИИ-оценка персонала', href: '/ai-staff-scoring' }],
	},
	{ label: 'Решения', href: '/#solutions' },
	{
		label: 'О компании',
		children: [
			{ label: 'О компании', href: '/about' },
			{ label: 'Контакты', href: '/contacts' },
		],
	},
	{ label: 'Тарифы', href: '/tariffs' },
	{
		label: 'Партнёрство',
		children: [
			{ label: 'HR Cashback', href: '/partner' },
			{ label: 'Станьте агентом', href: '/referral' },
		],
	},
	{
		label: 'Отзывы',
		children: [
			{ label: 'Отзывы', href: '/reviews' },
			{ label: 'Кейсы', href: '/case' },
		],
	},
	{ label: 'Блог', href: '/blog' },
];

export const Header: React.FC = () => {
	const [menuOpen, setMenuOpen] = useState(false);
	// Состояние для отслеживания раскрытых подменю в мобильной версии
	const [expandedItems, setExpandedItems] = useState<string[]>([]);

	// Функция для переключения раскрытия подменю
	const toggleSubMenu = (label: string) => {
		setExpandedItems((prev) =>
			prev.includes(label) ? prev.filter((item) => item !== label) : [...prev, label]
		);
	};

	// Блокировка скролла при открытом меню
	useEffect(() => {
		if (menuOpen) {
			// Сохраняем текущую позицию скролла
			const scrollY = window.scrollY;
			// Блокируем скролл
			document.body.style.position = 'fixed';
			document.body.style.top = `-${scrollY}px`;
			document.body.style.width = '100%';
			document.body.style.overflow = 'hidden';
		} else {
			// Восстанавливаем скролл
			const scrollY = document.body.style.top;
			document.body.style.position = '';
			document.body.style.top = '';
			document.body.style.width = '';
			document.body.style.overflow = '';

			// Восстанавливаем позицию скролла
			if (scrollY) {
				window.scrollTo(0, parseInt(scrollY || '0') * -1);
			}
		}

		// Очистка при размонтировании
		return () => {
			document.body.style.position = '';
			document.body.style.top = '';
			document.body.style.width = '';
			document.body.style.overflow = '';
		};
	}, [menuOpen]);

	// Функция для закрытия меню
	const closeMenu = () => {
		setMenuOpen(false);
	};

	return (
		<>
			<header className={styles.header}>
				<div className={styles.container}>
					<div className={styles.logo}>
						<Link href="/">
							<Image src="/icons/Logo.svg" alt="На главную" width={120} height={40} />
						</Link>
					</div>

					{/* --- ДЕСКТОПНАЯ НАВИГАЦИЯ --- */}
					<nav className={styles.nav}>
						{navItems.map((item) =>
							item.children ? (
								<HoverAccordion
									key={item.label}
									title={item.label}
									iconClosed={<FaChevronDown size={12} color="#4a5568" />}
									iconOpen={<FaChevronUp size={12} color="#0052cc" />}
								>
									{item.children.map((child) => (
										<Link key={child.href} href={child.href} className={styles.dropdownLink}>
											<Typography variant="body-sm" as="span">
												{child.label}
											</Typography>
										</Link>
									))}
								</HoverAccordion>
							) : (
								<Link key={item.href} href={item.href!}>
									<Typography className={styles.title} variant="body-sm" as="span">
										{item.label}
									</Typography>
								</Link>
							)
						)}
					</nav>

					<div className={styles.actions}>
						<Button variant="primary" size="M" as="link" href="/signup">
							Попробовать бесплатно
						</Button>
						<Button variant="secondary3" size="M" as="link" href="/signin">
							Войти
						</Button>
					</div>
					<Image
						src={menuOpen ? '/icons/close.svg' : '/icons/burger.svg'}
						alt="Menu"
						width={34}
						height={34}
						className={styles.burger}
						onClick={() => setMenuOpen(!menuOpen)}
					/>
				</div>
			</header>

			{/* --- МОБИЛЬНАЯ НАВИГАЦИЯ --- */}
			<div className={`${styles.mobileMenu} ${menuOpen ? styles.open : ''}`}>
				<nav className={styles.mobileNav}>
					{navItems.map((item) => {
						// Если у элемента есть подменю
						if (item.children) {
							const isExpanded = expandedItems.includes(item.label);

							return (
								<div key={item.label} className={styles.mobileMenuItem}>
									<div
										className={styles.mobileMenuHeader}
										onClick={() => toggleSubMenu(item.label)}
									>
										<Typography variant="body-lg" className={styles.mobileMenuHeaderLabel}>
											{item.label}
										</Typography>
										<span className={styles.chevron}>
											{isExpanded ? <FaChevronUp size={14} /> : <FaChevronDown size={14} />}
										</span>
									</div>

									{/* Подменю */}
									<div className={`${styles.subMenu} ${isExpanded ? styles.subMenuOpen : ''}`}>
										{item.children.map((child) => (
											<Typography
												key={child.href}
												variant="body-md"
												onClick={closeMenu}
												className={styles.subMenuItem}
											>
												<Link href={child.href!}>{child.label}</Link>
											</Typography>
										))}
									</div>
								</div>
							);
						}

						// Если это обычный пункт меню без подменю
						return (
							<Typography
								key={item.href}
								className={styles.mobileMenuHeaderLabel}
								variant="body-lg"
								onClick={closeMenu}
							>
								<Link href={item.href!}>{item.label}</Link>
							</Typography>
						);
					})}

					<div className={styles.mobileActions}>
						<Typography variant="body-lg" color="brand-primary" onClick={closeMenu}>
							<Link href="/signup">Попробовать бесплатно</Link>
						</Typography>
						<Typography variant="body-lg" onClick={closeMenu}>
							<Link href="/signin">Войти</Link>
						</Typography>
					</div>
				</nav>
			</div>
		</>
	);
};
