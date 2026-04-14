'use client';

import { ProfileImage } from '@/components/shared/ProfileImage';
import { TokenBalance } from '@/components/shared/TokenBalance/TokenBalance';
import { useResize } from '@/hooks/useResize';
import { useGetProfileQuery } from '@/store/rtkQuery/api';
import { selectIsBurgerShow, toggleIsBurgerShow } from '@/store/slices/appSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { logOutAndClearTokens } from '@/utils/LogOutDelTokens';
import { Box, Flex, List, Menu, Portal } from '@chakra-ui/react';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { CgDanger } from 'react-icons/cg';
import { HiUserCircle } from 'react-icons/hi';
import { IoLogOut, IoWallet } from 'react-icons/io5';
import { BurgerMenu } from './components/BurgerMenu';
import styles from './Header.module.scss';
import { Tooltip } from '@/components/ui/tooltip';
import { ErrorModal } from '@/components/shared/ErrorModal';
import { COLORS } from '@/constants/colors';
import { getRootDomain } from '@/utils/getRootDomain';
import { renderNavigationLinks } from './utils/render';
import { checkSubdomain } from '@/utils/checkSubdamains';

export const navLinks = [
	{ name: 'Вакансии', path: '/vacancy' },
	{ name: 'Компании', path: '/companies' },
	{ name: 'Коллеги', path: '/colleagues' },
	{ name: 'Финансы', path: '/finances' },
	{ name: 'Чат HH', path: '/chat' },
];

// TODO: Переписать на Chakra UI
export const Header = () => {
	const isSpecialAccess = checkSubdomain();
	const dispatch = useAppDispatch();
	const pathname = usePathname();

	const [isModalOpen, setModalOpen] = useState(false);

	const isPublic = pathname.includes('public');
	const { data: profile } = useGetProfileQuery(undefined, {
		refetchOnMountOrArgChange: true,
		skip: isPublic,
	});
	const isTokenBurned = profile?.hh_status && profile?.hh_burned_token;

	const iconRef = useRef(null);
	// Is balance show in burger menu block

	const [width] = useResize();

	const isBalanceShow = width < 430;
	const isBurgerActive = width < 1110;
	const isBurgerShow = useAppSelector(selectIsBurgerShow);
	const burgerClass = clsx(styles.burgerTrigger, isBurgerShow && styles.active);

	useEffect(() => {
		const animate = () => {
			if (!iconRef.current) return;
			iconRef.current?.classList.add(styles.errorIconShake);
			setTimeout(() => {
				iconRef?.current?.classList.remove(styles.errorIconShake);
			}, 500);
		};
		animate();
		const intervalId = setInterval(animate, 5000);
		return () => clearInterval(intervalId);
	}, []);
	const handleBurgerClick = () => {
		dispatch(toggleIsBurgerShow());
	};
	return (
		<header className={styles.header}>
			{!isPublic && <ErrorModal isOpen={isModalOpen} setIsOpen={setModalOpen} />}
			<div className={styles.container}>
				<Link
					href={isPublic ? getRootDomain() : '/vacancy'}
					onKeyDown={(e) => {
						if (e.key === ' ') {
							e.preventDefault();
							e.currentTarget.click();
						}
					}}
					className={styles.logo}
				>
					<Image src="/icons/Logo.svg" alt="Главная страница" width={120} height={40} />
				</Link>
				{!isPublic && (
					<>
						<nav className={styles.nav}>
							<List.Root className={styles.navList}>
								{renderNavigationLinks({
									items: navLinks,
									currentPath: pathname,
									condition: () => true,
									activeClassName: styles.active,
								})}
							</List.Root>
						</nav>
						{!isBalanceShow && (
							<div className={styles.balance}>
								<IoWallet color="#FF7401" className={styles.icon} />
								<Flex gap="8px" alignItems="center">
									<span className={styles.balanceText}>Токены:</span>
									<TokenBalance />
								</Flex>
							</div>
						)}
						{isTokenBurned && (
							<Box className={styles.errors}>
								<Box ref={iconRef}>
									<Tooltip
										positioning={{ placement: 'bottom' }}
										showArrow
										key="errors"
										content="Нажмите, чтобы посмотреть уведомления"
										openDelay={0}
										closeDelay={0}
									>
										<CgDanger
											color={COLORS.RED_400}
											size="24px"
											className={styles.errorIcon}
											onClick={() => setModalOpen(true)}
										/>
									</Tooltip>
								</Box>
							</Box>
						)}
						{isBurgerActive ? (
							<>
								<button className={burgerClass} onClick={handleBurgerClick}>
									<span></span>
									<span></span>
									<span></span>
								</button>
								<Portal>
									<BurgerMenu isBalanceShow={isBalanceShow} />
								</Portal>
							</>
						) : (
							<div className={styles.icons}>
								{/* <button className={styles.iconBtn}>
						<Image src="/icons/settings.svg" alt="Settings" width={24} height={24} />
					</button>
					<button className={styles.iconBtn}>
						<Image src="/icons/notifications.svg" alt="Notifications" width={24} height={24} />
					</button> */}
								<Menu.Root positioning={{ placement: 'bottom-end' }}>
									<Menu.Trigger asChild>
										<button className={styles.profileTriggerButton}>
											<ProfileImage />
										</button>
									</Menu.Trigger>
									<Portal>
										<Menu.Positioner>
											<Menu.Content>
												<Menu.Item value="profile" asChild cursor="pointer">
													<Link href="/profile">
														<HiUserCircle color="grey" size={20} /> Профиль
													</Link>
												</Menu.Item>
												{/* Пока не реализовано */}
												{/* <Menu.Item value="settings" asChild cursor="pointer">
											<Link href="/settings"><IoSettings /> Настройки</Link>
										</Menu.Item> */}
												<Menu.Item value="exit" asChild cursor="pointer">
													<button onClick={logOutAndClearTokens}>
														<IoLogOut color="grey" size={20} />
														Выйти
													</button>
												</Menu.Item>
											</Menu.Content>
										</Menu.Positioner>
									</Portal>
								</Menu.Root>
							</div>
						)}
					</>
				)}
			</div>
		</header>
	);
};
