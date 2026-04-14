// src/components/Testing.tsx
import { Block } from '@/components/shared/Block';
import { RadioButtonGroup } from '@/components/ui-kit/RadioButtonGroup';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { selectTesting, setIsTestRequired } from '@/store/slices/vacancyCreation/testingSlice';

import { TestGeneration } from './components/TestGeneration';
import { Typo } from '@/components/shared/Typo/Typo';

export const selectItems = [
	{ label: 'Да', value: 'yes' },
	{ label: 'Нет', value: 'no' },
];

export const testExampleItems = [
	{ label: 'Оптимизация сайта для поисковых систем', value: 'opt' },
	{ label: 'Размещение рекламы на телевидении', value: 'tel' },
	{ label: 'Создание сайтов для мобильных устройств', value: 'create' },
	{ label: 'Продажа товаров через интернет-магазин', value: 'sell' },
];

export const Testing = () => {
	const dispatch = useAppDispatch();
	const { isTestRequired } = useAppSelector(selectTesting);

	return (
		<>
			{/* Блок выбора необходимости тестирования */}
			<Block
				headingText="Хотите ли Вы, чтобы кандидат прошел тестирование?"
				subHeadingText="Выберите ответ"
				helpTipText={
					<Typo weight="medium">
						Если вам нужно протестировать кандидата в рамках собеседования, нажмите «Да», далее –
						«Сгенерировать вопросы с ИИ». Их можно будет перегенерировать. Тестирование проходит
						перед интервью.
					</Typo>
				}
			>
				<RadioButtonGroup
					onChange={() => dispatch(setIsTestRequired(!isTestRequired))}
					initialValue={isTestRequired ? 'yes' : 'no'}
					items={selectItems}
				/>
			</Block>

			{/* Блок генерации теста */}
			{isTestRequired && <TestGeneration />}
		</>
	);
};
