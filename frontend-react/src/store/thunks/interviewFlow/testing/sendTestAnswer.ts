import { setIsTestingPart } from '@/store/slices/interviewFlow';
import { RootState } from '@/store/store';
import { SendTestQuestionAnswerArgs, SendTestQuestionAnswerPayload } from '@/store/types';
import axios from '@/utils/axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

// Thunk для отправки выбранного вопроса на бек, также содержит обработку логики на последнем вопросе, т.е. завершаем тест, если вопрос
// был последним
export const sendTestAnswer = createAsyncThunk<
	void,
	SendTestQuestionAnswerArgs,
	{ rejectValue: string; state: RootState }
>(
	'interviewFlow/sendTestAnswer',
	async ({ question, selected_answer, last }, { rejectWithValue, getState, dispatch }) => {
		try {
			const state = getState().interviewFlow.startInterviewData;

			const candidate = state?.candidate.id || '';

			const payload: SendTestQuestionAnswerPayload = {
				candidate,
				question,
				selected_answer,
			};

			const { data } = await axios.post('/api/testing/candidate_answers/', payload);
			if (last) {
				await axios.post(`/api/testing/test_attempts/finish/${candidate}/`);
				dispatch(setIsTestingPart(false));
			}
			return data;
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
