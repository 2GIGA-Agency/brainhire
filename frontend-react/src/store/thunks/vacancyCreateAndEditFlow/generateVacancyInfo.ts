import axios from '@/utils/axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import hh_field_labels from '@/hh_vacancy_field_reference.json';

import {
	setConditions,
	setEmploymentType,
	setExperience,
	setJobLevel,
	setRequirements,
	setResponsibilities,
	setSalaryFrom,
	setSalaryTo,
	setTitle,
} from '@/store/slices/vacancyCreation/vacancyInfoSlice';

interface GenerationResponse {
	vacancy_name: string;
	candidate_level: string;
	type_employment: string;
	work_schedule: string;
	work_format: string;
	payment_per_month_range: [number, number];
	required_work_experience: string;
	description_responsibilities: string;
	description_requirements: string;
	description_conditions: string;
	skills: string[];
}

// Thunk для генерации вакансии
export const generateVacancyInfo = createAsyncThunk(
	'vacancy/generateInfo',
	async (vacancyShortDescription: string, { dispatch, rejectWithValue }) => {
		const requestBody = {
			vacancy_short_description: vacancyShortDescription,
		};

		try {
			const response = await axios.post<GenerationResponse>(
				'/api/vacancies/generation/',
				requestBody,
				{
					headers: {
						'Content-Type': 'application/json',
					},
				}
			);
			const vacancyInfo = response.data;

			const experience = hh_field_labels.experience.find(
				(i) => i.name == vacancyInfo.required_work_experience
			)?.id;
			const employmentType = hh_field_labels.employment.find(
				(i) => i.name == vacancyInfo.type_employment
			)?.id;
			const jobLevel = hh_field_labels.level_candidate.find(
				(i) => i.id == vacancyInfo.candidate_level
			)?.id;

			dispatch(setTitle(vacancyInfo.vacancy_name));
			dispatch(setJobLevel(jobLevel || hh_field_labels.level_candidate[0].id));
			dispatch(setEmploymentType(employmentType || hh_field_labels.employment[0].id));
			dispatch(setSalaryFrom(vacancyInfo.payment_per_month_range[0]));
			dispatch(setSalaryTo(vacancyInfo.payment_per_month_range[1]));
			dispatch(setExperience(experience || hh_field_labels.experience[0].id));
			dispatch(setResponsibilities(vacancyInfo.description_responsibilities));
			dispatch(setRequirements(vacancyInfo.description_requirements));
			dispatch(setConditions(vacancyInfo.description_conditions));
		} catch (e: any) {
			rejectWithValue(e.messsage);
		}
	}
);
