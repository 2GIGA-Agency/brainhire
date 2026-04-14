import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CompanyInfo {
	inn: number | null;
	company_name: string;
	company_description: string;
	size: string;
	hrs_count: string;
	vacancies_in_month: string;
}

export interface RegistrationForm {
	first_name: string;
	last_name: string;
	middle_name: string;
	email: string;
	phone: number | null;
	professional_role: string;
	company: CompanyInfo;
}

const initialState: RegistrationForm = {
	first_name: '',
	last_name: '',
	middle_name: '',
	email: '',
	phone: null,
	professional_role: '',
	company: {
		inn: null,
		company_name: '',
		company_description: '',
		size: '',
		hrs_count: '',
		vacancies_in_month: '',
	},
};

const registrationSlice = createSlice({
	name: 'registration',
	initialState,
	reducers: {
		// Устанавливает сразу все поля формы
		setRegistrationData: (_, action: PayloadAction<RegistrationForm>): RegistrationForm => {
			const state = { ...action.payload };
			state.company.hrs_count = action.payload.company.hrs_count[0];
			state.company.size = action.payload.company.size[0];
			state.company.vacancies_in_month = action.payload.company.vacancies_in_month[0];
			return state;
		},
		// Сбрасывает форму к начальному состоянию
		resetRegistration: () => initialState,
	},
});

export const { setRegistrationData, resetRegistration } = registrationSlice.actions;
export default registrationSlice.reducer;
