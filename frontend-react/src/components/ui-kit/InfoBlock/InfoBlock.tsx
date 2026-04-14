import { Box, Flex, FlexProps } from '@chakra-ui/react';
import React from 'react';
import alertIcon from '../../../../public/icons/AlertIcon.svg';
import Image from 'next/image';

import styles from './InfoBlock.module.scss';
import { Typo } from '@/components/shared/Typo/Typo';
import { COLORS } from '@/constants/colors';

interface Props extends FlexProps {
	headingText?: string;
	subHeadingText?: string;
	children?: React.ReactNode;
	minified?: boolean;
}

export const InfoBlock = ({
	headingText = '',
	subHeadingText = '',
	children,
	minified = false,
	...props
}: Props) => {
	return (
		<Flex
			padding="24px"
			border={'1px solid #4299E1'}
			backgroundColor="#EBF8FF"
			borderRadius="8px"
			gap="24px"
			alignItems="start"
			{...props}
		>
			{!minified && <Image src={alertIcon} alt="Alert" className={styles.icon} />}
			<Box pt="4px">
				{headingText && (
					<Typo color={COLORS.GRAY_800} size="16px" weight="medium">
						{headingText}
					</Typo>
				)}
				{subHeadingText && (
					<Typo color={COLORS.GRAY_800} size="14px" mt="8px">
						{subHeadingText}
					</Typo>
				)}
				{children && <Box marginTop="24px">{children}</Box>}
			</Box>
		</Flex>
	);
};
