import { Candidate } from '@/store/types';
import { formatDateTimeShortYear } from '@/utils/formatDate';
import {
	candidateName,
	commonPersonalLink,
	getCandidateStatusData,
	truncateText,
} from '../../lib/helpers';
import { getChatBotScore, getResumeScore } from '@/utils/chat_bot_score';
import { Box, Flex, Table, Tag, Clipboard } from '@chakra-ui/react';
import { COLORS } from '@/constants/colors';
import { Tooltip } from '@/components/ui/tooltip';

import Image from 'next/image';
import styles from './style.module.scss';
import { TableTab } from '../CandidatesTabs/types';
import { memo } from 'react';

interface Props {
	index: number;
	candidate: Candidate;
	isAwaiting: boolean;
	activeTableTab: TableTab;
	searchTab: 'incoming' | 'outbound';
	isOutboundAvailable: boolean;
	isActionsActive: boolean;
	isSelected: boolean;

	onViewCandidate: (id: string) => void;
	onGetContact: (id: string) => void;
	onOpenDeleteCandidate: (candidate: Candidate) => void;
	onChatClick: (candidate: Candidate) => void;

	onSelectCandidate: (index: number) => void;
}

// Добавьте этот компонент в начале файла (перед CandidatesTable)
export const CandidateTableRow = memo(
	function CandidateTableRow({
		index,
		candidate,
		isAwaiting,
		activeTableTab,
		searchTab,
		isOutboundAvailable,
		onViewCandidate,
		onGetContact,
		onChatClick,
		// Новые пропсы
		isActionsActive,
		isSelected,
		onSelectCandidate,
	}: Props) {
		const candidateStatus = getCandidateStatusData(candidate);
		const candidateChatBotStatus = getChatBotScore(candidate.chat_interview?.score || 0);
		const candidateResumeStatus = getResumeScore(candidate.resume?.metrics?.score || 0);

		const handleRowClick = (e: React.MouseEvent) => {
			const target = e.target as HTMLElement;
			const isCheckbox = target.tagName === 'INPUT' && target.getAttribute('type') === 'checkbox';
			const isActionsClick =
				target.closest('.actions') ||
				target.closest('[class*="Tooltip"]') ||
				target.closest('button') ||
				target.closest('img') ||
				isCheckbox;

			if (!isActionsClick) {
				if (isActionsActive) {
					// В режиме действий - выбираем кандидата
					onSelectCandidate(index);
				} else if (!isAwaiting) {
					// В обычном режиме - открываем просмотр
					onViewCandidate(candidate.id);
				}
			}
		};

		const handleCheckboxClick = (e: React.ChangeEvent) => {
			e.stopPropagation();
			onSelectCandidate(index);
		};

		console.log('Render');

		return (
			<Table.Row key={candidate.id} className={styles.tableRow} onClick={handleRowClick}>
				{isActionsActive && (
					<Table.Cell width="40px" textAlign="center" onClick={(e) => e.stopPropagation()}>
						<Flex justify="center">
							<input
								type="checkbox"
								checked={isSelected}
								onChange={handleCheckboxClick}
								style={{ cursor: 'pointer' }}
							/>
						</Flex>
					</Table.Cell>
				)}
				{/* Дата */}
				<Table.Cell style={{ whiteSpace: 'nowrap' }} color={COLORS.GRAY_600}>
					{activeTableTab === 'scoring'
						? formatDateTimeShortYear(candidate.candidate_interview?.code_expires_at)
						: formatDateTimeShortYear(candidate.create_date)}
				</Table.Cell>

				{/* ФИО с Tooltip */}
				<Tooltip
					positioning={{ placement: 'top' }}
					showArrow
					content={`${candidate.last_name || ''} ${candidate.first_name || ''} ${candidate.middle_name || ''}`.trim()}
					openDelay={300}
					closeDelay={0}
				>
					<Table.Cell style={{ whiteSpace: 'nowrap' }} color={COLORS.GRAY_600}>
						{candidateName(candidate.last_name, candidate.first_name, 20)}
					</Table.Cell>
				</Tooltip>

				{/* Город с Tooltip */}
				<Tooltip
					positioning={{ placement: 'top' }}
					showArrow
					content={candidate.area || '-'}
					openDelay={300}
					closeDelay={0}
				>
					<Table.Cell style={{ whiteSpace: 'nowrap' }} color={COLORS.GRAY_600}>
						{truncateText(candidate.area, 15)}
					</Table.Cell>
				</Tooltip>

				{/* Email с Tooltip */}
				{/* <Tooltip
					positioning={{ placement: 'top' }}
					showArrow
					content={candidate.email || '-'}
					openDelay={300}
					closeDelay={0}
				>
					<Table.Cell style={{ whiteSpace: 'nowrap' }} color={COLORS.GRAY_600}>
						{truncateText(candidate.email, 20)}
					</Table.Cell>
				</Tooltip> */}

				{/* Телефон */}
				{/* <Table.Cell style={{ whiteSpace: 'nowrap' }} color={COLORS.GRAY_600}>
					{candidate.phone}
				</Table.Cell> */}

				{/* Релевантность резюме */}
				<Table.Cell style={{ whiteSpace: 'nowrap' }} color={COLORS.GRAY_600}>
					{candidate.resume?.metrics?.score != null ? (
						<Tag.Root color="white" bg={candidateResumeStatus.bg} size="lg">
							<Tag.Label>{candidateResumeStatus.title}</Tag.Label>
						</Tag.Root>
					) : (
						'-'
					)}
				</Table.Cell>

				{/* Статус */}
				<Table.Cell style={{ whiteSpace: 'nowrap' }} color={COLORS.GRAY_600}>
					{candidateStatus.title ? (
						<Tag.Root color="white" bg={candidateStatus.bg} size="lg">
							<Tag.Label>{candidateStatus.title}</Tag.Label>
						</Tag.Root>
					) : (
						'-'
					)}
				</Table.Cell>

				{/* Чат-интервью */}
				<Table.Cell style={{ whiteSpace: 'nowrap' }} color={COLORS.GRAY_600}>
					{candidate.chat_interview?.approve != undefined || candidate.chat_interview?.approve != null ? (
						<Tag.Root color="white" bg={candidateChatBotStatus.bg} size="lg">
							<Tag.Label>{candidateChatBotStatus.title}</Tag.Label>
						</Tag.Root>
					) : (
						'-'
					)}
				</Table.Cell>

				{/* Рейтинг интервью */}
				{activeTableTab !== 'ai_bot' && (
					<Table.Cell textAlign="start" color={COLORS.GRAY_600}>
						{candidate.candidate_interview?.average_answers_rating || '-'}
					</Table.Cell>
				)}

				{/* Источник с Tooltip */}
				<Tooltip
					positioning={{ placement: 'top' }}
					showArrow
					content={candidate.source || '—'}
					openDelay={300}
					closeDelay={0}
				>
					<Table.Cell style={{ whiteSpace: 'nowrap' }} color={COLORS.GRAY_600}>
						{truncateText(candidate.source, 15)}
					</Table.Cell>
				</Tooltip>

				{/* Действия (кликабельная область отключена) */}
				{activeTableTab !== 'awaiting' && (
					<Table.Cell
						textAlign="center"
						onClick={(e) => e.stopPropagation()} // Останавливаем всплытие клика
					>
						<Box className={styles.actions}>
							{searchTab == 'outbound' &&
								isOutboundAvailable &&
								!(candidate.email || candidate.phone) && (
									<Flex w="32px" h="32px" alignItems={'center'} justifyContent="center">
										<Tooltip
											positioning={{ placement: 'top' }}
											showArrow
											key="getContact"
											content="Раскрыть контакт"
											openDelay={0}
											closeDelay={0}
										>
											<Image
												src="/icons/profile.svg"
												alt={'Раскрыть контакт'}
												onClick={(e) => {
													e.stopPropagation();
													onGetContact(candidate.id);
												}}
												height={13}
												width={13}
												className={styles.hoverDarken}
											/>
										</Tooltip>
									</Flex>
								)}
							{!isAwaiting && (
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
										onClick={(e) => {
											e.stopPropagation();
											onViewCandidate(candidate.id);
										}}
										height={16}
										width={16}
										className={styles.hoverDarken}
									/>
								</Tooltip>
							)}
							<Clipboard.Root value={commonPersonalLink(candidate.id)}>
								<Tooltip
									positioning={{ placement: 'top' }}
									showArrow
									key="copyLink"
									content={'Личная ссылка'}
									openDelay={0}
									closeDelay={0}
								>
									<Clipboard.Trigger asChild>
										<Clipboard.Indicator>
											<Image
												src="/icons/selfLink.svg"
												alt={'Личная ссылка'}
												// onClick={(e) => e.stopPropagation()}
												height={16}
												width={16}
												className={styles.hoverDarken}
											/>
										</Clipboard.Indicator>
									</Clipboard.Trigger>
								</Tooltip>
							</Clipboard.Root>
							{/* <Tooltip
							positioning={{ placement: 'top' }}
							showArrow
							key="deleteCandidate"
							content="Удалить кандидата"
							openDelay={0}
							closeDelay={0}
						>
							<Image
								src="/icons/IoTrashBin.svg"
								alt={'Удалить кандидата'}
								onClick={(e) => {
									e.stopPropagation();
									onOpenDeleteCandidate(candidate);
								}}
								height={16}
								width={16}
								className={styles.hoverDarken}
							/>
						</Tooltip> */}
							{candidate.chat && (
								<Tooltip
									positioning={{ placement: 'top' }}
									showArrow
									key="chatWithCandidates"
									content="Открыть чат с кандидатом"
									openDelay={0}
									closeDelay={0}
								>
									<Image
										src="/icons/dark_message.svg"
										alt={'Открыть чат с кандидатом'}
										onClick={(e) => {
											e.stopPropagation();
											onChatClick(candidate);
										}}
										height={16}
										width={16}
										className={styles.hoverDarken}
									/>
								</Tooltip>
							)}
						</Box>
					</Table.Cell>
				)}
			</Table.Row>
		);
	}
);
