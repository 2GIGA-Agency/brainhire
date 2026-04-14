import { Block } from '@/components/shared/Block';
import { Typo } from '@/components/shared/Typo/Typo';
import { COLORS } from '@/constants/colors';
import { Box, Flex, Tag } from '@chakra-ui/react';

export const ScoringSystem = () => (
	<Block>
		<Box>
			<Typo size="16px" weight="medium" color={COLORS.GRAY_800} mb={6}>
				Система оценки кандидата:
			</Typo>
			<Flex gap={2} mb={3} alignItems="center">
				<Tag.Root borderRadius="6px" bgColor={COLORS.RED_400} border="none">
					&nbsp;&nbsp;
				</Tag.Root>
				<Typo size="14px" weight="medium" color={COLORS.GRAY_800}>
					- слабый ответ
				</Typo>
			</Flex>
			<Flex gap={2} mb={3} alignItems="center">
				<Tag.Root borderRadius="6px" bgColor={COLORS.YELLOW_400} border="none">
					&nbsp;&nbsp;
				</Tag.Root>
				<Typo size="14px" weight="medium" color={COLORS.GRAY_800}>
					- удовлетворительный ответ
				</Typo>
			</Flex>
			<Flex gap={2} mb={3} alignItems="center">
				<Tag.Root borderRadius="6px" bgColor={COLORS.GREEN_400} border="none">
					&nbsp;&nbsp;
				</Tag.Root>
				<Typo size="14px" weight="medium" color={COLORS.GRAY_800}>
					- ожидаемый ответ
				</Typo>
			</Flex>
		</Box>
	</Block>
);
