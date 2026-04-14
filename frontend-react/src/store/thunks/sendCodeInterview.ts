import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';
import { SendCodePayload, SendCodeResponse } from '../types';
import { setError } from '../slices/interviewFlow';

export const sendCode = createAsyncThunk<
	SendCodeResponse,
	void,
	{
		rejectValue: string;
		state: RootState;
	}
>('candidates/sendCode', async (_arg, { getState, rejectWithValue, dispatch }) => {
	try {
		const state = getState().interviewFlow.startInterviewData;

		const { vacancy_with_interview } = state;
		const { first_name, last_name, email } = state?.candidate;

		const payload: SendCodePayload = {
			first_name,
			last_name,
			email,
			vacancy_with_interview,
		};

		const { data } = await axios.post<SendCodeResponse>('/api/candidates/send_code/', payload);
		return data;
	} catch (err: any) {
		if (axios.isAxiosError(err) && err.response?.data.error) {
			dispatch(setError(err.response?.data.error));
			return rejectWithValue(
				typeof err.response.data === 'string'
					? err.response.data
					: JSON.stringify(err.response.data)
			);
		}

		return rejectWithValue(err.message);
	}
});
