import axios from "@/utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const createLimitToVacancy = createAsyncThunk(
    "limits/createLimitToVacancy",
    async ({ vacancyId, limits }: { vacancyId: string, limits: number }) => {
        const payload = {
            increment: limits,
        }

        const response = await axios.post(`/api/vacancies/limits/${vacancyId}/increase/`, payload);

        return response.data;
    }
)