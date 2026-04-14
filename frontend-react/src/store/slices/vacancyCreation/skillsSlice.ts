// src/store/slices/skillsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/store/store';

export interface SkillItem {
	id: string;
	text: string;
}

export interface SkillsState {
	skills: string[];
}

const initialState: SkillsState = {
	skills: [],
};

export const skillsSlice = createSlice({
	name: 'skills',
	initialState,
	reducers: {
		setSkills: (state, action: PayloadAction<string[]>) => {
			state.skills = action.payload;
		},
		resetSkills: () => initialState,
	},
});

export const { setSkills, resetSkills } = skillsSlice.actions;

export const selectSkills = (state: RootState) => state.vacancyCreation.skills.skills;

export default skillsSlice.reducer;
