import { useState } from 'react';
import { createListCollection } from '@chakra-ui/react';
import styles from './style.module.scss';

import { Block } from '@/components/shared/Block';
import { LkButton } from '@/components/shared/LkButton';
import { Typo } from '@/components/shared/Typo/Typo';
import { Selection } from '../Selection';
import { ChangePatternModal, PatternButton } from '../ChangePatternModal';
import { COLORS } from '@/constants/colors';

// Импортируйте toaster из вашего UI (путь может отличаться)
import { toaster } from '@/components/ui/toaster';

import { useAppDispatch, useAppSelector } from '@/store/store';
import { TemplateCategoryKey } from '@/store/slices/vacancyCreation/vacancySettings/types';
import {
	createVacancyTemplate,
	deleteVacancyTemplate,
	makeSelectCurrentTemplateByType,
	makeSelectTemplatesByType,
	selectTemplate,
	updateVacancyTemplate,
} from '@/store/slices/vacancyCreation/vacancySettings';

export interface IPatternItem {
	title: string;
	type: TemplateCategoryKey;
	buttons: PatternButton[];
}

export function PatternItem({ title, type, buttons }: IPatternItem) {
	const dispatch = useAppDispatch();

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');

	const selectTemplatesList = makeSelectTemplatesByType(type);
	const selectCurrentTemplate = makeSelectCurrentTemplateByType(type);

	const availableTemplates = useAppSelector(selectTemplatesList);
	const selectedTemplate = useAppSelector(selectCurrentTemplate);

	const templateCollection = (() => {
		const items = availableTemplates.map((template) => ({
			label: `${template.title} ${template.isSystem ? '(системный)' : ''}`.trim(),
			value: template.id,
		}));
		return createListCollection({ items });
	})();

	const handleSelectionChange = (value: string | string[]) => {
		const selectedId = Array.isArray(value) ? value[0] : value;
		if (selectedId) {
			dispatch(selectTemplate({ type, id: selectedId }));
		}
	};

	const handleCreateClick = () => {
		setModalMode('create');
		setIsModalOpen(true);
	};

	const handleEditClick = () => {
		setModalMode('edit');
		setIsModalOpen(true);
	};

	// --- УДАЛЕНИЕ ---
	const handleDelete = () => {
		if (selectedTemplate && !selectedTemplate.isSystem) {
			const promise = dispatch(deleteVacancyTemplate({ type, id: selectedTemplate.id })).unwrap();

			toaster.promise(promise, {
				loading: { title: 'Удаляем шаблон...' },
				success: { title: 'Шаблон удален' },
				error: { title: 'Ошибка удаления' },
			});
		}
	};

	// --- СОЗДАНИЕ И РЕДАКТИРОВАНИЕ ---
	const handleSaveTemplate = (data: { title: string; content: string }) => {
		if (modalMode === 'create') {
			const promise = dispatch(
				createVacancyTemplate({
					type,
					title: data.title,
					content: data.content,
				})
			).unwrap();

			toaster.promise(promise, {
				loading: { title: 'Создаем шаблон...' },
				success: { title: 'Шаблон успешно создан' },
				error: { title: 'Ошибка создания' },
			});
		} else if (modalMode === 'edit' && selectedTemplate) {
			const promise = dispatch(
				updateVacancyTemplate({
					type,
					id: selectedTemplate.id,
					title: data.title,
					content: data.content,
				})
			).unwrap();

			toaster.promise(promise, {
				loading: { title: 'Сохраняем изменения...' },
				success: { title: 'Шаблон обновлен' },
				error: { title: 'Ошибка обновления' },
			});
		}
	};

	return (
		<>
			<Typo color={COLORS.GRAY_800} size="20px" weight="semibold">
				{title}
			</Typo>

			<div className={styles.selectionBlock}>
				<div className={styles.selectionSelect}>
					<Selection
						key={selectedTemplate?.id || 'no-template'}
						placeholder="Выберите шаблон"
						collection={templateCollection}
						value={selectedTemplate ? [selectedTemplate.id] : undefined}
						onChange={handleSelectionChange}
					/>
				</div>

				<LkButton onClick={handleCreateClick} heightSize="medium" flexShrink={0}>
					Создать
				</LkButton>

				{!selectedTemplate?.isSystem && selectedTemplate && (
					<>
						<LkButton onClick={handleEditClick} heightSize="medium" flexShrink={0}>
							Редактировать
						</LkButton>
						<LkButton
							onClick={handleDelete}
							bg={COLORS.RED_400}
							_hover={{ bg: COLORS.RED_500 }}
							heightSize="medium"
							flexShrink={0}
						>
							Удалить
						</LkButton>
					</>
				)}
			</div>

			<Block mt="16px" whiteSpace="pre-line" minH="100px">
				{selectedTemplate?.content ??
					'Шаблон не выбран. Выберите шаблон из списка или создайте новый.'}
			</Block>

			<ChangePatternModal
				isOpen={isModalOpen}
				setIsOpen={setIsModalOpen}
				mode={modalMode}
				templateToEdit={modalMode === 'edit' ? selectedTemplate : null}
				buttons={buttons}
				onSave={handleSaveTemplate}
				allTemplates={availableTemplates}
			/>
		</>
	);
}
