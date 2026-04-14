import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import hh_field_labels from '@/hh_outbound_search_reference.json';
import hh_countries_field_labels from '@/hh_countries_reference.json';
import { RootState } from '@/store/store';
import { CollectionItem } from '@/types';
import { SkillItem } from '../vacancyCreation/skillsSlice';

const genders = hh_field_labels.gender;
const relocation = hh_field_labels.relocation;
const driverLicenseTypes = hh_field_labels.driver_license_types;
const educationLevels = hh_field_labels.education_level;
const employments = hh_field_labels.employment;
const languageLevels = hh_field_labels.language_level;
const languages = hh_field_labels.language;
const countries = hh_countries_field_labels.countries;
const jobSearchStatuses = hh_field_labels.job_search_statuses_employer;
const schedules = hh_field_labels.schedule;
const experiences = hh_field_labels.experience;
const orderByOptions = hh_field_labels.resume_search_order;

// Функция-хелпер для создания коллекций
const createCollection = (items: Array<{ id: string; name: string }>): CollectionItem[] =>
	items.map((i) => ({ label: i.name, value: i.id }));

const genderCollection: CollectionItem[] = createCollection(genders);
const relocationCollection: CollectionItem[] = createCollection(relocation);
const educationLevelCollection: CollectionItem[] = createCollection(educationLevels);
const employmentCollection: CollectionItem[] = createCollection(employments);
const languageLevelCollection: CollectionItem[] = createCollection(languageLevels);
const languagesCollection: CollectionItem[] = createCollection(languages);
const countriesCollection: CollectionItem[] = createCollection(countries);
const jobSearchStatusCollection: CollectionItem[] = createCollection(jobSearchStatuses);
const scheduleCollection: CollectionItem[] = createCollection(schedules);
const experienceCollection: CollectionItem[] = createCollection(experiences);
const orderByCollection: CollectionItem[] = createCollection(orderByOptions);

// Отдельный кейс, там только id
const driverLicenseTypeCollection: CollectionItem[] = driverLicenseTypes.map((i) => ({
	label: i.id,
	value: i.id,
}));

export interface LanguagePair {
	language: string;
	level: string;
}

interface InitialState {
	candidatesCount: number;
	ageFrom: number;
	ageTo: number;
	gender: string;
	relocation: string;
	driverLicenseType: string[];
	educationLevels: string[];
	employment: string[];
	languagePairs: LanguagePair[];
	specialization: { id: string; text: string } | null;
	citizenship: string[];
	workTicket: string[];
	jobSearchStatus: string[];
	schedule: string[];
	experience: string[];
	orderBy: string;
	skills: SkillItem[];
	areas: { id: string; text: string } | null;
	// Texts-ключевые слова. Поисковая фраза. Метод найдет резюме, в которых встречаются все слова заданной фразы.
	keywords: string[];

	genderCollection: CollectionItem[];
	relocationCollection: CollectionItem[];
	driverLicenseTypeCollection: CollectionItem[];
	employmentCollection: CollectionItem[];
	educationLevelCollection: CollectionItem[];
	languageLevelCollection: CollectionItem[];
	languagesCollection: CollectionItem[];
	countriesCollection: CollectionItem[];
	jobSearchStatusCollection: CollectionItem[];
	scheduleCollection: CollectionItem[];
	experienceCollection: CollectionItem[];
	orderByCollection: CollectionItem[];
}

const initialState: InitialState = {
	candidatesCount: 1,
	ageFrom: 0,
	ageTo: 0,
	gender: '',
	relocation: 'living_or_relocation',
	driverLicenseType: [],
	educationLevels: [],
	employment: [],
	languagePairs: [],
	specialization: null,
	citizenship: [],
	workTicket: [],
	jobSearchStatus: [],
	schedule: [],
	experience: [],
	orderBy: hh_field_labels.resume_search_order[0].id,
	skills: [],
	areas: null,
	keywords: [],

	genderCollection,
	relocationCollection,
	driverLicenseTypeCollection,
	educationLevelCollection,
	employmentCollection,
	languageLevelCollection,
	languagesCollection,
	countriesCollection,
	jobSearchStatusCollection,
	scheduleCollection,
	experienceCollection,
	orderByCollection,
};

