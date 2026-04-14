import { RootState } from '@/store/store';
import { generateTestQuestions } from '@/store/thunks/vacancyCreateAndEditFlow/testingThunks';
import { generateInterviewQuestions } from '@/store/thunks/vacancyCreateAndEditFlow/interviewThunks';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { generateVacancyInfo } from '@/store/thunks/vacancyCreateAndEditFlow/generateVacancyInfo';
import { VacancyFormStep } from './types';
import { getVacancyFormSteps } from './constants';

interface VacancyCreationState {
	isAiGenerating: boolean;
	isEdit: boolean;
	currentStep: VacancyFormStep;
}

const initialState: VacancyCreationState = {
	isAiGenerating: false,
	isEdit: false,
	currentStep: 'description',
};

export const vacancyCreationSlice = createSlice({
	name: 'vacancyCreation',
	initialState,
	reducers: {
		toggleIsAiGenerating: (state) => {
			state.isAiGenerating = !state.isAiGenerating;
		},
		setIsEdit: (state, action: PayloadAction<boolean>) => {
			state.isEdit = action.payload;
		},
		setCurrentStep: (state, action: PayloadAction<VacancyFormStep>) => {
			state.currentStep = action.payload;
		},
		resetCurrentStep: (state) => {
			state.currentStep = getVacancyFormSteps(false)[0].id;
		},
	},
	extraReducers: (build) => {
		build
			.addCase(generateTestQuestions.pending, (state) => {
				state.isAiGenerating = true;
			})
			.addCase(generateInterviewQuestions.pending, (state) => {
				state.isAiGenerating = true;
			})
			.addCase(generateVacancyInfo.pending, (state) => {
				state.isAiGenerating = true;
			})
			.addCase(generateTestQuestions.rejected, (state) => {
				state.isAiGenerating = false;
			})
			.addCase(generateInterviewQuestions.rejected, (state) => {
				state.isAiGenerating = false;
			})
			.addCase(generateVacancyInfo.rejected, (state) => {
				state.isAiGenerating = true;
			})
			.addCase(generateTestQuestions.fulfilled, (state) => {
				state.isAiGenerating = false;
			})
			.addCase(generateInterviewQuestions.fulfilled, (state) => {
				state.isAiGenerating = false;
			})
			.addCase(generateVacancyInfo.fulfilled, (state) => {
				state.isAiGenerating = false;
			});
	},
});

export const { toggleIsAiGenerating, setIsEdit, setCurrentStep, resetCurrentStep } =
	vacancyCreationSlice.actions;

export const selectIsVacancyCreationAiGenerating = (state: RootState) =>
	state.vacancyCreation.vacancyCreation.isAiGenerating;

export const selectIsEdit = (state: RootState) => state.vacancyCreation.vacancyCreation.isEdit;
export const selectCurrentStep = (state: RootState) =>
	state.vacancyCreation.vacancyCreation.currentStep;

export default vacancyCreationSlice.reducer;
