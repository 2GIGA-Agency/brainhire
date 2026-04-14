import { resetCompanyChoice } from '@/store/slices/vacancyCreation/companySlice';
import { resetInterview } from '@/store/slices/vacancyCreation/interviewSlice';
import { resetPreview } from '@/store/slices/vacancyCreation/previewSlice';
import { resetSkills } from '@/store/slices/vacancyCreation/skillsSlice';
import { resetSelectableSkills } from '@/store/slices/vacancyCreation/selectableSkillsSlice';
import { resetTesting } from '@/store/slices/vacancyCreation/testingSlice';
import { resetCurrentStep } from '@/store/slices/vacancyCreation/vacancyCreationSlice';
import { resetVacancyInfo } from '@/store/slices/vacancyCreation/vacancyInfoSlice';
import { resetVacancySettings } from '@/store/slices/vacancyCreation/vacancySettings';
import { resetCompanyFilter } from '@/store/slices/vacancyCreation/companyFilterSlice';
import { resetVacancyBot } from '@/store/slices/vacancyCreation/vacancyBotSlice';
import { useAppDispatch } from '@/store/store';
import { useCallback, useMemo } from 'react';

export const useResetVacancyInfo = () => {
	const dispatch = useAppDispatch();

	const actionsToDispatch = useMemo(
		() => [
			resetInterview(),
			resetPreview(),
			resetTesting(),
			resetVacancyInfo(),
			resetCompanyChoice(),
			resetVacancySettings(),
			resetSkills(),
			resetCurrentStep(),
			resetSelectableSkills(),
			resetCompanyFilter(),
			resetVacancyBot(),
		],
		[]
	);

	const reset = useCallback(() => {
		actionsToDispatch.forEach((action) => dispatch(action));
	}, [actionsToDispatch, dispatch]);

	return reset;
};
