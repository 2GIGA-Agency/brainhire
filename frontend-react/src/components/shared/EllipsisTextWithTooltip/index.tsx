import React from 'react';
import { Box, BoxProps } from '@chakra-ui/react';
import { Tooltip } from '@/components/ui/tooltip';

export interface EllipsisTextWithTooltipProps extends BoxProps {
	text: string;
	maxW?: BoxProps['maxW'];
	disableTooltip?: boolean;
}

export const EllipsisTextWithTooltip: React.FC<EllipsisTextWithTooltipProps> = ({
	text,
	maxW = '180px',
	disableTooltip = false,
	...boxProps
}) => {
	if (!text) return null;

	const content = (
		<Box
			as="span"
			display="inline-block"
			maxW={maxW}
			whiteSpace="nowrap"
			overflow="hidden"
			textOverflow="ellipsis"
			{...boxProps}
		>
			{text}
		</Box>
	);

	if (disableTooltip) {
		return content;
	}

	return (
		<Tooltip content={text} showArrow>
			{content}
		</Tooltip>
	);
};
