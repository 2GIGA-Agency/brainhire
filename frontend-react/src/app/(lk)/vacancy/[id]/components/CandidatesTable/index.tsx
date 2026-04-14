// src/app/vacancies/[id]/components/CandidatesTable/CandidatesTable.tsx

import { CandidateInfoModal } from '@/components/shared/CandidateInfoModal/CandidateInfoModal';
import { ConfirmedModal } from '@/components/shared/ConfirmedModal';
import { LkButton } from '@/components/shared/LkButton';
import { SortHeader } from '@/components/shared/SortHeader';
import { Tip } from '@/components/shared/Tip';
import { Typo } from '@/components/shared/Typo/Typo';
import { toaster } from '@/components/ui/toaster';
import { COLORS } from '@/constants/colors';
import { 
    useGetCandidatesQuery, 
    useGetLimitsQuery, 
    useBulkCandidatesActionMutation 
} from '@/store/rtkQuery/api';
import { GetCandidatesParams } from '@/store/rtkQuery/types/Candidates';
import { selectIsTipsShow, setIsChatWidgetShow, toggleIsModalShow } from '@/store/slices/appSlice';
import { setSearchQuery, setSelectedTopicId } from '@/store/slices/chatSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { Candidate, CompanyFilterApi } from '@/store/types';
import axios from '@/utils/axios';
import { formatNumber } from '@/utils/formatNumber';
import {
    Box,
    ButtonGroup,
    Checkbox,
    Dialog,
    Flex,
    IconButton,
    Pagination,
    Table,
    Tabs,
    Tag,
    Text,
    Tooltip as ChakraTooltip,
    useTooltip,
} from '@chakra-ui/react';
import Image from 'next/image';
import React, { useState, useCallback, useMemo  } from 'react';
import { HiOutlineQuestionMarkCircle } from 'react-icons/hi';
import { OutboundSearch } from '../../components/OutboundSearch';
import { CandidateAction, TableTab } from './components/CandidatesTabs/types';
import { tableTabs } from './lib/consts';
import styles from './style.module.scss';
import { CandidatesTableSkeleton } from './components/CandidateTableSkeleton';
import { Ordering } from '@/components/shared/SortHeader/types';
import { candidateName } from './lib/helpers';
import { AddCandidateModal } from '../AddCandidateModal';
import { SearchInput } from '@/components/shared/SearchInput';

// Imports from Feature (Bulk Actions)
import { CandidatesTableBody } from './components/CandidatesTableBody';
import { CandidatesActions } from './components/CandidatesActions';
import { useSelection } from './lib/hooks';
import { ActionConfirmModal } from './components/ActionConfirmModal';

// --- Интерфейс пропсов ---
interface CandidatesTableProps {
    vacancyId: string;
    vacancyRootId: string;
    vacancyHhId: string | null;
    isOutboundAvailable: boolean;
    companyFilter?: CompanyFilterApi;

    // For modal
    vacancySkills: string[];
    vacancyRequiredWorkExperience: string;
}

