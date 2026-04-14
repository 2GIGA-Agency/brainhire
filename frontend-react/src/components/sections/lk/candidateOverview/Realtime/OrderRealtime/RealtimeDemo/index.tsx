import { LkButton } from '@/components/shared/LkButton';
import { Typo } from '@/components/shared/Typo/Typo';
import { COLORS } from '@/constants/colors';
import { CloseButton, Dialog, Flex, Portal } from '@chakra-ui/react';
import ReactPlayer from 'react-player';

interface Props {
	isOpen: boolean;
	setIsOpen: (isOpen: boolean) => void;
}

export function RealtimeDemo({ isOpen, setIsOpen }: Props) {
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
									Демо-презентация Realtime-интервью
								</Dialog.Title>
								<CloseButton size="sm" onClick={() => setIsOpen(false)} />
							</Flex>
						</Dialog.Header>
						<Dialog.Body>
							<Flex justifyContent="center">
								<ReactPlayer url={'/video/RealtimeDemo.webm'} controls={true} playing={true} />
							</Flex>
						</Dialog.Body>
						<Dialog.Footer>
							<Dialog.ActionTrigger asChild>
								<LkButton onClick={() => setIsOpen(false)}>
									<Typo color={COLORS.WHITE} size="14px" weight="semibold">
										Закрыть
									</Typo>
								</LkButton>
							</Dialog.ActionTrigger>
						</Dialog.Footer>
					</Dialog.Content>
				</Dialog.Positioner>
			</Portal>
		</Dialog.Root>
	);
}
