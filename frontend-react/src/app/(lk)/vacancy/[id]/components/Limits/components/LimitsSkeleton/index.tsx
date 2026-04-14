import React from 'react';
import { Box, Flex, Stack, Skeleton, SkeletonText } from '@chakra-ui/react';
import { Block } from '@/components/shared/Block';
import styles from '../../Limits.module.scss';

export const LimitsSkeleton = () => {
	return (
		<Block headingText={<Skeleton height="24px" width="100px" />} width={'389px'}>
			<Stack>
				<Box>
					{[...Array(3)].map((_, index) => (
						<Flex key={index} justify="space-between" mb={4}>
							<SkeletonText noOfLines={1} width="60%" height="3" />
							<Skeleton height="20px" width="50px" />
						</Flex>
					))}
				</Box>
			</Stack>

			<Skeleton height="32px" w="100%" mt={4} className={styles.limitButton} />

			<Skeleton height="32px" w="100%" mt={4} className={styles.limitButton} />
		</Block>
	);
};
