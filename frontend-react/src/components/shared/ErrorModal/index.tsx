import { useGetProfileQuery } from '@/store/rtkQuery/api';
import { Button, CloseButton, Dialog, Flex, Portal, Text } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

interface Props {
	isOpen: boolean;
	setIsOpen: (isOpen: boolean) => void;
}

export function ErrorModal({ isOpen, setIsOpen }: Props) {
	const { data: profile } = useGetProfileQuery(undefined, {
		refetchOnMountOrArgChange: true,
	});
	const router = useRouter();

	const isTokenBurned = profile?.hh_status && profile?.hh_burned_token;

	const handleClick = () => {
		setIsOpen(false);
		router.push('/profile#integrations');
	};

	return (
		<Dialog.Root
			lazyMount
			open={isOpen}
			onOpenChange={(e) => setIsOpen(e.open)}
			closeOnInteractOutside={false}
		>
			<Portal>
				<Dialog.Backdrop />
				<Dialog.Positioner>
					<Dialog.Content>
						<Dialog.Header>
							<Flex w="100%" align="center" justify="space-between">
								<Dialog.Title fontSize="lg" fontWeight="bold">
									Уведомления
								</Dialog.Title>
								<CloseButton size="sm" onClick={() => setIsOpen(false)} />
							</Flex>
						</Dialog.Header>
						<Dialog.Body>
							{isTokenBurned && (
								<Text textStyle="md">
									Срок действия вашего токена авторизации hh.ru истёк. <br />
									Пожалуйста, обновите его на странице профиля.
								</Text>
							)}
						</Dialog.Body>
						<Dialog.Footer>
							<Dialog.ActionTrigger asChild>
								<Button variant="subtle" colorPalette="blue" onClick={handleClick}>
									Перейти на страницу профиля
								</Button>
							</Dialog.ActionTrigger>
						</Dialog.Footer>
					</Dialog.Content>
				</Dialog.Positioner>
			</Portal>
		</Dialog.Root>
	);
}
