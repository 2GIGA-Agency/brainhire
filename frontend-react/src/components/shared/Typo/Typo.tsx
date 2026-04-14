import { COLORS } from '@/constants/colors';
import { Text, TextProps } from '@chakra-ui/react';
import React from 'react';

type FontWeight = 'regular' | 'medium' | 'semibold';
type FontSize = '12px' | '14px' | '16px' | '18px' | '20px' | '24px' | '30px' | '36px' | '48px';

interface TypographyProps extends TextProps {
	size?: FontSize;
	weight?: FontWeight;
	color?: COLORS | 'inherit';
	children: React.ReactNode;
}

const lineHeights: Record<FontSize, string> = {
	'12px': '16px',
	'14px': '18px',
	'16px': '24px',
	'18px': '24px',
	'20px': '24px',
	'24px': '32px',
	'30px': '36px',
	'36px': '44px',
	'48px': '56px',
};

const fontWeights: Record<FontWeight, number> = {
	regular: 400,
	medium: 500,
	semibold: 600,
};

export const Typo: React.FC<TypographyProps> = ({
	size = '14px',
	weight = 'regular',
	color = COLORS.GRAY_800,
	children,
	...props
}) => {
	return (
		<Text
			fontSize={size}
			lineHeight={lineHeights[size]}
			color={color}
			fontWeight={fontWeights[weight]}
			{...props}
		>
			{children}
		</Text>
	);
};
