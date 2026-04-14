import { useGetWalletQuery } from '@/store/rtkQuery/api';

export const useBalanceCompare = (value: number) => {
	const { data: tokenBalance } = useGetWalletQuery();

	const isBalanceGood = tokenBalance && tokenBalance[0].balance_token < value;

	return !!isBalanceGood;
};
