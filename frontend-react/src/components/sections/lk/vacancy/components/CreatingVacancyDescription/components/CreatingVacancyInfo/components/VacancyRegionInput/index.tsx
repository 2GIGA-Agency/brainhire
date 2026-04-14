import React, { useCallback } from 'react';
import axios from 'axios';
import { Box } from '@chakra-ui/react';
import { InputWithSelect, Option } from '@/components/shared/InputWithSelect';
import { AreasSuggestsResponse } from '@/components/shared/RegionsInput/types';

interface Props {
	region: Option | null;
	onSelect: (region: Option | null) => void;
	maxElements?: number;
}

export const RegionsInput = ({ region, onSelect }: Props) => {
	const option = { id: region?.id || '', text: region?.text || '' };

	const fetchRegionsSuggestion = useCallback(async (text: string) => {
		try {
			const res = await axios.get<AreasSuggestsResponse>(
				`https://api.hh.ru/suggests/areas?text=${encodeURIComponent(text)}`
			);
			return res.data.items.map((i) => ({
				id: i.id,
				text: i.text,
				url: i.url,
			}));
		} catch (error) {
			console.error('Error fetching professional roles:', error);
			return [];
		}
	}, []);

	const handleSelect = (option: Option | null) => {
		if (option) {
			onSelect(option);
		} else {
			onSelect(null);
		}
	};

	return (
		<Box width={'100%'}>
			<InputWithSelect
				value={option}
				onSelect={handleSelect}
				fetchOptions={fetchRegionsSuggestion}
			/>
		</Box>
	);
};
