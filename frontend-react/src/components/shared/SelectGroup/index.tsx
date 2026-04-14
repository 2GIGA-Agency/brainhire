import { Selection } from '../Selection';
import { Box, Button, Flex, ListCollection, IconButton, Grid } from '@chakra-ui/react';
import { createListCollection } from '@chakra-ui/react';

interface SelectGroupItem {
	label: string;
	value: string;
}

interface Props {
	options: SelectGroupItem[][]; // Массив строк с элементами для каждого селекта
	collections: ListCollection<Record<'label' | 'value', string>>[]; // Полные коллекции для каждого селекта
	selectedValues: Record<number, string[]>; // Индекс селекта -> массив выбранных значений
	filterIndices: number[]; // Индексы селектов, для которых нужно фильтровать коллекции
	onSelect: (rowIndex: number, colIndex: number, value: string) => void;
	onAdd: () => void;
	onRemove: (rowIndex: number) => void;
}

export default function SelectGroup({
	options,
	collections,
	selectedValues,
	filterIndices,
	onSelect,
	onAdd,
	onRemove,
}: Props) {
	// Функция для создания отфильтрованной коллекции
	const getFilteredCollection = (colIndex: number, currentRowIndex: number) => {
		// Если этот селект не нужно фильтровать - возвращаем полную коллекцию
		if (!filterIndices.includes(colIndex)) {
			return collections[colIndex];
		}

		// Получаем все выбранные значения для этого селекта, кроме текущей строки
		const valuesToExclude = selectedValues[colIndex]
			? selectedValues[colIndex].filter((_, index) => index !== currentRowIndex)
			: [];

		// Фильтруем исходную коллекцию
		const filteredItems = collections[colIndex].items.filter(
			(item) => !valuesToExclude.includes(item.value)
		);

		return createListCollection({ items: filteredItems });
	};

	return (
		<Box w="100%">
			<Flex direction="column" gap={4} mb={options.length ? 4 : 0}>
				{options.map((rowItems, rowIndex) => (
					<Grid
						key={rowIndex}
						gap={2}
						gridTemplateColumns={`repeat(${rowItems.length}, 1fr) auto`}
						alignItems="center"
					>
						{rowItems.map((item, colIndex) => {
							const filteredCollection = getFilteredCollection(colIndex, rowIndex);

							return (
								<Box key={colIndex} flex="1">
									<Selection
										collection={filteredCollection}
										value={item.value ? [item.value] : []}
										onChange={(value) => {
											if (typeof value === 'string') {
												onSelect(rowIndex, colIndex, value);
											}
										}}
										placeholder={`Выберите ${colIndex === 0 ? 'язык' : 'уровень'}`}
									/>
								</Box>
							);
						})}

						<IconButton
							aria-label="Remove item"
							size="sm"
							variant="ghost"
							onClick={() => onRemove(rowIndex)}
						>
							X
						</IconButton>
					</Grid>
				))}
			</Flex>
			<Button onClick={onAdd} variant="outline" w="100%">
				+ Добавить строку
			</Button>
		</Box>
	);
}