export const CandidatesTable = ({
    vacancyId,
    vacancySkills,
    vacancyRequiredWorkExperience,
    vacancyRootId,
    vacancyHhId,
    isOutboundAvailable,
}: CandidatesTableProps) => {
    const dispatch = useAppDispatch();
    const isTipsShow = useAppSelector(selectIsTipsShow);

    // --- Состояния UI ---
    const [addCandidateModal, setAddCandidateModal] = useState(false);
    const [candidateInfoModal, setCandidateInfoModal] = useState(false);
    const [candidateInfo, setCandidateInfo] = useState<Candidate>();
    const addCandidateTooltip = useTooltip({ positioning: { placement: 'top' } });
    
    // --- Состояния одиночных действий (Legacy/Actual) ---
    const [candidateToDelete, setCandidateToDelete] = useState<Candidate | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    // --- Состояния массовых действий (Feature) ---
    const [actionsModal, setActionsModal] = useState<CandidateAction>('none');
    const [isActionsActive, setIsActionsActive] = useState(false);
    const [bulkActionRequest] = useBulkCandidatesActionMutation();

    // --- Состояния фильтров и поиска ---
    const [activeTableTab, setActiveTableTab] = useState<TableTab>('all');
    const [searchTab, setSearchTab] = useState<'incoming' | 'outbound'>('incoming');
    const [debouncedSearchQuery, setDebouncedSearchQuery] = useState<string>('');
    const [page, setPage] = useState<number>(1);
    const [ordering, setOrdering] = useState<Ordering>({ order: '', value: 0 });

    const queryParams: GetCandidatesParams = {
        vacancyRootId,
        page,
    };
    if (searchTab === 'outbound') {
        queryParams.outbound = true;
    }
    if (activeTableTab !== 'all') {
        queryParams.tab = activeTableTab;
    }
    if (debouncedSearchQuery) {
        queryParams.search = debouncedSearchQuery;
    }
    if (ordering.value > 0) {
        queryParams.ordering = `${ordering.value === 1 ? '-' : ''}${ordering.order}`;
    }

    const {
        data: candidatesData,
        isLoading,
        isFetching,
        refetch,
    } = useGetCandidatesQuery(queryParams, {
        skip: !vacancyRootId,
    });

    const { refetch: limitsRefetch } = useGetLimitsQuery({ vacancyRootId: vacancyRootId });

    // --- Данные ---
    const candidates = useMemo(() => { return candidatesData?.results ?? []; }, [candidatesData]);
    const candidatesCount = candidatesData?.count;
    const currentPage = candidatesData?.current_page;
    const perPage = candidatesData?.per_page || 10;
    const counterCandidates = candidatesData?.candidates_counters;

    // --- Логика отображения колонок (из Actual) ---
    const isAwaiting = activeTableTab === 'awaiting';
    const hiddenInterviewColumn = activeTableTab === 'ai_bot';
    const hiddenActionsColumn = isAwaiting;

    // --- Хук выделения (Feature) ---
    const {
        selectedIds: selectedCandidates,
        handleSelect: handleSelectCandidate,
        handleSelectAll,
    } = useSelection();

    const selectedCandidatesList = candidates.filter((_, idx) => selectedCandidates.includes(idx));

    // --- Обработчики ---

    const handleViewCandidate = useCallback((id: string) => {
        setCandidateInfo(candidates.find((candidate) => candidate.id === id));
        setCandidateInfoModal(true);
    }, [candidates]);

    // Одиночное удаление (Legacy)
    // const handleOpenDeleteCandidate = (candidate: Candidate) => {
    //     setCandidateToDelete(candidate);
    //     setIsDeleteModalOpen(true);
    // };

    const handleCloseDeleteCandidate = () => {
        setIsDeleteModalOpen(false);
        setCandidateToDelete(null);
    };

    const handleConfirmDeleteCandidate = () => {
        if (!candidateToDelete) return;

        const promise = axios.post(`/api/candidates/${candidateToDelete.id}/deactivate/`);

        toaster.promise(promise, {
            success: { title: 'Кандидат удалён' },
            error: (err: any) => ({
                title: err?.response?.data?.message || 'Ошибка при удалении кандидата',
                duration: 5000,
            }),
            loading: { title: 'Удаление кандидата' },
        });

        promise
            .then(() => {
                refetch();
                limitsRefetch();
            })
            .finally(() => {
                handleCloseDeleteCandidate();
            });
    };

    // Массовые действия (Feature)
    const handleConfirmAction = useCallback(async (action: CandidateAction, candidatesToProcess: Candidate[]) => {
        const candidateIds = candidatesToProcess.map((c) => c.id);

        if (action === 'delete') {
            try {
                await bulkActionRequest({
                    vacancyRootId: vacancyRootId,
                    action: 'delete',
                    candidate_ids: candidateIds
                }).unwrap();

                setIsActionsActive(false);
                handleSelectAll();
                refetch();
                limitsRefetch();
            } catch (error: any) {
                 toaster.create({
                    title: error?.data?.message || 'Ошибка при удалении',
                    type: 'error',
                });
                throw error;
            }
        }
    }, [bulkActionRequest, vacancyRootId, handleSelectAll, refetch, limitsRefetch]);

    const handleCandidateChatClick = useCallback((candidate: Candidate) => {
        if (candidate.chat) {
            dispatch(setSelectedTopicId(candidate.chat.topic_id));
            dispatch(setIsChatWidgetShow(true));
            dispatch(setSearchQuery(candidate.chat.topic_id));
        }
    }, [dispatch]);

    const handleSort = useCallback((sortName: string) => {
        setPage(1);
        setOrdering((prev) => ({
            ...prev,
            order: sortName,
            value: prev.order === sortName ? (prev.value + 1) % 3 : 1,
        }));
    }, []);

    const handleGetContact = useCallback((candidateId: string) => {
        const promise = axios.post('/api/hh/outbound_search/get_contacts/', {
            candidate_id: candidateId,
            vacancy_id: vacancyId,
        });

        toaster.promise(promise, {
            success: { title: 'Контакт пользователя получен' },
            error: (err: any) => ({ title: `${err.response.data.message}`, duration: 5000 }),
            loading: { title: 'Выполняется получение контакта кандидата' },
        });
        promise.then(() => refetch());
    }, [vacancyId, refetch]);

    const handleSearchTabChange = useCallback((newTab: 'incoming' | 'outbound') => {
        setPage(1);
        setActiveTableTab('all');
        setSearchTab(newTab);
    }, []);

    const handleTableTabChange = (newTab: TableTab) => {
        setPage(1);
        setActiveTableTab(newTab);
        limitsRefetch();
    };

    const handleMouseAddCandidateEnter = () => {
        dispatch(toggleIsModalShow());
        addCandidateTooltip.setOpen(true);
    };

    const handleMouseAddCandidateLeave = () => {
        dispatch(toggleIsModalShow());
        addCandidateTooltip.setOpen(false);
    };

    const handleCandidateAdded = useCallback(() => {
        setActiveTableTab('awaiting');
    }, []);

    if (isLoading) {
        return <CandidatesTableSkeleton />;
    }

    return (
        <>
            {vacancyHhId && (
                <Tabs.Root
                    value={searchTab}
                    mb={6}
                    mt={4}
                    onValueChange={(e) => handleSearchTabChange(e.value as 'incoming' | 'outbound')}
                    variant="plain"
                    zIndex={1}
                >
                    <Tabs.List>
                        <Tabs.Trigger
                            value="incoming"
                            borderRadius="0"
                            borderBottom="2px solid rgba(226, 232, 240, 1)"
                            _selected={{ color: '#4299E1', border: 'none', borderBottom: '2px solid #4299E1' }}
                        >
                            Кандидаты с откликом на вакансию
                        </Tabs.Trigger>
                        <Tabs.Trigger
                            value="outbound"
                            borderRadius="0"
                            borderBottom="2px solid rgba(226, 232, 240, 1)"
                            _selected={{ color: '#4299E1', border: 'none', borderBottom: '2px solid #4299E1' }}
                        >
                            <Flex gap={2}>
                                <Typo weight="medium" color="inherit">
                                    Холодный поиск по hh.ru
                                </Typo>
                                {isTipsShow && (
                                    <Tip
                                        questionIconSize={16}
                                        content={
                                            <Typo color={COLORS.GRAY_800} weight="medium">
                                                Холодный поиск - важная опция для активного поиска кандидатов. Заполните
                                                параметры и запустите холодный поиск...
                                            </Typo>
                                        }
                                    />
                                )}
                            </Flex>
                        </Tabs.Trigger>
                    </Tabs.List>
                </Tabs.Root>
            )}

            {searchTab === 'outbound' && <OutboundSearch isAvailable={isOutboundAvailable} />}

            <Box className={styles.table} position="relative">
                <Flex justify="space-between" className={styles.search} gap={4}>
                    <SearchInput
                        placeholder="Поиск по ФИО, городу, телефону"
                        value=""
                        onDebouncedChange={(value) => setDebouncedSearchQuery(value)}
                        debounceWait={500}
                        maxWidth="572px"
                    />
                    <Flex gap={2} alignItems={'center'}>
                        {isTipsShow && (
                            <HiOutlineQuestionMarkCircle
                                className={styles.tip}
                                cursor={'help'}
                                size={16}
                                onMouseEnter={handleMouseAddCandidateEnter}
                                onMouseLeave={handleMouseAddCandidateLeave}
                            />
                        )}
                        <ChakraTooltip.RootProvider value={addCandidateTooltip}>
                            <ChakraTooltip.Trigger asChild>
                                <LkButton onClick={() => setAddCandidateModal(true)}>
                                    <Image src="/icons/add.svg" alt="Add Icon" width={14} height={14} />
                                    <Typo weight="semibold" color={COLORS.WHITE}>
                                        Добавить кандидата
                                    </Typo>
                                </LkButton>
                            </ChakraTooltip.Trigger>
                            {isTipsShow && (
                                <ChakraTooltip.Positioner>
                                    <ChakraTooltip.Content bg={COLORS.WHITE} p={3}>
                                        <ChakraTooltip.Arrow
                                            stroke={`${COLORS.WHITE} !important`}
                                            borderColor={`${COLORS.WHITE} !important`}
                                        >
                                            <ChakraTooltip.ArrowTip
                                                bg={`${COLORS.WHITE} !important`}
                                                borderColor={`${COLORS.WHITE} !important`}
                                            />
                                        </ChakraTooltip.Arrow>
                                        <Typo weight="medium" color={COLORS.GRAY_800}>
                                            Вы можете вручную загружать резюме кандидатов в формате PDF...
                                        </Typo>
                                    </ChakraTooltip.Content>
                                </ChakraTooltip.Positioner>
                            )}
                        </ChakraTooltip.RootProvider>
                    </Flex>
                </Flex>

                {/* Панель массовых действий */}
                <CandidatesActions
                    selectedCandidatesLength={selectedCandidates.length}
                    activeTab={activeTableTab}
                    selectAction={setActionsModal}
                    isActive={isActionsActive}
                    setIsActive={setIsActionsActive}
                />

                <Box className={styles.tabsScrollContainer}>
                    <Tabs.Root
                        value={activeTableTab}
                        mb={6}
                        onValueChange={(e) => handleTableTabChange(e.value as TableTab)}
                        variant="plain"
                    >
                        <Tabs.List>
                            <Tabs.Trigger
                                value="all"
                                borderRadius="0"
                                borderBottom="2px solid rgba(226, 232, 240, 1)"
                                _selected={{ color: '#4299E1', border: 'none', borderBottom: '2px solid #4299E1' }}
                            >
                                Все кандидаты{' '}
                                <Tag.Root colorPalette="blue" variant="solid" bg="rgba(66, 153, 225, 1)">
                                    <Tag.Label className={styles.tagLabel}>
                                        {formatNumber(counterCandidates?.all)}
                                    </Tag.Label>
                                </Tag.Root>
                            </Tabs.Trigger>
                            <Tabs.Trigger
                                value="awaiting"
                                borderRadius="0"
                                borderBottom="2px solid rgba(226, 232, 240, 1)"
                                _selected={{ color: '#4299E1', border: 'none', borderBottom: '2px solid #4299E1' }}
                            >
                                Ожидают разбора{' '}
                                <Tag.Root colorPalette="cyan" variant="solid" bg="rgba(11, 197, 234, 1)">
                                    <Tag.Label className={styles.tagLabel}>
                                        {formatNumber(counterCandidates?.awaiting)}
                                    </Tag.Label>
                                </Tag.Root>
                            </Tabs.Trigger>
                            <Tabs.Trigger
                                value="reject"
                                borderRadius="0"
                                borderBottom="2px solid rgba(226, 232, 240, 1)"
                                _selected={{ color: '#4299E1', border: 'none', borderBottom: '2px solid #4299E1' }}
                            >
                                Отказ{' '}
                                <Tag.Root colorPalette="red" variant="solid" bg="rgba(245, 101, 101, 1)">
                                    <Tag.Label className={styles.tagLabel}>
                                        {formatNumber(counterCandidates?.reject)}
                                    </Tag.Label>
                                </Tag.Root>
                            </Tabs.Trigger>
                            <Tabs.Trigger
                                value="invitation"
                                borderRadius="0"
                                borderBottom="2px solid rgba(226, 232, 240, 1)"
                                _selected={{ color: '#4299E1', border: 'none', borderBottom: '2px solid #4299E1' }}
                            >
                                Прошедшие скоринг{' '}
                                <Tag.Root
                                    colorPalette="yellow"
                                    variant="solid"
                                    bg="rgba(236, 201, 75, 1)"
                                    color="white"
                                >
                                    <Tag.Label className={styles.tagLabel}>
                                        {formatNumber(counterCandidates?.invitation)}
                                    </Tag.Label>
                                </Tag.Root>
                            </Tabs.Trigger>
                            <Tabs.Trigger
                                value="ai_bot"
                                borderRadius="0"
                                borderBottom="2px solid rgba(226, 232, 240, 1)"
                                _selected={{ color: '#4299E1', border: 'none', borderBottom: '2px solid #4299E1' }}
                            >
                                Чат-интервью{' '}
                                <Tag.Root
                                    colorPalette="purple"
                                    variant="solid"
                                    bg="rgba(124, 58, 237, 1)"
                                    color="white"
                                >
                                    <Tag.Label className={styles.tagLabel}>
                                        {formatNumber(counterCandidates?.ai_bot)}
                                    </Tag.Label>
                                </Tag.Root>
                            </Tabs.Trigger>
                            <Tabs.Trigger
                                value="scoring"
                                borderRadius="0"
                                borderBottom="2px solid rgba(226, 232, 240, 1)"
                                _selected={{ color: '#4299E1', border: 'none', borderBottom: '2px solid #4299E1' }}
                            >
                                Видеоинтервью{' '}
                                <Tag.Root colorPalette="teal" variant="solid" bg="rgba(56, 178, 172, 1)">
                                    <Tag.Label className={styles.tagLabel}>
                                        {formatNumber(counterCandidates?.average_answers_rating)}
                                    </Tag.Label>
                                </Tag.Root>
                            </Tabs.Trigger>
                            <Tabs.Trigger
                                value="crash"
                                borderRadius="0"
                                borderBottom="2px solid rgba(226, 232, 240, 1)"
                                _selected={{ color: '#4299E1', border: 'none', borderBottom: '2px solid #4299E1' }}
                            >
                                Неполное интервью{' '}
                                <Tag.Root colorPalette="orange" variant="solid" bg="rgba(237, 137, 54, 1)">
                                    <Tag.Label className={styles.tagLabel}>
                                        {formatNumber(counterCandidates?.crash)}
                                    </Tag.Label>
                                </Tag.Root>
                            </Tabs.Trigger>
                        </Tabs.List>
                    </Tabs.Root>
                </Box>

                <Box position={'relative'}>
                    {isFetching && (
                        <Flex
                            position="absolute"
                            top="0"
                            left="0"
                            right="0"
                            bottom="0"
                            bg="rgba(255, 255, 255, 0.6)"
                            zIndex="10"
                            transition="opacity 0.2s ease-in-out"
                        />
                    )}

                    <Table.ScrollArea maxW="100%" className={styles.contentScrollContainer}>
                        <Table.Root size="md">
                            {/* Ручной рендеринг заголовка из Actual для сохранения логики сортировки + Чекбокс */}
                            <Table.Header>
                                <Table.Row>
                                    {isActionsActive && (
                                        <Table.ColumnHeader width="56px">
                                            <Checkbox.Root
                                                checked={selectedCandidates.length === perPage && candidates.length > 0}
                                                onCheckedChange={() => handleSelectAll()}
                                            >
                                                <Checkbox.HiddenInput />
                                                <Checkbox.Control />
                                            </Checkbox.Root>
                                        </Table.ColumnHeader>
                                    )}
                                    {tableTabs.map((item) => {
                                        if (item === 'Дата отклика') {
                                            const tabTitle = activeTableTab === 'scoring' ? 'Дата интервью' : item;
                                            const sortType =
                                                activeTableTab === 'scoring'
                                                    ? 'candidate_interviews__code_expires_at'
                                                    : 'create_date';
                                            return (
                                                <Table.ColumnHeader key={item} onClick={() => handleSort(sortType)}>
                                                    <SortHeader title={tabTitle} ordering={ordering} sortType={sortType} />
                                                </Table.ColumnHeader>
                                            );
                                        }
                                        if (item === 'Релевантность резюме') {
                                            return (
                                                <Table.ColumnHeader
                                                    key={item}
                                                    onClick={() => handleSort('resume__metrics__score')}
                                                >
                                                    <SortHeader
                                                        title={item}
                                                        ordering={ordering}
                                                        sortType="resume__metrics__score"
                                                    />
                                                </Table.ColumnHeader>
                                            );
                                        }
                                        if (item === 'Видеоинтервью') {
                                            if (hiddenInterviewColumn) return null;
                                            return (
                                                <Table.ColumnHeader
                                                    key={item}
                                                    onClick={() => handleSort('candidate_interviews__average_answers_rating')}
                                                >
                                                    <SortHeader
                                                        title={item}
                                                        ordering={ordering}
                                                        sortType="candidate_interviews__average_answers_rating"
                                                    />
                                                </Table.ColumnHeader>
                                            );
                                        }
                                        if (item === 'Чат-интервью') {
                                            return (
                                                <Table.ColumnHeader
                                                    key={item}
                                                    onClick={() => handleSort('chat_bot__score')}
                                                >
                                                    <SortHeader
                                                        title={item}
                                                        ordering={ordering}
                                                        sortType="chat_bot__score"
                                                    />
                                                </Table.ColumnHeader>
                                            );
                                        }
                                        if (item === 'Действия' && hiddenActionsColumn) return null;
                                        return (
                                            <Table.ColumnHeader key={item}>
                                                <Text fontWeight="semibold">{item}</Text>
                                            </Table.ColumnHeader>
                                        );
                                    })}
                                </Table.Row>
                            </Table.Header>
                            
                            {/* Body от Feature (поддерживает чекбоксы), но с пропсами от Actual (поддерживает модалки) */}
                            <CandidatesTableBody
                                candidates={candidates}
                                activeTableTab={activeTableTab}
                                searchTab={searchTab}
                                isOutboundAvailable={isOutboundAvailable}
                                onViewCandidate={handleViewCandidate}
                                onGetContact={handleGetContact}
                                onChatClick={handleCandidateChatClick}
                                // Bulk Actions props
                                isActionsActive={isActionsActive}
                                selectedCandidatesIndexes={selectedCandidates}
                                onSelectCandidate={handleSelectCandidate}
                                // Single Actions props (из Actual)
                                // onOpenDeleteCandidate={handleOpenDeleteCandidate}
                            />
                        </Table.Root>
                    </Table.ScrollArea>

                    {candidatesCount ? (
                        <Box display={isActionsActive ? 'none' : 'block'}>
                            <Pagination.Root
                                mt={6}
                                count={candidatesCount}
                                pageSize={perPage}
                                page={currentPage}
                                onPageChange={(e) => setPage(e.page)}
                            >
                                <ButtonGroup variant="ghost" size="sm">
                                    <Pagination.PrevTrigger asChild>
                                        <IconButton>
                                            <Image src="/icons/prevPage.svg" alt="Previous Page" width={36} height={36} />
                                        </IconButton>
                                    </Pagination.PrevTrigger>
                                    <Pagination.Items
                                        render={(page) => (
                                            <IconButton variant={{ base: 'ghost', _selected: 'outline' }}>
                                                {page.value}
                                            </IconButton>
                                        )}
                                    />
                                    <Pagination.NextTrigger asChild>
                                        <IconButton>
                                            <Image src="/icons/nextPage.svg" alt="Next Page" width={36} height={36} />
                                        </IconButton>
                                    </Pagination.NextTrigger>
                                </ButtonGroup>
                            </Pagination.Root>
                        </Box>
                    ) : null}
                </Box>
            </Box>

            {/* Modals */}
            <AddCandidateModal
                open={addCandidateModal}
                setIsOpen={setAddCandidateModal}
                vacancyId={vacancyId}
                vacancySkills={vacancySkills}
                vacancyRequiredWorkExperience={vacancyRequiredWorkExperience}
                onAdd={handleCandidateAdded}
            />

            {candidateInfo && (
                <Dialog.Root
                    lazyMount
                    open={candidateInfoModal}
                    onOpenChange={(e) => setCandidateInfoModal(e.open)}
                >
                    <CandidateInfoModal
                        {...candidateInfo}
                        vacancyId={vacancyId}
                        onClose={() => setCandidateInfoModal(false)}
                    />
                </Dialog.Root>
            )}

            {/* Modal for Single Action (Delete) */}
            <ConfirmedModal
                title="Удалить кандидата"
                text={
                    candidateToDelete
                        ? `Вы точно хотите удалить кандидата ${candidateName(
                                candidateToDelete.last_name,
                                candidateToDelete.first_name
                          )}?`
                        : 'Вы точно хотите удалить кандидата?'
                }
                buttonConfirmText="Да"
                buttonCancelText="Нет"
                isOpen={isDeleteModalOpen}
                onClose={handleCloseDeleteCandidate}
                action={handleConfirmDeleteCandidate}
            />

            {/* Modal for Bulk Actions */}
            <ActionConfirmModal
                isOpen={actionsModal !== 'none'}
                setIsOpen={(isOpen) => !isOpen && setActionsModal('none')}
                candidates={selectedCandidatesList}
                action={actionsModal}
                onConfirm={handleConfirmAction}
            />
        </>
    );
};