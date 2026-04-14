'use client';

import { ContentSpinner } from '@/components/shared/ContentSpinner';
import styles from './style.module.scss';
import { Box, ButtonGroup, IconButton, Pagination, Table, Tabs, Tag, Text } from '@chakra-ui/react';
import { Block } from '@/components/shared/Block';
import { COLORS } from '@/constants/colors';
import { formatNumber } from '@/utils/formatNumber';

import { useGetPublicCandidatesListQuery } from '@/store/rtkQuery/api';
import { PublicCandidatesOrdering } from '@/store/rtkQuery/types/PublicPages';
import { candidateName } from '@/app/(lk)/vacancy/[id]/utils';

import Image from 'next/image';
import { ReactNode, useMemo, useState } from 'react';
import { formatDate } from '@/utils/formatDate';
import { Typo } from '@/components/shared/Typo/Typo';
import { Tooltip } from '@/components/ui/tooltip';
import { SortHeader } from '@/components/shared/SortHeader';
import { Ordering } from '@/components/shared/SortHeader/types';

const tableTabs = [
	{ title: 'Дата интервью', sortType: PublicCandidatesOrdering.CODE_EXPIRES_ASC },
	{ title: 'ФИ' },
	{ title: 'Видеоинтервью', sortType: PublicCandidatesOrdering.AVG_ANSWERS_ASC },
	{ title: 'Действия' },
];

interface Props {
	vacancyRootId: string;
}

const getAnswerRating = (rating?: string): ReactNode => {
	if (!rating) return '-';

	return rating;
};

export function CandidatesTable({ vacancyRootId }: Props) {
	const [page, setPage] = useState(1);
	const [ordering, setOrdering] = useState<Ordering>({ order: '', value: 0 });

	const queryOrderingParam = useMemo(() => {
		if (ordering.value === 0) {
			return undefined;
		}

		if (ordering.value === 1) {
			return `-${ordering.order}` as PublicCandidatesOrdering;
		}

		if (ordering.value === 2) {
			return ordering.order as PublicCandidatesOrdering;
		}

		return undefined;
	}, [ordering]);

	// 3. Передаем в хук наше новое производное значение
	const { data: paginatedCandidates, isLoading } = useGetPublicCandidatesListQuery({
		vacancyRootId,
		page,
		ordering: queryOrderingParam, // Используем производное значение
	});

	if (isLoading) {
		return <ContentSpinner />;
	}

	if (!paginatedCandidates) {
		return <h2>Не получилось получить кандидатов...</h2>;
	}

	const handleCandidateClick = (candidateId: string) => {
		const currentPath = window.location.pathname;
		const newUrl = `${currentPath}/${candidateId}`;
		window.open(newUrl, '_blank');
	};

	const handleSort = (sortName: string) => {
		setOrdering((prev) => ({
			order: sortName,
			value: prev.order === sortName ? (prev.value + 1) % 3 : 1,
		}));
		setPage(1);
	};

	return (
		<Block position={'relative'}>
			<Box className={styles.table}>
				<Box className={styles.tabsScrollContainer}>
					<Tabs.Root value="scoring" mb={6} defaultValue="all" variant="plain">
						<Tabs.List>
							<Tabs.Trigger
								value="scoring"
								borderRadius="0"
								borderBottomWidth="2px"
								borderStyle="solid"
								borderColor={COLORS.GRAY_200}
								_selected={{
									color: COLORS.BLUE_400,
									border: 'none',
									borderBottomWidth: '2px',
									borderBottomStyle: 'solid',
									borderBottomColor: COLORS.BLUE_400,
								}}
							>
								Видеоинтервью{' '}
								<Tag.Root colorPalette="teal" variant="solid" bg="rgba(56, 178, 172, 1)">
									<Tag.Label className={styles.tagLabel}>
										{formatNumber(paginatedCandidates.count)}
									</Tag.Label>
								</Tag.Root>
							</Tabs.Trigger>
						</Tabs.List>
					</Tabs.Root>
				</Box>
				<Table.ScrollArea maxW="100%" className={styles.contentScrollContainer}>
					<Table.Root size="md">
						<Table.Header>
							<Table.Row>
								{tableTabs.map((item) => {
									if (item.sortType) {
										return (
											<Table.ColumnHeader
												key={item.title}
												onClick={() => handleSort(item.sortType)}
											>
												<SortHeader
													title={item.title}
													ordering={ordering}
													sortType={item.sortType}
												/>
											</Table.ColumnHeader>
										);
									}

									return (
										<Table.ColumnHeader key={item.title}>
											<Text fontWeight="semibold">{item.title}</Text>
										</Table.ColumnHeader>
									);
								})}
							</Table.Row>
						</Table.Header>
						<Table.Body mb={4}>
							{paginatedCandidates.results.map((candidate) => (
								<Table.Row key={candidate.id}>
									<Table.Cell style={{ whiteSpace: 'nowrap' }}>
										<Typo color={COLORS.GRAY_600}>
											{formatDate(candidate.candidate_interview.code_expires_at)}
										</Typo>
									</Table.Cell>
									<Table.Cell
										style={{
											whiteSpace: 'nowrap',
											cursor: 'pointer',
											transition: 'color .2s ease',
										}}
										color="gray.600"
										_hover={{ color: COLORS.BLUE_400 }}
										onClick={() => handleCandidateClick(candidate.id)}
									>
										<Typo color={COLORS.GRAY_600} _hover={{ color: COLORS.BLUE_400 }}>
											{candidateName(candidate.last_name, candidate.first_name)}
										</Typo>
									</Table.Cell>

									<Table.Cell textAlign="start">
										<Typo color={COLORS.GRAY_600}>
											{getAnswerRating(candidate.candidate_interview?.average_answers_rating)}
										</Typo>
									</Table.Cell>
									<Table.Cell textAlign="center">
										<Tooltip
											positioning={{ placement: 'top' }}
											showArrow
											key="view"
											content="Посмотреть"
											openDelay={0}
											closeDelay={0}
										>
											<Image
												src="/icons/HiEye.svg"
												alt={'Посмотреть'}
												onClick={() => handleCandidateClick(candidate.id)}
												height={16}
												width={16}
												className={styles.hoverDarken}
											/>
										</Tooltip>
									</Table.Cell>
								</Table.Row>
							))}
						</Table.Body>
					</Table.Root>
				</Table.ScrollArea>
				<Pagination.Root
					mt={6}
					count={paginatedCandidates.count}
					pageSize={paginatedCandidates.per_page}
					page={page}
					onPageChange={(details) => setPage(details.page)}
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
		</Block>
	);
}
