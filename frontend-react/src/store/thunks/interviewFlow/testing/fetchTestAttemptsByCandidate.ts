import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { RootState } from '../../../store';
import { TestAttemptResponse } from '../../../types';

// Thunk для получения поптыки тестирования кандидатом, если попытка была, то кандидата будет перекидывать сразу на нужный вопрос
// после шага requirements, логика перекидывания настроена в extraReducers и Requirements/index.tsx
export const fetchTestAttemptsByCandidate = createAsyncThunk<
	TestAttemptResponse,
	void,
	{
		state: RootState;
		rejectValue: string;
	}
>(
	'testing/fetchTestAttemptsByCandidate',
	async (_arg, { getState, rejectWithValue }) => {
		const candidateId = getState().interviewFlow.candidateId;
		if (!candidateId) {
			return rejectWithValue('Candidate ID is missing in state');
		}

		try {
			const response = await axios.get<TestAttemptResponse>(
				`/api/testing/test_attempts/by_candidate/${candidateId}/`
			);
			return response.data;
		} catch (err: any) {
			if (axios.isAxiosError(err) && err.response) {
				const msg =
					typeof err.response.data === 'string'
						? err.response.data
						: JSON.stringify(err.response.data);
				return rejectWithValue(msg);
			}
			return rejectWithValue(err.message);
		}
	});
