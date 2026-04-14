import { LkInput } from '@/components/shared/LkInput';
import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';

interface Props {
	placeholder?: string;
	maxW?: string | number;
	onChange: (value: string) => void;
}

export function SearchBlock({ placeholder, maxW, onChange }: Props) {
	const [value, setValue] = useState('');

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
		onChange(e.target.value);
	};

	return (
		<LkInput
			icon={<FiSearch />}
			maxW={maxW}
			placeholder={placeholder}
			value={value}
			onChange={handleChange}
		/>
	);
}
