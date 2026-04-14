import React, { useCallback, useMemo, useState } from 'react';
import { InputWithSuggestions } from '@/components/shared/InputWithSuggestions';
import axios from '@/utils/axios';
import { debounce } from '@/utils/debounce';
import { isTextInputValid, normalizeTextInput } from '@/utils/inputValidation';

export type CompanySuggestion = { text: string; id?: string };

interface CompaniesWithSuggestionsProps {
	selectedCompanies: string[];
	onSelect: (value: string) => void;
	onRemove: (value: string) => void;
	placeholder?: string;
}

const fetchCompanySuggestions = async (text: string): Promise<CompanySuggestion[]> => {
	try {
		const res = await axios.get(
			'/api/hh/public/suggests/companies', {
				params: { text },
			}
		);

		if (!Array.isArray(res.data?.items)) {
			return [];
		}

		return res.data.items
			.filter((item: any) => typeof item?.text === 'string')
			.map((item: any) => ({
				id: String(item.id ?? ''),
				text: item.text as string,
			}));
	} catch (error) {
		console.error('Ошибка при загрузке подсказок компаний:', error);
		return [];
	}
};

export const CompaniesWithSuggestions = ({
	selectedCompanies,
	onSelect,
	onRemove,
	placeholder = 'Добавьте компанию и нажмите Enter',
}: CompaniesWithSuggestionsProps) => {
	const [suggestions, setSuggestions] = useState<CompanySuggestion[]>([]);
	const [inputValue, setInputValue] = useState('');

	const debouncedFetch = useMemo(
		() =>
			debounce(300, async (value: string) => {
				setSuggestions(await fetchCompanySuggestions(value));
			}),
		[]
	);

	const handleInputChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const raw = e.target.value;
			setInputValue(raw);

			const normalized = normalizeTextInput(raw);

			if (!normalized) {
				setSuggestions([]);
				return;
			}

			if (!isTextInputValid(normalized)) {
				// Не дергаем подсказки и не показываем варианты для мусорных строк
				setSuggestions([]);
				return;
			}

			debouncedFetch(normalized);
		},
		[debouncedFetch]
	);

	const handleCompanySelect = (name: string) => {
		const selected = suggestions.find((s) => s.text === name);
		const value = selected ? selected.text : name;

		if (!selectedCompanies.includes(value)) {
			onSelect(value);
		}

		setInputValue('');
		setSuggestions([]);
	};

	const handleRemove = (name: string) => {
		onRemove(name);
	};

	const addInputAsCompany = () => {
		const trimmed = normalizeTextInput(inputValue);
		if (!trimmed) {
			return;
		}

		if (!isTextInputValid(trimmed)) {
			return;
		}

		if (!selectedCompanies.includes(trimmed)) {
			onSelect(trimmed);
		}
		setInputValue('');
		setSuggestions([]);
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter' && inputValue.trim()) {
			e.preventDefault();
			addInputAsCompany();
		}
	};

	return (
		<InputWithSuggestions
			selectedItems={selectedCompanies}
			suggestions={suggestions}
			onSelectItem={handleCompanySelect}
			onRemoveItem={handleRemove}
			onInputChange={handleInputChange}
			inputValue={inputValue}
			placeholder={placeholder}
			onKeyDown={handleKeyDown}
		/>
	);
};
