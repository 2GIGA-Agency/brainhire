// src/store/slices/vacancyInfoSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/store/store';

import hh_field_labels from '@/hh_vacancy_field_reference.json';
import { v4 as uuid } from 'uuid';
import { CollectionItem } from '@chakra-ui/react';

export interface VacancyInfoState {
	vacancy_name: string;
	jobLevel: string | null;
	specialization: { id: string; text: string; accept_incomplete_resumes: boolean } | null;
	employmentType: string | null;
	salaryFrom: number | null;
	salaryTo: number | null;
	paymentType: string | null;
	experience: string | null;
	// regions: string[]; // Регионы хранятся в JSON формате
	region: { id: string; text: string; url: string } | null;
	description_responsibilities: string;
	description_requirements: string;
	description_conditions: string;
	rootId: string;
	version: number;

	// Коллекции для select/multiselect
	jobLevelsCollection: CollectionItem[];
	employmentTypesCollection: CollectionItem[];
	paymentTypesCollection: CollectionItem[];
	experienceCollection: CollectionItem[];

	hh_vacancy_id: string | null;
	// link_with_hh: boolean;
}

// Тестовые данные (оставим пока для других селектов)
const jobLevelsData: CollectionItem[] = hh_field_labels.level_candidate.map((i) => ({
	label: i.name,
	value: i.id,
}));

const employmentTypesData: CollectionItem[] = hh_field_labels.employment.map((i) => ({
	label: i.name,
	value: i.id,
}));

const paymentTypesData: CollectionItem[] = hh_field_labels.gross.map((i) => ({
	label: i.name,
	value: i.id,
}));

const experienceData: CollectionItem[] = hh_field_labels.experience.map((i) => ({
	label: i.name,
	value: i.id,
}));

export interface AreaResponse {
	id: number;
	parentId: number;
	name: string;
	areas: unknown[]; // Подрегионы, пока что не надо
}

export interface RegionInfo {
	id: string;
	text: string;
	url: string;
}

const initialState: VacancyInfoState = {
	vacancy_name: '',
	jobLevel: hh_field_labels.level_candidate[1].id,
	specialization: null,
	employmentType: hh_field_labels.employment[0].id,
	salaryFrom: 0,
	salaryTo: 0,
	paymentType: hh_field_labels.gross[0].id,
	experience: hh_field_labels.experience[0].id,
	// regions: [] as string[], // Регионы хранятся в JSON формате
	region: null,
	description_responsibilities: '',
	description_requirements: '',
	description_conditions: '',
	rootId: uuid(),
	version: 1,

	// Инициализация коллекций
	jobLevelsCollection: jobLevelsData,
	employmentTypesCollection: employmentTypesData,
	paymentTypesCollection: paymentTypesData,
	experienceCollection: experienceData,

	hh_vacancy_id: null,
	// link_with_hh: false,
};

export const vacancyInfoSlice = createSlice({
	name: 'vacancyInfo',
	initialState,
	reducers: {
		setTitle: (state, action: PayloadAction<string>) => {
			state.vacancy_name = action.payload;
		},
		setJobLevel: (state, action: PayloadAction<string | null>) => {
			state.jobLevel = action.payload;
		},
		setSpecialization: (
			state,
			action: PayloadAction<{ id: string; text: string; accept_incomplete_resumes: boolean } | null>
		) => {
			state.specialization = action.payload;
		},
		setEmploymentType: (state, action: PayloadAction<string | null>) => {
			state.employmentType = action.payload;
		},
		setSalaryFrom: (state, action: PayloadAction<number | null>) => {
			state.salaryFrom = action.payload;
		},
		setSalaryTo: (state, action: PayloadAction<number | null>) => {
			state.salaryTo = action.payload;
		},
		setPaymentType: (state, action: PayloadAction<string | null>) => {
			state.paymentType = action.payload;
		},
		setExperience: (state, action: PayloadAction<string | null>) => {
			state.experience = action.payload;
		},
		// setRegions: (state, action: PayloadAction<string[]>) => {
		// state.regions = action.payload;
		// },
		setRegion: (state, action: PayloadAction<{ id: string; text: string; url: string }>) => {
			state.region = action.payload;
		},
		setResponsibilities: (state, action: PayloadAction<string>) => {
			state.description_responsibilities = action.payload;
		},
		setRequirements: (state, action: PayloadAction<string>) => {
			state.description_requirements = action.payload;
		},
		setConditions: (state, action: PayloadAction<string>) => {
			state.description_conditions = action.payload;
		},
		setVersion: (state, action: PayloadAction<number>) => {
			state.version = action.payload;
		},
		setHHVacancyId: (state, action: PayloadAction<string | null>) => {
    		state.hh_vacancy_id = action.payload;
		},
		// setLinkWithHH: (state, action: PayloadAction<boolean>) => {
		// 	state.link_with_hh = action.payload;
		// },
		resetVacancyInfo: () => initialState,
	},
});

export const {
	setTitle,
	setJobLevel,
	setSpecialization,
	setEmploymentType,
	setSalaryFrom,
	setSalaryTo,
	setPaymentType,
	setExperience,
	// setRegions,
	setRegion,
	setResponsibilities,
	setRequirements,
	setConditions,
	setVersion,
	resetVacancyInfo,
	setHHVacancyId,
    // setLinkWithHH,
} = vacancyInfoSlice.actions;

export const selectVacancyInfo = (state: RootState) => state.vacancyCreation.vacancyInfo;

export default vacancyInfoSlice.reducer;
