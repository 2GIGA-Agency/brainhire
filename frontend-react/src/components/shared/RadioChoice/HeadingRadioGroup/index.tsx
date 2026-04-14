import { HStack, RadioGroup, RadioGroupValueChangeDetails } from '@chakra-ui/react';

interface Props {
	value: boolean;
	onChange: (choice: boolean) => void;
}

const items = [
	{ label: 'Да', value: 'yes' },
	{ label: 'Нет', value: 'no' },
];

// RadioGroup для выбора Да/Нет
export function HeadingRadioGroup({ value, onChange }: Props) {
	const handleChange = (e: RadioGroupValueChangeDetails) => {
		const isPositive = e.value == 'yes';
		onChange(isPositive);
	};

	return (
		<RadioGroup.Root colorPalette="blue" value={value ? 'yes' : 'no'} onValueChange={handleChange}>
			<HStack gap={4}>
				{items.map((i) => (
					<RadioGroup.Item key={i.value} value={i.value} cursor={'pointer'}>
						<RadioGroup.ItemHiddenInput />
						<RadioGroup.ItemIndicator cursor={'pointer'} />
						<RadioGroup.ItemText> {i.label}</RadioGroup.ItemText>
					</RadioGroup.Item>
				))}
			</HStack>
		</RadioGroup.Root>
	);
}