const outboundSearchSlice = createSlice({
	name: 'outboundSearch',
	initialState,
	reducers: {
		setCandidatesCount: (state, action: PayloadAction<number>) => {
			state.candidatesCount = action.payload;
		},
		setAgeFrom: (state, action: PayloadAction<number>) => {
			state.ageFrom = action.payload;
		},
		setAgeTo: (state, action: PayloadAction<number>) => {
			state.ageTo = action.payload;
		},
		setGender: (state, action: PayloadAction<string>) => {
			state.gender = action.payload;
		},
		setRelocation: (state, action: PayloadAction<string>) => {
			state.relocation = action.payload;
		},
		setDriverLicenseType: (state, action: PayloadAction<string[]>) => {
			state.driverLicenseType = action.payload;
		},
		setEducationLevels: (state, action: PayloadAction<string[]>) => {
			state.educationLevels = action.payload;
		},
		setEmployment: (state, action: PayloadAction<string[]>) => {
			state.employment = action.payload;
		},
		setSpecialization: (state, action: PayloadAction<{ id: string; text: string }>) => {
			state.specialization = action.payload;
		},
		addLanguagePair: (state) => {
			// Добавляем пустую пару, которую пользователь заполнит
			state.languagePairs.push({ language: '', level: '' });
		},
		removeLanguagePair: (state, action: PayloadAction<number>) => {
			// Удаляем пару по индексу
			state.languagePairs.splice(action.payload, 1);
		},
		setJobSearchStatus: (state, action: PayloadAction<string[]>) => {
			state.jobSearchStatus = action.payload;
		},
		setSchedule: (state, action: PayloadAction<string[]>) => {
			state.schedule = action.payload;
		},
		setExperience: (state, action: PayloadAction<string[]>) => {
			state.experience = action.payload;
		},
		setOrderBy: (state, action: PayloadAction<string>) => {
			state.orderBy = action.payload;
		},
		setSkills: (state, action: PayloadAction<SkillItem[]>) => {
			state.skills = action.payload;
		},
		updateLanguagePair: (
			state,
			action: PayloadAction<{ index: number; field: 'language' | 'level'; value: string }>
		) => {
			const { index, field, value } = action.payload;
			if (state.languagePairs[index]) {
				state.languagePairs[index][field] = value;
			}
		},
		setCitizenship: (state, action: PayloadAction<string[]>) => {
			state.citizenship = action.payload;
		},
		setWorkTicket: (state, action: PayloadAction<string[]>) => {
			state.workTicket = action.payload;
		},
		setAreas: (state, action: PayloadAction<{ id: string; text: string }>) => {
			state.areas = action.payload;
		},
		setKeywords: (state, action: PayloadAction<string[]>) => {
			state.keywords = action.payload;
		},
		resetOutboundSearch() {
			return initialState;
		},
		loadOutboundSearchData(state, action: PayloadAction<Partial<InitialState>>) {
			return { ...state, ...action.payload };
		},
	},
});

export const {
	setCandidatesCount,
	setAgeFrom,
	setAgeTo,
	setGender,
	setRelocation,
	setDriverLicenseType,
	setEducationLevels,
	setEmployment,
	addLanguagePair,
	removeLanguagePair,
	updateLanguagePair,
	setSpecialization,
	setCitizenship,
	setWorkTicket,
	setJobSearchStatus,
	setSchedule,
	setExperience,
	setOrderBy,
	setSkills,
	setAreas,
	setKeywords,
	resetOutboundSearch,
  	loadOutboundSearchData,
} = outboundSearchSlice.actions;

export const outboundSearchInitialState = initialState;
export const selectOutboundSearchSettings = (state: RootState) => state.outboundSearch;
export default outboundSearchSlice.reducer;
