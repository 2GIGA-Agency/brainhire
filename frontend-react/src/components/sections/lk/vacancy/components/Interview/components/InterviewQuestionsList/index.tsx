import { InterviewQuestion } from '@/components/shared/InterviewQuestion/InterviewQuestion';
import {
	selectInvalidQuestionKeys,
	selectQuestions,
	updateQuestion,
} from '@/store/slices/vacancyCreation/interviewSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { deleteQuestionByKey } from '@/store/thunks/vacancyCreateAndEditFlow/interviewThunks';
import { Box, Flex } from '@chakra-ui/react';

export function InterviewQuestionsList() {
	const dispatch = useAppDispatch();
	const questions = useAppSelector(selectQuestions);
	const invalidQuestions = useAppSelector(selectInvalidQuestionKeys);

	return (
		<Box mt="24px">
			<Flex flexDirection="column" gap="16px" mb="24px">
				{Object.entries(questions).map(([key, value]) => {
					return (
						<InterviewQuestion
							key={key}
							label={`Вопрос ${key.split('_')[1]}`}
							content={value.question}
							invalid={invalidQuestions.includes(key)}
							onChange={(content) => dispatch(updateQuestion([key, content]))}
							onDelete={() => dispatch(deleteQuestionByKey({ key }))}
						/>
					);
				})}
			</Flex>
		</Box>
	);
}
