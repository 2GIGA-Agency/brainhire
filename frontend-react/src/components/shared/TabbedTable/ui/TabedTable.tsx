'use client';

import React, { useState } from 'react';
import { Tabs, Text } from '@chakra-ui/react';
import { Tab } from '@/components/shared/TabbedTable/lib/types';
import { Idded } from '@/components/shared/lib/types';
import { PaginatedTable } from '@/components/shared/PaginatedTable/PaginatedTable';

// Передаём табы и элементы, которые будут рендериться в таблице (список строк)
interface Props<T extends Idded> {
	tabs: Tab[];
	items: T[][];
}

export const TabedTable = <T extends Idded>({ tabs, items }: Props<T>) => {
	const [selectedTab, setSelectedTab] = useState(0);

	// Получаем заголовки таблицы и действия, которые можно сделать с элементом (посмотреть, добавить в архив, удалить, редактировать и т.д.)
	const { headers, actions } = tabs.find((i, idx) => idx == selectedTab) || tabs[0];
	const values = tabs.map((tab) => tab.name);

	return (
		<Tabs.Root defaultValue={tabs[0].name} mt={'24px'}>
			<Tabs.List>
				{tabs.map((tab, idx) => (
					<Tabs.Trigger
						key={idx}
						value={tab.name}
						onClick={() => setSelectedTab(idx)}
						paddingRight={'16px'}
						paddingLeft={'16px'}
						display="flex"
						alignItems="center"
						gap="4px"
					>
						{tab.name}{' '}
						{tab.number && tab.numberBg && (
							<Text color="white" bgColor={tab?.numberBg} padding="2px 8px" borderRadius="6px">
								{tab?.number}
							</Text>
						)}
					</Tabs.Trigger>
				))}
			</Tabs.List>
			{values.map((i, idx) => {
				return (
					<Tabs.Content value={i} key={idx}>
						{/* Показываем актуальные данные для выбранной вкладки */}
						{selectedTab === idx && (
							<PaginatedTable items={items[idx]} headers={headers} actions={actions} />
						)}
					</Tabs.Content>
				);
			})}
		</Tabs.Root>
	);
};
