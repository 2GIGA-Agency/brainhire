'use client';

import { useRouter } from 'next/navigation';
import { ConfirmedModal } from '@/components/shared/ConfirmedModal';
import { toaster } from '@/components/ui/toaster';
import { Box, Flex, Tabs } from '@chakra-ui/react';
import Image from 'next/image';
import React, { useCallback, useEffect, useMemo, useRef, useState, useDeferredValue } from 'react';
import styles from './page.module.scss';
import { Typo } from '@/components/shared/Typo/Typo';
import { Block } from '@/components/shared/Block';
import { COLORS } from '@/constants/colors';
import { SearchBlock } from './components/SearchBlock';
import { LkButton } from '@/components/shared/LkButton';
import { debounce } from '@/utils/debounce';
import { useSorting } from '@/hooks/useSorting';
import { Table } from '@chakra-ui/react';

import { VacancyTable } from './components/VacancyTable';
import { VacancyTableSkeleton } from './components/VacancyTableSkeleton';

import {
	useGetVacanciesQuery,
	useCloneVacancyMutation,
	useArchiveVacancyMutation,
	useUnarchiveVacancyMutation,
} from '@/store/rtkQuery/api';
import { TABLE_TAB } from './types';

type CloneData = {
	id: string;
	company: string;
};

