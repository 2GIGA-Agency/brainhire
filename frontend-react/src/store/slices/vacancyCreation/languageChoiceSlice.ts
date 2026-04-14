// src/store/slices/languageChoiceSlice.ts
import { RootState } from '@/store/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LanguageChoiceState {
	selectedLanguage: string | null; // Выбранный язык (например, 'ru' или 'en')
}

const initialState: LanguageChoiceState = {
	selectedLanguage: null, // По умолчанию язык не выбран
};

export const languageChoiceSlice = createSlice({
	name: 'languageChoice',
	initialState,
	reducers: {
		setSelectedLanguage: (state, action: PayloadAction<string | null>) => {
			state.selectedLanguage = action.payload;
		},
		resetLanguage: (state) => {
			state.selectedLanguage = null;
		},
	},
});

export const { setSelectedLanguage, resetLanguage } = languageChoiceSlice.actions;

export const selectSelectedLanguage = (state: RootState): string | null =>
	state.vacancyCreation.languageChoice.selectedLanguage;

export default languageChoiceSlice.reducer;
