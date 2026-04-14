import { RootState } from '@/store/store';
import { sendTutorialStatus, toggleTips } from '@/store/thunks/app/tutorialThunks';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
	isBurgerShow: false,
	isTutorialShow: false,
	isTipsShow: false,
	isModalShow: false,
	isChatWidgetShow: false,
};

const appSlice = createSlice({
	name: 'appSlice',
	initialState,
	reducers: {
		toggleIsBurgerShow: (state) => {
			state.isBurgerShow = !state.isBurgerShow;
		},
		toggleIsTutorialShow: (state) => {
			state.isTutorialShow = !state.isTutorialShow;
		},
		toggleIsModalShow: (state) => {
			state.isModalShow = !state.isModalShow;
		},
		setTipsShow: (state, action: PayloadAction<boolean>) => {
			state.isTipsShow = action.payload;
		},
		setTutorialShow: (state, action: PayloadAction<boolean>) => {
			state.isTutorialShow = action.payload;
		},
		setIsChatWidgetShow: (state, action: PayloadAction<boolean>) => {
			state.isChatWidgetShow = action.payload;
		},
		toggleChatWidgetShow: (state) => {
			state.isChatWidgetShow = !state.isChatWidgetShow;
		},
	},
	extraReducers: (build) =>
		build
			.addCase(sendTutorialStatus.fulfilled, (state) => {
				state.isTutorialShow = false;
			})
			.addCase(toggleTips.fulfilled, (state) => {
				state.isTipsShow = !state.isTipsShow;
			}),
});

export const {
	toggleIsBurgerShow,
	toggleIsTutorialShow,
	toggleIsModalShow,
	setTipsShow,
	setTutorialShow,
	setIsChatWidgetShow,
	toggleChatWidgetShow,
} = appSlice.actions;

export const selectIsBurgerShow = (state: RootState) => state.app.isBurgerShow;
export const selectIsTutorialShow = (state: RootState) => state.app.isTutorialShow;
export const selectIsTipsShow = (state: RootState) => state.app.isTipsShow;
export const selectIsModalShow = (state: RootState) => state.app.isModalShow;
export const selectIsChatWidgetShow = (state: RootState) => state.app.isChatWidgetShow;

export default appSlice.reducer;
