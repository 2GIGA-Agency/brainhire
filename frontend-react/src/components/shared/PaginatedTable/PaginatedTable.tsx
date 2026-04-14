'use client';

import { Idded } from '@/components/shared/lib/types';
import { InfoTable } from '@/components/shared/InfoTable';
import { ButtonGroup, IconButton, Pagination } from '@chakra-ui/react';
import { useState } from 'react';
import { LuChevronLeft, LuChevronRight } from 'react-icons/lu';

interface Props<T extends Idded> {
	itemsPerPage?: number;
	headers: string[]; // Заголовки для таблицы
	items: T[]; // Строки для таблицы
	actions: string[]; // Действия для элементов таблицы (посмотреть, редактировать, архив и т.д.)
}

export const PaginatedTable = <T extends Idded>({
	itemsPerPage = 10,
	headers,
	items,
	actions,
}: Props<T>) => {
	const [page, setPage] = useState(1);

	// Элементы, которые будут отображться в зависимости от номера страницы
	const visibleItems = items.slice((page - 1) * itemsPerPage, page * itemsPerPage);

	const pageCount = Math.ceil(items.length / itemsPerPage);

	return (
		<>
			<InfoTable headers={headers} items={visibleItems} actions={actions} />
			<Pagination.Root
				count={pageCount}
				pageSize={1}
				page={page}
				marginTop={'24px'}
				onPageChange={(e) => {
					setPage(e.page);
				}}
			>
				<ButtonGroup variant="ghost" size="sm">
					<Pagination.PrevTrigger asChild>
						<IconButton>
							<LuChevronLeft />
						</IconButton>
					</Pagination.PrevTrigger>

					<Pagination.Items
						render={(page) => (
							<IconButton variant={{ base: 'ghost', _selected: 'outline' }}>
								{page.value}
							</IconButton>
						)}
					/>

					<Pagination.NextTrigger asChild>
						<IconButton>
							<LuChevronRight />
						</IconButton>
					</Pagination.NextTrigger>
				</ButtonGroup>
			</Pagination.Root>
		</>
	);
};
