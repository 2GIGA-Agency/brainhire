'use client';
import axios from 'axios';

import { ConfirmedModal } from '@/components/shared/ConfirmedModal';
import { ContentSpinner } from '@/components/shared/ContentSpinner';
import { toaster } from '@/components/ui/toaster';
import { Tooltip } from '@/components/ui/tooltip';
import { Avatar, Box, CloseButton, Dialog, Flex, Portal, Table, Tabs } from '@chakra-ui/react';
import Image from 'next/image';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styles from './Colleagues.module.scss';
import { LkButton } from '@/components/shared/LkButton';
import { COLORS } from '@/constants/colors';
import { Typo } from '@/components/shared/Typo/Typo';
import { Block } from '@/components/shared/Block';
import { SearchBlock } from '../vacancy/components/SearchBlock';
import { debounce } from '@/utils/debounce';
import { LkField } from '@/components/shared/LkField';
import { LkInput } from '@/components/shared/LkInput';

import { useSorting } from '@/hooks/useSorting';
import { normalizePhone } from '@/utils/normilize';
import { SortHeader } from '@/components/shared/SortHeader';

// Описываем колонки для удобного рендеринга и сортировки
const colleaguesTableColumns = [
	{ title: 'ФИО Коллеги', dataKey: 'last_name', isSortable: true },
	{ title: 'Email', dataKey: 'email', isSortable: true },
	{ title: 'Телефон', dataKey: 'phone', isSortable: false },
	{ title: 'Кто добавил', dataKey: 'created_by', isSortable: true },
	{ title: 'Фото', dataKey: 'photo', isSortable: false },
	{ title: 'Действия', dataKey: 'actions', isSortable: false },
];

export interface Colleague {
	id: string;
	first_name: string;
	last_name: string;
	email: string;
	phone: string;
	created_by: string;
	user_photo?: string;
	photo_url?: string;
	is_active: boolean;
}

