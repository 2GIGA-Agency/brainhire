import React from 'react';
import { StackProps, VStack } from '@chakra-ui/react';
import { Typo } from '../Typo/Typo';
import { COLORS } from '@/constants/colors';

export interface QuestionListItem {
	id: number;
	label: string;
	correct?: boolean;
	selectedAnswer?: number;
}

interface QuestionListUIProps extends StackProps {
	items: QuestionListItem[];
}

export const QuestionList: React.FC<QuestionListUIProps> = ({ items, ...props }) => {
	const correctColor = COLORS.GREEN_400;
	const incorrectColor = COLORS.RED_400;

	return (
		// VStack для вертикального расположения с отступами
		<VStack align="start" gap="12px" {...props}>
			{items.map((item, idx) => {
				const color =
					item?.correct === true
						? correctColor
						: item.selectedAnswer !== undefined && item.selectedAnswer === item.id && !item.correct
							? incorrectColor
							: COLORS.GRAY_800;

				return (
					<Typo key={idx} fontSize="14px" weight="medium" color={color}>
						{item.label}
					</Typo>
				);
			})}
		</VStack>
	);
};
