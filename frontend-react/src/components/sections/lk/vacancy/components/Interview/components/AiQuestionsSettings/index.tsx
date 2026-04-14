import { LkField } from '@/components/shared/LkField';
import {
	selectAiQuestionsAmount,
	setAiQuestionsAmount,
} from '@/store/slices/vacancyCreation/interviewSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { Slider } from '@chakra-ui/react';

export function AiQuestionsSettings() {
	const dispatch = useAppDispatch();
	const aiQuestionsAmount = useAppSelector(selectAiQuestionsAmount);

	return (
		<LkField
			label={`Количество вопросов, которые создаются ИИ: ${aiQuestionsAmount}`}
			required={true}
		>
			<Slider.Root
				width="100%"
				value={[aiQuestionsAmount]}
				cursor="pointer"
				mt="12px"
				onValueChange={(e) => dispatch(setAiQuestionsAmount(e.value[0]))}
				max={15}
				min={5}
			>
				<Slider.Control>
					<Slider.Track>
						<Slider.Range bg="#4299E1" />
					</Slider.Track>
					<Slider.Thumbs border="1px solid rgb(0,0,0,0.5)" />
				</Slider.Control>
			</Slider.Root>
		</LkField>
	);
}
