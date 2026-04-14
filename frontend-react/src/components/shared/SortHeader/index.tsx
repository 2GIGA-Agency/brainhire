import { Box, Flex } from '@chakra-ui/react';
import { SortHeaderProps } from './types';
import { COLORS } from '@/constants/colors';
import { Typo } from '../Typo/Typo';
import Image from 'next/image';
import styles from './style.module.scss';

export const SortHeader = ({ title, ordering, sortType }: SortHeaderProps) => {
	const isSort = sortType === ordering.order;
	const shouldShow = isSort && ordering.value > 0;

	return (
		<Flex alignItems="center">
			<Typo weight="semibold" color={COLORS.GRAY_800} className={styles.tableSort} mr={2}>
				{title}
			</Typo>
			<Box w="22px" h="22px" visibility={shouldShow ? 'visible' : 'hidden'}>
				{shouldShow && (
					<Image
						src={ordering.value === 1 ? '/icons/arrowDown.svg' : '/icons/arrowUp.svg'}
						alt="sort"
						width={22}
						height={22}
					/>
				)}
			</Box>
		</Flex>
	);
};
