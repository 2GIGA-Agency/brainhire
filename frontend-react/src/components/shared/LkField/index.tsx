import { Field, FieldRootProps } from '@chakra-ui/react';
import React from 'react';
import { Typo } from '../Typo/Typo';
import { COLORS } from '@/constants/colors';

interface Props extends FieldRootProps {
	label: string;
	required?: boolean;
	children: React.ReactNode;
}

export const LkField = ({ label, required = false, children, ...props }: Props) => {
	return (
		<Field.Root required={required} {...props}>
			<Field.Label>
				<Typo color={COLORS.GRAY_800} size="14px" weight="medium">
					{required && <Field.RequiredIndicator mt="6px" />} {label}
				</Typo>
			</Field.Label>
			{children}
		</Field.Root>
	);
};
