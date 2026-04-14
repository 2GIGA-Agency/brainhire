import React, { useState } from 'react';
import { RegionInfo } from '@/store/slices/vacancyCreation/vacancyInfoSlice';
import axios from 'axios';
import { Box } from '@chakra-ui/react';
import { InputWithSuggestions } from '@/components/shared/InputWithSuggestions';
import { debounce } from '@/utils/debounce';
import { AreasSuggestsResponse } from './types';

interface Props {
	regions: string[];
	onSelectRegion: (value: string) => void;
	onRemoveRegion: (value: string) => void;
	maxElements?: number;
}

export const RegionsInput = ({ regions, onSelectRegion, onRemoveRegion }: Props) => {
	const [regionSuggestions, setRegionSuggestions] = useState([] as RegionInfo[]);
	const [inputValue, setInputValue] = React.useState('');

	const handleFetchRegionSuggestions = React.useCallback(async (text: string) => {
		if (text.trim()) {
			try {
				const res = await axios.get<AreasSuggestsResponse>(
					`https://api.hh.ru/suggests/areas?text=${encodeURIComponent(text)}`
				);
				setRegionSuggestions(res.data.items);
			} catch (error) {
				console.error('Ошибка при загрузке подсказок:', error);
				setRegionSuggestions([]);
			}
		} else {
			setRegionSuggestions([]);
		}
	}, []);

	const debouncedFetchSuggestions = React.useMemo(
		() => debounce(300, handleFetchRegionSuggestions),
		[handleFetchRegionSuggestions]
	);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value);
		debouncedFetchSuggestions(e.target.value);
	};

	const handleSelectRegion = (regionText: string) => {
		const selectedSuggestion = regionSuggestions.find((s) => s.text === regionText);
		if (selectedSuggestion) {
			const newRegion = JSON.stringify({
				id: selectedSuggestion.id,
				text: selectedSuggestion.text,
				url: selectedSuggestion.url,
			});
			if (!regions.includes(newRegion)) {
				onSelectRegion(newRegion);
			}
		}
		setInputValue('');
		setRegionSuggestions([]);
	};

	const handleRemoveRegion = (regionToRemove: string) => {
		onRemoveRegion(regionToRemove);
	};

	const renderRegion = (regionJson: string) => {
		try {
			const region = JSON.parse(regionJson);
			return region.text || 'Неизвестный регион';
		} catch {
			return 'Неверный формат региона';
		}
	};

	return (
		<Box width={'100%'}>
			<InputWithSuggestions
				selectedItems={regions}
				suggestions={regionSuggestions}
				onSelectItem={handleSelectRegion}
				onRemoveItem={handleRemoveRegion}
				onInputChange={handleInputChange}
				inputValue={inputValue}
				placeholder="Введите название региона"
				renderItem={renderRegion}
				width="100%"
				selectPosition="down"
			/>
		</Box>
	);
};
