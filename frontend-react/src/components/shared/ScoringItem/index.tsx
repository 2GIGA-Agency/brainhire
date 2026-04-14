import { Flex } from '@chakra-ui/react';
import { ScoreItem } from './types/types';
import { Typo } from '../Typo/Typo';
import { COLORS } from '@/constants/colors';

export function ScoringItem({ text, score }: ScoreItem) {
	const bgColor = score < 4 ? 'red.400' : score < 8 ? 'yellow.400' : 'green.400';

	return (
		<Flex gap="8px" alignItems="center">
			<Typo color={COLORS.GRAY_800} size="14px" weight="medium">
				{text}
			</Typo>
			<Typo
				color={COLORS.WHITE}
				padding="2px 8px"
				weight="medium"
				borderRadius="6px"
				size="12px"
				lineHeight="24px"
				bgColor={bgColor}
			>
				{score}
			</Typo>
		</Flex>
	);
}
