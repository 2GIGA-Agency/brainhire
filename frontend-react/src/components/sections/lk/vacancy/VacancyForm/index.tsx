'use client';
import { GrFormPreviousLink } from 'react-icons/gr';
import { Box, ButtonGroup, Flex, Steps } from '@chakra-ui/react';
import { toaster } from '@/components/ui/toaster';
import { useState, useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { createOrEditVacancy } from '@/store/thunks/vacancyCreateAndEditFlow/vacancyThunks';
import { fetchVacancyData } from '@/store/thunks/vacancyCreateAndEditFlow/fetchVacancyData';
import { useParams, useRouter } from 'next/navigation';
import { ContentSpinner } from '@/components/shared/ContentSpinner';

import {
	selectVacancyInfo,
	VacancyInfoState,
} from '@/store/slices/vacancyCreation/vacancyInfoSlice';
import { selectSelectedCompany } from '@/store/slices/vacancyCreation/companySlice';
import { selectSkills, SkillsState } from '@/store/slices/vacancyCreation/skillsSlice';
import { selectInterview, InterviewState } from '@/store/slices/vacancyCreation/interviewSlice';
import { selectTesting, TestingState } from '@/store/slices/vacancyCreation/testingSlice';
import { selectInitialCandidatesAmount } from '@/store/slices/vacancyCreation/previewSlice';
import {
	selectSelectableSkillGroups,
	SelectableSkillsGroup,
} from '@/store/slices/vacancyCreation/selectableSkillsSlice';
import {
	selectCompanyFilter,
	CompanyFilterState,
} from '@/store/slices/vacancyCreation/companyFilterSlice';
import {
	selectVacancyBot,
	VacancyBotState,
} from '@/store/slices/vacancyCreation/vacancyBotSlice';

import { deepEqual } from '@/utils/deepEqual';
import { useGetWalletQuery } from '@/store/rtkQuery/api';
import { useBalanceCompare } from '@/hooks/useBalanceCompare';

import styles from './styles.module.scss';
import { useResetVacancyInfo } from '@/hooks/useResetVacancyInfo';
import { COLORS } from '@/constants/colors';
import { Typo } from '@/components/shared/Typo/Typo';
import { LkButton } from '@/components/shared/LkButton';
import {
	selectCurrentStep,
	selectIsEdit,
	setCurrentStep,
} from '@/store/slices/vacancyCreation/vacancyCreationSlice';
import { checkSettingsChanged } from './utils';
import {
	selectVacancySettings,
	VacancySettingsState,
} from '@/store/slices/vacancyCreation/vacancySettings';
import { getVacancyFormSteps } from './constants';
import { checkSubdomain } from '@/utils/checkSubdamains';

interface InitialSliceData {
	vacancyInfo: VacancyInfoState;
	selectedCompanyId: string;
	skills: SkillsState;
	selectableSkills: SelectableSkillsGroup[];
	companyFilter: CompanyFilterState;
	interview: InterviewState;
	testing: TestingState;
	settings: VacancySettingsState;
	vacancyBot: VacancyBotState;
}

export default function VacancyForm() {
	const dispatch = useAppDispatch();
	const router = useRouter();
	const params = useParams();

	const isEdit = useAppSelector(selectIsEdit);
	const currentStepId = useAppSelector(selectCurrentStep);
	const vacancyId = isEdit ? (params.id as string) : undefined;
	const isSpecialAccess = checkSubdomain();

	const [isLoadingAction, setIsLoadingAction] = useState(false);

	// Edit-mode specific state
	const [initialSliceData, setInitialSliceData] = useState<InitialSliceData | null>(null);
	const [isLoading, setIsLoading] = useState(isEdit);

	const reset = useResetVacancyInfo();

	// Create-mode specific data
	const initialCandidateAmount = useAppSelector(selectInitialCandidatesAmount);
	const isBalanceInsufficient = useBalanceCompare(initialCandidateAmount * 100);
	const { refetch: refetchWallet } = useGetWalletQuery();

	// Получаем шаги с учетом режима редактирования
	const steps = useMemo(
		() => getVacancyFormSteps(isEdit, { includeAIBot: true }),
		[isEdit]
	);

	// Если текущий шаг отсутствует (например, AI бот скрыт), сбрасываем на первый доступный
	useEffect(() => {
		const hasCurrentStep = steps.some((step) => step.id === currentStepId);
		if (!hasCurrentStep && steps.length > 0) {
			dispatch(setCurrentStep(steps[0].id));
		}
	}, [currentStepId, steps, dispatch]);

	// Получаем текущий индекс для совместимости с Chakra Steps
	const currentStepIndex = steps.findIndex((step) => step.id === currentStepId);

	const isFirstStep = currentStepId === steps[0].id;
	const isLastStep = currentStepId === steps[steps.length - 1].id;

	// --- Get Current Data from Redux Store using Selectors ---
	const currentVacancyInfo = useAppSelector(selectVacancyInfo);
	const currentSelectedCompanyId = useAppSelector(selectSelectedCompany);
	const currentSkillsArray = useAppSelector(selectSkills);
	const currentSelectableSkillsGroups = useAppSelector(selectSelectableSkillGroups);
	const currentCompanyFilter = useAppSelector(selectCompanyFilter);
	const currentInterview = useAppSelector(selectInterview);
	const currentTesting = useAppSelector(selectTesting);
	const currentSettings = useAppSelector(selectVacancySettings);
	const currentVacancyBot = useAppSelector(selectVacancyBot);
	// --- End Get Current Data ---

	// Effect 1: Fetch data for edit mode
	useEffect(() => {
		if (isEdit && vacancyId) {
			setInitialSliceData(null);
			dispatch(fetchVacancyData(vacancyId))
				.unwrap()
				.then(() => {
					setIsLoading(false);
				})
				.catch((error) => {
					console.error('Ошибка при загрузке данных вакансии:', error);
					toaster.create({
						description: 'Не удалось загрузить данные вакансии',
						duration: 6000,
					});
					setIsLoading(false);
				});
		} else if (!isEdit) {
			setIsLoading(false);
		}
	}, [isEdit, vacancyId, dispatch]);

	// Effect 2: Capture initial slice data for edit mode after fetch completes
	useEffect(() => {
		if (isEdit && !isLoading && vacancyId && !initialSliceData) {
			setInitialSliceData({
				vacancyInfo: currentVacancyInfo,
				selectedCompanyId: currentSelectedCompanyId,
				skills: { skills: currentSkillsArray },
				selectableSkills: currentSelectableSkillsGroups,
				companyFilter: currentCompanyFilter,
				interview: currentInterview,
				testing: currentTesting,
				settings: currentSettings,
				vacancyBot: currentVacancyBot,
			});
		}
	}, [
		isEdit,
		isLoading,
		vacancyId,
		initialSliceData,
		currentVacancyInfo,
		currentSelectedCompanyId,
		currentSkillsArray,
		currentInterview,
		currentTesting,
		currentSettings,
		currentVacancyBot,
	]);

	// Effect 3: Cleanup slices on unmount
	useEffect(() => {
		return () => {
			reset();
		};
	}, [reset]);

	const isDataChanged = (() => {
		if (!isEdit || !initialSliceData || isLoading) {
			return false;
		}

		const vacancyInfoChanged = !deepEqual(initialSliceData.vacancyInfo, currentVacancyInfo);
		const companyChanged = initialSliceData.selectedCompanyId !== currentSelectedCompanyId;
		const skillsChanged = !deepEqual(initialSliceData.skills.skills, currentSkillsArray);
		const selectableSkillsChanged = !deepEqual(
			initialSliceData.selectableSkills,
			currentSelectableSkillsGroups
		);
		const companyFilterChanged = !deepEqual(initialSliceData.companyFilter, currentCompanyFilter);
		const interviewChanged = !deepEqual(initialSliceData.interview, currentInterview);
		const testingChanged = !deepEqual(initialSliceData.testing, currentTesting);
		const botChanged = !deepEqual(initialSliceData.vacancyBot, currentVacancyBot);

		const settingsChanged = !checkSettingsChanged(initialSliceData.settings, currentSettings);

		return (
			vacancyInfoChanged ||
			companyChanged ||
			skillsChanged ||
			selectableSkillsChanged ||
			companyFilterChanged ||
			interviewChanged ||
			testingChanged ||
			settingsChanged ||
			botChanged
		);
	})();

	// Функции для навигации по шагам
	const goToStep = (stepId: string) => {
		window.scrollTo(0, 0);
		dispatch(setCurrentStep(stepId as any));
	};

	const goToNextStep = () => {
		const currentIndex = steps.findIndex((step) => step.id === currentStepId);
		if (currentIndex < steps.length - 1) {
			goToStep(steps[currentIndex + 1].id);
		}
	};

	const goToPrevStep = () => {
		const currentIndex = steps.findIndex((step) => step.id === currentStepId);
		if (currentIndex > 0) {
			goToStep(steps[currentIndex - 1].id);
		}
	};

	const handleNext = () => {
		window.scrollTo(0, 0);

		if (!isLastStep) {
			goToNextStep();
			return;
		}

		// Логика сохранения/создания вакансии
		const handleVacancyAction = async () => {
			if (isEdit) {
				if (!vacancyId) {
					toaster.create({ title: 'Ошибка: ID вакансии отсутствует.' });
					return;
				}
				if (!isDataChanged) {
					throw new Error('Нет изменений для сохранения');
				}
			} else {
				if (isBalanceInsufficient) {
					throw new Error('Недостаточно средств');
				}
			}

			try {
				setIsLoadingAction(true);

				const action = isEdit
					? dispatch(createOrEditVacancy({ isCreate: false, vacancyId }))
					: dispatch(createOrEditVacancy({ isCreate: true }));

				const promise = action.unwrap();

				const result = await Promise.allSettled([
					toaster.promise(promise, {
						success: {
							title: `Вакансия ${isEdit ? 'успешно обновлена' : 'создана успешно'}`,
						},
						loading: {
							title: `Выполняется ${isEdit ? 'обновление' : 'создание'} вакансии`,
						},
					}),
					promise,
				]);

				if (result[1].status === 'rejected') {
					throw new Error(result[1].reason);
				}

				return result[1].value;
			} catch (error) {
				console.error('Ошибка при обработке вакансии:', error);
				setIsLoadingAction(false);
				throw error;
			}
		};

		handleVacancyAction()
			.then((res) => {
				const vacancyId = res?.id;
				if (!isEdit) refetchWallet();
				setTimeout(() => {
					router.push(`/vacancy/${vacancyId}`);
				}, 2000);
			})
			.catch((err) => {
				toaster.error({ title: err.message });
				console.error(`${isEdit ? 'Update' : 'Create'} promise rejected:`, err);
			});
	};

	const handlePrev = () => {
		goToPrevStep();
	};

	const submitButtonText = isLastStep
		? isEdit
			? 'Сохранить изменения'
			: 'Создать вакансию'
		: 'Продолжить';

	if (isEdit && (isLoading || (!initialSliceData && vacancyId))) {
		return <ContentSpinner />;
	}

	return (
		<>
			<Steps.Root step={currentStepIndex} count={steps.length} marginTop="32px">
				<Steps.List className={styles.stepsList}>
					{steps.map((step, index) => (
						<Steps.Item
							key={step.id}
							index={index}
							onClick={() => goToStep(step.id)}
							cursor="pointer"
							title={step.title}
						>
							<Steps.Indicator
								border="1px solid #4299E1"
								bgColor="#EBF8FF"
								_complete={{ color: '#fff', bgColor: '#4299E1' }}
								_current={{ bgColor: 'blue.50', borderColor: '#4299E1' }}
								_incomplete={{ bgColor: '#fff', borderColor: '#CBD5E0' }}
							/>
							<Box>
								<Steps.Title>{step.title}</Steps.Title>
							</Box>
							<Steps.Separator
								_complete={{ background: 'var(--chakra-colors-border)' }}
								marginRight="8px"
							/>
						</Steps.Item>
					))}
				</Steps.List>

				{steps.map((step, index) => (
					<Steps.Content key={step.id} index={index}>
						{step.component}
					</Steps.Content>
				))}

				<ButtonGroup
					size="sm"
					width="100%"
					display="flex"
					wrap={'wrap'}
					justifyContent="space-between"
					mt="32px"
				>
					<LkButton
						bg={COLORS.WHITE_ALPHA_100}
						borderWidth={1}
						borderStyle={'solid'}
						borderColor={COLORS.GRAY_300}
						onClick={() => router.push('/vacancy/')}
						heightSize="medium"
						padding="0 21px"
					>
						<Typo weight="medium" color={COLORS.GRAY_800}>
							Отменить
						</Typo>
					</LkButton>
					<Flex>
						{!isFirstStep && (
							<Steps.PrevTrigger mr="16px">
								<LkButton
									bg={COLORS.WHITE_ALPHA_100}
									borderWidth={1}
									borderStyle={'solid'}
									borderColor={COLORS.GRAY_300}
									onClick={handlePrev}
									heightSize="medium"
									padding="0 21px"
								>
									<Flex alignItems="center" justifyContent="space-between" gap="8px">
										<GrFormPreviousLink color={COLORS.GRAY_800} />
										<Typo weight="medium" color={COLORS.GRAY_800}>
											Назад
										</Typo>
									</Flex>
								</LkButton>
							</Steps.PrevTrigger>
						)}
						<LkButton
							heightSize="medium"
							bg={isLastStep ? COLORS.BLUE_400 : 'rgb(255, 116, 1)'}
							_hover={{ bg: isLastStep ? COLORS.BLUE_500 : 'rgb(238, 93, 1)' }}
							onClick={handleNext}
							disabled={isLastStep && isLoadingAction}
							p={'0 22px'}
						>
							<Typo weight="semibold" color={COLORS.WHITE}>
								{submitButtonText}
							</Typo>
						</LkButton>
					</Flex>
				</ButtonGroup>
			</Steps.Root>
		</>
	);
}
