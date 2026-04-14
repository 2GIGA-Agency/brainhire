import React, { useCallback, useState } from 'react';
import { InputWithSuggestions } from '@/components/shared/InputWithSuggestions';
import axios from '@/utils/axios';
import { isTextInputValid, normalizeTextInput } from '@/utils/inputValidation';
import { debounce } from '@/utils/debounce';
import { SkillItem } from '@/store/slices/vacancyCreation/skillsSlice';
import { isSkillItem } from './typeguards';

interface Props {
	selectedSkills: SkillItem[] | string[];
	onSelect: (value: string) => void;
	onRemove: (value: string) => void;
	isOutbound: boolean;
}

export const fetchSkills = async (text: string) => {
	const response = await axios.get(
		`https://api.hh.ru/suggests/skill_set?text=${encodeURIComponent(text)}`
	);
	return response.data.items;
};

// Функция для нормализации строки для сравнения
const normalizeString = (str: string): string => {
	return str
		.toLowerCase()
		.replace(/\s+/g, ' ') // Заменяем множественные пробелы на один
		.trim() // Убираем пробелы в начале и конце
		.replace(/\s/g, ''); // Убираем все пробелы
};

export const SkillsWithSuggestions = ({
	selectedSkills,
	onSelect,
	onRemove,
	isOutbound,
}: Props) => {
	const [suggestions, setSuggestions] = useState<SkillItem[]>([]);
	const [inputValue, setInputValue] = useState('');

	const selectedSkillsText = selectedSkills.map((i) => {
		if (isOutbound && isSkillItem(i)) {
			return i.text;
		}
		try {
			if (typeof i === 'string') {
				return JSON.parse(i).text;
			}
		} catch (e: any) {
			return i;
		}
	});

	// Нормализованный массив выбранных навыков для сравнения
	const normalizedSelectedSkills = selectedSkillsText.map((skill) =>
		normalizeString(typeof skill === 'string' ? skill : String(skill))
	);

	const fetchSuggestions = useCallback(
		debounce(300, async (text: string) => {
			const suggestions = await fetchSkills(text);
			setSuggestions(suggestions);
		}),
		[] // Зависимости не нужны, так как debounce сам управляет вызовами
	);

	const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const newText = e.target.value;
		setInputValue(newText);
		if (newText.length == 0) {
			setSuggestions([]);
		}
		fetchSuggestions(newText);
	};

	const handleSkillSelect = (skill: string) => {
		const selectedSuggestion = suggestions.find((s) => s.text === skill);
		if (selectedSuggestion) {
			const newSuggestion = JSON.stringify({
				id: selectedSuggestion.id,
				text: selectedSuggestion.text,
			});

			// Проверяем, нет ли уже такого навыка (с учетом нормализации)
			const normalizedSkill = normalizeString(skill);
			if (!normalizedSelectedSkills.includes(normalizedSkill)) {
				onSelect(newSuggestion);
			}
		}
		setInputValue('');
		setSuggestions([]);
	};

	const handleRemoveSkill = (skill: string) => {
		onRemove(skill);
	};

	const addInputAsSkill = () => {
		const trimmedValue = normalizeTextInput(inputValue);

		if (!trimmedValue) {
			return;
		}

		if (!isTextInputValid(trimmedValue)) {
			return;
		}

		const normalizedInput = normalizeString(trimmedValue);

		// Проверяем, нет ли уже такого навыка (с учетом нормализации)
		if (!normalizedSelectedSkills.includes(normalizedInput)) {
			const newSkill = JSON.stringify({
				id: Date.now().toString(),
				text: trimmedValue, // сохраняем оригинальный регистр
			});
			onSelect(newSkill);
			setInputValue('');
			setSuggestions([]);
		}
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter' && inputValue.trim()) {
			e.preventDefault();
			addInputAsSkill();
		}
	};

	return (
		<InputWithSuggestions
			selectedItems={selectedSkillsText}
			suggestions={suggestions}
			onSelectItem={handleSkillSelect}
			onRemoveItem={handleRemoveSkill}
			onInputChange={handleInputChange}
			inputValue={inputValue}
			onKeyDown={handleKeyDown}
		/>
	);
};
