// src/app/(lk)/finances/components/FinanceForm.tsx

'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from '@/utils/axios';
import { Box, Flex, Image } from '@chakra-ui/react';

import { Block } from '@/components/shared/Block';
import { ContentSpinner } from '@/components/shared/ContentSpinner';
import { toaster } from '@/components/ui/toaster';
import { Company } from '@/store/types';
import { Invoice } from '@/app/(lk)/finances/page';
import { useAppDispatch } from '@/store/store';
import { toggleIsPaid } from '@/store/slices/financesFlow/financesFlowSlice';

import styles from './style.module.scss';
import { ResponsiveTable } from '../ResponsiveTable';
import { InvoiceToPay } from '../InvoiceToPay';
import InvoiceTable from '../InvoiceTable';
import { convertToWords, formatPrice } from '../../utils';
import { LkButton } from '@/components/shared/LkButton';
import { COLORS } from '@/constants/colors';
import { Typo } from '@/components/shared/Typo/Typo';
import { calculateVAT, getVatRateByDate } from '@/utils/vatCalculations';

type FinanceMode = 'create' | 'edit' | 'view';

interface FinanceFormProps {
	mode: FinanceMode;
	id?: string;
}

// Хардкод пакетов
const packs = [
	{ name: '1', price: 1 },
	{ name: '2', price: 0.95 },
	{ name: '3', price: 0.9 },
];

const getCurrentPack = (count: number) => {
	if (count <= 99_999) return packs[0]; // Тариф 1
	if (count <= 499_999) return packs[1]; // Тариф 2
	return packs[2]; // Тариф 3
};

