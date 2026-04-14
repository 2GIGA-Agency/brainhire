import { Profile } from '@/store/rtkQuery/api';
import { setTipsShow, setTutorialShow } from '@/store/slices/appSlice';
import { RootState } from '@/store/store';
import axios from '@/utils/axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const sendTutorialStatus = createAsyncThunk(
	'app/sendTutorialStatus',
	async (_, { rejectWithValue }) => {
		try {
			const response = await axios.put('/api/profiles/', {
				tutorial: false,
			});

			return response.data;
		} catch (e: any) {
			return rejectWithValue(e.response.data.message);
		}
	}
);

export const toggleTips = createAsyncThunk<void, void, { rejectValue: string; state: RootState }>(
	'app/toggleTips',
	async (_, { getState, rejectWithValue }) => {
		try {
			const tips = getState().app.isTipsShow;

			await axios.put('/api/profiles/', {
				tips: !tips,
			});
		} catch (e: any) {
			return rejectWithValue(e.response.data.message);
		}
	}
);

export const checkTipsStatus = createAsyncThunk<
	Profile,
	void,
	{ rejectValue: string; state: RootState }
>('app/checkTipsStatus', async (_, { dispatch, rejectWithValue }) => {
	try {
		const response = await axios.get<Profile>('/api/profiles/');

		const profile = response.data;

		if (profile?.tutorial) {
			dispatch(setTutorialShow(true));
		}

		if (profile?.tips) {
			dispatch(setTipsShow(true));
		}

		return profile;
	} catch (e: any) {
		return rejectWithValue(e.response.data.message);
	}
});
