import { formatNumber } from '@/utils/formatNumber';
import { Box, Button, Flex, Stack, Text } from '@chakra-ui/react';
import React, { useState, useEffect, useRef } from 'react';
import styles from './Limits.module.scss';
import { COLORS } from '@/constants/colors';
import { Typo } from '@/components/shared/Typo/Typo';
import { Block } from '@/components/shared/Block';
import { useGetLimitsQuery, useGetWalletQuery } from '@/store/rtkQuery/api';
import { IncreaseLimitsModal } from './components/IncreaseModal';
import { RefundModal } from './components/RefundModal';
import axios from 'axios';
import { LimitsSkeleton } from './components/LimitsSkeleton';

interface Props {
	vacancyId: string;
	vacancyRootId: string;
}

export const Limits = ({ vacancyRootId }: Props) => {
	const { data: wallet, refetch: walletRefetch } = useGetWalletQuery();
	const {
		data: limits,
		refetch: limitsRefetch,
		isLoading,
		isFetching,
	} = useGetLimitsQuery({
		vacancyRootId: vacancyRootId,
	});

	const balance = wallet && wallet[0]?.balance_token;
	const availableReviews = limits ? limits.limit_reviews - limits.count_reviews : 0;

	const [increaseLimitsModalOpen, setIncreaseLimitsModalOpen] = useState<boolean>(false);
	const [reduceLimitsModalOpen, setReduceLimitsModalOpen] = useState(false);
	const [isRefundButtonAvailable, setIsRefundButtonAvailable] = useState(false);
	// State, который отвечает за то, полностью ли были сниженые лимиты, нужен для исправления "моргания" кнопки после полного снижения лимитов
	const [isFullRefund, setIsFullRefund] = useState(false);
	const checkStatusIntervalRef = useRef<NodeJS.Timeout | null>(null);

	if (
		!isFullRefund &&
		availableReviews !== 0 &&
		!isRefundButtonAvailable &&
		!checkStatusIntervalRef.current
	) {
		setIsRefundButtonAvailable(true);
	}

	// Очистка интервала при размонтировании компонента
	useEffect(() => {
		return () => {
			if (checkStatusIntervalRef.current) {
				clearInterval(checkStatusIntervalRef.current);
			}
		};
	}, []);

	const checkRefundStatus = async (taskId: string) => {
		try {
			const response = await axios.get(
				`/api/hh/outbound_search/check_search_status/?task_id=${taskId}`
			);
			const { status } = response.data;

			if (status === 'SUCCESS') {
				if (checkStatusIntervalRef.current) {
					clearInterval(checkStatusIntervalRef.current);
					checkStatusIntervalRef.current = null;
				}

				if (isFullRefund) {
					setIsFullRefund(false);
				}

				limitsRefetch();
				walletRefetch();
			}
		} catch (error) {
			console.error('Error checking refund status:', error);
			if (checkStatusIntervalRef.current) {
				clearInterval(checkStatusIntervalRef.current);
				checkStatusIntervalRef.current = null;
			}
			setIsRefundButtonAvailable(true);
		}
	};

	const handleRefundSuccess = (taskId: string, limits: number | 'all') => {
		setIsRefundButtonAvailable(false);

		if (limits === 'all' || availableReviews - limits == 0) {
			setIsFullRefund(true);
		}

		if (checkStatusIntervalRef.current) {
			clearInterval(checkStatusIntervalRef.current);
		}

		checkStatusIntervalRef.current = setInterval(() => {
			checkRefundStatus(taskId);
		}, 5000);
	};

	const handleLimitIncrease = () => {
		setIsRefundButtonAvailable(true);
		walletRefetch();
		limitsRefetch();
	};

	if (isLoading || isFetching) {
		return <LimitsSkeleton />;
	}

	return (
		<>
			<Block
				headingText="Лимиты"
				helpTipText={
					<Typo weight="medium" color={COLORS.GRAY_800}>
						Лимиты необходимы для разбора резюме кандидатов и приглашения их на интервью. <br />
						Лимиты списываются только в том случае, если кандидат успешно прошел скоринг резюме.
					</Typo>
				}
			>
				<Stack>
					<Box>
						<Flex justify="space-between" mb={4}>
							<Text color="gray.500" textStyle="sm" fontWeight={500}>
								Максимальное число разборов
							</Text>
							<Text color="gray.800" textStyle="sm" fontWeight={500}>
								{formatNumber(limits?.limit_reviews)}
							</Text>
						</Flex>
						<Flex justify="space-between" mb={4}>
							<Text color="gray.500" textStyle="sm" fontWeight={500}>
								Успешно разобранные кандидаты
							</Text>
							<Text color="gray.800" textStyle="sm" fontWeight={500}>
								{formatNumber(limits?.count_reviews)}
							</Text>
						</Flex>
						<Flex justify="space-between" mb={4}>
							<Text color="gray.500" textStyle="sm" fontWeight={500}>
								Доступный остаток разборов
							</Text>
							<Text color="gray.800" textStyle="sm" fontWeight={500}>
								{formatNumber(availableReviews)}
							</Text>
						</Flex>
					</Box>
				</Stack>

				<Button
					w="100%"
					mt={4}
					bg={COLORS.BLUE_400}
					_hover={{ bg: COLORS.BLUE_500 }}
					size="xs"
					onClick={() => setIncreaseLimitsModalOpen(true)}
					className={styles.limitButton}
				>
					<Typo color={COLORS.WHITE} size="14px" weight="semibold">
						Увеличить максимальное число разборов
					</Typo>
				</Button>
				{availableReviews !== 0 && (
					<Button
						w="100%"
						mt={4}
						bg={COLORS.BLUE_400}
						_hover={{ bg: COLORS.BLUE_500 }}
						size="xs"
						onClick={() => setReduceLimitsModalOpen(true)}
						className={styles.limitButton}
						disabled={!isRefundButtonAvailable}
					>
						<Typo color={COLORS.WHITE} size="14px" weight="semibold">
							{isRefundButtonAvailable
								? 'Снизить максимальное число разборов'
								: 'Возврат выполняется'}
						</Typo>
					</Button>
				)}
			</Block>

			<IncreaseLimitsModal
				isOpen={increaseLimitsModalOpen}
				setIsOpen={setIncreaseLimitsModalOpen}
				vacancyRootId={vacancyRootId}
				balance={balance}
				onLimitsIncreased={handleLimitIncrease}
			/>

			<RefundModal
				isOpen={reduceLimitsModalOpen}
				setIsOpen={setReduceLimitsModalOpen}
				totalLimits={availableReviews}
				onLimitRefunded={handleRefundSuccess}
			/>
		</>
	);
};
