import { InfoBlock } from '@/components/ui-kit/InfoBlock';
import { RadioButtonGroup } from '@/components/ui-kit/RadioButtonGroup';
import { useResize } from '@/hooks/useResize';

export const testExampleItems = [
	{ label: 'Оптимизация сайта для поисковых систем', value: 'opt' },
	{ label: 'Размещение рекламы на телевидении', value: 'tel' },
	{ label: 'Создание сайтов для мобильных устройств', value: 'create' },
	{ label: 'Продажа товаров через интернет-магазин', value: 'sell' },
];

export function GenerationTestInfo() {
	const [width] = useResize();
	const isMinified = width < 440;

	return (
		<InfoBlock
			minified={isMinified}
			headingText="Пример"
			subHeadingText="Наш сервис использует искусственный интеллект для автоматического подбора персонала. Перед тем как сгенерировать 10 вопросов для тестирования кандидата, ознакомьтесь с примером одного вопроса с вариантами ответов:"
			marginBottom="24px"
		>
			<RadioButtonGroup
				label="Что такое SEO?"
				items={testExampleItems}
				initialValue={testExampleItems[0].value}
			/>
		</InfoBlock>
	);
}
