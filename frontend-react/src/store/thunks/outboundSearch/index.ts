import { RootState } from '@/store/store';
import axios from '@/utils/axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';

export interface OutboundSearchResponse {
	message: string;
	task_id: string;
}

export const sendOutboundSearch = createAsyncThunk<
	OutboundSearchResponse,
	string,
	{ rejectValue: string; state: RootState }
>('outboundSearch/sendOutboundSearch', async (vacancyId, { getState, rejectWithValue }) => {
	const state = getState().outboundSearch;

	const messages: string[] = [];

	if (Number(state.candidatesCount) <= 0) {
		messages.push('количество кандидатов для поиска должно быть больше 0');
	}

	if (Number(state.candidatesCount) > 100) {
		messages.push('количество кандидатов не должно превышать 100');
	}

	if (Number(state.ageFrom) > 100 || Number(state.ageTo) > 100) {
		messages.push('возраст не должен превышать 100');
	}

	if (Number(state.ageFrom) > Number(state.ageTo)) {
		messages.push('возраст "от" не должен быть больше возраста "до"');
	}

	if (state.areas?.id === undefined) {
		messages.push('регион не выбран');
	}

	if (messages.length > 0) {
		return rejectWithValue(messages.join(', '));
	}

	const formattedLanguages = state.languagePairs
		.filter((pair) => pair.language && pair.level)
		.map((pair) => `${pair.language}.${pair.level}`);

	const payload = {
		vacancy_id: vacancyId,
		candidates_count: state.candidatesCount,
		age_from: state.ageFrom || '',
		age_to: state.ageTo || '',
		gender: state.gender,
		relocation: state.relocation,
		driver_license_type: state.driverLicenseType,
		education_levels: state.educationLevels,
		employment: state.employment,
		language: formattedLanguages.length > 0 ? formattedLanguages : '',
		// professional_role: state.specialization?.id,
		// citizenship: state.citizenship || '',
		// work_ticket: state.workTicket || '',
		job_search_status: state.jobSearchStatus,
		schedule: state.schedule,
		experience: state.experience,
		order_by: state.orderBy,
		// skills: state.skills.map((i) => i.id),
		area: [state.areas?.id],
		text: state.keywords,
	};

	// Фильтруем поля, удаляя те, у которых значение - пустая строка
	const filteredPayload = Object.entries(payload).reduce(
		(acc, [key, value]) => {
			if (value !== '' && value !== undefined) {
				if (Array.isArray(value) && value.length === 0) {
					return acc;
				}
				acc[key] = value;
			}
			return acc;
		},
		{} as Record<string, any>
	);

	try {
		const response = await axios.post<any, AxiosResponse<OutboundSearchResponse>>(
			'/api/hh/outbound_search/run_outbound_search/',
			filteredPayload
		);
		return response.data;
	} catch (error: any) {
		if (error.message) {
			console.error(error);
			return rejectWithValue(error.response.data.message);
		}
		return rejectWithValue('An unknown error occurred');
	}
});
