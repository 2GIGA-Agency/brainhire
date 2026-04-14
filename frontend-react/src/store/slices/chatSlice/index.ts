import { RootState } from '@/store/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ChatFilters {
	vacancy: string[];
	unread_only: boolean;
}

interface ChatState {
	selectedTopicId: string;
	filters: ChatFilters;
	searchQuery: string;
}

export const defaultChatFilters: ChatFilters = {
	vacancy: [],
	unread_only: false,
};

const initialState: ChatState = {
	selectedTopicId: '',
	filters: defaultChatFilters,
	searchQuery: '',
};

const chatSlice = createSlice({
	name: 'chatSlice',
	initialState,
	reducers: {
		setSelectedTopicId: (state, action: PayloadAction<string>) => {
			state.selectedTopicId = action.payload;
		},
		setFilters: (state, action: PayloadAction<ChatFilters>) => {
			state.filters = action.payload;
		},
		resetFilters: (state) => {
			state.filters = initialState.filters;
		},
		// Для поиска
		setSearchQuery: (state, action: PayloadAction<string>) => {
			state.searchQuery = action.payload;
		},
		clearSearchQuery: (state) => {
			state.searchQuery = '';
		},
	},
});

export const { setSelectedTopicId, setFilters, resetFilters, setSearchQuery, clearSearchQuery } =
	chatSlice.actions;

// Селекторы
export const selectSelectedTopicId = (state: RootState) => state.chat.selectedTopicId;
export const selectChatFilters = (state: RootState) => state.chat.filters;
export const selectSearchQuery = (state: RootState) => state.chat.searchQuery;

// Комбинированные селекторы (опционально)
export const selectHasActiveFilters = (state: RootState) => {
	const { filters } = state.chat;
	return filters.vacancy.length > 0 || filters.unread_only;
};

export const selectIsSearchActive = (state: RootState) => {
	return state.chat.searchQuery.trim().length > 0;
};

export default chatSlice.reducer;
