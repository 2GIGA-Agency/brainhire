import React, { useEffect, useState, useRef } from 'react';
import { Input, Box, List, Spinner } from '@chakra-ui/react';

export interface Option {
	id: string;
	text: string;
}

interface InputWithSelectProps {
	value: Option;
	onSelect: (option: Option | null) => void;
	placeholder?: string;
	fetchOptions: (inputValue: string) => Promise<Option[]>;
	isLoading?: boolean;
	debounceTimeout?: number;
}

export const InputWithSelect: React.FC<InputWithSelectProps> = ({
	value,
	onSelect,
	placeholder,
	fetchOptions,
	isLoading = false,
	debounceTimeout = 400,
}) => {
	const [inputValue, setInputValue] = useState(value.text || '');
	const [options, setOptions] = useState<Option[]>([]);
	const [loading, setLoading] = useState(false);
	const [showDropdown, setShowDropdown] = useState(false);
	const [activeIndex, setActiveIndex] = useState(-1);
	const dropdownRef = useRef<HTMLDivElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);

	// Синхронизация с внешним состоянием
	useEffect(() => {
		setInputValue(value.text || '');
	}, [value]);

	// Загрузка опций с debounce
	useEffect(() => {
		if (!inputValue || inputValue === value.text) {
			setOptions([]);
			return;
		}

		const timeout = setTimeout(async () => {
			try {
				setLoading(true);
				const data = await fetchOptions(inputValue);
				setOptions(data);
				setActiveIndex(-1); // Сбрасываем активный индекс при новых опциях
			} finally {
				setLoading(false);
			}
		}, debounceTimeout);

		return () => clearTimeout(timeout);
	}, [inputValue, value, fetchOptions, debounceTimeout]);

	const handleSelect = (option: Option) => {
		setInputValue(option.text);
		onSelect(option);
		setShowDropdown(false);
		inputRef.current?.focus();
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newText = e.target.value;
		setInputValue(newText);

		if (!showDropdown) {
			setShowDropdown(true);
		}
		if (!newText) {
			onSelect(null);
		}
	};

	const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
		if (!e.currentTarget.contains(e.relatedTarget as Node)) {
			setShowDropdown(false);
			setInputValue(value.text || '');
		}
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (!showDropdown || options.length === 0) return;

		switch (e.key) {
			case 'ArrowDown':
				e.preventDefault();
				setActiveIndex((prev) => (prev < options.length - 1 ? prev + 1 : 0));
				scrollToItem(activeIndex + 1);
				break;
			case 'ArrowUp':
				e.preventDefault();
				setActiveIndex((prev) => (prev > 0 ? prev - 1 : options.length - 1));
				scrollToItem(activeIndex - 1);
				break;
			case 'Enter':
				e.preventDefault();
				if (activeIndex >= 0 && activeIndex < options.length) {
					handleSelect(options[activeIndex]);
				}
				break;
			case 'Escape':
				e.preventDefault();
				setShowDropdown(false);
				break;
		}
	};

	const scrollToItem = (index: number) => {
		if (dropdownRef.current && index >= 0 && index < options.length) {
			const items = dropdownRef.current.querySelectorAll('li');
			if (items[index]) {
				items[index].scrollIntoView({ block: 'nearest' });
			}
		}
	};

	const handleMouseEnter = (index: number) => {
		setActiveIndex(index);
	};

	return (
		<Box position="relative" width="100%" onBlur={handleBlur}>
			<Input
				ref={inputRef}
				_focus={{
					outline: 'none',
					borderColor: 'blue.500',
				}}
				fontSize="16px"
				value={inputValue}
				onChange={handleInputChange}
				placeholder={placeholder}
				onFocus={() => setShowDropdown(true)}
				onKeyDown={handleKeyDown}
				autoComplete="off"
			/>

			{(loading || isLoading) && <Spinner size="sm" position="absolute" right="10px" top="10px" />}

			{showDropdown && options && options.length > 0 && (
				<Box
					ref={dropdownRef}
					position="absolute"
					top="100%"
					left="0"
					right="0"
					bg="white"
					border="1px solid #e2e8f0"
					borderRadius="md"
					zIndex="dropdown"
					mt="2"
					boxShadow="md"
					maxHeight="200px"
					overflowY="auto"
				>
					<List.Root>
						{options.map((option, index) => (
							<List.Item
								key={option.id}
								px="4"
								py="2"
								bg={index === activeIndex ? 'gray.100' : 'transparent'}
								_hover={{ bg: 'gray.100', cursor: 'pointer' }}
								onMouseDown={() => handleSelect(option)}
								onMouseEnter={() => handleMouseEnter(index)}
							>
								{option.text}
							</List.Item>
						))}
					</List.Root>
				</Box>
			)}
		</Box>
	);
};
