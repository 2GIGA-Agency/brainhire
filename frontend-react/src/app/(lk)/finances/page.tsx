'use client';

import { Block } from '@/components/shared/Block';
import { ContentSpinner } from '@/components/shared/ContentSpinner';
import { LkButton } from '@/components/shared/LkButton';
import { SearchBlock } from '@/app/(lk)/vacancy/components/SearchBlock';
import { Typo } from '@/components/shared/Typo/Typo';
import { COLORS } from '@/constants/colors';
import { selectIsPaid, toggleIsPaid } from '@/store/slices/financesFlow/financesFlowSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { toaster } from '@/components/ui/toaster';
import { Tooltip } from '@/components/ui/tooltip';
import { formatDate } from '@/utils/formatDate';
import { debounce } from '@/utils/debounce';
import axios from '@/utils/axios';
import { Box, Flex, Table, Tabs } from '@chakra-ui/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { MdOutlineFileDownload } from 'react-icons/md';
import styles from './Finances.module.scss';
import { useSorting } from '@/hooks/useSorting'; // Импортируем наш хук
import { Company } from '../companies/page';
import { SortHeader } from '@/components/shared/SortHeader';

const tabs: { name: string; key: keyof Invoices; actions: ('view' | 'edit' | 'pay' | 'save')[] }[] =
	[
		{ name: 'Черновик', key: 'draft', actions: ['view', 'edit', 'pay'] },
		{ name: 'На оплате', key: 'issued', actions: ['view', 'save'] },
		{ name: 'Оплачен', key: 'paid', actions: ['view', 'save'] },
		{ name: 'Отказ', key: 'declined', actions: ['view'] },
	];

const headers = [
	{ label: 'Дата создания', value: 'created_at' },
	{ label: 'Дата оплаты', value: 'paid_at' },
	{ label: 'Наименование пакета', value: 'service_name' },
	{ label: 'Сумма в рублях', value: 'price_total' },
	{ label: 'Плательщик', value: 'payer' },
	{ label: 'Получатель', value: 'receiver', noSort: true },
	{ label: 'Создатель', value: 'creator_full_name' },
	{ label: 'Действия', value: 'actions', noSort: true },
];

const actions = {
	view: {
		icon: <Image alt="view" src={'/icons/HiEye.svg'} width={15} height={15} />,
		tooltipText: 'Посмотреть',
	},
	pay: {
		icon: <Image alt="pay" src={'/icons/IoCard.svg'} width={15} height={15} />,
		tooltipText: 'На оплату',
	},
	edit: {
		icon: <Image alt="edit" src={'/icons/HiPencil.svg'} width={15} height={15} />,
		tooltipText: 'Редактировать',
	},
	save: {
		icon: <MdOutlineFileDownload className={styles.icon} color="#ccc" />,
		tooltipText: 'Сохранить в PDF',
	},
};

export interface Invoice {
	created_at: string;
	creator: number;
	creator_full_name: string;
	id: string;
	nds: string;
	paid_at: string | null;
	price_total: string;
	receiver: string; // Это ID компании-плательщика
	receiver_inn: number;
	service_name: string;
	status: 'draft' | 'issued' | 'paid' | 'declined';
	token_amount: number;
	token_price: string;
}

interface Invoices {
	draft: Invoice[];
	issued: Invoice[];
	paid: Invoice[];
	declined: Invoice[];
}

