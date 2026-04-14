import React from 'react';
import { Box, Checkbox } from '@chakra-ui/react';
import { Typography } from '@/components/ui-kit';

interface Props extends React.ComponentPropsWithoutRef<typeof Checkbox.Root> {
	label: string;
	isChecked: boolean;
	onChange?: (e: any) => void;
	children?: React.ReactNode;
}

export const CheckboxItem: React.FC<Props> = ({
	label,
	isChecked,
	onChange,
	children,
	...props
}) => {
	const handleChange = (e: any) => {
		if (onChange) {
			onChange(e);
		}
	};

	return (
		<Checkbox.Root checked={isChecked} onCheckedChange={handleChange} {...props}>
			<Checkbox.HiddenInput />
			<Checkbox.Control
				alignSelf="start"
				mt="3px"
				borderRadius="2px"
				border="1px solid rgb(0,0,0, 0.5)"
				cursor="pointer"
				_checked={{ color: 'white', background: '#4299E1', border: '#4299E1' }}
			>
				<Checkbox.Indicator />
			</Checkbox.Control>
			<Checkbox.Label>
				<Box>
					<Typography variant="body-lg" color="grey-800">
						{label}
					</Typography>
					<Box mt="16px">{children}</Box>
				</Box>
			</Checkbox.Label>
		</Checkbox.Root>
	);
};