export function FinanceForm({ mode, id }: FinanceFormProps) {
	const dispatch = useAppDispatch();
	const router = useRouter();

	const [invoice, setInvoice] = useState<Invoice | null>(null);
	const [companies, setCompanies] = useState<Company[]>([]);
	const [selectedCompany, setSelectedCompany] = useState<string[]>([]);
	const [selectedCount, setSelectedCount] = useState(mode === 'create' ? 1 : 0);
	const [isLoading, setIsLoading] = useState(true);
	const [selectedPack, setSelectedPack] = useState('1');

	// Флаги валидности полей
	const [companyInvalid, setCompanyInvalid] = useState(false);

	// Вычисляемые значения (для режимов create/edit)
	const currentPack = packs.find((pack) => pack.name === selectedPack);
	const price = currentPack?.price || 1;
	const summary = price * (selectedCount || 0);

	// Ставка НДС
	const vatRate = invoice?.created_at
		? getVatRateByDate(invoice.created_at)
		: getVatRateByDate(new Date()); // Для новых счетов используем текущую дату
	const nds = calculateVAT(summary, vatRate);

	// Эффект для загрузки данных в зависимости от режима
	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true);
			try {
				const companiesResponse = await axios.get<Company[]>('/api/companies/');
				const fetchedCompanies = companiesResponse.data;
				setCompanies(fetchedCompanies);

				if ((mode === 'edit' || mode === 'view') && id) {
					const invoiceResponse = await axios.get<Invoice>(`/api/finance/invoices/${id}/`);
					const fetchedInvoice = invoiceResponse.data;
					setInvoice(fetchedInvoice);

					const receiverName =
						fetchedCompanies.find((c) => c.id === fetchedInvoice.receiver)?.company_name || '';
					setSelectedCompany([receiverName]);
					setSelectedCount(fetchedInvoice.token_amount);
				}
			} catch (error) {
				console.error('Ошибка при загрузке данных:', error);
				toaster.error({ title: 'Не удалось загрузить данные' });
			} finally {
				setIsLoading(false);
			}
		};

		fetchData();
	}, [mode, id]);

	// Обработчик ввода (только для create/edit)
	const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		const numericValue = e.target.value.replace(/\D/g, '');
		if (parseInt(numericValue) > 999_999_999) {
			toaster.error({ title: 'Максимальная сумма 999 999 999' });
			return;
		}
		const newCount = numericValue ? parseInt(numericValue, 10) : 0;
		setSelectedCount(newCount);

		// Автоматически выбираем тариф на основе введённого количества
		const pack = getCurrentPack(newCount);
		setSelectedPack(pack.name);
	};

	// Функция сохранения (для create/edit)
	const handleSave = async () => {
		const company = companies.find((c) => c.company_name === selectedCompany[0]);
		if (!company) {
			toaster.error({ title: 'Выберите компанию-получателя' });
			setCompanyInvalid(true);
			return;
		}

		if (selectedCount === 0) {
			toaster.error({
				title: 'Некорректное число токентов',
				description: 'Число токентов должно быть больше 0',
			});
			return;
		}

		const payload = {
			receiver: company.id,
			token_amount: selectedCount,
			price_total: summary,
			token_price: price,
			nds: nds,
			service_name:
				'Право использования (лицензия) программного обеспечения "BRaiN HR", тарифный план Бизнес',
			status: 'draft',
		};

		const isEditMode = mode === 'edit';
		const promise = isEditMode
			? axios.put(`/api/finance/invoices/${id}/`, payload)
			: axios.post('/api/finance/invoices/', payload);

		toaster.promise(promise, {
			success: { title: isEditMode ? 'Счёт успешно изменён' : 'Счёт успешно создан' },
			error: { title: isEditMode ? 'Ошибка при изменении счёта' : 'Ошибка при создании счёта' },
			loading: { title: isEditMode ? 'Обновление счёта...' : 'Создание счёта...' },
		});

		try {
			await promise;
			setTimeout(() => router.push('/finances'), 2000);
		} catch (error) {
			console.error(error);
		}
	};

	// Функция для действий в режиме просмотра
	const handleViewAction = async () => {
		if (!invoice) return;

		if (invoice.status === 'draft') {
			const promise = axios.patch(`/api/finance/invoices/${invoice.id}/`, { status: 'issued' });
			toaster.promise(promise, {
				success: { title: 'Счёт отправлен на оплату' },
				error: { title: 'Произошла ошибка при отправке счёта' },
				loading: { title: 'Отправка счёта на оплату...' },
			});
			await promise;
			setTimeout(() => {
				router.push('/finances');
				dispatch(toggleIsPaid());
			}, 2000);
		} else {
			if (typeof window !== 'undefined') {
				window.open(`/invoice-pdf/${invoice.id}`, '_blank');
			}
		}
	};

	const handleChange = useCallback((e: string | string[]) => {
		if (typeof e === 'string') {
			setSelectedCompany([e]);
			setCompanyInvalid(false);
		}
	}, []);

	if (isLoading) {
		return <ContentSpinner />;
	}

	// Данные для отображения в зависимости от режима
	const displayData = {
		amount: mode === 'view' ? (invoice?.token_amount ?? 0) : selectedCount,
		price: mode === 'view' ? Number(invoice?.token_price) : price,
		summary: mode === 'view' ? Number(invoice?.price_total) : summary,
		nds: mode === 'view' ? Number(invoice?.nds) : nds,
	};

	const getButton = () => {
		if (mode === 'view') {
			return (
				<LkButton
					bg={invoice?.status === 'draft' ? COLORS.GREEN_400 : COLORS.BLUE_500}
					onClick={handleViewAction}
				>
					{invoice?.status === 'draft' ? 'На оплату' : 'Скачать PDF'}
				</LkButton>
			);
		}

		return (
			<LkButton onClick={handleSave}>
				{mode === 'edit' ? 'Сохранить изменения' : 'Пополнить'}
			</LkButton>
		);
	};

	return (
		<>
			<Block>
				<Box mb="20px">
					<Flex className={styles.receiverInfo}>
						<Box display="flex" alignItems="center" justifyContent="center">
							<Image
								src="/images/ndk.png"
								alt="Логотип"
								width={329}
								height={120}
								style={{ height: 'auto' }}
							/>
						</Box>
						<ResponsiveTable />
					</Flex>
					<Box mt="40px">
						<InvoiceToPay
							isCreate={mode === 'create'}
							invoiceId={invoice?.id}
							selected={selectedCompany}
							onChange={handleChange}
							invalid={companyInvalid}
							isReadOnly={mode === 'view'} // Делаем компонент нередактируемым в режиме просмотра
						/>
						<Box mt="32px">
							<InvoiceTable
								amount={displayData.amount}
								price={displayData.price}
								summary={displayData.summary}
								vatRate={vatRate}
								isEdit={mode !== 'view'} // Поле редактируется только в create/edit
								handleInput={handleInput}
							/>
						</Box>
						<Box textAlign="right" mt="24px">
							{/* Итого */}
							<Flex justifyContent="flex-end" alignItems="center" gap="8px">
								<Typo color={COLORS.GRAY_800} weight="medium">
									Итого:
								</Typo>
								<Typo color={COLORS.GRAY_800}>{formatPrice(displayData.summary)}</Typo>
							</Flex>

							{/* НДС */}
							<Flex justifyContent="flex-end" alignItems="center" gap="8px">
								<Typo color={COLORS.GRAY_800} weight="medium">
									В том числе НДС {vatRate}%:
								</Typo>
								<Typo color={COLORS.GRAY_800}>{formatPrice(displayData.nds)}</Typo>
							</Flex>

							{/* Всего наименований */}
							<Flex justifyContent="flex-start" mt="16px">
								<Typo color={COLORS.GRAY_800}>
									Всего наименований: 1, на сумму {formatPrice(displayData.summary)}
								</Typo>
							</Flex>

							{/* Сумма прописью */}
							<Flex justifyContent="flex-start" alignItems="center" gap="8px">
								<Typo color={COLORS.GRAY_800}>Сумма прописью:</Typo>
								<Typo color={COLORS.GRAY_800} weight="medium">
									{convertToWords(displayData.summary)}
								</Typo>
							</Flex>

							{/* Дата оплаты */}
							<Flex justifyContent="center" alignItems="center" gap="4px" mt="24px" mb="24px">
								<Typo color={COLORS.GRAY_800}>Оплатить не позднее:</Typo>
								<Typo color={COLORS.GRAY_800} weight="medium">
									{new Date(new Date().setDate(new Date().getDate() + 7)).toLocaleDateString(
										'ru-RU',
										{
											day: 'numeric',
											month: 'long',
											year: 'numeric',
										}
									)}
								</Typo>
							</Flex>
						</Box>
					</Box>
					<Box
						display="flex"
						justifyContent="flex-end"
						gap="10px"
						paddingTop="16px"
						borderTop="1px solid #E2E8F0"
					>
						{getButton()}
					</Box>
				</Box>
			</Block>
		</>
	);
}
