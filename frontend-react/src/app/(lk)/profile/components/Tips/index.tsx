import { selectIsTipsShow } from '@/store/slices/appSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { toggleTips } from '@/store/thunks/app/tutorialThunks';
import { HStack, RadioGroup } from '@chakra-ui/react';

const items = [
	{
		label: 'Да',
		value: 'yes',
	},
	{ label: 'Нет', value: 'no' },
];

export function Tips() {
	const isTipsShow = useAppSelector(selectIsTipsShow);
	const dispatch = useAppDispatch();

	const value = isTipsShow ? 'yes' : 'no';

	const handleChange = () => {
		dispatch(toggleTips());
	};

	return (
		<RadioGroup.Root colorPalette={'blue'} mt={3} value={value} onChange={handleChange}>
			<HStack gap="6">
				{items.map((item) => (
					<RadioGroup.Item cursor={'pointer'} key={item.label} value={item.value}>
						<RadioGroup.ItemHiddenInput />
						<RadioGroup.ItemIndicator cursor={'pointer'} />
						<RadioGroup.ItemText>{item.label}</RadioGroup.ItemText>
					</RadioGroup.Item>
				))}
			</HStack>
		</RadioGroup.Root>
	);
}
