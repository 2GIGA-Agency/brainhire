import { QuestionList } from '@/components/shared/QuestionList';
import { Typo } from '@/components/shared/Typo/Typo';
import { COLORS } from '@/constants/colors';
import { selectTesting } from '@/store/slices/vacancyCreation/testingSlice';
import { useAppSelector } from '@/store/store';
import { Box } from '@chakra-ui/react';
import { useMemo } from 'react';

export function GeneratedTestList() {
	const { generatedTest } = useAppSelector(selectTesting);

	const formattedQuestions = useMemo(
		() =>
			generatedTest?.questions.map((question) => ({
				id: question.id,
				label: `${question.order}. ${question.text}`,
				questionList: question.answers.map((answer) => ({
					id: answer.id,
					label: answer.text,
					correct: answer.is_correct,
				})),
			})) || [],
		[generatedTest]
	);

	return generatedTest && formattedQuestions.map((i, idx) => {
		return (
			<Box key={idx} mt="32px">
				<Typo fontSize="16px" weight={'semibold'} color={COLORS.GRAY_800}>
					{i.label}
				</Typo>
				<QuestionList mt="16px" items={i.questionList} />
			</Box>
		);
	});
}
