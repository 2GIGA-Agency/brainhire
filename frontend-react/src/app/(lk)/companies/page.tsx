'use client';
import axios from '@/utils/axios';

import { toaster } from '@/components/ui/toaster';
import { Tooltip } from '@/components/ui/tooltip';
import { Box, CloseButton, Dialog, Field, Flex, Portal, Table } from '@chakra-ui/react';
import Image from 'next/image';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styles from './Companies.module.scss';
import { ContentSpinner } from '@/components/shared/ContentSpinner';
import { LkButton } from '@/components/shared/LkButton';
import { COLORS } from '@/constants/colors';
import { Block } from '@/components/shared/Block';
import { SearchBlock } from '../vacancy/components/SearchBlock';
import { Typo } from '@/components/shared/Typo/Typo';
import { debounce } from '@/utils/debounce';
import { LkInput } from '@/components/shared/LkInput';
import { useSorting } from '@/hooks/useSorting';
import { SortHeader } from '@/components/shared/SortHeader';

const companyTableColumns = [
	{ title: 'Название компании', dataKey: 'company_name', isSortable: true },
	{ title: 'ИНН', dataKey: 'inn', isSortable: true },
	{ title: 'Действия', dataKey: 'actions', isSortable: false },
];

export interface Company {
	id: string;
	company_name: string;
	company_description: string;
	inn: number;
}

interface CompanyFormData {
	inn: string;
	description: string;
	id?: string;
}

const CompanyModal: React.FC<{
	isOpen: boolean;
	onClose: () => void;
	onSubmit: (data: CompanyFormData) => void;
	initialData?: CompanyFormData;
	title: string;
	submitText: string;
}> = ({ isOpen, onClose, onSubmit, initialData, title, submitText }) => {
	const [formData, setFormData] = useState<CompanyFormData>(
		initialData || { inn: '', description: '', id: '' }
	);

	useEffect(() => {
		if (initialData) {
			setFormData(initialData);
		}
	}, [initialData]);

	const handleSubmit = () => {
		onSubmit(formData);
		onClose();
	};

	const isFormValid = formData.inn && formData.description;

	return (
		<Dialog.Root lazyMount open={isOpen} onOpenChange={(e) => !e.open && onClose()}>
			<Portal>
				<Dialog.Backdrop />
				<Dialog.Positioner>
					<Dialog.Content>
						<Dialog.Header>
							<Flex w="100%" align="center" justify="space-between">
								<Typo color={COLORS.GRAY_800} size="18px" weight="semibold">
									{title}
								</Typo>
								<CloseButton size="sm" onClick={onClose} />
							</Flex>
						</Dialog.Header>
						<Dialog.Body>
							<Field.Root required mt={4}>
								<Field.Label>
									<Typo weight="medium" color={COLORS.GRAY_800}>
										ИНН{' '}
									</Typo>
									<Field.RequiredIndicator />
								</Field.Label>
								<LkInput
									placeholder="Введите ИНН компании"
									value={formData.inn}
									onChange={(e) => setFormData((prev) => ({ ...prev, inn: e.target.value }))}
								/>
							</Field.Root>
							<Field.Root required mt={4}>
								<Field.Label>
									<Typo weight="medium" color={COLORS.GRAY_800}>
										Описание компании
									</Typo>{' '}
									<Field.RequiredIndicator />
								</Field.Label>
								<LkInput
									as="textarea"
									placeholder="Введите описание компании"
									value={formData.description}
									onChange={(e) =>
										setFormData((prev) => ({ ...prev, description: e.target.value }))
									}
								/>
							</Field.Root>
						</Dialog.Body>
						<Dialog.Footer>
							<Dialog.ActionTrigger asChild>
								<LkButton disabled={!isFormValid} onClick={handleSubmit}>
									{submitText}
								</LkButton>
							</Dialog.ActionTrigger>
						</Dialog.Footer>
					</Dialog.Content>
				</Dialog.Positioner>
			</Portal>
		</Dialog.Root>
	);
};

