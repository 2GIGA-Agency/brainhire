import { RootState } from "@/store/store";
import { CandidateVideoInterview } from "@/store/types";
import axios from "@/utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const fetchVideoInterviewAttempt = createAsyncThunk<CandidateVideoInterview, void, { rejectValue: string, state: RootState }>(
    "interviewFlow/fetchVideInterviewAttempt",
    async (_, { rejectWithValue, getState }) => {
        const state = getState();
        const candidateInterviewId = state.interviewFlow.candidateInterviewId;
        
        try {
            const response = await axios.get<CandidateVideoInterview>(`/api/candidates/current_interview/${candidateInterviewId}`);
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
    }
)