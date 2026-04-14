import { Block } from '@/components/shared/Block';
import { GenerationButton } from '../GenerationButton';
import { GeneratedTestList } from '../GeneratedTestList';
import { GenerationTestInfo } from '../GenerationTestInfo';

export const testExampleItems = [
	{ label: 'Оптимизация сайта для поисковых систем', value: 'opt' },
	{ label: 'Размещение рекламы на телевидении', value: 'tel' },
	{ label: 'Создание сайтов для мобильных устройств', value: 'create' },
	{ label: 'Продажа товаров через интернет-магазин', value: 'sell' },
];

export function TestGeneration() {

	return (
		<>
			<Block headingText="Тест" subHeadingText="Сгенерируйте 10 вопросов для тестирования">
				{/* Информация о генерации теста */}
				<GenerationTestInfo />
				{/* Кнопка для генерации теста */}
				<GenerationButton />
				{/* Отображение сгенерированного теста */}
				<GeneratedTestList />
			</Block>
		</>
	);
}
