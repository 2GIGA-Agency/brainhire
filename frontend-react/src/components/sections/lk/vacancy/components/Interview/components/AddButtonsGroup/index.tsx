import { Typo } from '@/components/shared/Typo/Typo';
import {
	addQuestion,
	selectMessage,
	setMessage,
} from '@/store/slices/vacancyCreation/interviewSlice';
import { selectIsVacancyCreationAiGenerating } from '@/store/slices/vacancyCreation/vacancyCreationSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { generateInterviewQuestions } from '@/store/thunks/vacancyCreateAndEditFlow/interviewThunks';
import { Flex } from '@chakra-ui/react';
import { toaster } from '@/components/ui/toaster';
import Image from 'next/image';
import { COLORS } from '@/constants/colors';
import { useResize } from '@/hooks/useResize';
import { LkButton } from '@/components/shared/LkButton';

export function AddButtonsGroup() {
	const dispatch = useAppDispatch();
	const isGenerating = useAppSelector(selectIsVacancyCreationAiGenerating);
	const message = useAppSelector(selectMessage);

	const [width] = useResize();
	const isMobile = width < 670;

	if (message) {
		const duration = 10000;
		toaster.create({
			title: 'Изменено количество вопросов для генерации',
			description: message,
			duration,
		});
		dispatch(setMessage(''));
	}

	const handleGenerateQuestions = async () => {
		const generateQuestionsResponse = dispatch(generateInterviewQuestions());
		toaster.promise(generateQuestionsResponse, {
			success: { title: 'Вопросы сгенерированы' },
			error: { title: 'Ошибка генерации' },
			loading: { title: 'Вопросы генерируются' },
		});
	};

	const handleAddQuestion = () => {
		dispatch(addQuestion());
	};

	return (
		<>
			<Flex flexDir={isMobile ? 'column' : 'row'} gap="24px" alignSelf="end">
				<LkButton
					bg={COLORS.BLUE_400}
					onClick={handleGenerateQuestions}
					icon={<Image alt="AI" src="/icons/AIEffect.svg" width={15} height={15} />}
					disabled={isGenerating}
				>
					<Typo color={COLORS.WHITE} fontSize="14px" weight="semibold">
						Сгенерировать вопросы с ИИ
					</Typo>
				</LkButton>
				<LkButton
					bg={COLORS.TEAL_400}
					onClick={handleAddQuestion}
					disabled={isGenerating}
					icon={
						<Image
							src={'/icons/add.svg'}
							width={15}
							height={15}
							alt={'Plus'}
							style={{ marginTop: '1px' }}
						/>
						}
				>
					<Typo color={COLORS.WHITE} fontSize="14px" weight="semibold">
						Добавить вопрос вручную
					</Typo>
				</LkButton>
			</Flex>
		</>
	);
}
