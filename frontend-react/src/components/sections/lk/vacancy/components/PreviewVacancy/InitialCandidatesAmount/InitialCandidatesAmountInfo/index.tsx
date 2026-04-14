import { InfoBlock } from '@/components/ui-kit/InfoBlock';
import { useResize } from '@/hooks/useResize';

export function InitialCandidatesAmountInfo() {
	const [width] = useResize();
	const isMinified = width < 400;

	return (
		<InfoBlock
			minified={isMinified}
			headingText="Пояснение"
			subHeadingText="Стоимость обработки 1 кандидата - 100 токенов. Изменить количество кандидатов можно в любой
				момент в разделе “Вакансии”. Также вы можете поставить вакансию на паузу."
			mb="32px"
		/>
	);
}
