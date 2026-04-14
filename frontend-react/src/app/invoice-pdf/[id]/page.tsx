'use client';

import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from '@/utils/axios';
import { Box, Flex, Image } from '@chakra-ui/react';

// Библиотеки для генерации PDF
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

// Ваши импорты компонентов и утилит
import { Invoice } from '@/app/(lk)/finances/page';
import { ContentSpinner } from '@/components/shared/ContentSpinner';
import { convertToWords, formatNumber, formatPrice } from '@/app/(lk)/finances/[id]/utils';
import { Company } from '@/store/types';
import { ResponsiveTable } from '@/app/(lk)/finances/[id]/components/ResponsiveTable';
import { InvoiceToPay } from '@/app/(lk)/finances/[id]/components/InvoiceToPay';
import InvoiceTable from '@/app/(lk)/finances/[id]/components/InvoiceTable';
import { Typo } from '@/components/shared/Typo/Typo';
import { COLORS } from '@/constants/colors';
import { LkButton } from '@/components/shared/LkButton';
import { calculateVAT, getVatRateByDate } from '@/utils/vatCalculations';

interface Props {
	amount: number;
	price: number;
	summary: number;
	vatRate: number; // Добавляем ставку НДС
}

// Определяем стили для таблицы, чтобы они были инлайновыми и надежно рендерились
const invoiceTableStyle: React.CSSProperties = {
	marginTop: '36px',
	width: '100%',
	borderCollapse: 'collapse',
	border: '1px solid #000000', // светлая граница, как в Chakra
};

const invoiceCellStyle: React.CSSProperties = {
	border: '1px solid #000000',
	padding: '12px 16px', // падинги как у Chakra
	verticalAlign: 'top',
	textAlign: 'left',
};

const headerCellStyle: React.CSSProperties = {
	...invoiceCellStyle,
	fontWeight: 'normal', // Убираем жирность по умолчанию у th
};

const rightAlignCellStyle: React.CSSProperties = {
	...invoiceCellStyle,
	textAlign: 'right',
};

const PrintableInvoiceTable = ({ amount, price, summary, vatRate }: Props) => {
	return (
		<table style={invoiceTableStyle}>
			<thead>
				<tr>
					<th style={headerCellStyle}>
						<Typo color={COLORS.GRAY_800} weight="medium">
							№
						</Typo>
					</th>
					<th style={headerCellStyle}>
						<Typo color={COLORS.GRAY_800} weight="medium">
							Наименование услуги
						</Typo>
					</th>
					<th style={headerCellStyle}>
						<Typo color={COLORS.GRAY_800} weight="medium">
							Ед. изм.
						</Typo>
					</th>
					<th style={{ ...headerCellStyle, textAlign: 'right' }}>
						<Typo color={COLORS.GRAY_800} weight="medium">
							Кол-во
						</Typo>
					</th>
					<th style={{ ...headerCellStyle, textAlign: 'right' }}>
						<Typo color={COLORS.GRAY_800} weight="medium">
							Цена, руб.
						</Typo>
					</th>
					<th style={{ ...headerCellStyle, textAlign: 'right' }}>
						<Typo color={COLORS.GRAY_800} weight="medium">
							НДС %
						</Typo>
					</th>
					<th style={{ ...headerCellStyle, textAlign: 'right' }}>
						<Typo color={COLORS.GRAY_800} weight="medium">
							Сумма, руб.
						</Typo>
					</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td style={invoiceCellStyle}>
						<Typo color={COLORS.GRAY_800}>1</Typo>
					</td>
					<td style={invoiceCellStyle}>
						<Typo color={COLORS.GRAY_800}>
							Пополнение лицевого счета для работы с услугами BRaiN HR.
						</Typo>
					</td>
					<td style={invoiceCellStyle}>
						<Typo color={COLORS.GRAY_800}>Токены</Typo>
					</td>
					<td style={rightAlignCellStyle}>
						<Typo color={COLORS.GRAY_800}>{formatNumber(amount)}</Typo>
					</td>
					<td style={rightAlignCellStyle}>
						<Typo color={COLORS.GRAY_800}>{formatPrice(price)}</Typo>
					</td>
					<td style={rightAlignCellStyle}>
						<Typo color={COLORS.GRAY_800}>{vatRate}</Typo> {/* Используем переданную ставку */}
					</td>
					<td style={rightAlignCellStyle}>
						<Typo color={COLORS.GRAY_800}>{formatPrice(summary)}</Typo>
					</td>
				</tr>
			</tbody>
		</table>
	);
};

const tableStyle: React.CSSProperties = {
	width: '100%',
	borderCollapse: 'collapse',
	border: '1px solid #000000',
};

const cellStyle: React.CSSProperties = {
	border: '1px solid #000000',
	padding: '8px',
	verticalAlign: 'top',
};

