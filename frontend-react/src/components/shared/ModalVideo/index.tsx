import { Button, CloseButton, Dialog, Flex, Portal } from '@chakra-ui/react';
import ReactPlayer from 'react-player';

interface Props {
	isOpen: boolean;
	setIsOpen: (isOpen: boolean) => void;
	modalTitle?: string;
	url: string | undefined;
}

export function ModalVideo({ isOpen, setIsOpen, modalTitle, url }: Props) {
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
									{modalTitle}
								</Dialog.Title>
								<CloseButton size="sm" onClick={() => setIsOpen(false)} />
							</Flex>
						</Dialog.Header>
						<Dialog.Body>
							<Flex justifyContent="center">
								<ReactPlayer url={url} controls={true} playing={true} />
							</Flex>
						</Dialog.Body>
						<Dialog.Footer>
							<Dialog.ActionTrigger asChild>
								<Button variant="subtle" colorPalette="blue" onClick={() => setIsOpen(false)}>
									Закрыть
								</Button>
							</Dialog.ActionTrigger>
						</Dialog.Footer>
					</Dialog.Content>
				</Dialog.Positioner>
			</Portal>
		</Dialog.Root>
	);
}
