import { debounce } from '@/utils/debounce';
import { InputGroup } from '@chakra-ui/react';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { LkInput } from '../LkInput';

interface Props {
	value: string;
	placeholder?: string;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onDebouncedChange?: (value: string) => void; // Новый проп для debounce-события
	debounceWait?: number; // Задержка для debounce
	maxWidth?: string;
	h?: string;
}

export const SearchInput = ({
	value,
	placeholder = '',
	onChange,
	onDebouncedChange,
	debounceWait = 300,
	...props
}: Props) => {
	const [inputValue, setInputValue] = useState(value);

	// Создаем debounce-функцию с помощью useMemo
	const debouncedOnChange = useMemo(() => {
		if (onDebouncedChange) {
			return debounce(debounceWait, onDebouncedChange);
		}
		return undefined;
	}, [onDebouncedChange, debounceWait]);

	// Обработчик изменения input
	const handleChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const newValue = e.target.value;
			setInputValue(newValue);

			// Вызываем обычный onChange сразу
			if (onChange) {
				onChange(e);
			}

			// Вызываем debounce-версию с задержкой
			if (debouncedOnChange) {
				debouncedOnChange(newValue);
			}
		},
		[onChange, debouncedOnChange]
	);

	// Синхронизируем внутреннее состояние с внешним value
	useEffect(() => {
		setInputValue(value);
	}, [value]);

	return (
		<InputGroup startElement={<FiSearch />} {...props}>
			<LkInput value={inputValue} onChange={handleChange} placeholder={placeholder} {...props} />
		</InputGroup>
	);
};
