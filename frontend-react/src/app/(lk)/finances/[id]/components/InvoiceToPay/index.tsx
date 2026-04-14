'use client';

import { Typo } from '@/components/shared/Typo/Typo';
import { Company } from '@/store/types';
import axios from '@/utils/axios';
import { Box, createListCollection, Flex } from '@chakra-ui/react';
import { memo, useEffect, useState } from 'react';
import { useMobileCheck } from '../../hooks/useMobileCheck';
import { Selection } from '@/components/shared/Selection';

interface Props {
	isCreate: boolean;
	invoiceId?: string;
	receiver?: string;
	selected?: string[];
	invalid?: boolean;
	onChange?: (value: string | string[]) => void;
	isReadOnly?: boolean;
}

export const InvoiceToPay = memo(function InvoiceToPay({
	isCreate,
	invoiceId,
	receiver,
	selected,
	invalid = false,
	onChange,
	isReadOnly = false,
}: Props) {
	const [companies, setCompanies] = useState<Company[]>([]);
	const isMobile = useMobileCheck();

	useEffect(() => {
		if (!isReadOnly && onChange) {
			const fetchCompanies = async () => {
				try {
					const response = await axios.get('/api/companies/');
					setCompanies(response.data);
				} catch (error) {
					console.error('Ошибка при загрузке компаний:', error);
				}
			};
			fetchCompanies();
		}
	}, [isReadOnly, onChange]);

	const companyCollection = createListCollection({
		items: companies.map((company) => ({
			label: company.company_name,
			value: company.company_name,
		})),
	});

	const showSelect = onChange && !isReadOnly;

	return (
		<>
			<Typo size="20px" weight="semibold" mb="16px">
				Счет {!isCreate && <strong>№{invoiceId}</strong>} на оплату от{' '}
				<strong>{new Date().toLocaleDateString('ru-RU')}</strong>
			</Typo>
			<Box mt="32px" borderTop="1px solid #E2E8F0" pt="16px">
				{/* Строка "Поставщик" */}
				<Flex alignItems="center" gap="8px" flexDir={isMobile ? 'column' : 'row'}>
					<Box flex={`0 0 ${isMobile ? `auto` : `150px`}`}>
						<Typo size="16px" weight="semibold">
							Поставщик:
						</Typo>
					</Box>
					<Box>
						<Typo size="16px" weight="semibold">
							ООО "НДК", ИНН 5009132924, КПП 500901001,
						</Typo>
						<Typo size="16px">
							142005, Московская обл, г Домодедово, ул. Кирова, д. 7, к. 1, помещ. 0011, офис 5,
							тел.: +7 (495) 970-39-76
						</Typo>
					</Box>
				</Flex>

				{/* Строка "Покупатель" */}
				<Flex
					alignItems="center"
					flexDir={isMobile ? 'column' : 'row'}
					gap="8px"
					mt={`${isMobile ? '40px' : '16px'}`}
				>
					<Box flex={`0 0 ${isMobile ? `auto` : `150px`}`}>
						<Typo size="16px" weight="semibold">
							Покупатель:
						</Typo>
					</Box>
					{showSelect ? (
						<>
							<Selection
								invalid={invalid}
								placeholder="Выберите компанию"
								collection={companyCollection}
								value={selected}
								onChange={onChange}
							/>
						</>
					) : (
						// Если showSelect=false, показываем просто текст.
						// Приоритет отдаем `selected`, если он есть, иначе `receiver`.
						<Typo size="16px" weight="semibold">
							{selected?.[0] || receiver}
						</Typo>
					)}
				</Flex>
			</Box>
		</>
	);
});