const DesktopTable = () => (
	<table style={tableStyle}>
		<tbody>
			<tr>
				<td style={cellStyle} colSpan={2} rowSpan={2}>
					<Typo color={COLORS.GRAY_800} mb="0.5rem">
						ПАО Сбербанк г. Москва
					</Typo>
					<Typo color={COLORS.GRAY_800}>Банк получателя</Typo>
				</td>
				<td style={cellStyle}>БИК</td>
				<td style={cellStyle} rowSpan={2}>
					<Typo color={COLORS.GRAY_800} mb="0.5rem">
						044525225
					</Typo>
					<Typo color={COLORS.GRAY_800}>30101810400000000225</Typo>
				</td>
			</tr>
			<tr>
				<td style={cellStyle}>Сч. №</td>
			</tr>
			<tr>
				<td style={cellStyle}>
					<Typo color={COLORS.GRAY_800}>ИНН 5009132924</Typo>
				</td>
				<td style={cellStyle}>
					<Typo color={COLORS.GRAY_800}>КПП 500901001</Typo>
				</td>
				<td style={cellStyle} rowSpan={2}>
					<Typo color={COLORS.GRAY_800}>Сч. №</Typo>
				</td>
				<td style={cellStyle} rowSpan={2}>
					<Typo color={COLORS.GRAY_800}>40702810540000408017</Typo>
				</td>
			</tr>
			<tr>
				<td style={cellStyle} colSpan={2}>
					<Typo color={COLORS.GRAY_800} mb="0.5rem">
						ООО "НДК"
					</Typo>
					<Typo color={COLORS.GRAY_800}>Получатель</Typo>
				</td>
			</tr>
		</tbody>
	</table>
);

// Содержит точную разметку для финального файла.
interface PrintProps {
	invoice: Invoice;
	receiverName: string;
	vatRate: number; // Добавляем ставку НДС в пропсы
}

const PrintableContent = forwardRef<HTMLDivElement, PrintProps>(function PrintableContent(
	{ invoice, receiverName, vatRate },
	ref
) {
	const invoiceNDS = calculateVAT(Number(invoice.price_total), vatRate);

	return (
		<Box ref={ref} padding="40px" bg="white" width="210mm">
			{' '}
			{/* Ширина A4 для корректного рендеринга */}
			<Box mb="20px">
				<Box>
					<Flex align="center" justifyContent="space-between" wrap={'wrap'} gap="38px">
						<Box>
							<Box display="flex" alignItems="center" justifyContent="center">
								<Image
									src="/images/ndk.png"
									alt="Логотип"
									width={329}
									height={120}
									style={{ height: 'auto' }}
								/>
							</Box>
						</Box>
						<DesktopTable />
					</Flex>
				</Box>

				<Box mt="40px">
					<InvoiceToPay isCreate={false} receiver={receiverName} invoiceId={invoice.id} />
					<PrintableInvoiceTable
						amount={invoice.token_amount}
						price={Number(invoice.token_price)}
						summary={Number(invoice.price_total)}
						vatRate={vatRate} // Передаем ставку НДС
					/>
					<Box textAlign="right" mt="24px">
						{/* Итого */}
						<Flex justifyContent="flex-end" alignItems="center" gap="8px">
							<Typo color={COLORS.GRAY_800} weight="medium">
								Итого:
							</Typo>
							<Typo color={COLORS.GRAY_800}>{formatPrice(Number(invoice.price_total))}</Typo>
						</Flex>

						{/* НДС */}
						<Flex justifyContent="flex-end" alignItems="center" gap="8px">
							<Typo color={COLORS.GRAY_800} weight="medium">
								В том числе НДС {vatRate}%: {/* Динамическая ставка */}
							</Typo>
							<Typo color={COLORS.GRAY_800}>{formatPrice(invoiceNDS)}</Typo>
						</Flex>

						{/* Всего наименований */}
						<Flex justifyContent="flex-start" mt="16px">
							<Typo color={COLORS.GRAY_800}>
								Всего наименований: 1, на сумму {formatPrice(Number(invoice.price_total))}
							</Typo>
						</Flex>

						{/* Сумма прописью */}
						<Flex justifyContent="flex-start" alignItems="center" gap="8px">
							<Typo color={COLORS.GRAY_800}>Сумма прописью:</Typo>
							<Typo color={COLORS.GRAY_800} weight="medium">
								{convertToWords(Number(invoice.price_total))}
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
			</Box>
		</Box>
	);
});

