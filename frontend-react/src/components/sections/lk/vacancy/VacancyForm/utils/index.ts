import { VacancySettingsState } from '@/store/slices/vacancyCreation/vacancySettings';
import { deepEqual } from '@/utils/deepEqual';

export const checkSettingsChanged = (
	initial: VacancySettingsState,
	current: VacancySettingsState
) => {
	// 1. Явно сравниваем простые типы данных (строки, булевы значения) и ссылки на файлы
	const simpleFieldsEqual =
		initial.presentation === current.presentation &&
		initial.video_url === current.video_url &&
		initial.previousPdf === current.previousPdf &&
		initial.previousVideo === current.previousVideo &&
		initial.feedback === current.feedback &&
		initial.reminder === current.reminder &&
		initial.changePattern === current.changePattern &&
		// Сравнение файлов по ссылке (File object). 
		// Если пользователь выбрал новый файл, объект File будет новым -> вернет false (изменено)
		initial.pdf === current.pdf &&
		initial.video === current.video;

	// 2. Сравниваем объект с ID выбранных шаблонов через deepEqual
	const templatesEqual = deepEqual(
		initial.selectedTemplateIds,
		current.selectedTemplateIds
	);

	// Функция должна вернуть true, если данные ИДЕНТИЧНЫ (изменений нет)
	return simpleFieldsEqual && templatesEqual;
};