const Finances: React.FC = () => {
	const dispatch = useAppDispatch();
	const router = useRouter();

	const [isLoading, setIsLoading] = useState(true);
	const [currentTabKey, setCurrentTabKey] = useState<keyof Invoices>('draft');
	const [searchQuery, setSearchQuery] = useState('');

	const [allInvoices, setAllInvoices] = useState<Invoice[]>([]);
	const [companies, setCompanies] = useState<Company[]>([]);

	const isPaid = useAppSelector(selectIsPaid);

	// --- Логика управления данными (Фильтрация и Сортировка) ---

	// 1. Фильтрация по табам
	const tabFilteredInvoices = useMemo(() => {
		return allInvoices.filter((i) => i.status === currentTabKey);
	}, [allInvoices, currentTabKey]);

	// 2. Фильтрация по поиску
	const searchedInvoices = useMemo(() => {
		if (!searchQuery.trim()) {
			return tabFilteredInvoices;
		}
		const lowercasedQuery = searchQuery.toLowerCase();

		// Создаем Map для быстрого поиска названий компаний
		const companyMap = new Map(companies.map((c) => [c.id, c.company_name]));

		return tabFilteredInvoices.filter((invoice) => {
			const payerName = companyMap.get(invoice.receiver)?.toLowerCase() || '';

			return (
				invoice.service_name.toLowerCase().startsWith(lowercasedQuery) ||
				invoice.price_total.toString().startsWith(lowercasedQuery) ||
				invoice.creator_full_name.toLowerCase().startsWith(lowercasedQuery) ||
				payerName.startsWith(lowercasedQuery)
			);
		});
	}, [tabFilteredInvoices, searchQuery, companies]);

	// 3. Применение сортировки
	const {
		sortedData: showInvoices,
		ordering,
		handleSort,
	} = useSorting(searchedInvoices, { order: 'created_at', value: 0 }); // Сортировка по дате по убыванию

	// --- Функции и обработчики ---

	const fetchAllData = useCallback(async () => {
		setIsLoading(true);
		try {
			const [invoicesRes, companiesRes] = await Promise.all([
				axios.get<Invoice[]>('/api/finance/invoices/'),
				axios.get<Company[]>('/api/companies/'),
			]);
			setAllInvoices(invoicesRes.data);
			setCompanies(companiesRes.data);
		} catch (error) {
			console.error('Ошибка при загрузке данных:', error);
			toaster.error({ title: 'Не удалось загрузить данные' });
		} finally {
			setIsLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchAllData();
	}, [fetchAllData]);

	const handleSearchChange = useCallback(
		debounce(300, (value: string) => {
			setSearchQuery(value);
		}),
		[]
	);

	const handleTabChange = (tabKey: keyof Invoices) => {
		setCurrentTabKey(tabKey);
		setSearchQuery('');
	};

	const handleAction = async (action: string, invoice: Invoice) => {
		switch (action) {
			case 'view':
				router.push(`/finances/${invoice.id}`);
				break;
			case 'pay':
				const promise = axios
					.patch(`/api/finance/invoices/${invoice.id}/`, { status: 'issued' })
					.then(() => {
						fetchAllData(); // Перезагружаем все данные
						dispatch(toggleIsPaid()); // Для автоматического переключения таба
					});

				toaster.promise(promise, {
					success: { title: 'Счёт отправлен на оплату' },
					error: { title: 'Произошла ошибка, попробуйте позже...' },
					loading: { title: 'Отправка счёта на оплату...' },
				});
				break;
			case 'edit':
				router.push(`/finances/${invoice.id}/edit`);
				break;
			case 'save':
				window.open(`/invoice-pdf/${invoice.id}`, '_blank');
				break;
			default:
				console.warn(`Неизвестное действие: ${action}`);
		}
	};

	// Эффект для автоматического переключения таба после оплаты
	useEffect(() => {
		if (isPaid) {
			setCurrentTabKey('issued');
			dispatch(toggleIsPaid());
		}
	}, [isPaid, dispatch]);

	if (isLoading) {
		return <ContentSpinner />;
	}

	const currentTabInfo = tabs.find((t) => t.key === currentTabKey) || tabs[0];

	return (
		<Block
			heading={
				<Flex w="100%" justify="space-between" align="center">
					<SearchBlock
						key={currentTabKey}
						onChange={handleSearchChange}
						placeholder="Поиск по наименованию, сумме, плательщику"
						maxW="572px"
					/>
					<LkButton
						marginLeft="auto"
						icon={
							<Image
								src={'/icons/add.svg'}
								width={15}
								height={15}
								alt={'Plus'}
								style={{ marginTop: '1px' }}
							/>
						}
						onClick={() => router.push('finances/create')}
					>
						<Typo color={COLORS.WHITE} weight="semibold">
							Пополнить баланс
						</Typo>
					</LkButton>
				</Flex>
			}
		>
			<Tabs.Root
				className={styles.tabs}
				variant={'plain'}
				value={currentTabKey}
				onValueChange={(e) => handleTabChange(e.value as keyof Invoices)}
			>
				<Box className={styles.tabsScrollContainer}>
					<Tabs.List className={styles.tabsList}>
						{tabs.map((tab) => (
							<Tabs.Trigger
								key={tab.key}
								value={tab.key}
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
								{tab.name}
							</Tabs.Trigger>
						))}
					</Tabs.List>
				</Box>

				<Tabs.Content value={currentTabKey} key={currentTabKey}>
					<Table.ScrollArea className={styles.contentScrollContainer}>
						<Table.Root>
							<Table.Header>
								<Table.Row>
									{headers.map(({ label, value, noSort }) => (
										<Table.ColumnHeader
											key={value}
											onClick={() => !noSort && handleSort(value as keyof Invoice)}
											cursor={noSort ? 'default' : 'pointer'}
										>
											{noSort ? (
												<Typo weight="semibold">{label}</Typo>
											) : (
												<SortHeader sortType={value} ordering={ordering} title={label} />
											)}
										</Table.ColumnHeader>
									))}
								</Table.Row>
							</Table.Header>
							<Table.Body>
								{showInvoices.map((invoice) => (
									<Table.Row
										key={invoice.id}
										className={styles.rowHover}
										onClick={() => {
											handleAction('view', invoice);
										}}
									>
										<Table.Cell>{formatDate(invoice.created_at)}</Table.Cell>
										<Table.Cell>
											{(invoice.paid_at && formatDate(invoice.paid_at)) || '—'}
										</Table.Cell>
										<Table.Cell>{invoice.service_name}</Table.Cell>
										<Table.Cell>{invoice.price_total} ₽</Table.Cell>
										<Table.Cell>
											{companies.find((c) => c.id === invoice.receiver)?.company_name || '—'}
										</Table.Cell>
										<Table.Cell>ООО НДК</Table.Cell>
										<Table.Cell>{invoice.creator_full_name}</Table.Cell>
										<Table.Cell>
											<Flex alignItems="center" justifyContent="center" gap="8px">
												{currentTabInfo.actions.map((action) => {
													const actionDetails = actions[action];
													return (
														<Box
															onClick={(e) => {
																e.stopPropagation();
																handleAction(action, invoice);
															}}
															key={action}
															className={styles.hoverDarken}
															data-action-button="true"
														>
															<Tooltip
																showArrow
																openDelay={0}
																closeDelay={0}
																content={actionDetails.tooltipText}
																positioning={{ placement: 'top' }}
															>
																{actionDetails.icon}
															</Tooltip>
														</Box>
													);
												})}
											</Flex>
										</Table.Cell>
									</Table.Row>
								))}
							</Table.Body>
						</Table.Root>
					</Table.ScrollArea>
				</Tabs.Content>
			</Tabs.Root>
		</Block>
	);
};

export default Finances;
