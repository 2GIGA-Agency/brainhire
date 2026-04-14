// src/components/sections/lk/vacancy/create/CompanyChoice.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { Block } from '@/components/shared/Block';
import { createListCollection, Flex, Tooltip, useTooltip } from '@chakra-ui/react';
import { Selection } from '@/components/shared/Selection';
import {
	setSelectedCompany,
	selectSelectedCompany,
	selectCompanies,
	setCompanies,
} from '@/store/slices/vacancyCreation/companySlice';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { toaster } from '@/components/ui/toaster';
import { useResize } from '@/hooks/useResize';
import Image from 'next/image';
import { CompanyCreateModal } from './CompanyCreateModal';
import { fetchCompanies } from '@/api/companies';
import axios from '@/utils/axios';
import { LkField } from '@/components/shared/LkField';
import { COLORS } from '@/constants/colors';
import { Typo } from '@/components/shared/Typo/Typo';
import { LkButton } from '@/components/shared/LkButton';
import { selectIsTipsShow, toggleIsModalShow } from '@/store/slices/appSlice';
import { HiOutlineQuestionMarkCircle } from 'react-icons/hi';
import styles from './styles.module.scss';

export const CompanyChoice = () => {
	const dispatch = useAppDispatch();
	const selectedCompany = useAppSelector(selectSelectedCompany);
	const companies = useAppSelector(selectCompanies);
	const [isLoading, setIsLoading] = useState(true);
	const [addCompanyModal, setCompanyModal] = useState(false);

	const isTipsShow = useAppSelector(selectIsTipsShow);

	const [width] = useResize();
	const minified = !!width && width < 540;

	const tooltipPos = width < 815 ? 'top' : 'left';

	const tooltip = useTooltip({ positioning: { placement: tooltipPos } });

	const companiesCollection = createListCollection({
		items: companies.map((i) => ({
			label: i.company_name,
			value: i.id,
		})),
	});

	const handleCompanyChange = (value: string | string[]) => {
		if (typeof value === 'string') {
			dispatch(setSelectedCompany(value));
		}
	};

	const createCompany = (inn: string, description: string) => {
		const promise = axios
			.post('/api/companies/', {
				company_description: description,
				inn: inn,
			})
			.then(() => {
				fetchCompanies()
					.then((res) => {
						setIsLoading(false);
						dispatch(setCompanies(res));
						if (res) {
							dispatch(setSelectedCompany(res.at(-1)!.id));
						}
					})
					.catch(() => {
						setIsLoading(false);
					});
			})
			.catch((error) => {
				const backendMessage = error?.response?.data?.message || 'Неизвестная ошибка';
				throw new Error(backendMessage);
			});

		toaster.promise(promise, {
			loading: { title: 'Создаем компанию...' },
			success: { title: 'Компания создана!' },
			error: (err: any) => ({
				title: 'Ошибка при создании компании',
				description: err.message,
			}),
		});
	};

	useEffect(() => {
		fetchCompanies()
			.then((res) => {
				setIsLoading(false);
				dispatch(setCompanies(res));
			})
			.catch(() => {
				setIsLoading(false);
			});
	}, []);

	const handleMouseEnter = () => {
		dispatch(toggleIsModalShow());
		tooltip.setOpen(true);
	};
	const handleMouseLeave = () => {
		dispatch(toggleIsModalShow());
		tooltip.setOpen(false);
	};

	return (
		<>
			<CompanyCreateModal
				isOpen={addCompanyModal}
				setIsOpen={setCompanyModal}
				submit={createCompany}
			/>
			<Block
				minified={minified}
				headingText={
					<Flex alignItems="center" gap={2}>
						<Typo size="16px" weight="medium" color={COLORS.GRAY_800}>
							Выбор компании
						</Typo>
						{isTipsShow && (
							<HiOutlineQuestionMarkCircle
								className={styles.tip}
								cursor={'help'}
								size={16}
								onMouseEnter={handleMouseEnter}
								onMouseLeave={handleMouseLeave}
							/>
						)}
					</Flex>
				}
				subHeadingText="Выберите компанию из списка или создайте новую компанию"
				heading={
					<Tooltip.RootProvider value={tooltip}>
						<Tooltip.Trigger asChild>
							<LkButton
								bg={COLORS.BLUE_400}
								icon={
									<Image
										src={'/icons/add.svg'}
										width={15}
										height={15}
										alt={'Plus'}
										style={{ marginTop: '1px' }}
									/>
								}
								onClick={() => setCompanyModal(true)}
							>
								<Typo size="14px" weight="semibold" color={COLORS.WHITE}>
									Создать компанию
								</Typo>
							</LkButton>
						</Tooltip.Trigger>

						{isTipsShow && (
							<Tooltip.Positioner>
								<Tooltip.Content bg={COLORS.WHITE} p={3}>
									<Tooltip.Arrow
										stroke={`${COLORS.WHITE} !important`}
										borderColor={`${COLORS.WHITE} !important`}
									>
										<Tooltip.ArrowTip
											bg={`${COLORS.WHITE} !important`}
											borderColor={`${COLORS.WHITE} !important`}
										/>
									</Tooltip.Arrow>
									<Typo color={COLORS.GRAY_800} weight="medium">
										Прежде чем создать вакансию, создайте компанию или выберите существующую из
										списка.
									</Typo>
								</Tooltip.Content>
							</Tooltip.Positioner>
						)}
					</Tooltip.RootProvider>
				}
			>
				<LkField label="Выбор компании" required={true}>
					{
						<Selection
							isLoading={isLoading}
							collection={companiesCollection}
							placeholder="Выберите компанию"
							value={[selectedCompany]}
							onChange={handleCompanyChange} // Pass the refined handler
						/>
					}
				</LkField>
			</Block>
		</>
	);
};
