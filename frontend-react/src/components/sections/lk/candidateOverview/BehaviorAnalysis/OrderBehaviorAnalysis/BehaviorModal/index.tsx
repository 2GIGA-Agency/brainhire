import { useGetCandidateOverviewQuery, useGetWalletQuery } from '@/store/rtkQuery/api';
import axios from '@/utils/axios';
import { CloseButton, Dialog, Flex, Portal, Text } from '@chakra-ui/react';
import { toaster } from '@/components/ui/toaster';
import { LkButton } from '@/components/shared/LkButton';
import { Typo } from '@/components/shared/Typo/Typo';
import { COLORS } from '@/constants/colors';
import { isAxiosError } from '@/utils/typeguards'

interface Props {
	candidateId: string;
	isOpen: boolean;
	// isResponseSend - для блокировки кнопки при отправке запроса, можно считать за дополнительное действие
	setIsOpen: (isOpen: boolean, isResponseSend?: boolean) => void;
}

export function BehaviorModal({ candidateId, isOpen, setIsOpen }: Props) {
	const { refetch: candidateDataRefetch } = useGetCandidateOverviewQuery({ candidateId });
	const { refetch } = useGetWalletQuery();

	const handleOrderBehavior = () => {
		const requestBehavior = async () => {
			try {
				setIsOpen(false, true);

				await axios.post(`/api/candidates/${candidateId}/behavior/`);

				refetch();
				candidateDataRefetch();
			} catch (error) {
				console.error('Ошибка при заказе поведенческого анализа', error);
				setIsOpen(true);
				throw error; // пробрасываем для toaster.promise
			}
		};

		toaster.promise(requestBehavior(), {
			success: {
				title:
					'Поведенческий анализ заказан! Он появится в отдельной вкладке ниже рядом с обзором интервью',
			},
			error: (error: any) => {
				if (isAxiosError(error) && error.response?.status === 400) {
				return { title: 'Недостаточно средств на счёте.' }
				}
				return { title: 'Возникла ошибка, попробуйте позже...' }
			},
			loading: { title: 'Заказываем поведенческий анализ кандидата...' },
		});
	};

	return (
		<>
			<Dialog.Root lazyMount open={isOpen} onOpenChange={(e) => setIsOpen(e.open)}>
				<Portal>
					<Dialog.Backdrop />
					<Dialog.Positioner>
						<Dialog.Content>
							<Dialog.Header>
								<Flex w="100%" align="center" justify="space-between">
									<Dialog.Title fontSize="lg" fontWeight="bold">
										Поведенческий анализ
									</Dialog.Title>
									<CloseButton size="sm" onClick={() => setIsOpen(false)} />
								</Flex>
							</Dialog.Header>
							<Dialog.Body>
								<Text textStyle="sm">
									Вы уверены, что хотите заказать поведенческий анализ кандидата? За эту операцию
									будет списано <strong>200 токенов</strong>.
								</Text>
								<Text textStyle="sm" mt={2}>
									После подтверждения заказа результаты вы сможете увидеть во вкладке
									&quot;Поведенческий анализ&quot;, которая находится ниже.
								</Text>
							</Dialog.Body>
							<Dialog.Footer>
								<Dialog.ActionTrigger asChild>
									<LkButton bg={COLORS.GRAY_300} onClick={() => setIsOpen(false)}>
										<Typo color={COLORS.WHITE} size="14px" weight="semibold">
											Отменить
										</Typo>
									</LkButton>
								</Dialog.ActionTrigger>
								<Dialog.ActionTrigger asChild>
									<LkButton bg={COLORS.BLUE_400} colorPalette="blue" onClick={handleOrderBehavior}>
										<Typo color={COLORS.WHITE} size="14px" weight="semibold">
											Подтвердить
										</Typo>
									</LkButton>
								</Dialog.ActionTrigger>
							</Dialog.Footer>
						</Dialog.Content>
					</Dialog.Positioner>
				</Portal>
			</Dialog.Root>
		</>
	);
}
