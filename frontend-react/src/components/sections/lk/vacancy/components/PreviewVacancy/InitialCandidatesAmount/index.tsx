import { Block } from '@/components/shared/Block';
import { TokenBalance } from '@/components/shared/TokenBalance/TokenBalance';
import { Typo } from '@/components/shared/Typo/Typo';
import { LkInput } from '@/components/shared/LkInput';
import { COLORS } from '@/constants/colors';
import { useBalanceCompare } from '@/hooks/useBalanceCompare';
import {
	selectInitialCandidatesAmount,
	updateInitialCandidatesAmount,
} from '@/store/slices/vacancyCreation/previewSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { formatNumber } from '@/utils/formatNumber';
import { Box, Flex } from '@chakra-ui/react';
import { InitialCandidatesAmountInfo } from './InitialCandidatesAmountInfo';
import { ChangeEvent } from 'react';

export function InitialCandidatesAmount() {
	const dispatch = useAppDispatch();
	const initialCandidatesAmount = useAppSelector(selectInitialCandidatesAmount);

	// 100 - цена за 1 разбор
	const isInitialCandidateAmountLessThanBalance = useBalanceCompare(initialCandidatesAmount * 100);

	const handleInitialCandidatesChange = (e: ChangeEvent<HTMLInputElement>) => {
		const numericValue = e.target.value.replace(/\D/g, '');
		dispatch(updateInitialCandidatesAmount(numericValue ? parseInt(numericValue, 10) : 0));
	};

	return (
		<Block
			headingText="Баланс"
			subHeadingText="Установите начальное количество кандидатов для обработки"
		>
			<InitialCandidatesAmountInfo />
			<Flex gap="5px" alignItems="center" wrap={'wrap'}>
				<Typo size="16px" weight="medium" color={COLORS.GRAY_800}>
					Ваш текущий баланс
				</Typo>
				<Typo size="16px" weight="medium" color={COLORS.GRAY_800}>
					<TokenBalance />
				</Typo>
			</Flex>
			<Box mt="12px">
				<LkInput
					value={formatNumber(initialCandidatesAmount)}
					placeholder="Введите начальное количество кандидатов"
					onChange={handleInitialCandidatesChange}
				/>
				{isInitialCandidateAmountLessThanBalance && (
					<Typo size="14px" weight="medium" color={COLORS.RED_500}>
						На вашем балансе недостаточно средств для такого количества разборов
					</Typo>
				)}
			</Box>
		</Block>
	);
}
