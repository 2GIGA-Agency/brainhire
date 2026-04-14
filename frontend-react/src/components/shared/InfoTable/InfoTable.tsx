import React from 'react';

import styles from './InfoTable.module.scss';

import { Flex, Table, Image, Text } from '@chakra-ui/react';
import { Idded } from '@/components/shared/lib/types';
import { Tooltip } from '@/components/ui/tooltip';
import Link from 'next/link';

// Варианты действий
const actionsInfo = [
	{ name: 'view', src: '/icons/HiEye.svg', tooltipText: 'Посмотреть' },
	{ name: 'edit', src: '/icons/HiPencil.svg', tooltipText: 'Редактировать' },
	{ name: 'archive', src: '/icons/BsArchiveFill.svg', tooltipText: 'Архив' },
	{ name: 'delete', src: '/icons/IoTrashBin.svg', tooltipText: 'Удалить' },
];

interface Props<T extends Idded> {
	headers: string[]; // Заголовки таблицы
	items: T[]; // Строки таблицы
	actions: string[]; // Действия со строками (посмотреть, редактировать, архив и т.д.)
}

export const InfoTable = <T extends Idded>({ headers, items, actions }: Props<T>) => {
	return (
		<Table.Root marginTop={'24px'} size="s">
			<Table.Header borderBottom={'1px'} borderColor={'gray.200'} h="40px">
				<Table.Row>
					{headers.map((i, idx) => {
						return (
							<Table.ColumnHeader key={idx}>
								<Text fontSize="14px" lineHeight="20px" fontWeight="600">
									{i}
								</Text>
							</Table.ColumnHeader>
						);
					})}
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{items.map((row) => {
					return (
						<Table.Row key={row.id} borderBottom={'1px'} height={'40px'}>
							{Object.entries(row)
								.filter(([key]) => key !== 'id' && key !== 'status') // Исключаем поля 'id' и 'status'
								.map(([key, value], idx) => {
									return (
										<Table.Cell
											fontSize={'14px'}
											color={'gray.600'}
											key={idx}
											overflowWrap={'break-word'}
											wordWrap={'break-word'}
										>
											{value}
										</Table.Cell>
									);
								})}
							<Table.Cell>
								<Flex gap={'12px'}>
									{actions.map((i, idx) => {
										// Получаем действие
										const action = actionsInfo.find((action) => action.name == i);

										return (
											// Всплывающая подсказка
											<Tooltip
												positioning={{ placement: 'top' }}
												showArrow
												key={idx}
												content={action?.tooltipText}
												openDelay={0}
												closeDelay={0}
											>
												<Link href={`/vacancy/${row.id}`}>
													<Image src={action?.src} alt={i} className={styles.hoverDarken} />
												</Link>
											</Tooltip>
										);
									})}
								</Flex>
							</Table.Cell>
						</Table.Row>
					);
				})}
			</Table.Body>
		</Table.Root>
	);
};
