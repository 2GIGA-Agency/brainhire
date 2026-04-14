import React, { useCallback } from 'react';
import { Box } from '@chakra-ui/react';
import { InputWithSelect, Option } from '../InputWithSelect';
import axios from '@/utils/axios';

interface Props {
	region: { id: string; text: string } | null;
	onSelect: (region: Option | null) => void;
}

export const RegionsInputWithSelect = ({ region, onSelect }: Props) => {
	const option = { id: region?.id || '', text: region?.text || '' };

	const fetchRegions = useCallback(async (text: string) => {
		if (!text.trim()) {
			return []; // Не показываем подсказки при пустом поле
		}

		try {
			// First try the direct HH API
			const response = await axios.get(`https://api.hh.ru/suggests/areas?text=${text}`);
			return response.data.items.map((item: any) => ({
				id: item.id,
				text: item.text,
				url: item.url,
			}));
		} catch (error: any) {
			const response = await axios.get('/api/hh/public/suggests/areas', {
				params: { text },
			});
			return response.data.items.map((item: any) => ({
				id: item.id,
				text: item.text,
				url: item.url,
			}));
		}
	}, []);

	return (
		<Box width={'100%'}>
			<InputWithSelect
				value={option}
				onSelect={onSelect}
				fetchOptions={fetchRegions}
				placeholder="Введите название региона"
			/>
		</Box>
	);
};
