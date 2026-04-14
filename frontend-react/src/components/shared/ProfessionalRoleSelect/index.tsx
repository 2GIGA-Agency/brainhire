import React from 'react';
import axios from 'axios';
import { InputWithSelect, Option } from '../InputWithSelect';

interface Props {
	role: { id: string; text: string } | null;
	onSelect: (role: { id: string; text: string } | null) => void;
}

export const ProfessionalRolesSelect = ({ role, onSelect }: Props) => {
	const option = { id: role?.id || '', text: role?.text || '' };

	const handleSelect = (option: Option | null) => {
		if (option) {
			onSelect(option);
		} else {
			onSelect(null);
		}
	};

	const fetchProfessionalRoles = async (inputValue: string) => {
		try {
			const res = await axios.get('https://api.hh.ru/suggests/professional_roles', {
				params: { text: inputValue },
			});
			return res.data.items.map((item: any) => ({
				id: item.id,
				text: item.text,
				accept_incomplete_resumes: item.accept_incomplete_resumes,
			}));
		} catch (error) {
			console.error('Error fetching professional roles:', error);
			return [];
		}
	};

	return (
		<InputWithSelect
			value={option}
			onSelect={handleSelect}
			placeholder={'Выберите специализацию'}
			fetchOptions={fetchProfessionalRoles}
		/>
	);
};
