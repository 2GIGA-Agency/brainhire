import { setCopyCount, setDevToolsCount, setLostWindowCount } from '@/store/slices/interviewFlow';
import { RootState } from '@/store/store';
import axios from '@/utils/axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

interface AntiFrodResponse {
	dev_tools_count: number;
	lost_window_focus_count: number;
	copy_count: number;
}

export const sendAntiFrod = createAsyncThunk<void, void, { state: RootState; rejectValue: string }>(
	'interivew/antiSendAntiFrod',
	async (_, { getState, rejectWithValue }) => {
		const interviewFlowState = getState().interviewFlow;

		const { devToolsCount, lostWindowFocusCount, copyCount, candidateId } = interviewFlowState;

		try {
			const response = await axios.patch(`/api/candidates/antifrod/${candidateId}/`, {
				dev_tools_count: devToolsCount,
				lost_window_focus_count: lostWindowFocusCount,
				copy_count: copyCount,
			});

			return response.data;
		} catch (err: any) {
			if (axios.isAxiosError(err) && err.response) {
				return rejectWithValue(
					typeof err.response.data === 'string'
						? err.response.data
						: JSON.stringify(err.response.data)
				);
			}
			return rejectWithValue(err.message);
		}
	}
);

export const getAntiFrod = createAsyncThunk<void, void, { rejectValue: string; state: RootState }>(
	'interviewFlow/getAntiFrod',
	async (_, { rejectWithValue, getState, dispatch }) => {
		const candidateId = getState().interviewFlow.candidateId;

		try {
			const response = await axios.get<AntiFrodResponse>(`/api/candidates/antifrod/${candidateId}`);

			const { dev_tools_count, lost_window_focus_count, copy_count } = response.data;

			dispatch(setDevToolsCount({ count: dev_tools_count }));
			dispatch(setLostWindowCount({ count: lost_window_focus_count }));
			dispatch(setCopyCount({ count: copy_count }));
		} catch (err: any) {
			if (axios.isAxiosError(err) && err.response) {
				return rejectWithValue(
					typeof err.response.data === 'string'
						? err.response.data
						: JSON.stringify(err.response.data)
				);
			}
			return rejectWithValue(err.message);
		}
	}
);
