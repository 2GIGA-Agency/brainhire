'use client';

import { Block } from '@/components/shared/Block';
import { toaster } from '@/components/ui/toaster';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { Flex, Textarea, Tooltip, useTooltip } from '@chakra-ui/react';
import { useState } from 'react';
import styles from './styles.module.scss';

import Image from 'next/image';
import { selectIsVacancyCreationAiGenerating } from '@/store/slices/vacancyCreation/vacancyCreationSlice';
import { COLORS } from '@/constants/colors';
import { Typo } from '@/components/shared/Typo/Typo';
import { LkButton } from '@/components/shared/LkButton';
import { selectIsTipsShow, toggleIsModalShow } from '@/store/slices/appSlice';
import { HiOutlineQuestionMarkCircle } from 'react-icons/hi';
import { useResize } from '@/hooks/useResize';
import { generateVacancyInfo } from '@/store/thunks/vacancyCreateAndEditFlow/generateVacancyInfo';

export const VacancyGeneration = () => {
	const dispatch = useAppDispatch();

	const [width] = useResize();
	const [vacancyDescription, setVacancyDescription] = useState('');
	const [prevDescription, setPrevDescription] = useState(vacancyDescription);
	const isGenerating = useAppSelector(selectIsVacancyCreationAiGenerating);
	const tooltipPos = width < 815 ? 'bottom' : 'top';
	const tooltip = useTooltip({ positioning: { placement: tooltipPos } });
	const isTipsShow = useAppSelector(selectIsTipsShow);

	const handleClick = () => {
		if (vacancyDescription.trim().length === 0) {
			toaster.create({ title: 'Для генерации данных в поле должен быть хотя бы один символ' });
			return;
		} else if (prevDescription === vacancyDescription) {
			toaster.create({
				title: 'Для генерации новых данных, текущий запрос должен отличаться от предыдущего',
			});
			return;
		}
		try {
			const promise = dispatch(generateVacancyInfo(vacancyDescription));
			toaster.promise(promise, {
				success: { title: 'Данные сгенерированы' },
				error: { title: 'Ошибка генерации данных' },
				loading: { title: 'Генерируем данные' },
			});
			setPrevDescription(vacancyDescription);
		} catch (e: any) {
			console.error('Ошибка генерации вакансии: ' + e.message);
		}
	};

	const handleMouseEnter = () => {
		dispatch(toggleIsModalShow());
		tooltip.setOpen(true);
	};
	const handleMouseLeave = () => {
		dispatch(toggleIsModalShow());
		tooltip.setOpen(false);
	};

	return (
		<>
			<Block
				subHeadingText="Укажите название вакансии и специализацию, ИИ сгенерирует описание, которое можно будет отредактировать"
				headingText={
					<Flex alignItems="center" gap={2}>
						<Typo size="16px" weight="medium" color={COLORS.GRAY_800}>
							Описание вакансии
						</Typo>
						{isTipsShow && (
							<HiOutlineQuestionMarkCircle
								className={styles.tip}
								cursor={'help'}
								size={16}
								onMouseEnter={handleMouseEnter}
								onMouseLeave={handleMouseLeave}
							/>
						)}
					</Flex>
				}
			>
				<Tooltip.RootProvider value={tooltip}>
					<Tooltip.Trigger asChild>
						<Textarea
							value={vacancyDescription}
							minHeight="80px"
							onChange={(e) => setVacancyDescription(e.target.value)}
							_focus={{ outline: 'none', borderColor: '#4299E1' }}
							padding="8xp 12px 0"
							fontSize="14px"
							borderRadius="6px"
							placeholder="Введите описание вакансии"
						/>
					</Tooltip.Trigger>

					{isTipsShow && (
						<Tooltip.Positioner>
							<Tooltip.Content bg={COLORS.WHITE} p={3}>
								<Tooltip.Arrow
									stroke={`${COLORS.WHITE} !important`}
									borderColor={`${COLORS.WHITE} !important`}
								>
									<Tooltip.ArrowTip
										bg={`${COLORS.WHITE} !important`}
										borderColor={`${COLORS.WHITE} !important`}
									/>
								</Tooltip.Arrow>
								<Typo color={COLORS.GRAY_800} weight="medium">
									Напишите описание вакансии, нажмите «Сгенерировать с ИИ данные вакансии»,
									подождите, пока ИИ заполнит поля или заполните вручную. Их можно редактировать.
								</Typo>
							</Tooltip.Content>
						</Tooltip.Positioner>
					)}
				</Tooltip.RootProvider>

				{/* Не сделал LkButton, т.к. есть проблемы с модульными стилями CSS */}
				<LkButton
					className={styles.generateButton}
					disabled={isGenerating}
					onClick={handleClick}
					icon={<Image alt="AI" src="/icons/AIEffect.svg" width={15} height={15} />}
				>
					<Typo size="14px" weight="semibold" color={COLORS.WHITE}>
						Сгенерировать с ИИ данные вакансии
					</Typo>
				</LkButton>
			</Block>
		</>
	);
};
