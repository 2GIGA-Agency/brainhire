import { Flex, Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react';

export const ChatItemSkeleton = () => (
	<Flex padding={3} gap={4}>
		{' '}
		<SkeletonCircle size="48px" />{' '}
		<Flex direction="column" flex="1" gap={1}>
			<Flex justify="space-between" align="center">
				<Skeleton height="16px" width="120px" />
				<Skeleton height="12px" width="40px" />
			</Flex>
			<SkeletonText noOfLines={1} height="14px" width="80%" />
			<SkeletonText noOfLines={1} height="14px" width="60%" />{' '}
		</Flex>
	</Flex>
);
