// src/components/sections/lk/vacancy/create/VacancyInfo.tsx
import { Block } from '@/components/shared/Block';
import { Box } from '@chakra-ui/react';
import {
	setTitle,
	setJobLevel,
	setSpecialization,
	setEmploymentType,
	setSalaryFrom,
	setSalaryTo,
	setPaymentType,
	setExperience,
	// setRegions,
	setResponsibilities,
	setRequirements,
	setConditions,
	selectVacancyInfo,
	setRegion,
} from '@/store/slices/vacancyCreation/vacancyInfoSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';
import {
	VacancyInputElement,
	VacancyInputItem,
} from '@/components/sections/lk/vacancy/components/VacancyInputElement';

import styles from './style.module.scss';
import { useResize } from '@/hooks/useResize';
import { Typo } from '@/components/shared/Typo/Typo';

const vacancyInputs: VacancyInputItem[] = [
	{
		label: 'Название вакансии',
		type: 'text',
		required: true,
		placeholder: 'название вакансии',
		stateKey: 'vacancy_name',
		action: setTitle,
	},
	{
		label: 'Уровень должности',
		type: 'select',
		required: true,
		placeholder: 'уровень должности',
		stateKey: 'jobLevel',
		action: setJobLevel,
		collectionKey: 'jobLevelsCollection',
	},
	{
		label: 'Специализация',
		type: 'inputWithSelect',
		required: true,
		placeholder: 'специализацию',
		stateKey: 'specialization',
		action: setSpecialization,
	},
	{
		label: 'Тип занятости',
		type: 'select',
		required: true,
		placeholder: 'тип занятости',
		stateKey: 'employmentType',
		action: setEmploymentType,
		collectionKey: 'employmentTypesCollection',
	},
	{
		label: 'Зарплата от (в месяц)',
		type: 'number',
		required: false,
		placeholder: 'начало зарплатной вилки',
		stateKey: 'salaryFrom',
		action: setSalaryFrom,
	},
	{
		label: 'Зарплата до (в месяц)',
		type: 'number',
		required: false,
		placeholder: 'конец зарплатной вилки',
		stateKey: 'salaryTo',
		action: setSalaryTo,
	},
	{
		label: 'Тип оплаты',
		type: 'select',
		required: false,
		placeholder: 'тип оплаты',
		stateKey: 'paymentType',
		action: setPaymentType,
		collectionKey: 'paymentTypesCollection',
	},
	{
		label: 'Опыт работы',
		type: 'select',
		required: true,
		placeholder: 'опыт работы',
		stateKey: 'experience',
		action: setExperience,
		collectionKey: 'experienceCollection',
	},
	// {
	// 	label: 'Регионы показа вакансии',
	// 	type: 'inputWithMultiSelect',
	// 	required: true,
	// 	placeholder: 'регион(ы) показа вакансии',
	// 	stateKey: 'regions',
	// 	action: setRegions,
	// },
	{
		label: 'Регион показа вакансии',
		type: 'inputWithSelect',
		required: true,
		placeholder: 'регион показа вакансии',
		stateKey: 'region',
		action: setRegion,
	},
	{
		label: 'Обязанности',
		type: 'textarea',
		required: true,
		placeholder: 'обязанности',
		stateKey: 'description_responsibilities',
		action: setResponsibilities,
	},
	{
		label: 'Требования',
		type: 'textarea',
		required: true,
		placeholder: 'требования',
		stateKey: 'description_requirements',
		action: setRequirements,
	},
	{
		label: 'Условия',
		type: 'textarea',
		required: true,
		placeholder: 'условия',
		stateKey: 'description_conditions',
		action: setConditions,
	},
];

const getGridColumnStyle = (index: number): React.CSSProperties => {
	if (index < 4) {
		return { gridColumn: 'span 3' };
	} else if (index < 7) {
		return { gridColumn: 'span 2' };
	} else if (index < 9) {
		return { gridColumn: 'span 3' };
	} else {
		return { gridColumn: 'span 6' };
	}
};

export const CreatingVacancyInfo = () => {
	const dispatch = useAppDispatch();
	const vacancyInfoState = useAppSelector(selectVacancyInfo);
	const [width] = useResize();

	const isMobile = width < 540;

	return (
		<Block
			headingText="Данные вакансии"
			subHeadingText="Заполните или отредактируйте данные вакансии"
			helpTipText={
				<Typo weight="medium">
					Все поля должны быть заполнены, чтобы ускорить процесс, можете использовать генерацию с
					ИИ.
				</Typo>
			}
		>
			<Box className={styles.vacancyInfo}>
				{vacancyInputs.map((item, index) => (
					<div key={index} style={isMobile ? { gridColumn: 'span 6' } : getGridColumnStyle(index)}>
						<VacancyInputElement item={item} dispatch={dispatch} state={vacancyInfoState} />
					</div>
				))}
			</Box>
		</Block>
	);
};
