import {
	VacancySettingsActionCreator,
	VacancySettingsSelector,
} from '@/store/slices/vacancyCreation/vacancySettings/vacancySettingsSlice';

export interface SettingsField<T> {
	text: string;
	tooltipText: string;
	selector: VacancySettingsSelector<T>;
	action: VacancySettingsActionCreator<T>;
	placeholder: string;
}
