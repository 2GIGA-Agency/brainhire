'use client';

import { ChangeEvent, useState } from 'react';
import styles from './SearchedTable.module.scss';
import { Input, InputGroup } from '@chakra-ui/react';
import { Idded } from '@/components/shared/lib/types';
import { Tab, TabedTable } from '@/components/shared/TabbedTable';
import { FiSearch } from 'react-icons/fi';
import { Button } from '@/components/ui-kit';
import addIcon from '../../../../public/icons/addPlusIcon.svg';
import { Block } from '@/components/shared/Block';

interface Props<T extends Idded> {
	searchFields: string[]; // Поля, по которым будет проводится фильтрация в списке items
	placeholder: string;
	addButtonText?: string; // Текст для кнопки добавления
	addButtonHref?: string; // Ссылка на кнопку для добавления
	tabs: Tab[];
	items: T[];
}

export const SearchedTable = <T extends Idded>({
	searchFields,
	placeholder,
	addButtonText,
	addButtonHref,
	tabs,
	items,
}: Props<T>) => {
	const [searchText, setSearchText] = useState('');

	// Элементы, которые подходят под строку поиска
	const searchedItems = items.filter((item) => {
		// Разделяем строку поиска на массив слов (убираем лишние пробелы)
		const searchWords = searchText.trim().toLowerCase().split(/\s+/).filter(Boolean);

		// Проверяем, что все слова из строки поиска содержатся хотя бы в одном поле
		return searchWords.every((word) =>
			searchFields.some((field) => item[field] && String(item[field]).toLowerCase().includes(word))
		);
	});

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchText(e.target.value);
	};

	return (
		<Block
			heading={
				<>
					<InputGroup startElement={<FiSearch className={styles.searchIcon} />}>
						<Input
							placeholder={placeholder}
							value={searchText}
							onChange={handleChange}
							_focus={{ outline: 'none', border: '1px solid rgba(226, 232, 240, 1)' }}
							maxWidth={'572px'}
						/>
					</InputGroup>
					<Button variant="primary" size="XS" icon={addIcon} as="link" href={addButtonHref}>
						{addButtonText}
					</Button>
				</>
			}
		>
			<TabedTable tabs={tabs} items={searchedItems} />
		</Block>
	);
};
