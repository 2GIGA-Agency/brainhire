import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from '@/utils/axios'
import type { PersonalInterviewResponse } from '@/store/types'

export const startInterview = createAsyncThunk<
  PersonalInterviewResponse,
  string,
  { rejectValue: string }
>(
  'interviewFlow/startInterview',
  async (candidateId, { rejectWithValue }) => {
    try {
      const res = await axios.get<PersonalInterviewResponse>(
        `/api/candidates/personal_interview/${candidateId}/`
      )
      return res.data
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.error || 'Ошибка загрузки интервью'
      )
    }
  }
)
