import React, { memo } from 'react';
import { Table } from '@chakra-ui/react';
import { Typo } from '@/components/shared/Typo/Typo';
import { Candidate } from '@/store/types';
import { TableTab } from '../CandidatesTabs/types';
import { CandidateTableRow } from '../CandidatesTableRow';
import { tableTabs } from '../../lib/consts';
import { debugPropsComparison } from '@/utils/debugPropsComparison';

interface CandidatesTableBodyProps {
	candidates: Candidate[];
	activeTableTab: TableTab;
	searchTab: 'incoming' | 'outbound';
	isOutboundAvailable: boolean;
	isActionsActive: boolean;
	selectedCandidatesIndexes: number[];

	onViewCandidate: (id: string) => void;
	onGetContact: (candidateId: string) => void;
	onChatClick: (candidate: Candidate) => void;
	onSelectCandidate: (index: number) => void;
}

const CandidatesTableBodyComponent = ({
	candidates,
	activeTableTab,
	searchTab,
	isOutboundAvailable,
	isActionsActive,
	selectedCandidatesIndexes,
	onSelectCandidate,
	onViewCandidate,
	onGetContact,
	onChatClick,
}: CandidatesTableBodyProps) => {
	console.log('RENDER');

	if (candidates.length === 0) {
		return (
			<Table.Body mb={4}>
				<Table.Row h="555px">
					<Table.Cell colSpan={tableTabs.length} textAlign="center">
						<Typo weight="medium">Кандидаты не найдены</Typo>
					</Table.Cell>
				</Table.Row>
			</Table.Body>
		);
	}

	const isAwaiting = activeTableTab === 'awaiting';

	return (
		<Table.Body mb={4}>
			{candidates.map((candidate, index) => (
				<CandidateTableRow
					key={candidate.id}
					candidate={candidate}
					isAwaiting={isAwaiting}
					activeTableTab={activeTableTab}
					searchTab={searchTab}
					isOutboundAvailable={isOutboundAvailable}
					isActionsActive={isActionsActive}
					isSelected={selectedCandidatesIndexes.includes(index)}
					onSelectCandidate={onSelectCandidate}
					onViewCandidate={onViewCandidate}
					onGetContact={onGetContact}
					onChatClick={onChatClick}
					index={index}
				/>
			))}
		</Table.Body>
	);
};

export const CandidatesTableBody = memo(CandidatesTableBodyComponent);
