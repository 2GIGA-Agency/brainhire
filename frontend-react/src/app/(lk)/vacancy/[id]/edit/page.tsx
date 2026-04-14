'use client';

import VacancyForm from '@/components/sections/lk/vacancy/VacancyForm';
import { selectIsEdit, setIsEdit } from '@/store/slices/vacancyCreation/vacancyCreationSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';

export default function EditVacancy() {
	const dispatch = useAppDispatch();
	const isEdit = useAppSelector(selectIsEdit);

	if (!isEdit) {
		dispatch(setIsEdit(true));
	}
	return <VacancyForm />;
}
