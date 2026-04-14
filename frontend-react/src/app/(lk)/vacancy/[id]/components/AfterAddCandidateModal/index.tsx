import { Typo } from '@/components/shared/Typo/Typo';
import { Accordion, Box, CloseButton, Dialog, Flex, Portal, Separator } from '@chakra-ui/react';
import { memo } from 'react';

interface Props {
	open: boolean;
	onSuccess: () => void;
	setIsOpen: (open: boolean) => void;
	tasks: string[];
	duplicateEmails: string[];
	duplicateFileName: string[];
	resumesWithoutEmail: string[];
}

export const AfterAddCandidateModal = memo(function AfterAddCandidateModal({
	open,
	onSuccess,
	setIsOpen,
	tasks,
	duplicateEmails,
	duplicateFileName,
	resumesWithoutEmail,
}: Props) {
	const handleClose = () => {
		setIsOpen(false);
		onSuccess();
	};

	return (
		<Dialog.Root lazyMount open={open} onOpenChange={(open) => setIsOpen(open.open)}>
			<Portal>
				<Dialog.Backdrop />
				<Dialog.Positioner>
					<Dialog.Content>
						<Dialog.Header>
							<Flex w="100%" align="center" justify="space-between">
								<Dialog.Title fontSize="lg" fontWeight="bold">
									Результаты массовой загрузки
								</Dialog.Title>
								<CloseButton size="sm" onClick={handleClose} />
							</Flex>
						</Dialog.Header>
						<Dialog.Body>
							{tasks[0] && (
								<Typo size="18px" weight="semibold" pl={2}>
									Добавлено {tasks.length}
								</Typo>
							)}
							<Accordion.Root collapsible w="100%" variant="plain" mt={3}>
								{duplicateEmails[0] && (
									<Accordion.Item key={'tasks'} value={'duplicateEmails'} w="100%" mb={4}>
										<Accordion.ItemTrigger
											w="100%"
											display="flex"
											justifyContent="space-between"
											alignItems="center"
											bg="gray.50"
											pl={2}
											pr={2}
										>
											<Typo size="18px">Дубликатов email {duplicateEmails.length}</Typo>
											<Accordion.ItemIndicator />
										</Accordion.ItemTrigger>
										<Accordion.ItemContent w="100%" pl={2}>
											{duplicateEmails.map((i, idx) => {
												return (
													<>
														<Box mt="12px" ml="6px">
															<Typo>{duplicateFileName[idx]}</Typo>
															<Typo mt="3px">{i}</Typo>
														</Box>
														<Separator />
													</>
												);
											})}
										</Accordion.ItemContent>
									</Accordion.Item>
								)}
								{resumesWithoutEmail[0] && (
									<Accordion.Item key={'tasks'} value={'resumeWithoutEmail'} w="100%" mb={4}>
										<Accordion.ItemTrigger
											w="100%"
											display="flex"
											justifyContent="space-between"
											alignItems="center"
											bg="gray.50"
											pl={2}
											pr={2}
										>
											<Typo size="18px">Резюме без email {resumesWithoutEmail.length}</Typo>
											<Accordion.ItemIndicator />
										</Accordion.ItemTrigger>
										<Accordion.ItemContent w="100%" pl={2}>
											{resumesWithoutEmail.map((i) => {
												return (
													<>
														<Typo mt="12px" mb="6px">
															{i}
														</Typo>
														<Separator />
													</>
												);
											})}
										</Accordion.ItemContent>
									</Accordion.Item>
								)}
							</Accordion.Root>
						</Dialog.Body>
					</Dialog.Content>
				</Dialog.Positioner>
			</Portal>
		</Dialog.Root>
	);
});