const Vacancy: React.FC = () => {
	const router = useRouter();
	const [tableTab, setTableTab] = useState<TABLE_TAB>(TABLE_TAB.ALL);
	const scrollContainerRef = useRef<HTMLDivElement>(null);

	// Используем deferred значение для плавного переключения
	const deferredTableTab = useDeferredValue(tableTab);

	// Данные с учетом deferred значения
	const {
		data: vacanciesData = [],
		isLoading,
		isFetching,
	} = useGetVacanciesQuery({
		is_archived: deferredTableTab === TABLE_TAB.ARCHIVE,
	});

	// --- ЛОГИКА ОТОБРАЖЕНИЯ ЗАГРУЗКИ ---

	// 1. Проверяем, отличается ли реальный таб от отложенного (момент клика)
	const isTabSwitching = tableTab !== deferredTableTab;

	// 2. Скелетон показываем ТОЛЬКО при первичной жесткой загрузке (isLoading),
	// когда RTK Query говорит, что данных в кеше нет и мы их ждем.
	// Добавляем проверку !isTabSwitching, чтобы не моргать скелетоном в момент клика до начала запроса.
	const showSkeleton = isLoading && !isTabSwitching;

	// 3. Режим "обновления" (затемнения):
	// Включается, если мы ждем смены таба (isTabSwitching)
	// ИЛИ если идет фоновая подгрузка данных (isFetching), но старые данные еще есть (или это не первичный лоад).
	const isUpdating = isTabSwitching || (isFetching && !isLoading);

	// Мутации
	const [cloneVacancy] = useCloneVacancyMutation();
	const [archiveVacancy] = useArchiveVacancyMutation();
	const [unarchiveVacancy] = useUnarchiveVacancyMutation();

	// Состояние модалок
	const [cloneVacancyModal, setCloneVacancyModal] = useState(false);
	const [cloneData, setCloneData] = useState<CloneData>({ id: '', company: '' });

	const [archiveVacancyModal, setArchiveVacancyModal] = useState(false);
	const [archiveVacancyId, setArchiveVacancyId] = useState<string>('');

	const archiveText = tableTab === TABLE_TAB.ARCHIVE ? 'разархивировать' : 'архивировать';

	const [searchQuery, setSearchQuery] = useState('');
	const deferredSearchQuery = useDeferredValue(searchQuery);

	// --- Логика сортировки и фильтрации ---
	const allVacancies = useMemo(() => {
		return [...vacanciesData].sort((a, b) => {
			return new Date(b.create_date).getTime() - new Date(a.create_date).getTime();
		});
	}, [vacanciesData]);

	const filteredVacancies = useMemo(() => {
		if (!deferredSearchQuery.trim()) return allVacancies;
		const lowercasedQuery = deferredSearchQuery.toLowerCase();
		return allVacancies.filter(
			(i) =>
				i.vacancy_name.toLowerCase().startsWith(lowercasedQuery) ||
				i.company.company_name.toLowerCase().startsWith(lowercasedQuery) ||
				i.user_full_name.toLowerCase().startsWith(lowercasedQuery)
		);
	}, [allVacancies, deferredSearchQuery]);

	const {
		sortedData: showVacancies,
		ordering,
		handleSort,
	} = useSorting(filteredVacancies, {
		order: 'create_date',
		value: 0,
	});

	// --- Хендлеры действий ---
	const handleView = useCallback(
		(id: string) => {
			router.push(`/vacancy/${id}`);
		},
		[router]
	);

	const handleEdit = useCallback(
		(id: string) => {
			router.push(`/vacancy/${id}/edit`);
		},
		[router]
	);

	const handleOpenCloneModal = useCallback((id: string, companyId: string) => {
		setCloneData({ id, company: companyId });
		setCloneVacancyModal(true);
	}, []);

	const handleOpenArchiveModal = useCallback((id: string) => {
		setArchiveVacancyId(id);
		setArchiveVacancyModal(true);
	}, []);

	const handleCloneVacancy = async () => {
		setCloneVacancyModal(false);
		const promise = cloneVacancy({
			vacancy_id: cloneData.id,
			company_id: cloneData.company,
		}).unwrap();

		toaster.promise(promise, {
			success: { title: 'Вакансия клонирована', duration: 3000 },
			error: { title: 'Ошибка клонирования' },
			loading: { title: 'Клонирую...' },
		});
	};

	const handleArchiveAction = async () => {
		setArchiveVacancyModal(false);
		const isArchiveTab = tableTab === TABLE_TAB.ARCHIVE;
		const promise = isArchiveTab
			? unarchiveVacancy({ vacancy_id: archiveVacancyId }).unwrap()
			: archiveVacancy({ vacancy_id: archiveVacancyId }).unwrap();

		toaster.promise(promise, {
			success: { title: isArchiveTab ? 'Разархивировано' : 'Архивировано', duration: 3000 },
			error: { title: 'Ошибка' },
			loading: { title: 'Обработка...' },
		});
	};

	// Сброс поиска при смене таба
	useEffect(() => {
		setSearchQuery('');
	}, [tableTab]);

	const handleSearchChange = useCallback(
		debounce(300, (value: string) => setSearchQuery(value)),
		[]
	);

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (!scrollContainerRef.current) return;
			const scrollAmount = 80;
			if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)) {
				e.preventDefault();
				const direction = e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -1 : 1;
				const axis = e.key === 'ArrowLeft' || e.key === 'ArrowRight' ? 'left' : 'top';
				scrollContainerRef.current.scrollBy({
					[axis]: scrollAmount * direction,
					behavior: 'smooth',
				});
			}
		};
		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown);
	}, []);

	return (
		<>
			<Box className={styles.wrapper}>
				<Box className={styles.container}>
					<Block
						heading={
							<Flex justifyContent={'space-between'} w="100%" alignItems="center" justify="end">
								<SearchBlock
									key={tableTab}
									onChange={handleSearchChange}
									placeholder="Поиск по названию вакансии, компании, создателю"
									maxW={'572px'}
								/>
								<LkButton
									bg={COLORS.BLUE_400}
									icon={
										<Image
											src={'/icons/add.svg'}
											width={14}
											height={14}
											alt={'Plus'}
											style={{ marginTop: '1.5px' }}
										/>
									}
									onClick={() => router.push('/vacancy/create')}
								>
									<Typo weight="semibold" color={COLORS.WHITE}>
										Создать вакансию
									</Typo>
								</LkButton>
							</Flex>
						}
					>
						{/* Табы */}
						<Tabs.Root
							value={tableTab}
							mb={6}
							defaultValue="all"
							onValueChange={(e) => setTableTab(e.value as TABLE_TAB)}
							variant="plain"
						>
							<Box className={styles.tabsScrollContainer}>
								<Tabs.List>
									<Tabs.Trigger
										value={TABLE_TAB.ALL}
										borderRadius="0"
										paddingBottom="4px"
										borderBottom="2px solid"
										borderColor={COLORS.GRAY_200}
										fontWeight="500"
										_selected={{
											fontWeight: 600,
											color: COLORS.BLUE_400,
											borderBottomColor: COLORS.BLUE_400,
										}}
									>
										Все
									</Tabs.Trigger>
									<Tabs.Trigger
										value={TABLE_TAB.ARCHIVE}
										borderRadius="0"
										borderBottom="2px solid"
										fontWeight="500"
										paddingBottom="4px"
										borderColor={COLORS.GRAY_200}
										_selected={{
											fontWeight: 600,
											color: COLORS.BLUE_400,
											borderBottomColor: COLORS.BLUE_400,
										}}
									>
										Архив
									</Tabs.Trigger>
								</Tabs.List>
							</Box>
						</Tabs.Root>

						{/* Скролл контейнер с Таблицей */}
						<Table.ScrollArea
							maxW="100%"
							className={styles.contentScrollContainer}
							ref={scrollContainerRef}
						>
							{showSkeleton ? (
								<VacancyTableSkeleton />
							) : (
								<VacancyTable
									data={showVacancies}
									// Передаем флаг обновления в пропсы
									isUpdating={isUpdating}
									ordering={ordering}
									onSort={handleSort}
									tab={deferredTableTab}
									onView={handleView}
									onEdit={handleEdit}
									onClone={handleOpenCloneModal}
									onArchiveToggle={handleOpenArchiveModal}
								/>
							)}
						</Table.ScrollArea>
					</Block>
				</Box>
			</Box>

			{/* Модалки (без изменений) */}
			<ConfirmedModal
				isOpen={cloneVacancyModal}
				onClose={() => setCloneVacancyModal(false)}
				title="Клонирование вакансии"
				text="Вы уверены, что хотите клонировать вакансию?"
				buttonConfirmText="Да, клонировать"
				action={handleCloneVacancy}
			/>
			<ConfirmedModal
				isOpen={archiveVacancyModal}
				onClose={() => setArchiveVacancyModal(false)}
				title="Архивация вакансии"
				text={`Вы уверены, что хотите ${archiveText} вакансию?`}
				buttonConfirmText={`Да, ${archiveText}`}
				action={handleArchiveAction}
			/>
		</>
	);
};

export default Vacancy;
