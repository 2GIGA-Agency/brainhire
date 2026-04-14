import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ChatState {
	isChatWidgetShow: boolean;
	searchQuery: string;
}

const initialState: ChatState = {
	isChatWidgetShow: false,
	searchQuery: '',
};

const chatSlice = createSlice({
	name: 'chat',
	initialState,
	reducers: {
		setIsChatWidgetShow: (state, action: PayloadAction<boolean>) => {
			state.isChatWidgetShow = action.payload;
		},
		toggleChatWidgetShow: (state) => {
			state.isChatWidgetShow = !state.isChatWidgetShow;
		},
		setSearchQuery: (state, action: PayloadAction<string>) => {
			state.searchQuery = action.payload;
		},
	},
});

export const { setIsChatWidgetShow, toggleChatWidgetShow } = chatSlice.actions;

export const selectIsChatWidgetShow = (state: { chat: ChatState }) => state.chat.isChatWidgetShow;
export const selectSearchQuery = (state: { chat: ChatState }) => state.chat.searchQuery;

export default chatSlice.reducer;
