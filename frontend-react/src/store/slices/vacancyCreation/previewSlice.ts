import { RootState } from '@/store/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
	initialCandidatesAmount: 0,
};

export const previewSlice = createSlice({
	name: 'preview',
	initialState,
	reducers: {
		updateInitialCandidatesAmount: (state, action: PayloadAction<number>) => {
			state.initialCandidatesAmount = action.payload;
		},
		resetPreview: () => initialState
	}
});

export const { updateInitialCandidatesAmount, resetPreview } = previewSlice.actions;
export default previewSlice.reducer;

export const selectInitialCandidatesAmount = (state: RootState) =>
	state.vacancyCreation.preview.initialCandidatesAmount;
