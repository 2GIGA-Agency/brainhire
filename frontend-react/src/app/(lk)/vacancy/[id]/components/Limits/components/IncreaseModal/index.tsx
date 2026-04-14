import { LkButton } from '@/components/shared/LkButton';
import { LkInput } from '@/components/shared/LkInput';
import { Typo } from '@/components/shared/Typo/Typo';
import { COLORS } from '@/constants/colors';
import { useIncreaseLimitsMutation } from '@/store/rtkQuery/api';
import { toaster } from '@/components/ui/toaster';
import { CloseButton, Dialog, Flex, Portal } from '@chakra-ui/react';
import React, { useState } from 'react';
import { Typography } from '@/components';

interface IncreaseLimitsModalProps {
	isOpen: boolean;
	setIsOpen: (open: boolean) => void;
	vacancyRootId: string;
	balance: number | undefined;
	onLimitsIncreased: () => void; // Callback to refetch wallet/limits
}

export const IncreaseLimitsModal = ({
	isOpen,
	setIsOpen,
	vacancyRootId,
	balance,
	onLimitsIncreased,
}: IncreaseLimitsModalProps) => {
	const [increase, setIncrease] = useState(0);
	const [increaseLimits] = useIncreaseLimitsMutation();

	const handleIncreaseChangeParse = (e: React.ChangeEvent<HTMLInputElement>) => {
		const numericValue = e.target.value.replace(/\D/g, '');
		setIncrease(Number(numericValue));
	};

	const handleIncrease = async () => {
		const promise = increaseLimits({ vacancyRootId, increment: increase }).unwrap();

		toaster.promise(promise, {
			success: { title: 'Лимиты успешно увеличены' },
			error: (error: any) => {
				// error теперь содержит объект { status, data }
				const errorMessage =
					error.data?.message ||
					error.data?.detail ||
					(typeof error.data === 'string' ? `Ошибка ${error.status}` : 'Неизвестная ошибка');

				return {
					title: `Произошла ошибка увеличения лимитов: ${errorMessage}`,
				};
			},
			loading: { title: 'Увеличиваем лимиты...' },
		});

		promise
			.then(() => {
				onLimitsIncreased();
				setIsOpen(false);
			})
			.catch((error) => {
				console.error('Error caught in catch:', error);
			});
	};

	const cost = increase * 100;
	const isIncreaseButtonDisabled = !(increase > 0 && cost <= (balance || 0));

	const handleOpenChange = (e: { open: boolean }) => {
		setIncrease(0);
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
									Число разборов
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
								Введите значение, на которое хотите увеличить максимальное число разборов.
							</Typography>
							<Typography variant="body-xss-regular" color="rgba(26, 32, 44, 1)" margin="0 0 24px">
								Ваш текущий баланс: {balance} токенов
							</Typography>
							<Typography variant="body-xss-regular" color="rgba(26, 32, 44, 1)" margin="0 0 24px">
								{increase} разборов = {cost} токенов к списанию
							</Typography>

							<LkInput
								placeholder="Введите количество разборов"
								value={increase === 0 ? '' : increase} // Show empty string for 0 to avoid "0" in input
								onChange={handleIncreaseChangeParse}
							/>
						</Dialog.Body>
						<Dialog.Footer>
							<Dialog.ActionTrigger asChild>
								<LkButton
									bg={COLORS.BLUE_400}
									disabled={isIncreaseButtonDisabled}
									onClick={handleIncrease}
									tabIndex={0}
									role="button"
								>
									<Typo color={COLORS.WHITE} size="14px" weight="semibold">
										Увеличить
									</Typo>
								</LkButton>
							</Dialog.ActionTrigger>
						</Dialog.Footer>
					</Dialog.Content>
				</Dialog.Positioner>
			</Portal>
		</Dialog.Root>
	);
};
