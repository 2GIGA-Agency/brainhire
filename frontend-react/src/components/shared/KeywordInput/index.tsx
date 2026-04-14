import React, { useState } from 'react';
import axios from 'axios';
import { Box } from '@chakra-ui/react';
import { InputWithSuggestions } from '@/components/shared/InputWithSuggestions';
import { debounce } from '@/utils/debounce';
import { SuggestionItem, TextsSuggestionsResponse } from './types';

interface Props {
	keywords: string[];
	onSelect: (value: string) => void;
	onRemove: (value: string) => void;
}

export const KeywordsInput = ({ keywords, onSelect, onRemove }: Props) => {
	const [keywordsSuggestions, setKeywordsSuggestions] = useState([] as SuggestionItem[]);
	const [inputValue, setInputValue] = React.useState('');

	const handleFetchKeywordSuggestions = React.useCallback(async (text: string) => {
		if (text.trim()) {
			const encodedText = encodeURIComponent(text);

			try {
				// Пробуем прямой запрос к HH
				const res = await axios.get<TextsSuggestionsResponse>(
					`https://api.hh.ru/suggests/resume_search_keyword?text=${encodedText}`
				);
				setKeywordsSuggestions(res.data.items);
			} catch (error: any) {
				// Если получили 403 Forbidden, пробуем через прокси
				if (error.response && error.response.status === 403) {
					try {
						const proxyRes = await axios.get<TextsSuggestionsResponse>(
							`/api/hh/public/suggests/resume_search_keyword?text=${encodedText}`
						);
						setKeywordsSuggestions(proxyRes.data.items);
					} catch (proxyError) {
						console.error('Ошибка при загрузке подсказок (proxy):', proxyError);
						setKeywordsSuggestions([]);
					}
				} else {
					// Обработка остальных ошибок (не 403)
					console.error('Ошибка при загрузке подсказок:', error);
					setKeywordsSuggestions([]);
				}
			}
		} else {
			setKeywordsSuggestions([]);
		}
	}, []);

	const debouncedFetchSuggestions = React.useMemo(
		() => debounce(300, handleFetchKeywordSuggestions),
		[handleFetchKeywordSuggestions]
	);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value);
		debouncedFetchSuggestions(e.target.value);
	};

	// Выбор из подсказок (клик или Enter на активном элементе)
	const handleSelectKeyword = (keyword: string) => {
		if (!keywords.includes(keyword)) {
			onSelect(keyword);
		}
		setInputValue('');
		setKeywordsSuggestions([]);
	};

	// Обработка нажатия Enter, когда поле не пусто и не выбран элемент из списка
	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter' && inputValue.trim() !== '') {
			e.preventDefault();
			const trimmed = inputValue.trim();
			if (!keywords.includes(trimmed)) {
				onSelect(trimmed);
			}
			setInputValue('');
			setKeywordsSuggestions([]);
		}
	};

	const handleRemoveKeyword = (keywordToRemove: string) => {
		onRemove(keywordToRemove);
	};

	const renderKeyword = (keyword: string) => {
		try {
			return keyword;
		} catch {
			return 'Неверный формат ключевого слова';
		}
	};

	return (
		<Box width={'100%'}>
			<InputWithSuggestions
				selectedItems={keywords}
				suggestions={keywordsSuggestions}
				onSelectItem={handleSelectKeyword}
				onRemoveItem={handleRemoveKeyword}
				onInputChange={handleInputChange}
				inputValue={inputValue}
				placeholder="Введите ключевые слова для поиска по резюме"
				renderItem={renderKeyword}
				width="100%"
				selectPosition="down"
				onKeyDown={handleKeyDown} // Передаём обработчик для Enter
			/>
		</Box>
	);
};