// --- Основной компонент страницы ---
const Pdf = () => {
	const [invoice, setInvoice] = useState<Invoice>({} as Invoice);
	const [receiverName, setReceiverName] = useState<string>('');
	const [vatRate, setVatRate] = useState<number>(20); // Начальное значение ставки НДС
	const [isLoading, setIsLoading] = useState(false);

	const componentRef = useRef<HTMLDivElement>(null);

	const params = useParams();
	const id = params.id;

	useEffect(() => {
		const fetchData = async () => {
			if (!id) return;
			try {
				const invoiceResponse = await axios.get<Invoice>(`/api/finance/invoices/${id}`);
				const fetchedInvoice = invoiceResponse.data;
				setInvoice(fetchedInvoice);

				// Определяем ставку НДС на основе даты создания счета
				const rate = getVatRateByDate(fetchedInvoice.created_at);
				setVatRate(rate);

				const companiesResponse = await axios.get<Company[]>('/api/companies/');
				const companies = companiesResponse.data;

				const receiver =
					companies.find((i) => i?.id === fetchedInvoice.receiver)?.company_name || 'N/D';
				setReceiverName(receiver);
			} catch (error) {
				console.error('Ошибка при загрузке данных:', error);
			}
		};

		fetchData();
	}, [id]);

	const handleDownloadPdf = async () => {
		const element = componentRef.current;
		if (!element) return;
		setIsLoading(true);

		const canvas = await html2canvas(element, { scale: 3, useCORS: true });
		const data = canvas.toDataURL('image/png');

		const pdf = new jsPDF('p', 'mm', 'a4');
		const pdfWidth = pdf.internal.pageSize.getWidth();
		const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

		pdf.addImage(data, 'PNG', 0, 0, pdfWidth, pdfHeight);
		pdf.save(`Счет №${invoice.id || 'document'}.pdf`);
		setIsLoading(false);
	};

	if (!invoice.id || !receiverName) {
		return <ContentSpinner />;
	}

	const invoiceNDS = calculateVAT(Number(invoice.price_total), vatRate);

	return (
		<>
			{/* Этот блок скрыт и используется ТОЛЬКО для генерации PDF */}
			<Box position="absolute" left="-9999px" top="0">
				<PrintableContent
					ref={componentRef}
					invoice={invoice}
					receiverName={receiverName}
					vatRate={vatRate} // Передаем ставку НДС
				/>
			</Box>

			{/* Этот блок виден пользователю на экране */}
			<Box padding="40px">
				<Box mb="20px">
					<Box>
						<Flex align="center" justifyContent="space-between" wrap={'wrap'} gap="38px">
							<Box>
								<Box display="flex" alignItems="center" justifyContent="center">
									<Image
										src="/images/ndk.png"
										alt="Логотип"
										width={329}
										height={120}
										style={{ height: 'auto' }}
									/>
								</Box>
							</Box>
							<Box flex="1">
								<ResponsiveTable />
							</Box>
						</Flex>
					</Box>

					<Box mt="40px">
						<InvoiceToPay isCreate={false} receiver={receiverName} invoiceId={invoice.id} />
						<Box mt="32px">
							<InvoiceTable
								amount={invoice.token_amount}
								price={Number(invoice.token_price)}
								summary={Number(invoice.price_total)}
								vatRate={vatRate}
							/>
						</Box>
						<Box textAlign="right" mt="24px">
							{/* Итого */}
							<Flex justifyContent="flex-end" alignItems="center" gap="8px">
								<Typo color={COLORS.GRAY_800} weight="medium">
									Итого:
								</Typo>
								<Typo color={COLORS.GRAY_800}>{formatPrice(Number(invoice.price_total))}</Typo>
							</Flex>

							{/* НДС */}
							<Flex justifyContent="flex-end" alignItems="center" gap="8px">
								<Typo color={COLORS.GRAY_800} weight="medium">
									В том числе НДС {vatRate}%: {/* Динамическая ставка */}
								</Typo>
								<Typo color={COLORS.GRAY_800}>{formatPrice(invoiceNDS)}</Typo>
							</Flex>

							{/* Всего наименований */}
							<Flex justifyContent="flex-start" mt="16px">
								<Typo color={COLORS.GRAY_800}>
									Всего наименований: 1, на сумму {formatPrice(Number(invoice.price_total))}
								</Typo>
							</Flex>

							{/* Сумма прописью */}
							<Flex justifyContent="flex-start" alignItems="center" gap="8px">
								<Typo color={COLORS.GRAY_800}>Сумма прописью:</Typo>
								<Typo color={COLORS.GRAY_800} weight="medium">
									{convertToWords(Number(invoice.price_total))}
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
						<LkButton
							heightSize="medium"
							color="white"
							onClick={handleDownloadPdf}
							loading={isLoading}
							loadingText="Генерация..."
						>
							Скачать PDF
						</LkButton>
					</Box>
				</Box>
			</Box>
		</>
	);
};

export default Pdf;
