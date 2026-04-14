// /src/components/sections/lk/vacancy/components/CreatingVacancyDescription/components/IntegrationHHVacancy/index.tsx

'use client';

import React, { useState, useMemo } from 'react';
import { Block } from '@/components/shared/Block';
import {
	Box,
	Flex,
	HStack,
	VStack,
	createListCollection,
	// RadioGroup,
	// RadioGroupValueChangeDetails,
	Tooltip,
	useTooltip,
	Field,
} from '@chakra-ui/react';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { toaster } from '@/components/ui/toaster';
import { Typo } from '@/components/shared/Typo/Typo';
import { COLORS } from '@/constants/colors';
import { Selection } from '@/components/shared/Selection';
import { LkButton } from '@/components/shared/LkButton';
import { HiOutlineQuestionMarkCircle } from 'react-icons/hi';

import { useGetActiveHhVacanciesQuery, useGetProfileQuery } from '@/store/rtkQuery/api';
import { selectIsTipsShow, toggleIsModalShow } from '@/store/slices/appSlice';
import { useResize } from '@/hooks/useResize';

import {
	fetchHHVacancyData,
	// checkHHVacancyLinkDuplicate,
} from '@/store/thunks/vacancyCreateAndEditFlow/hhIntegrationThunks';

import {
	setTitle,
	setSalaryFrom,
	setSalaryTo,
	setResponsibilities,
	setRequirements,
	setConditions,
	setHHVacancyId,
	// setLinkWithHH,
	setExperience,
	setEmploymentType,
	setSpecialization,
	setRegion,
} from '@/store/slices/vacancyCreation/vacancyInfoSlice';

import { parseHHDescription } from '@/utils/parseHHDescription';
import styles from './styles.module.scss'; 

// const radioItems = [
// 	{ label: 'Да', value: 'yes' },
// 	{ label: 'Нет', value: 'no' },
// ];

