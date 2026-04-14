import { RootState } from '@/store/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CompanyVideoState {
	hasVideo: boolean; // Флаг, указывающий, хочет ли пользователь загрузить видео
	videoFile: File | null; // Загруженный файл видео
	videoUrl: string; // URL видео
}

const initialState: CompanyVideoState = {
	hasVideo: false, // По умолчанию "Нет"
	videoFile: null,
	videoUrl: '',
};

export const companyVideoSlice = createSlice({
	name: 'companyVideo',
	initialState,
	reducers: {
		setHasVideo: (state, action: PayloadAction<boolean>) => {
			state.hasVideo = action.payload;
		},
		setVideoFile: (state, action: PayloadAction<File | null>) => {
			state.videoFile = action.payload;
		},
		setVideoUrl: (state, action: PayloadAction<string>) => {
			state.videoUrl = action.payload;
		},
		resetVideoState: (state) => {
			state.hasVideo = false;
			state.videoFile = null;
			state.videoUrl = '';
		},
	},
});

export const { setHasVideo, setVideoFile, setVideoUrl, resetVideoState } =
	companyVideoSlice.actions;

export const selectHasVideo = (state: RootState): boolean =>
	state.vacancyCreation.companyVideo.hasVideo;
export const selectVideoFile = (state: RootState): File | null =>
	state.vacancyCreation.companyVideo.videoFile;
export const selectVideoUrl = (state: RootState): string =>
	state.vacancyCreation.companyVideo.videoUrl;

export default companyVideoSlice.reducer;
