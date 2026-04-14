import { LkButton } from '@/components/shared/LkButton';
import { LkInput } from '@/components/shared/LkInput';
import { Typo } from '@/components/shared/Typo/Typo';
import { COLORS } from '@/constants/colors';
import { useRefundLimitsMutation } from '@/store/rtkQuery/api';
import { toaster } from '@/components/ui/toaster';
import { CloseButton, Dialog, Flex, Portal } from '@chakra-ui/react';
import React, { useState } from 'react';
import { Typography } from '@/components';
import { useParams } from 'next/navigation';

interface RefundLimitsModalProps {
	isOpen: boolean;
	totalLimits: number;
	setIsOpen: (open: boolean) => void;
	onLimitRefunded: (taskId: string, limits: number | 'all') => void; // Callback to refetch wallet/limits
}

export const RefundModal = ({
	isOpen,
	setIsOpen,
	onLimitRefunded,
	totalLimits,
}: RefundLimitsModalProps) => {
	const [refund, setRefund] = useState(0);
	const [refundLimits] = useRefundLimitsMutation();
	const params = useParams();
	const vacancyId = params.id as string;

	const handleRefundChangeParse = (e: React.ChangeEvent<HTMLInputElement>) => {
		const numericValue = e.target.value.replace(/\D/g, '');
		setRefund(Number(numericValue));
	};

	const handleRefund = async (refund: 'all' | number) => {
		if (typeof refund == 'number' && refund == 0) {
			toaster.create({ title: 'Для снижения числа разборов необходимо ввести число' });
			return;
		}

		const promise = refundLimits({ vacancy_id: vacancyId, refund_limits: refund }).unwrap();

		toaster.promise(promise, {
			success: { title: 'Лимиты скоро снизятся, подождите немного' },
			error: (error: any) => {
				// error теперь содержит объект { status: number, data: any }
				console.error('Error object:', error);

				let errorMessage = 'Неизвестная ошибка';

				if (error.data && typeof error.data === 'string') {
					// Если data это строка (HTML или текст)
					errorMessage = `Ошибка сервера: ${error.status}`;
				} else if (error.data?.message) {
					// Если ошибка в JSON формате с полем message
					errorMessage = error.data.message;
				} else if (error.data?.detail) {
					// Если ошибка в JSON формате с полем detail
					errorMessage = error.data.detail;
				} else if (error.data) {
					// Любой другой JSON объект
					errorMessage = JSON.stringify(error.data);
				}

				return {
					title: `Произошла ошибка снижения лимитов: ${errorMessage}`,
				};
			},
			loading: { title: 'Снижаем лимиты...' },
		});

		promise
			.then((res) => {
				if (res?.task_id) {
					onLimitRefunded(res.task_id, refund);
					setIsOpen(false);
					setRefund(0);
				}
			})
			.catch((error) => {
				console.error('Ошибка снижения лимитов: ', error);
			});
	};

	const cost = refund * 100;
	const isRefundButtonDisabled = refund > totalLimits;

	const handleOpenChange = (e: { open: boolean }) => {
		setRefund(0);
		setIsOpen(e.open);
	};

	return (
		<Dialog.Root lazyMount open={isOpen} onOpenChange={handleOpenChange}>
			<Portal>
				<Dialog.Backdrop />
				<Dialog.Positioner>
					<Dialog.Content>
						<Dialog.Header>
							<Flex w="100%" align="center" justify="space-between">
								<Dialog.Title fontSize="lg" fontWeight="bold">
									Снижение лимитов
								</Dialog.Title>
								<CloseButton size="sm" onClick={() => handleOpenChange({ open: false })} />
							</Flex>
						</Dialog.Header>
						<Dialog.Body>
							<Typography
								variant="body-xss-regular"
								color="rgba(113, 128, 150, 1)"
								margin="0 0 24px"
							>
								Введите количество лимитов, которое хотите снизить.
							</Typography>
							<Typography variant="body-xss-regular" color="rgba(26, 32, 44, 1)" margin="0 0 24px">
								{refund} разборов = {cost} токенов к возврату
							</Typography>

							<LkInput
								placeholder="Введите количество разборов"
								value={refund === 0 ? '' : refund} // Show empty string for 0 to avoid "0" in input
								onChange={handleRefundChangeParse}
							/>
							{isRefundButtonDisabled && (
								<Typo color={COLORS.RED_400} weight="medium" mt={2}>
									Количество лимитов для снижения превышает количество доступных лимитов
								</Typo>
							)}
						</Dialog.Body>
						<Dialog.Footer display={'flex'} justifyContent="space-between">
							<LkButton
								bg={COLORS.BLUE_400}
								disabled={isRefundButtonDisabled}
								onClick={() => handleRefund('all')}
								tabIndex={0}
								role="button"
							>
								<Typo color={COLORS.WHITE} size="14px" weight="semibold">
									Снизить все доступные
								</Typo>
							</LkButton>

							<LkButton
								bg={COLORS.BLUE_400}
								disabled={isRefundButtonDisabled}
								onClick={() => handleRefund(refund)}
								tabIndex={0}
								role="button"
							>
								<Typo color={COLORS.WHITE} size="14px" weight="semibold">
									Снизить
								</Typo>
							</LkButton>
						</Dialog.Footer>
					</Dialog.Content>
				</Dialog.Positioner>
			</Portal>
		</Dialog.Root>
	);
};
