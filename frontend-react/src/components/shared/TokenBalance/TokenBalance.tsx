'use client';

import { BaseSpinner } from '@/components/shared/BaseSpinner/BaseSpinner';
import { useGetWalletQuery } from '@/store/rtkQuery/api';
import { formatNumber } from '@/utils/formatNumber';
import { Flex } from '@chakra-ui/react';


export const TokenBalance = () => {
	const { data: wallet, isLoading: isWalletLoading } = useGetWalletQuery();
	const walletInfo = wallet && wallet[0];

	return (
		<Flex alignItems="center" gap="5px">
			{isWalletLoading ? (
				// Отображаем спиннер, если данные загружаются
				<BaseSpinner />
			) : (
				// Отображаем баланс и картинку, если данные загружены
				<Flex gap="3px" alignItems="center">
					{formatNumber(walletInfo?.balance_token || 0)}
				</Flex>
			)}
		</Flex>
	);
};
