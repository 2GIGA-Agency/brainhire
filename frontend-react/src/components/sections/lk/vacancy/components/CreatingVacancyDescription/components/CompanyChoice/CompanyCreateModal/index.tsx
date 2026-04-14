import { Button, CloseButton, Dialog, Field, Flex, Input, Portal } from '@chakra-ui/react';
import { useState } from 'react';
import { COLORS } from '@/constants/colors';

interface Props {
	isOpen: boolean;
	setIsOpen: (isOpen: boolean) => void;
	submit: (inn: string, description: string) => void;
}

export function CompanyCreateModal({ isOpen, setIsOpen, submit }: Props) {
	const [inn, setInn] = useState('');
	const [description, setDescription] = useState('');
	const isCreateCompany = inn && description;

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
										Создание компании
									</Dialog.Title>
									<CloseButton size="sm" onClick={() => setIsOpen(false)} />
								</Flex>
							</Dialog.Header>
							<Dialog.Body>
								<Field.Root required mt={4}>
									<Field.Label>
										<Field.RequiredIndicator /> ИНН
									</Field.Label>
									<Input
										placeholder="Введите ИНН компании"
										value={inn}
										onChange={(e) => setInn(e.target.value)}
									/>
								</Field.Root>
								<Field.Root required mt={4}>
									<Field.Label>
										<Field.RequiredIndicator /> Описание компании
									</Field.Label>
									<Input
										placeholder="Введите описание компании"
										value={description}
										onChange={(e) => setDescription(e.target.value)}
									/>
								</Field.Root>
							</Dialog.Body>
							<Dialog.Footer>
								<Dialog.ActionTrigger asChild>
									<Button
										variant="solid"
										bg={COLORS.BLUE_400}
										disabled={!isCreateCompany}
										onClick={() => submit(inn, description)}
										h="32px"
									>
										Создать
									</Button>
								</Dialog.ActionTrigger>
							</Dialog.Footer>
						</Dialog.Content>
					</Dialog.Positioner>
				</Portal>
			</Dialog.Root>
		</>
	);
}
