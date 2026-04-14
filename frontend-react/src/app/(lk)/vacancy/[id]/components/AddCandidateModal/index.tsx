import { CloseButton, Dialog, Flex, Portal, Tabs } from '@chakra-ui/react';
import { memo, useEffect, useState } from 'react';
import { SingleUpload } from './SingleUpload';
import { MultipleUpload } from './MultipleUpload';
import { BulkResponse } from '@/store/types';
import { AfterAddCandidateModal } from '../AfterAddCandidateModal';
import { COLORS } from '@/constants/colors';

interface Props {
	open: boolean;
	setIsOpen: (open: boolean) => void;
	vacancyId: string;
	vacancySkills: string[];
	vacancyRequiredWorkExperience: string;
	onAdd: () => void;
}

export const AddCandidateModal = memo(function AddCandidateModal({
	open,
	setIsOpen,
	vacancyId,
	vacancySkills,
	vacancyRequiredWorkExperience,
	onAdd,
}: Props) {
	const [uploadTab, setUploadTab] = useState<'single' | 'several'>('single');
	const [afterAddModalOpen, setAfterAddModalOpen] = useState(false);
	const [bulkResults, setBulkResults] = useState<BulkResponse | null>(null);

	const handleSuccess = () => {
		setIsOpen(false);
		onAdd();
	};

	const handleCancel = () => {
		setIsOpen(false);
	};

	const handleBulkSuccess = (results: BulkResponse) => {
		setBulkResults(results);
		setIsOpen(false); // Сначала закрываем основную модалку

		setAfterAddModalOpen(true);
	};

	const handleAfterModalClose = () => {
		setAfterAddModalOpen(false);
		onAdd(); // Обновляем данные
	};

	// Закрываем модалку результатов если открывается основная
	useEffect(() => {
		if (open) {
			setAfterAddModalOpen(false);
		}
	}, [open]);

	return (
		<>
			<Dialog.Root lazyMount open={open} onOpenChange={(e) => setIsOpen(e.open)}>
				<Portal>
					<Dialog.Backdrop />
					<Dialog.Positioner>
						<Dialog.Content>
							<Dialog.Header>
								<Flex w="100%" align="center" justify="space-between">
									<Dialog.Title fontSize="lg" fontWeight="bold">
										Добавление кандидатов
									</Dialog.Title>
									<CloseButton size="sm" onClick={handleCancel} />
								</Flex>
							</Dialog.Header>
							<Dialog.Body>
								<Tabs.Root
									defaultValue="single"
									variant="plain"
									value={uploadTab}
									onValueChange={(e) => setUploadTab(e.value as 'single' | 'several')}
								>
									<Tabs.List>
										<Tabs.Trigger
											value="single"
											borderRadius="0"
											borderBottom={`2px solid ${COLORS.GRAY_200}`}
											_selected={{
												color: `${COLORS.BLUE_400}`,
												border: 'none',
												borderBottom: `2px solid ${COLORS.BLUE_400}`,
											}}
										>
											Одиночная загрузка
										</Tabs.Trigger>
										<Tabs.Trigger
											value="several"
											borderRadius="0"
											borderBottom={`2px solid ${COLORS.GRAY_200}`}
											_selected={{
												color: `${COLORS.BLUE_400}`,
												border: 'none',
												borderBottom: `2px solid ${COLORS.BLUE_400}`,
											}}
										>
											Массовая загрузка
										</Tabs.Trigger>
									</Tabs.List>

									<Tabs.Content value="single">
										<SingleUpload
											vacancyId={vacancyId}
											vacancySkills={vacancySkills}
											vacancyRequiredWorkExperience={vacancyRequiredWorkExperience}
											onSuccess={handleSuccess}
										/>
									</Tabs.Content>

									<Tabs.Content value="several">
										<MultipleUpload
											vacancyId={vacancyId}
											vacancySkills={vacancySkills}
											vacancyRequiredWorkExperience={vacancyRequiredWorkExperience}
											onSuccess={handleBulkSuccess}
										/>
									</Tabs.Content>
								</Tabs.Root>
							</Dialog.Body>
						</Dialog.Content>
					</Dialog.Positioner>
				</Portal>
			</Dialog.Root>

			{/* Модалка результатов рендерится отдельно */}
			<AfterAddCandidateModal
				open={afterAddModalOpen}
				setIsOpen={setAfterAddModalOpen}
				onSuccess={handleAfterModalClose}
				duplicateEmails={bulkResults?.duplicates_email || []}
				duplicateFileName={bulkResults?.duplicates_file_name || []}
				tasks={bulkResults?.task_ids || []}
				resumesWithoutEmail={bulkResults?.resumes_without_email || []}
			/>
		</>
	);
}, arePropsEqual);

function arePropsEqual(oldProps: Props, newProps: Props) {
	return oldProps.open === newProps.open;
}
