import { InfoBlock } from '@/components/ui-kit/InfoBlock';
import { List } from '@chakra-ui/react';
import styles from './styles.module.scss';
import { Typo } from '@/components/shared/Typo/Typo';
import { COLORS } from '@/constants/colors';
import { useResize } from '@/hooks/useResize';

const creationChoice = [
	{
		label: 'Генерация вопросов с помощью ИИ',
		content:
			'Выберите количество вопросов и нажмите "Сгенерировать вопросы с ИИ". Сгенерированные вопросы можно редактировать и удалять.',
	},
	{
		label: 'Добавление вопросов вручную',
		content:
			'Нажмите "Добавить вопрос вручную" для создания пустого поля, где вы можете ввести вопрос. Все вопросы можно редактировать и удалять.',
	},
	{
		label: 'Скомбинированный режим',
		content:
			'Сгенерируйте вопросы с ИИ и добавьте свои вопросы вручную. Все вопросы можно редактировать и удалять.',
	},
];

export function InterviewInfo() {
	const [width] = useResize();

	const isMinified = width < 730;

	return (
		<InfoBlock
			minified={isMinified}
			headingText="Вы можете выбрать один из способов создания вопросов:"
		>
			<List.Root className={styles.list}>
				{creationChoice.map((i, idx) => {
					return (
						<List.Item key={idx} mb="16px" ml="16px">
							<Typo size="14px" color={COLORS.GRAY_800} weight="medium">
								{i.label}
							</Typo>
							<Typo mt="8px" size="14px" color={COLORS.GRAY_800} weight="regular">
								{i.content}
							</Typo>
						</List.Item>
					);
				})}
			</List.Root>
		</InfoBlock>
	);
}
