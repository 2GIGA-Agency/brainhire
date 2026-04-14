// src/app/vacancies/[id]/components/CandidatesTable/CandidatesTableSkeleton.tsx

import { Box, Flex, Skeleton, SkeletonCircle, SkeletonText, Table } from '@chakra-ui/react';
import styles from '../../style.module.scss';

export const CandidatesTableSkeleton = () => {
	const columnCount = 9;
	const rowCount = 10;

	return (
		<Box className={styles.table}>
			{/* Скелетон для блока поиска и кнопки */}
			<Flex justify="space-between" mb={4} ml={4} gap={4}>
				<Skeleton height="40px" flex="1" maxW="572px" borderRadius="6px" />
				<Skeleton height="40px" width="180px" borderRadius="6px" />
			</Flex>

			{/* Скелетон для табов (фильтров) */}
			<Box className={styles.tabsScrollContainer} mb={6}>
				<Flex gap={4} px={4}>
					{[150, 180, 100, 190, 180, 180].map((width, index) => (
						<Skeleton key={index} height="40px" width={`${width}px`} borderRadius="md" />
					))}
				</Flex>
			</Box>

			{/* Скелетон для самой таблицы */}
			<Table.ScrollArea maxW="100%" className={styles.contentScrollContainer}>
				<Table.Root size="md">
					<Table.Header>
						<Table.Row>
							{[...Array(columnCount)].map((_, index) => (
								<Table.ColumnHeader key={index} py={4}>
									<SkeletonText noOfLines={1} height="4" width="80%" />
								</Table.ColumnHeader>
							))}
						</Table.Row>
					</Table.Header>
					<Table.Body>
						{[...Array(rowCount)].map((_, rowIndex) => (
							<Table.Row key={rowIndex}>
								{[...Array(columnCount)].map((_, cellIndex) => (
									<Table.Cell key={cellIndex} py={4}>
										<SkeletonText noOfLines={1} height="3" />
									</Table.Cell>
								))}
							</Table.Row>
						))}
					</Table.Body>
				</Table.Root>
			</Table.ScrollArea>

			<Flex align="center" mt={6} gap={2}>
				<SkeletonCircle size="36px" />
				<Skeleton height="36px" width="36px" borderRadius="md" />
				<Skeleton height="36px" width="36px" borderRadius="md" />
				<Skeleton height="36px" width="36px" borderRadius="md" />
				<Skeleton height="36px" width="36px" borderRadius="md" />
				<Skeleton height="36px" width="36px" borderRadius="md" />
				<Skeleton height="36px" width="36px" borderRadius="md" />
				<SkeletonCircle size="36px" />
			</Flex>
		</Box>
	);
};
