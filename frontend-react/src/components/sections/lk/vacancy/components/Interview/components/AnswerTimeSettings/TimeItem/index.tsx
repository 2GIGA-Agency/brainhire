import { COLORS } from '@/constants/colors';
import { RadioCard } from '@chakra-ui/react';

interface Props {
	time: number;
}

export function TimeItem({ time }: Props) {
	return (
		<RadioCard.Item
			h="32px"
			cursor="pointer"
			key={time}
			value={String(time)}
			border={`1px solid ${COLORS.BLUE_400}`}
			bg={COLORS.WHITE}
			color={COLORS.BLUE_400}
			_checked={{
				bg: COLORS.BLUE_400,
				color: 'white',
				borderColor: COLORS.BLUE_400,
				shadowColor: 'none',
			}}
		>
			<RadioCard.ItemHiddenInput />

			<RadioCard.ItemControl alignItems="center" textAlign="center" padding="0">
				<RadioCard.ItemText fontWeight={600}>{`${time} мин.`}</RadioCard.ItemText>
			</RadioCard.ItemControl>
		</RadioCard.Item>
	);
}
