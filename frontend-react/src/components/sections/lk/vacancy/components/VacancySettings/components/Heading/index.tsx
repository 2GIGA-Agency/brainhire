import { Typo } from '@/components/shared/Typo/Typo';
import { Flex } from '@chakra-ui/react';
import { COLORS } from '@/constants/colors';
import { Tip } from '@/components/shared/Tip';
import { useAppSelector } from '@/store/store';
import { selectIsTipsShow } from '@/store/slices/appSlice';

interface Props {
	text: string;
	tooltipText: string;
}

export function Heading({ text, tooltipText }: Props) {
	const isTipShow = useAppSelector(selectIsTipsShow);

	return (
		<Flex gap={2} alignItems="center" height={'100%'}>
			<Typo color={COLORS.GRAY_800} size="14px" weight="medium">
				{text}
			</Typo>
			{isTipShow && (
				<Tip
					questionIconSize={16}
					showArrow={true}
					content={<Typo weight="medium">{tooltipText}</Typo>}
				/>
			)}
		</Flex>
	);
}
