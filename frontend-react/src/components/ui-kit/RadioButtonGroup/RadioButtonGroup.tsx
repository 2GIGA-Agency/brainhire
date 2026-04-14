// src/components/ui-kit/RadioButtonGroup.tsx
'use client';

import { Typo } from '@/components/shared/Typo/Typo';
import { Box, Flex, RadioGroup } from '@chakra-ui/react';
import { useState, useEffect } from 'react';

interface Props {
	label?: string;
	items: Record<'label' | 'value', string>[];
	initialValue?: string;
	disabled?: boolean;

	onChange?: (e: any) => void;
}

export const RadioButtonGroup = ({
	label = '',
	items,
	initialValue = '', // Значение по умолчанию
	disabled = false,
	onChange,
}: Props) => {
	// Инициализация состояния
	const [value, setValue] = useState<string | undefined>(initialValue);

	// Обработчик изменения значения
	const handleChange = (nextValue: string) => {
		setValue(nextValue);
		onChange?.({ value: nextValue });
	};

	// Если initialValue изменяется динамически, обновляем состояние
	useEffect(() => {
		setValue(initialValue);
	}, [initialValue]);

	return (
		<Box>
			{label && (
				<Typo size="16px" weight="semibold" margin="0 0 24px 0">
					{label}
				</Typo>
			)}
			<RadioGroup.Root
				value={value || ''} // Убедимся, что value всегда строка
				onValueChange={(details) => handleChange(details?.value ?? '')}
				colorPalette="blue"
				disabled={disabled}
			>
				<Flex gap="12px" direction="column">
					{items.map((item) => (
						<RadioGroup.Item key={item.value} value={item.value} cursor={'pointer'}>
							<RadioGroup.ItemHiddenInput />
							<RadioGroup.ItemIndicator cursor={'pointer'} />
							<RadioGroup.ItemText>
								<Typo size="14px" weight="semibold">
									{item.label}
								</Typo>
							</RadioGroup.ItemText>
						</RadioGroup.Item>
					))}
				</Flex>
			</RadioGroup.Root>
		</Box>
	);
};
