import React, { memo } from 'react';
import { Pagination, ButtonGroup, IconButton } from '@chakra-ui/react';
import Image from 'next/image';

interface SimplePaginationProps {
	/** Общее количество элементов */
	count: number;
	/** Количество элементов на странице */
	pageSize: number;
	/** Текущая страница (начинается с 1) */
	page: number;
	/** Callback при изменении страницы */
	onPageChange: (page: number) => void;
}

export const SimplePagination = memo(
	function SimplePagination({ count, pageSize, page, onPageChange }: SimplePaginationProps) {
		if (!count) return null;

		const handlePageChange = (event: { page: number }) => {
			onPageChange(event.page);
		};

		return (
			<Pagination.Root
				count={count}
				pageSize={pageSize}
				page={page}
				onPageChange={handlePageChange}
			>
				<ButtonGroup variant="ghost" size="sm">
					<Pagination.PrevTrigger asChild>
						<IconButton>
							<Image src="/icons/prevPage.svg" alt="Previous Page" width={36} height={36} />
						</IconButton>
					</Pagination.PrevTrigger>
					<Pagination.Items
						render={(pageItem) => (
							<IconButton variant={{ base: 'ghost', _selected: 'outline' }}>
								{pageItem.value}
							</IconButton>
						)}
					/>
					<Pagination.NextTrigger asChild>
						<IconButton>
							<Image src="/icons/nextPage.svg" alt="Next Page" width={36} height={36} />
						</IconButton>
					</Pagination.NextTrigger>
				</ButtonGroup>
			</Pagination.Root>
		);
	}
);
