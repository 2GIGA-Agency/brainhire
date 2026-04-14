import { useGetCandidateOverviewQuery } from '@/store/rtkQuery/api';
import { CloseButton, Dialog, Flex, Portal, Text } from '@chakra-ui/react';
import axios from '@/utils/axios';
import { toaster } from '@/components/ui/toaster';
import { LkButton } from '@/components/shared/LkButton';
import { COLORS } from '@/constants/colors';
import { Typo } from '@/components/shared/Typo/Typo';
import { isAxiosError } from '@/utils/typeguards'

interface Props {
	candidateId: string;
	isOpen: boolean;
	// isResponseSend - для блокировки кнопки при отправке запроса, можно считать за дополнительное действие
	setIsOpen: (isOpen: boolean, isResponseSend?: boolean) => void;
}

export function RealtimeModal({ candidateId, isOpen, setIsOpen }: Props) {
	const { refetch } = useGetCandidateOverviewQuery({ candidateId });

	const handleOrderRealtime = () => {
		const requestRealtime = async () => {
			try {
				setIsOpen(false, true);

				await axios.post(`/api/candidates/realtime/`, {
					candidate_id: candidateId,
				});

				refetch();
			} catch (error) {
				console.error('Ошибка при заказе real-time интервью:', error);
				setIsOpen(true);
				throw error; // пробрасываем для toaster.promise
			}
		};

		toaster.promise(requestRealtime(), {
			loading: {
				title: 'Заказываем Real-time интервью...',
			},
			success: {
				title: 'Real-time интервью заказано! Оно появится во вкладке "Real-time интервью"',
			},
			error: (error: any) => {
				if (isAxiosError(error) && error.response?.status === 400) {
				return { title: 'Недостаточно средств на счёте.' }
				}
				return { title: 'Возникла ошибка, попробуйте позже...' }
			},
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
										Real-time интервью
									</Dialog.Title>
									<CloseButton size="sm" onClick={() => setIsOpen(false)} />
								</Flex>
							</Dialog.Header>
							<Dialog.Body>
								<Text textStyle="sm">
									Вы уверены, что хотите заказать Real-time интервью для данного кандидата? За эту
									операцию будет списано <strong>3 000 токенов</strong>.
								</Text>
								<Text textStyle="sm" mt={2}>
									После подтверждения заказа вы получите ссылку на прохождение интервью для
									кандидата, которая будет находится во вкладке &quot;Real-time интервью&quot; ниже.
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
									<LkButton bg={COLORS.BLUE_400} onClick={handleOrderRealtime}>
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
