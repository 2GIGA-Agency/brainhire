import { Typo } from '@/components/shared/Typo/Typo';
import { TestingQuestion } from '@/store/types';
import { Box, RadioGroup } from '@chakra-ui/react';
import styles from './styles.module.scss';
import { COLORS } from '@/constants/colors';
interface Props {
	testQuestion: TestingQuestion;
	onClick: (id: number) => void;
}

// TODO: Сделать общий компонент для теста в 3 вариациях: просмотр, просмотр результатов кандидата, с выбором (для интервью)
export function InterviewTestQuestion({ testQuestion, onClick }: Props) {
	const { order, text, answers } = testQuestion;

	return (
		<>
			<Typo color={COLORS.GRAY_800} fontSize="16px" weight="semibold">{`${order}. ${text}`}</Typo>
			<RadioGroup.Root className={styles.answersWrapper}>
				<Box className={styles.answersBox}>
					{answers.map((i) => {
						return (
							<RadioGroup.Item
								key={i.id}
								value={i.text}
								cursor="pointer"
								onClick={() => onClick(i.id)}
							>
								<RadioGroup.ItemHiddenInput />
								<RadioGroup.ItemIndicator cursor="pointer" />
								<RadioGroup.ItemText>{i.text}</RadioGroup.ItemText>
							</RadioGroup.Item>
						);
					})}
				</Box>
			</RadioGroup.Root>
		</>
	);
}
