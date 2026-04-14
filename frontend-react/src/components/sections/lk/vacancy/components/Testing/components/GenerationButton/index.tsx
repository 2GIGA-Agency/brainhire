import { LkButton } from '@/components/shared/LkButton';
import { Typo } from '@/components/shared/Typo/Typo';
import { toaster } from '@/components/ui/toaster';
import { COLORS } from '@/constants/colors';
import { selectIsVacancyCreationAiGenerating } from '@/store/slices/vacancyCreation/vacancyCreationSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { generateTestQuestions } from '@/store/thunks/vacancyCreateAndEditFlow/testingThunks';
import Image from 'next/image';

export function GenerationButton() {
	const dispatch = useAppDispatch();
	const isGenerating = useAppSelector(selectIsVacancyCreationAiGenerating);

	const handleClick = async () => {
		const promise = dispatch(generateTestQuestions());
		toaster.promise(promise, {
			success: { title: 'Тест сгенерирован' },
			error: { title: 'Ошибка генерации теста' },
			loading: { title: 'Генерация теста' },
		});
	};

	return (
		<>
			<LkButton
				wordWrap={'break-word'}
				whiteSpace={'normal'}
				disabled={isGenerating}
				onClick={handleClick}
				icon={<Image alt="AI" src="/icons/AIEffect.svg" width={15} height={15} />}
			>
				<Typo color={COLORS.WHITE} fontSize="14px" weight="semibold">
					Сгенерировать вопросы с ИИ
				</Typo>
			</LkButton>
		</>
	);
}
