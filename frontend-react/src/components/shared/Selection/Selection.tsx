// src/components/ui-kit/Selection/Selection.tsx
import { BaseSpinner } from '@/components/shared/BaseSpinner/BaseSpinner';
import { ListCollection, Portal, Select } from '@chakra-ui/react';
import React from 'react';

interface Props {
	isLoading?: boolean;
	placeholder?: string;
	collection: ListCollection<Record<'label' | 'value', string>>;
	value?: string[];
	isMultiSelect?: boolean;
	invalid?: boolean;

	onChange?: (value: string | string[]) => void;
}

interface ChangeDetails {
	value: string[];
}

export const Selection = ({
	placeholder = '',
	isLoading = false,
	collection,
	value,
	isMultiSelect = false,
	invalid = false,
	onChange,
}: Props) => {
	const handleValueChange = (details: ChangeDetails | null) => {
		if (onChange && details?.value) {
			if (isMultiSelect) {
				onChange(details.value);
			} else {
				onChange(details.value[0]);
			}
		}
	};

	return (
		<Select.Root
			collection={collection}
			value={value}
			multiple={isMultiSelect}
			onValueChange={handleValueChange}
			border={'1px solid #E2E8F0'}
			borderRadius={'6px'}
			invalid={invalid}
		>
			<Select.HiddenSelect />
			<Select.Control>
				<Select.Trigger paddingLeft={'16px'} cursor={'pointer'}>
					<Select.ValueText fontSize={'16px'} placeholder={placeholder} />
				</Select.Trigger>
				<Select.IndicatorGroup paddingRight={'16px'}>
					<Select.Indicator />
				</Select.IndicatorGroup>
			</Select.Control>
			<Portal>
				<Select.Positioner>
					<Select.Content>
						{isLoading ? (
							<BaseSpinner />
						) : (
							collection.items.map((item) => (
								<Select.Item
									fontSize={'16px'}
									item={item}
									key={item.value}
									padding="10px"
									cursor={'pointer'}
								>
									{item.label}
									<Select.ItemIndicator />
								</Select.Item>
							))
						)}
					</Select.Content>
				</Select.Positioner>
			</Portal>
		</Select.Root>
	);
};
