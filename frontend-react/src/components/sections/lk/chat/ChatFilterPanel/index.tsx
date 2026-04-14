// ChatFilterPanel.tsx

import { memo, useState, useEffect } from 'react';
import { Box, Flex, VStack, Checkbox, ListCollection } from '@chakra-ui/react';
import { Selection } from '@/components/shared/Selection'; // Убедитесь, что путь верный
import { Typo } from '@/components/shared/Typo/Typo';
import { COLORS } from '@/constants/colors';
import { LkButton } from '@/components/shared/LkButton'; // Убедитесь, что путь верный

const defaultFilters = { vacancy: [] as string[], unread_only: false };

// --- Интерфейс пропсов для "умного" компонента ---
interface ChatFilterPanelProps {
	// Начальное состояние фильтров (те, что применены сейчас)
	initialFilters: typeof defaultFilters;
	vacancyCollection: ListCollection<Record<'label' | 'value', string>>;
	isVacanciesLoading: boolean;
	// Единый колбэк, который вызывается при применении или сбросе
	onApplyFilters: (newFilters: typeof defaultFilters) => void;
}

/**
 * ChatFilterPanel - "умный" компонент, который инкапсулирует логику выбора фильтров.
 */
export const ChatFilterPanel = memo(function ChatFilterPanel({
	initialFilters,
	vacancyCollection,
	isVacanciesLoading,
	onApplyFilters,
}: ChatFilterPanelProps) {
	// Внутреннее состояние для управления UI (выбранные, но не примененные фильтры)
	const [draftFilters, setDraftFilters] = useState(initialFilters);

	// Синхронизируем внутреннее состояние с внешним при каждом изменении initialFilters
	// Это нужно, чтобы при открытии панели она всегда показывала актуальные примененные фильтры
	useEffect(() => {
		setDraftFilters(initialFilters);
	}, [initialFilters]);

	// Обработчик для изменения любого фильтра в локальном состоянии
	const handleDraftFilterChange = (field: keyof typeof draftFilters, value: any) => {
		setDraftFilters((prev) => ({ ...prev, [field]: value }));
	};

	// Обработчик кнопки "Применить"
	const handleApply = () => {
		onApplyFilters(draftFilters); // Сообщаем родителю о новых фильтрах
	};

	// Обработчик кнопки "Сбросить"
	const handleReset = () => {
		setDraftFilters(defaultFilters); // Сбрасываем локальное состояние
		onApplyFilters(defaultFilters); // Сообщаем родителю, что фильтры сброшены
	};

	return (
		<Flex direction="column" h="100%">
			<VStack gap={4} p={4} align="stretch" flex="1" overflowY="auto">
				<Box>
					<Typo size="14px" weight="medium" color={COLORS.GRAY_800} mb={2}>
						Вакансии
					</Typo>
					<Selection
						placeholder="Выберите вакансию"
						isMultiSelect={true}
						collection={vacancyCollection}
						value={draftFilters.vacancy}
						onChange={(value) => handleDraftFilterChange('vacancy', value as string[])}
						isLoading={isVacanciesLoading}
					/>
				</Box>
				<Checkbox.Root
					checked={draftFilters.unread_only}
					// --- ИСПРАВЛЕНИЕ ЗДЕСЬ ---
					onCheckedChange={(details) => handleDraftFilterChange('unread_only', details.checked)}
					display="flex"
					alignItems="center"
					cursor={'pointer'}
					gap={2}
				>
					<Checkbox.HiddenInput />
					<Checkbox.Control
						width="24px"
						height="24px"
						border="1px solid #E2E8F0"
						borderRadius="4px"
						display="flex"
						alignItems="center"
						justifyContent="center"
						_checked={{ bg: COLORS.BLUE_500, borderColor: COLORS.BLUE_500 }}
					>
						<Checkbox.Indicator color="white" />
					</Checkbox.Control>
					<Checkbox.Label>
						<Typo size="16px">Только непрочитанные</Typo>
					</Checkbox.Label>
				</Checkbox.Root>
			</VStack>

			<VStack p={4} borderTop="1px solid" borderColor="gray.200" gap={3}>
				<LkButton w="100%" size="sm" onClick={handleApply}>
					Применить
				</LkButton>
				<LkButton w="100%" bg={COLORS.TEAL_400} size="sm" onClick={handleReset}>
					Сбросить
				</LkButton>
			</VStack>
		</Flex>
	);
});
