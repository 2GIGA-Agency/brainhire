// src/components/sections/lk/vacancy/create/LanguageChoice.tsx
import { Block } from '@/components/shared/Block';
import { Selection } from '@/components/shared/Selection';
import { createListCollection } from '@chakra-ui/react';
import {
	selectSelectedLanguage,
	setSelectedLanguage,
} from '@/store/slices/vacancyCreation/languageChoiceSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';

const languages = [
	{
		name: 'Русский',
		value: 'ru',
	},
	{
		name: 'English',
		value: 'en',
	},
];

const languagesCollection = createListCollection({
	items: languages.map((i) => ({
		label: i.name,
		value: i.value,
	})),
});

export const LanguageChoice = () => {
	const dispatch = useAppDispatch();
	const selectedLanguage = useAppSelector(selectSelectedLanguage);

	// Обработчик изменения языка
	const handleLanguageChange = (value: string) => {
		console.log('[LanguageChoice Component] Selected language:', value);
		dispatch(setSelectedLanguage(value));
	};

	return (
		<Block
			headingText="Язык вакансии"
			subHeadingText="Выберите язык, на котором наш AI будет генерировать вакансию, вопросы для интервью и тест"
		>
			<Selection
				collection={languagesCollection}
				placeholder="Выберите язык"
				value={selectedLanguage || null} // Передаем текущее значение из Redux
				onChange={handleLanguageChange} // Обработчик изменения значения
			/>
		</Block>
	);
};
