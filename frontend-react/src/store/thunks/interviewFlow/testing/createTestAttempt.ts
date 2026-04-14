import { RootState } from "@/store/store";
import { CreateTestAttemptPayload, CreateTestAttemptResponse } from "@/store/types";
import axios from "@/utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const createTestAttempt = createAsyncThunk<CreateTestAttemptResponse, void, { rejectValue: string, state: RootState }>(
    "testing/createTestAttempt",
    async (_, { getState, rejectWithValue }) => {

        try {
            const state = getState();
            
            const candidateId = state?.interviewFlow?.startInterviewData?.candidate.id
            const testId = state?.interviewFlow.vacancyTestingData?.id;

            const payload: CreateTestAttemptPayload = {
                candidate: candidateId || "",
                test: testId || NaN,
            }

            const { data } = await axios.post<CreateTestAttemptResponse>("/api/testing/test_attempts/", payload);

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
)