const Companies: React.FC = () => {
	const [isLoading, setLoading] = useState(true);
	const [addCompanyModal, setCompanyModal] = useState(false);
	const [editCompanyModal, setEditCompanyModal] = useState(false);
	const [editCompany, setEditCompany] = useState<CompanyFormData>({
		inn: '',
		description: '',
		id: '',
	});

	// 1. Состояния для исходных данных и поискового запроса
	const [allCompanies, setAllCompanies] = useState<Company[]>([]);
	const [searchQuery, setSearchQuery] = useState('');

	// 2. Мемоизированная фильтрация компаний по поисковому запросу
	const filteredCompanies = useMemo(() => {
		if (!searchQuery.trim()) {
			return allCompanies;
		}
		const lowercasedQuery = searchQuery.toLowerCase();
		return allCompanies.filter(
			(i) =>
				i.company_name.toLowerCase().startsWith(lowercasedQuery) ||
				String(i.inn).startsWith(lowercasedQuery)
		);
	}, [allCompanies, searchQuery]);

	// 3. Применяем хук сортировки к отфильтрованным данным
	const {
		sortedData: showCompanies,
		ordering,
		handleSort,
	} = useSorting(filteredCompanies, { order: 'company_name', value: 0 }); // Сортировка по имени (asc) по умолчанию

	// 4. Обработчик поиска теперь просто обновляет состояние
	const handleSearchChange = useCallback(
		debounce(300, (value: string) => {
			setSearchQuery(value);
		}),
		[]
	);

	useEffect(() => {
		fetchCompanies();
	}, []);

	const fetchCompanies = () => {
		axios
			.get('/api/companies/')
			.then((res) => {
				setLoading(false);
				const data = res.data as Company[];
				setAllCompanies(data);
			})
			.catch(() => {
				setLoading(false);
			});
	};

	const handleCreateCompany = async (data: CompanyFormData) => {
		await axios
			.post('/api/companies/', {
				company_description: data.description,
				inn: data.inn,
			})
			.then(() => {
				fetchCompanies();
			})
			.catch((error) => {
				const backendMessage = error?.response?.data?.message || 'Неизвестная ошибка';
				throw new Error(backendMessage);
			});
	};

	const handleEditCompany = async (data: CompanyFormData) => {
		await axios
			.patch(`/api/companies/${data.id}/`, {
				id: data.id,
				company_description: data.description,
				inn: data.inn,
			})
			.then(() => {
				fetchCompanies();
			});
	};

	if (isLoading) {
		return <ContentSpinner />;
	}

	return (
		<Block
			heading={
				<Flex justifyContent={'space-between'} w="100%" alignItems="center" justify="end">
					<SearchBlock
						onChange={handleSearchChange}
						placeholder="Поиск по названию компании, ИНН"
						maxW="572px"
					/>
					<LkButton
						onClick={() => setCompanyModal(true)}
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
						<Typo weight="semibold" color={COLORS.WHITE}>
							Создать компанию
						</Typo>
					</LkButton>
				</Flex>
			}
		>
			<Table.ScrollArea maxW="100%" className={styles.contentScrollContainer}>
				<Table.Root size="md">
					<Table.Header>
						<Table.Row>
							{companyTableColumns.map((column) => {
								if (column.isSortable) {
									return (
										<Table.ColumnHeader
											key={column.dataKey}
											onClick={() => handleSort(column.dataKey as keyof Company)}
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
										<Typo weight="semibold" color={COLORS.GRAY_800}>
											{column.title}
										</Typo>
									</Table.ColumnHeader>
								);
							})}
						</Table.Row>
					</Table.Header>
					<Table.Body mb={4}>
						{showCompanies.map((company) => (
							<Table.Row key={company.id}>
								<Table.Cell>
									<Typo color={COLORS.GRAY_600}>{company.company_name}</Typo>
								</Table.Cell>
								<Table.Cell>
									<Typo color={COLORS.GRAY_600}>{company.inn}</Typo>
								</Table.Cell>
								<Table.Cell textAlign="start">
									<Box className={styles.actions}>
										<Tooltip
											positioning={{ placement: 'top' }}
											showArrow
											key="view"
											content="Редактировать"
											openDelay={0}
											closeDelay={0}
										>
											<Image
												onClick={() => {
													setEditCompany({
														id: company.id,
														description: company.company_description,
														inn: String(company.inn),
													});
													setEditCompanyModal(true);
												}}
												src="/icons/HiPencil.svg"
												alt={'Редактировать'}
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

			{/* Модальное окно создания компании */}
			<CompanyModal
				isOpen={addCompanyModal}
				onClose={() => setCompanyModal(false)}
				onSubmit={(data) =>
					toaster.promise(handleCreateCompany(data), {
						loading: { title: 'Создаем компанию...' },
						success: { title: 'Компания создана!' },
						error: (err: any) => ({
							title: 'Ошибка при создании компании',
							description: err.message,
						}),
					})
				}
				title="Создание компании"
				submitText="Создать"
			/>

			{/* Модальное окно редактирования компании */}
			<CompanyModal
				isOpen={editCompanyModal}
				onClose={() => setEditCompanyModal(false)}
				onSubmit={(data) =>
					toaster.promise(handleEditCompany(data), {
						success: { title: 'Компания отредактирована!' },
						error: { title: 'Возникла ошибка, попробуйте позже...' },
						loading: { title: 'Редактируем компанию...' },
					})
				}
				initialData={editCompany}
				title="Редактирование компании"
				submitText="Сохранить"
			/>
		</Block>
	);
};

export default Companies;
