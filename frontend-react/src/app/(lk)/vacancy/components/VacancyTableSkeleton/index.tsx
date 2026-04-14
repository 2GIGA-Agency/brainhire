import React from 'react';
import { Table, Skeleton } from '@chakra-ui/react';
import { Flex } from '@chakra-ui/react';

export const VacancyTableSkeleton: React.FC = () => {
	return (
		<Table.Root variant="line" size="sm">
			<Table.Header>
				<Table.Row>
					{/* Заголовки таблицы */}
					{Array.from({ length: 8 }).map((_, index) => (
						<Table.ColumnHeader key={index}>
							<Skeleton height="20px" width={index === 0 ? '120px' : '100px'} />
						</Table.ColumnHeader>
					))}
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{/* Скелетоны строк */}
				{Array.from({ length: 12 }).map((_, rowIndex) => (
					<Table.Row key={rowIndex}>
						{Array.from({ length: 8 }).map((_, cellIndex) => (
							<Table.Cell key={cellIndex}>
								{cellIndex === 0 ? (
									<Flex align="center" gap="2">
										<Skeleton height="16px" width="16px" />
										<Skeleton height="16px" width="200px" />
									</Flex>
								) : cellIndex === 7 ? (
									<Flex gap="2">
										{Array.from({ length: 3 }).map((_, btnIndex) => (
											<Skeleton key={btnIndex} height="24px" width="24px" />
										))}
									</Flex>
								) : (
									<Skeleton height="16px" width={cellIndex === 1 ? '150px' : '100px'} />
								)}
							</Table.Cell>
						))}
					</Table.Row>
				))}
			</Table.Body>
		</Table.Root>
	);
};
