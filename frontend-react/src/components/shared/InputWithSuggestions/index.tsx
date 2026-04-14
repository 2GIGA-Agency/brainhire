import React, { useRef, useState, useEffect } from 'react';
import { Box, List } from '@chakra-ui/react';
import { SelectedItems } from './components/SelectedItems';
import { COLORS } from '@/constants/colors';
import { LkInput } from '../LkInput';

export interface InputWithSuggestionsProps {
	selectedItems: string[];
	suggestions: { text: string; id?: string }[];
	onSelectItem: (item: string) => void;
	onRemoveItem: (item: string) => void;
	onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	inputValue: string;
	placeholder?: string;
	renderItem?: (item: string) => React.ReactNode;
	renderSuggestion?: (suggestion: { text: string; id?: string }) => React.ReactNode;
	width?: string | number;
	selectPosition?: 'top' | 'down';
	onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void; // Добавляем поддержку внешнего обработчика
}

export const InputWithSuggestions: React.FC<InputWithSuggestionsProps> = ({
	selectedItems,
	suggestions,
	onSelectItem,
	onRemoveItem,
	onInputChange,
	inputValue,
	placeholder = 'Введите значение',
	renderItem,
	renderSuggestion,
	width = '100%',
	selectPosition = 'top',
	onKeyDown,
}) => {
	const suggestionsListRef = useRef<HTMLUListElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);
	const [activeIndex, setActiveIndex] = useState(-1);

	useEffect(() => {
		setActiveIndex(-1);
	}, [suggestions]);

	const handleBlur = () => {
		setTimeout(() => {
			if (suggestionsListRef.current) {
				suggestionsListRef.current.style.display = 'none';
			}
		}, 200);
	};

	const handleFocus = () => {
		if (suggestionsListRef.current && suggestionsListRef.current.style.display !== 'block') {
			suggestionsListRef.current.style.display = 'block';
		}
	};

	const internalHandleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (!suggestions.length) {
			onKeyDown?.(e);
			return;
		}

		switch (e.key) {
			case 'ArrowDown':
				e.preventDefault();
				setActiveIndex((prev) => Math.min(prev + 1, suggestions.length - 1));
				scrollToItem(activeIndex + 1);
				break;
			case 'ArrowUp':
				e.preventDefault();
				setActiveIndex((prev) => Math.max(prev - 1, 0));
				scrollToItem(activeIndex - 1);
				break;
			case 'Enter':
				e.preventDefault();
				if (activeIndex >= 0 && activeIndex < suggestions.length) {
					onSelectItem(suggestions[activeIndex].text);
					setActiveIndex(-1);
				} else {
					// Если Enter нажат без активного элемента, вызываем внешний обработчик
					onKeyDown?.(e);
				}
				break;
			case 'Escape':
				if (suggestionsListRef.current) {
					suggestionsListRef.current.style.display = 'none';
				}
				break;
			default:
				// Для всех остальных клавиш вызываем внешний обработчик
				onKeyDown?.(e);
				break;
		}
	};

	const scrollToItem = (index: number) => {
		if (suggestionsListRef.current && index >= 0 && index < suggestions.length) {
			const items = suggestionsListRef.current.querySelectorAll('li');
			if (items[index]) {
				items[index].scrollIntoView({ block: 'nearest' });
			}
		}
	};

	const handleItemClick = (text: string) => {
		onSelectItem(text);
		setActiveIndex(-1);
		if (inputRef.current) {
			inputRef.current.focus();
		}
	};

	const handleMouseEnter = (index: number) => {
		setActiveIndex(index);
	};

	return (
		<Box width={width} position={'relative'}>
			{selectPosition == 'top' && (
				<SelectedItems
					selectedItems={selectedItems}
					renderItem={renderItem}
					onRemoveItem={onRemoveItem}
					position="top"
				/>
			)}

			<Box pos={'relative'}>
				<LkInput
					ref={inputRef}
					fontSize="14px"
					placeholder={placeholder}
					value={inputValue}
					_focus={{ outline: 'none', borderColor: '#4299E1' }}
					onChange={onInputChange}
					onFocus={handleFocus}
					onBlur={handleBlur}
					onKeyDown={internalHandleKeyDown} // Используем наш комбинированный обработчик
				/>

				{inputValue && suggestions.length > 0 && (
					<List.Root
						ref={suggestionsListRef}
						border="1px solid"
						borderColor="gray.200"
						borderRadius="md"
						w={'100%'}
						maxH="200px"
						boxShadow="md"
						overflowY={'auto'}
						bg={COLORS.WHITE}
						position={'absolute'}
						zIndex={999}
						mt={1}
					>
						{suggestions.map((suggestion, index) => (
							<List.Item
								key={suggestion.id || suggestion.text}
								p={2}
								cursor="pointer"
								onClick={() => handleItemClick(suggestion.text)}
								onMouseEnter={() => handleMouseEnter(index)}
								bg={index === activeIndex ? COLORS.GRAY_100 : 'transparent'}
							>
								{renderSuggestion ? renderSuggestion(suggestion) : suggestion.text}
							</List.Item>
						))}
					</List.Root>
				)}
			</Box>

			{selectPosition == 'down' && (
				<SelectedItems
					selectedItems={selectedItems}
					renderItem={renderItem}
					onRemoveItem={onRemoveItem}
					position="down"
				/>
			)}
		</Box>
	);
};