export const VacancyHHIntegration = () => {
	const dispatch = useAppDispatch();
	const [width] = useResize();
	
	const isTipsShow = useAppSelector(selectIsTipsShow);
	const tooltipPos = width < 815 ? 'bottom' : 'top';
	const tooltip = useTooltip({ positioning: { placement: tooltipPos } });

	const { data: profile, isLoading: isProfileLoading } = useGetProfileQuery();
	const { data: activeHhVacancies = [], isLoading: isVacanciesLoading } = useGetActiveHhVacanciesQuery();

	const [selectedId, setSelectedId] = useState<string>('');
	// const [linkValue, setLinkValue] = useState<'yes' | 'no'>('no');

	const hhStatus = profile?.hh_status;

	const collectionItems = useMemo(() => 
		activeHhVacancies.map((v) => ({
			label: `${v.name}${v.area ? ` - ${v.area}` : ''}`,
			value: v.id,
		})), [activeHhVacancies]
	);

	const activeHHVacanciesCollection = useMemo(() => 
		createListCollection({ items: collectionItems }), 
		[collectionItems]
	);

	const handleMouseEnter = () => {
		dispatch(toggleIsModalShow());
		tooltip.setOpen(true);
	};
	const handleMouseLeave = () => {
		dispatch(toggleIsModalShow());
		tooltip.setOpen(false);
	};

	const handleSelect = (val: string | string[]) => {
		const id = Array.isArray(val) ? val[0] : val;
		if (!id) return;

		setSelectedId(id);
		// setLinkValue('no');
		dispatch(setHHVacancyId(id));
		// dispatch(setLinkWithHH(false));
	};

	// const handleLinkChange = async (details: RadioGroupValueChangeDetails) => {
	// 	const value = details.value;
	// 	if (!value) return;

	// 	const isYes = value === 'yes';

	// 	if (isYes && selectedId) {
	// 		try {
	// 			const check = await dispatch(checkHHVacancyLinkDuplicate(selectedId)).unwrap();
	// 			if (check.is_linked) {
	// 				toaster.create({
	// 					title: 'Ошибка связи',
	// 					description: `Эта вакансия на hh.ru уже связана с вакансией "${check.linked_vacancy_name}". На платформе можно связать только одну вакансию с одной вакансией на hh.ru.`,
	// 					type: 'error',
	// 				});
	// 				setLinkValue('no');
	// 				dispatch(setLinkWithHH(false));
	// 				return;
	// 			}
	// 		} catch {
	// 			setLinkValue('no');
	// 			return;
	// 		}
	// 	}

	// 	setLinkValue(isYes ? 'yes' : 'no');
	// 	dispatch(setLinkWithHH(isYes));
	// };

	const handleFillData = async () => {
		if (!selectedId) return;

		const promise = dispatch(fetchHHVacancyData(selectedId)).unwrap();

		toaster.promise(promise, {
			loading: { title: 'Импортируем данные' },
			success: (data) => {
				dispatch(setTitle(data.name));
				if (data.salary_range) {
					dispatch(setSalaryFrom(data.salary_range.from || 0));
					dispatch(setSalaryTo(data.salary_range.to || 0));
				}
				const parsed = parseHHDescription(data.description);
				dispatch(setResponsibilities(parsed.responsibilities));
				dispatch(setRequirements(parsed.requirements));
				dispatch(setConditions(parsed.conditions));

				if (data.experience?.id) dispatch(setExperience(data.experience.id));
				if (data.employment_form?.id) dispatch(setEmploymentType(data.employment_form.id));
				if (data.area) dispatch(setRegion({ id: String(data.area.id), text: data.area.name, url: '' }));
				if (data.professional_roles?.[0]) dispatch(setSpecialization(data.professional_roles[0]));

				return { title: 'Данные импортированы' };
			},
			error: { title: 'Ошибка импорта данных' },
		});
	};

	return (
		<Block
			heading={
				<VStack align="stretch" gap="8px" w="100%">
					<Flex justifyContent="space-between" alignItems="center" w="100%">
						<Flex align="center" gap={2}>
							<Typo size="16px" weight="medium" color={COLORS.GRAY_800}>
								Импорт данных с hh
							</Typo>
							{isTipsShow && (
								<HiOutlineQuestionMarkCircle
									className={styles.tip}
									cursor={'help'}
									size={16}
									color={COLORS.GRAY_500}
									onMouseEnter={handleMouseEnter}
									onMouseLeave={handleMouseLeave}
								/>
							)}
						</Flex>
						
						<Box 
							bg={hhStatus ? '#EBF8FF' : '#F7FAFC'} 
							px="8px" 
							py="2px" 
							borderRadius="6px"
							flexShrink={0}
						>
							<Typo 
								size="12px" 
								weight="medium" 
								color={hhStatus ? COLORS.BLUE_500 : COLORS.GRAY_600}
							>
								{hhStatus ? 'Активно' : 'Не активно'}
							</Typo>
						</Box>
					</Flex>
					{/* Возвращаем подзаголовок вручную */}
					<Typo color={COLORS.GRAY_500} size="14px">
						Выберите вакансию из списка, чтобы автоматически заполнить данные вакансии
					</Typo>
				</VStack>
			}
		>
			<Tooltip.RootProvider value={tooltip}>
				<Tooltip.Trigger asChild>
					<Flex direction="column" gap={4}>
						<HStack gap={4} align="flex-end">
							<Box flex={1}>
								<Field.Root disabled={!hhStatus || isVacanciesLoading || isProfileLoading}>
									<Selection
										collection={activeHHVacanciesCollection}
										placeholder={isVacanciesLoading ? 'Загрузка...' : 'Выберите вакансию'}
										value={[selectedId]}
										onChange={(val) => handleSelect(val)}
									/>
								</Field.Root>
							</Box>
							<LkButton
								onClick={handleFillData}
								disabled={!selectedId || !hhStatus}
								height="40px"
								px={6}
							>
								Заполнить данные
							</LkButton>
						</HStack>

						{/* {selectedId && hhStatus && (
							<Box pt={2}>
								<HStack gap={6}>
									<Typo size="14px">Связать вакансию с hh.ru?</Typo>
									<RadioGroup.Root
										colorPalette="blue"
										value={linkValue}
										onValueChange={handleLinkChange}
									>
										<HStack gap={4}>
											{radioItems.map((item) => (
												<RadioGroup.Item key={item.value} value={item.value} cursor="pointer">
													<RadioGroup.ItemHiddenInput />
													<RadioGroup.ItemIndicator cursor="pointer" />
													<RadioGroup.ItemText>{item.label}</RadioGroup.ItemText>
												</RadioGroup.Item>
											))}
										</HStack>
									</RadioGroup.Root>
								</HStack>
							</Box>
						)} */}
					</Flex>
				</Tooltip.Trigger>

				{isTipsShow && (
					<Tooltip.Positioner>
						<Tooltip.Content bg={COLORS.WHITE} p={3} boxShadow="md" borderRadius="md">
							<Tooltip.Arrow 
								stroke={`${COLORS.WHITE} !important`} 
								borderColor={`${COLORS.WHITE} !important`}
							>
								<Tooltip.ArrowTip 
									bg={`${COLORS.WHITE} !important`} 
									borderColor={`${COLORS.WHITE} !important`} 
								/>
							</Tooltip.Arrow>
							<Typo color={COLORS.GRAY_800} weight="medium" size="14px">
								Выберите вакансию из вашего аккаунта hh.ru, чтобы автоматически заполнить данные полей «Название», «Зарплата» и «Описание».
							</Typo>
						</Tooltip.Content>
					</Tooltip.Positioner>
				)}
			</Tooltip.RootProvider>
		</Block>
	);
};