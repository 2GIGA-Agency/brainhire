import React, { memo } from 'react';
import { Flex, Table, Text } from '@chakra-ui/react';
import { SortHeader } from '@/components/shared/SortHeader';
import { Ordering } from '@/components/shared/SortHeader/types';
import { TableTab } from '../CandidatesTabs/types';
import { tableTabs } from '../../lib/consts';

interface Props {
	activeTableTab: TableTab;
	ordering: Ordering;
	isActionsActive: boolean;
	isAllSelected: boolean;
	onSelectAll: () => void;
	onSort: (sortName: string) => void;
}

const CandidatesTableHeaderComponent = ({
	activeTableTab,
	ordering,
	isActionsActive,
	isAllSelected,
	onSelectAll,
	onSort,
}: Props) => {
	const handleSortClick = (sortType: string) => {
		onSort(sortType);
	};

	return (
		<Table.Header>
			<Table.Row>
				{isActionsActive && (
					<Table.ColumnHeader
						width="40px"
						textAlign="center"
						onClick={(e) => {
							e.stopPropagation();
							onSelectAll();
						}}
						style={{ cursor: 'pointer' }}
					>
						<Flex justify="center">
							<input
								type="checkbox"
								checked={isAllSelected}
								onChange={onSelectAll}
								onClick={(e) => e.stopPropagation()}
								style={{ cursor: 'pointer' }}
							/>
						</Flex>
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
							<Table.ColumnHeader key={item} onClick={() => handleSortClick(sortType)}>
								<SortHeader title={tabTitle} ordering={ordering} sortType={sortType} />
							</Table.ColumnHeader>
						);
					}
					if (item === 'Интервью') {
						return (
							<Table.ColumnHeader
								key={item}
								onClick={() => handleSortClick('candidate_interviews__average_answers_rating')}
							>
								<SortHeader
									title={item}
									ordering={ordering}
									sortType="candidate_interviews__average_answers_rating"
								/>
							</Table.ColumnHeader>
						);
					}
					if (item === 'Действия' && activeTableTab === 'awaiting') return null;
					return (
						<Table.ColumnHeader key={item}>
							<Text fontWeight="semibold">{item}</Text>
						</Table.ColumnHeader>
					);
				})}
			</Table.Row>
		</Table.Header>
	);
};

export const CandidatesTableHeader = memo(CandidatesTableHeaderComponent);
