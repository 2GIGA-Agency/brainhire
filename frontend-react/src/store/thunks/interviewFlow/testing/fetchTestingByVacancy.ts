import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { RootState } from '../../../store'
import { TestingByVacancyResponse } from '../../../types'


// Thunk для получения данных о тесте, нужен для получения списка вопросов для отображения
export const fetchTestingByVacancy = createAsyncThunk<
  TestingByVacancyResponse,
  void,
  {
    rejectValue: string,
    state: RootState
  }
>(
  'interviewFlow/fetchTestByVacancy',
  async (_arg, { getState, rejectWithValue }) => {
    try {
      const vacancyId = getState().interviewFlow.startInterviewData?.vacancy_with_interview.id;
      const response = await axios.get<TestingByVacancyResponse>(
        `/api/testing/tests/by_vacancy/${vacancyId}/`
      )
      return response.data
    } catch (err: any) {
      if (axios.isAxiosError(err) && err.response) {
        const msg =
          typeof err.response.data === 'string'
            ? err.response.data
            : JSON.stringify(err.response.data)
        return rejectWithValue(msg)
      }
      return rejectWithValue(err.message)
    }
  }
)
