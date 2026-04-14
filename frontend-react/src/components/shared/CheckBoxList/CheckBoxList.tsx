'use client';

// Убедитесь, что импорты CheckboxItem и QuestionList/QuestionListItem корректны
import { CheckboxItem } from '@/components/shared/ChackboxItem'; // Проверьте путь
import { QuestionList, QuestionListItem } from '@/components/shared/QuestionList/QuestionList'; // Проверьте путь
import { Flex } from '@chakra-ui/react';

export interface CheckboxListItem {
	label: string;
	questionList: QuestionListItem[];
	id?: string | number; // <-- Хорошей практикой будет добавить уникальный ID
}

interface Props {
	items: CheckboxListItem[];
	checkedIdxs: number[];
	// Ожидаем функцию, которая принимает индекс элемента
	onItemChange: (idx: number) => void;
}

export const CheckboxList = ({ items, checkedIdxs, onItemChange }: Props) => {
	return (
		<Flex direction="column" mt="24px">
			{items.map((item, idx) => {
				const key = item.id ?? idx;

				return (
					<CheckboxItem
						key={key} // Используем стабильный ключ
						label={item.label}
						isChecked={checkedIdxs.includes(idx)}
						// ВАЖНО: Передаем новую функцию, которая вызывает onItemChange с текущим idx
						// Эта функция будет вызвана компонентом CheckboxItem при его изменении
						onChange={() => onItemChange(idx)}
						marginBottom="24px"
					>
						{/* Можно добавить id для связи с aria-controls */}
						<QuestionList items={item.questionList} /* id={`question-list-${key}`} */ />
					</CheckboxItem>
				);
			})}
		</Flex>
	);
};