const Colleagues: React.FC = () => {
	const [isLoading, setLoading] = useState(true);
	const [allColleagues, setAllColleagues] = useState<Colleague[]>([]);
	const [tabIndex, setTabIndex] = useState<'active' | 'inactive'>('active');
	const [searchQuery, setSearchQuery] = useState('');

	// Состояния для модального окна добавления
	const [addCollegueModal, setColleguesModal] = useState(false);
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [position, setPosition] = useState('');
	const addCandidateDisabledBtn = !email || !firstName || !lastName;

	// Состояния для модалки архивации/включения
	const [archiveModalOpen, setArchiveModalOpen] = useState(false);
	const [targetId, setTargetId] = useState<string>('');

	// --- Логика управления данными ---

	// 1. Фильтрация по табам (Активные / Архив)
	const tabFilteredColleagues = useMemo(() => {
		return allColleagues.filter((c) => (tabIndex === 'active' ? c.is_active : !c.is_active));
	}, [allColleagues, tabIndex]);

	// 2. Фильтрация по поисковому запросу
	const searchedColleagues = useMemo(() => {
		if (!searchQuery.trim()) {
			return tabFilteredColleagues;
		}
		const lowercasedQuery = searchQuery.toLowerCase();
		const normalizedQuery = normalizePhone(searchQuery);

		return tabFilteredColleagues.filter((c) => {
			// Поиск по email
			if (c.email.toLowerCase().startsWith(lowercasedQuery)) {
				return true;
			}

			// Поиск по ФИО в обоих порядках
			const fullName1 = `${c.last_name} ${c.first_name}`.toLowerCase();
			const fullName2 = `${c.first_name} ${c.last_name}`.toLowerCase();

			if (fullName1.startsWith(lowercasedQuery) || fullName2.startsWith(lowercasedQuery)) {
				return true;
			}

			if (c.phone && normalizedQuery) {
				if (
					c.phone.startsWith(lowercasedQuery) ||
					normalizePhone(c.phone).startsWith(normalizedQuery)
				) {
					return true;
				}
			}

			return false;
		});
	}, [tabFilteredColleagues, searchQuery]);

	// 3. Применение сортировки к отфильтрованным данным
	const {
		sortedData: showColleagues,
		ordering,
		handleSort,
	} = useSorting(searchedColleagues, { order: 'last_name', value: 0 });

	// --- Функции и обработчики ---

	const handleSearch = useCallback(
		debounce(300, (value: string) => {
			setSearchQuery(value);
		}),
		[]
	);

	const fetchColleagues = useCallback(() => {
		setLoading(true);
		axios
			.get<Colleague[]>('/api/profiles/colleagues/')
			.then((res) => {
				setAllColleagues(res.data);
			})
			.catch(() => toaster.error({ title: 'Не удалось загрузить коллег' }))
			.finally(() => setLoading(false));
	}, []);

	useEffect(() => {
		fetchColleagues();
	}, [fetchColleagues]);

	const clearAddColleagueForm = () => {
		setFirstName('');
		setLastName('');
		setEmail('');
		setPhone('');
		setPosition('');
	};

	const addColleague = () => {
		const promise = axios
			.post('/api/profiles/colleagues/', {
				email: email,
				first_name: firstName,
				last_name: lastName,
				phone: phone,
				professional_role: position,
			})
			.then(() => {
				fetchColleagues();
				setColleguesModal(false);
				clearAddColleagueForm();
			})
			.catch((error) => {
				const data = error?.response?.data;
				let message = 'Неизвестная ошибка';

				if (data?.email && Array.isArray(data.email) && data.email.length > 0) {
					message = data.email[0];
				} else if (typeof data?.error === 'string') {
					message = data.error;
				}

				throw new Error(message);
			});

		toaster.promise(promise, {
			loading: { title: 'Добавляем коллегу...' },
			success: { title: 'Коллега добавлен!' },
			error: (err: any) => ({
				title: 'Ошибка при добавлении коллеги',
				description: err.message,
			}),
		});
	};

	const handleArchive = async () => {
		const request =
			tabIndex === 'active'
				? axios.delete<void>(`/api/profiles/colleagues/${targetId}/`)
				: axios.post<void>(`/api/profiles/colleagues/${targetId}/activate/`);

		const fullPromise = request
			.then(() => fetchColleagues())
			.finally(() => {
				setArchiveModalOpen(false);
				setTargetId('');
			});

		toaster.promise(fullPromise, {
			loading: {
				title: tabIndex === 'active' ? 'Отключаем коллегу...' : 'Включаем коллегу...',
			},
			success: {
				title: tabIndex === 'active' ? 'Коллега отключён' : 'Коллега включён',
			},
			error: (err: any) => ({
				title: 'Ошибка',
				description: err?.response?.data?.error || 'Произошла неизвестная ошибка',
			}),
		});
	};

	const openArchiveModal = (id: string) => {
		setTargetId(id);
		setArchiveModalOpen(true);
	};

	if (isLoading) {
		return <ContentSpinner />;
	}

	const archiveActionText = tabIndex === 'active' ? 'отключить' : 'вернуть';
	const archiveTooltipText = tabIndex === 'active' ? 'Отключить' : 'Восстановить';

	return (
		<Block
			heading={
				<Flex justify="space-between" w="100%" alignItems={'center'}>
					<SearchBlock
						key={tabIndex}
						placeholder="Поиск по ФИО, email, телефону"
						onChange={handleSearch}
						maxW={'572px'}
					/>
					<LkButton
						bgColor={COLORS.BLUE_400}
						onClick={() => setColleguesModal(true)}
						icon={
							<Image
								src={'/icons/add.svg'}
								width={15}
								height={15}
								alt={'Plus'}
								style={{ marginTop: '1px' }}
							/>
						}
					>
						<Typo color={COLORS.WHITE} weight="semibold">
							Добавить коллегу
						</Typo>
					</LkButton>
				</Flex>
			}
		>
			<Tabs.Root
				value={tabIndex}
				mb={6}
				defaultValue={'active'}
				onValueChange={(e) => setTabIndex(e.value as 'active' | 'inactive')}
				variant="plain"
			>
				<Box className={styles.tabsScrollContainer}>
					<Tabs.List>
						<Tabs.Trigger
							value="active"
							borderRadius="0"
							borderBottom="2px solid"
							borderColor={COLORS.GRAY_200}
							fontWeight="500"
							_selected={{
								fontWeight: 600,
								color: COLORS.BLUE_400,
								border: 'none',
								borderColor: COLORS.BLUE_400,
								borderBottom: '2px solid ',
							}}
						>
							Активные аккаунты
						</Tabs.Trigger>
						<Tabs.Trigger
							value="inactive"
							borderRadius="0"
							borderBottom="2px solid"
							borderColor={COLORS.GRAY_200}
							fontWeight="500"
							_selected={{
								fontWeight: 600,
								color: COLORS.BLUE_400,
								border: 'none',
								borderColor: COLORS.BLUE_400,
								borderBottom: '2px solid ',
							}}
						>
							Архив
						</Tabs.Trigger>
					</Tabs.List>
				</Box>
			</Tabs.Root>
			<Table.ScrollArea maxW="100%" className={styles.contentScrollContainer}>
				<Table.Root size="md">
					<Table.Header>
						<Table.Row>
							{colleaguesTableColumns.map((column) => {
								if (column.isSortable) {
									return (
										<Table.ColumnHeader
											key={column.dataKey}
											onClick={() => handleSort(column.dataKey as keyof Colleague)}
											cursor="pointer"
										>
											<SortHeader
												title={column.title}
												ordering={ordering}
												sortType={column.dataKey}
											/>
										</Table.ColumnHeader>
									);
								}
								return (
									<Table.ColumnHeader key={column.dataKey}>
										<Typo color={COLORS.GRAY_800} weight="semibold">
											{column.title}
										</Typo>
									</Table.ColumnHeader>
								);
							})}
						</Table.Row>
					</Table.Header>
					<Table.Body mb={4}>
						{showColleagues.map((c) => (
							<Table.Row key={c.id}>
								<Table.Cell style={{ whiteSpace: 'nowrap' }}>
									<Typo color={COLORS.GRAY_600}>{`${c.last_name} ${c.first_name}`}</Typo>
								</Table.Cell>
								<Table.Cell style={{ whiteSpace: 'nowrap' }}>
									<Typo color={COLORS.GRAY_600}>{c.email}</Typo>
								</Table.Cell>
								<Table.Cell style={{ whiteSpace: 'nowrap' }}>
									<Typo color={COLORS.GRAY_600}>{c.phone || '—'}</Typo>
								</Table.Cell>
								<Table.Cell style={{ whiteSpace: 'nowrap' }}>
									<Typo color={COLORS.GRAY_600}>{c.created_by || '—'}</Typo>
								</Table.Cell>
								<Table.Cell style={{ whiteSpace: 'nowrap' }}>
									<Avatar.Root size="lg">
										<Avatar.Fallback name={`${c.first_name} ${c.last_name}`} />
										<Avatar.Image height="44px" width="44px" src={c?.photo_url} />
									</Avatar.Root>
								</Table.Cell>
								<Table.Cell textAlign="start">
									<Box className={styles.actions}>
										<Tooltip
											positioning={{ placement: 'top' }}
											showArrow
											key="archive-toggle"
											content={archiveTooltipText}
											openDelay={0}
											closeDelay={0}
										>
											<Image
												onClick={() => openArchiveModal(c.id)}
												src={'/icons/BsArchiveFill.svg'}
												alt={archiveTooltipText}
												height={16}
												width={16}
												className={styles.hoverDarken}
											/>
										</Tooltip>
									</Box>
								</Table.Cell>
							</Table.Row>
						))}
					</Table.Body>
				</Table.Root>
			</Table.ScrollArea>

			<ConfirmedModal
				isOpen={archiveModalOpen}
				onClose={() => setArchiveModalOpen(false)}
				title={`${archiveTooltipText} коллегу`}
				text={`Вы уверены, что хотите ${archiveActionText} коллегу?`}
				buttonConfirmText={`Да, ${archiveActionText}`}
				action={handleArchive}
			/>

			<Dialog.Root
				lazyMount
				open={addCollegueModal}
				onOpenChange={(e) => {
					if (!e.open) {
						setColleguesModal(false);
						clearAddColleagueForm();
					}
				}}
			>
				<Portal>
					<Dialog.Backdrop />
					<Dialog.Positioner>
						<Dialog.Content>
							<Dialog.Header>
								<Flex w="100%" align="center" justify="space-between">
									<Dialog.Title>
										<Typo weight="semibold">Добавление коллеги</Typo>
									</Dialog.Title>
									<CloseButton
										size="sm"
										onClick={() => {
											setColleguesModal(false);
											clearAddColleagueForm();
										}}
									/>
								</Flex>
							</Dialog.Header>
							<Dialog.Body>
								<LkField label="Фамилия коллеги" required>
									<LkInput
										placeholder="Введите фамилию коллеги"
										value={lastName}
										onChange={(e) => setLastName(e.target.value)}
									/>
								</LkField>

								<LkField label="Имя коллеги" required mt={4}>
									<LkInput
										placeholder="Введите имя коллеги"
										value={firstName}
										onChange={(e) => setFirstName(e.target.value)}
									/>
								</LkField>

								<LkField label="Электронная почта" required mt={4}>
									<LkInput
										placeholder="Введите электронную почту"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
									/>
								</LkField>

								<LkField label="Контактный номер" mt={4}>
									<LkInput
										placeholder="Введите номер коллеги"
										value={phone}
										onChange={(e) => setPhone(e.target.value)}
									/>
								</LkField>

								<LkField label="Должность" mt={4}>
									<LkInput
										placeholder="Введите должность"
										value={position}
										onChange={(e) => setPosition(e.target.value)}
									/>
								</LkField>
							</Dialog.Body>
							<Dialog.Footer>
								<Dialog.ActionTrigger asChild>
									<LkButton disabled={addCandidateDisabledBtn} onClick={addColleague}>
										Сохранить
									</LkButton>
								</Dialog.ActionTrigger>
							</Dialog.Footer>
						</Dialog.Content>
					</Dialog.Positioner>
				</Portal>
			</Dialog.Root>
		</Block>
	);
};

export default Colleagues;
