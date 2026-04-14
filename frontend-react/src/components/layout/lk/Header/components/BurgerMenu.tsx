// components/BurgerMenu/BurgerMenu.tsx
import { Box, Flex, List } from '@chakra-ui/react';
import styles from './BurgerMenu.module.scss';
import Link from 'next/link';
import { TokenBalance } from '@/components/shared/TokenBalance/TokenBalance';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { selectIsBurgerShow, toggleIsBurgerShow } from '@/store/slices/appSlice';
import clsx from 'clsx';
import { IoLogOut, IoWallet } from 'react-icons/io5';
import { logOutAndClearTokens } from '@/utils/LogOutDelTokens';
import { HiUserCircle } from 'react-icons/hi';
import { usePathname } from 'next/navigation';
import { renderNavigationLinks } from '../utils/render';
import { navLinks } from '../Header';
import { checkSubdomain } from '@/utils/checkSubdamains';

interface Props {
	isBalanceShow: boolean;
}

export function BurgerMenu({ isBalanceShow }: Props) {
	const dispatch = useAppDispatch();
	const isShow = useAppSelector(selectIsBurgerShow);
	const pathname = usePathname();
	const isSpecialAccess = checkSubdomain();

	const className = clsx(styles.burgerMenu, isShow && styles.open);

	const handleModalClick = () => {
		dispatch(toggleIsBurgerShow());
	};

	return (
		<Box className={className}>
			<List.Root className={styles.list} mt="16px" mb="16px">
				{renderNavigationLinks({
					items: navLinks,
					currentPath: pathname,
					condition: () => true,
					onItemClick: handleModalClick,
					activeClassName: styles.active,
				})}
			</List.Root>

			<Link href="/profile" onClick={handleModalClick}>
				<Flex gap={1} alignItems={'center'}>
					<HiUserCircle color="grey" size={20} /> Профиль
				</Flex>
			</Link>

			<Link href="/" onClick={logOutAndClearTokens}>
				<Flex gap={1} alignItems={'center'} mt="8px">
					<IoLogOut color="grey" size={20} />
					Выйти
				</Flex>
			</Link>

			{isBalanceShow && (
				<Flex mt="32px" alignItems="center" gap="8px">
					<IoWallet color="#FF7401" className={styles.icon} />
					<Flex gap="8px" alignItems="center">
						Токены: <TokenBalance />
					</Flex>
				</Flex>
			)}
		</Box>
	);
}
