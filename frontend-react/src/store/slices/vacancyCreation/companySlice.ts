// src/store/slices/companyChoiceSlice.ts
import { RootState } from '@/store/store';
import { Company } from '@/store/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CompanyChoiceState {
	selectedCompanyId: string;
	companies: Company[];
}

const initialState: CompanyChoiceState = {
	selectedCompanyId: '',
	companies: [],
};

export const companyChoiceSlice = createSlice({
	name: 'companyChoice',
	initialState,
	reducers: {
		setSelectedCompany: (state, action: PayloadAction<string>) => {
			state.selectedCompanyId = action.payload;
		},
		setCompanies: (state, action: PayloadAction<Company[]>) => {
			state.companies = action.payload;
		},
		resetCompanyChoice: () => initialState,
	},
});

export const { setSelectedCompany, setCompanies, resetCompanyChoice } = companyChoiceSlice.actions;

export const selectSelectedCompany = (state: RootState): string =>
	state.vacancyCreation.companyChoice.selectedCompanyId;
export const selectCompanies = (state: RootState): Company[] =>
	state.vacancyCreation.companyChoice.companies;

export default companyChoiceSlice.reducer;
