import { CloseButton, Dialog, Flex, Portal, Text } from '@chakra-ui/react';
import { LkButton } from '../LkButton';
import { COLORS } from '@/constants/colors';

interface Props {
	title: string;
	text: string;
	action: () => void;
	buttonConfirmText: string;
	buttonCancelText?: string;
	isOpen: boolean;
	onClose: () => void;
	onCloseButtonClick?: () => void;
}

export const ConfirmedModal: React.FC<Props> = ({
	title,
	text,
	action,
	isOpen,
	onClose,
	onCloseButtonClick,
	buttonConfirmText,
	buttonCancelText = 'Закрыть',
}) => {
	return (
		<Dialog.Root lazyMount open={isOpen} onOpenChange={onClose}>
			<Portal>
				<Dialog.Backdrop zIndex={'modal'} />
				<Dialog.Positioner zIndex={'popover'}>
					<Dialog.Content>
						<Dialog.Header>
							<Flex w="100%" align="center" justify="space-between">
								<Dialog.Title fontSize="lg" fontWeight="bold">
									{title}
								</Dialog.Title>
								<CloseButton size="sm" onClick={onCloseButtonClick || onClose} />
							</Flex>
						</Dialog.Header>
						<Dialog.Body>
							<Text textStyle="sm">{text}</Text>
						</Dialog.Body>
						<Dialog.Footer>
							<LkButton bg={COLORS.ORANGE_400} onClick={action}>
								{buttonConfirmText}
							</LkButton>
							<LkButton onClick={onClose}>{buttonCancelText}</LkButton>
						</Dialog.Footer>
					</Dialog.Content>
				</Dialog.Positioner>
			</Portal>
		</Dialog.Root>
	);
};
