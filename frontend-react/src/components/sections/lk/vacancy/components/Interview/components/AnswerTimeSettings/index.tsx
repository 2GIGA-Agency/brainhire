import { LkField } from '@/components/shared/LkField';
import { useResize } from '@/hooks/useResize';
import { selectSelectedTime, setSelectedTime } from '@/store/slices/vacancyCreation/interviewSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { Box, HStack, RadioCard } from '@chakra-ui/react';
import { TimeItem } from './TimeItem';

const times = [1, 1.5, 2, 2.5, 3];

export function AnswerTimeSettings() {
	const dispatch = useAppDispatch();
	const selectedTime = useAppSelector(selectSelectedTime);

	const [width] = useResize();
	const isMobile = width < 630;

	return (
		<LkField label="Время для ответа на каждый вопрос" required={true}>
			<RadioCard.Root
				value={String(selectedTime)} // Текущее значение времени
				onValueChange={(e) => dispatch(setSelectedTime(Number(e.value)))} // Обновляем время
				width="100%"
			>
				{isMobile ? (
					<Box width="100%" gridTemplateColumns="1fr" gap="0">
						{times.map((time) => (
							<TimeItem time={time} key={time} />
						))}
					</Box>
				) : (
					<HStack gap="0">
						{times.map((time) => (
							<TimeItem time={time} key={time} />
						))}
					</HStack>
				)}
			</RadioCard.Root>
		</LkField>
	);
}
