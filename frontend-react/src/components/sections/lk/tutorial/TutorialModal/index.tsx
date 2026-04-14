import { LkButton } from '@/components/shared/LkButton';
import { Typo } from '@/components/shared/Typo/Typo';
import { COLORS } from '@/constants/colors';
import { selectIsTutorialShow } from '@/store/slices/appSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { sendTutorialStatus } from '@/store/thunks/app/tutorialThunks';
import { Box, Dialog, Flex, List, Portal, Progress } from '@chakra-ui/react';
import { memo, useState } from 'react';

const steps = [
	{
		title: 'Добро пожаловать в BRaiN HR!',
		content: (
			<Typo color={COLORS.GRAY_800}>
				Мы поможем вам создать первую вакансию и автоматизировать процесс подбора кандидатов.
				Давайте начнём!
			</Typo>
		),
	},
	{
		title: "Раздел 'Компании'",
		content: (
			<>
				<Typo color={COLORS.GRAY_800}>
					Перед созданием вакансии добавьте компанию. Вы можете добавить несколько компаний.
				</Typo>
				<Typo color={COLORS.GRAY_800} mt={2}>
					Для создания компании:
				</Typo>
				<List.Root ml={3} mt={2}>
					<List.Item>Нажмите &quot;Создать компанию&quot;</List.Item>
					<List.Item>Введите ИНН</List.Item>
					<List.Item>Добавьте описание</List.Item>
				</List.Root>
			</>
		),
	},
	{
		title: "Раздел 'Вакансии'",
		content: (
			<>
				<Typo color={COLORS.GRAY_800}>В разделе вы можете управлять вакансиями:</Typo>
				<List.Root ml={3} mt={2}>
					<List.Item>Создавать новые</List.Item>
					<List.Item>Просматривать</List.Item>
					<List.Item>Редактировать или клонировать существующие</List.Item>
					<List.Item>Архивировать закрытые</List.Item>
				</List.Root>
			</>
		),
	},
	{
		title: 'Создание вакансии (Шаг 1 - описание)',
		content: (
			<>
				<Typo color={COLORS.GRAY_800}>Заполните описание вакансии:</Typo>
				<List.Root ml={3} mt={2}>
					<List.Item>Напишите текст сами</List.Item>
					<List.Item>
						Или нажмите &quot;Сгенерировать с ИИ&quot; – система сама предложит требования и навыки
					</List.Item>
				</List.Root>
			</>
		),
	},
	{
		title: 'Создание вакансии (Шаг 2 - интервью)',
		content: (
			<>
				<Typo color={COLORS.GRAY_800}>Настройте интервью:</Typo>
				<List.Root ml={3} mt={2}>
					<List.Item>Сколько вопросов будет у кандидата?</List.Item>
					<List.Item>Сколько времени на ответ?</List.Item>
					<List.Item>Можно сгенерировать вопросы ИИ или написать свои</List.Item>
				</List.Root>
			</>
		),
	},
	{
		title: 'Создание вакансии (Шаг 3 - тесты)',
		content: (
			<>
				<Typo color={COLORS.GRAY_800}>
					Добавьте тест (необязательно, рекомендуется для вакансий с большим количеством
					кандидатов):
				</Typo>
				<List.Root ml={3} mt={2}>
					<List.Item>Помогает отсеять неподходящих на первом этапе</List.Item>
					<List.Item>Вопросы генерируются с ИИ. Их можно перегенерировать</List.Item>
				</List.Root>
			</>
		),
	},
	{
		title: 'Создание вакансии (Шаг 4 - настройка)',
		content: (
			<>
				<Typo color={COLORS.GRAY_800}>
					Загрузите презентацию и включите обратную связь (необязательно)
				</Typo>
				<List.Root ml={3} mt={2}>
					<List.Item>Видео или PDF о компании. Кандидаты увидят её перед собеседованием.</List.Item>
					<List.Item>Обратная связь автоматически отправится после собеседования</List.Item>
				</List.Root>
			</>
		),
	},
	{
		title: 'Создание вакансии (Шаг 5 - публикация)',
		content: (
			<>
				<Typo color={COLORS.GRAY_800}>Опубликуйте вакансию:</Typo>
				<List.Root ml={3} mt={2}>
					<List.Item>Укажите, сколько кандидатов обработать</List.Item>
					<List.Item>Нажмите &quot;Создать вакансию&quot;</List.Item>
					<List.Item>Затем опубликуйте на hh.ru (если подключен профиль)</List.Item>
				</List.Root>
			</>
		),
	},
	{
		title: 'Интеграция с hh.ru',
		content: (
			<>
				<Typo color={COLORS.GRAY_800}>Как привязать hh.ru?</Typo>
				<List.Root ml={3} mt={2}>
					<List.Item>1. Зайдите в &quot;Профиль&quot;</List.Item>
					<List.Item>2. Нажмите &quot;Подключить&quot;</List.Item>
					<List.Item>3. Разрешите доступ – и вакансии можно публиковать в один клик!</List.Item>
				</List.Root>
			</>
		),
	},
	{
		title: "Раздел 'Коллеги'",
		content: (
			<Typo color={COLORS.GRAY_800}>
				Приглашайте коллег и работайте с вакансиями и кандидатами вместе!
			</Typo>
		),
	},
	{
		title: "Раздел 'Финансы'",
		content: (
			<>
				<Typo color={COLORS.GRAY_800}>Токены нужны для обработки кандидатов:</Typo>
				<List.Root ml={3} mt={2}>
					<List.Item>1 кандидат = 100 токенов</List.Item>
					<List.Item>У вас есть 10 000 бесплатных токенов (хватит на 100 кандидатов)</List.Item>
					<List.Item>Пополняйте баланс в разделе &quot;Финансы&quot;</List.Item>
				</List.Root>
			</>
		),
	},
];

export const TutorialModal = memo(function TutorialModal() {
	const [step, setStep] = useState(0);
	const isTutorialShow = useAppSelector(selectIsTutorialShow);
	const dispatch = useAppDispatch();

	const isLastStep = step + 1 == steps.length;
	const currentStep = steps[step];
	const progress = Math.floor(100 * ((step + 1) / steps.length));

	const handleOpenChange = () => {
		dispatch(sendTutorialStatus());
	};

	const handleNextClick = () => {
		if (isLastStep) {
			handleOpenChange();
		} else {
			setStep((prev) => prev + 1);
		}
	};

	return (
		<Dialog.Root lazyMount open={isTutorialShow} onOpenChange={handleOpenChange}>
			<Portal>
				<Dialog.Backdrop />
				<Dialog.Positioner>
					<Dialog.Content minH="320px">
						<Dialog.Body display={'grid'}>
							<Progress.Root mt={4} mb={4} value={progress} maxW="100%">
								<Progress.Track flex="1">
									<Progress.Range bg={COLORS.BLUE_400} />
								</Progress.Track>
							</Progress.Root>
							<Box>
								<Typo color={COLORS.GRAY_800} weight="semibold" size="16px">
									{currentStep.title}
								</Typo>
								<Typo color={COLORS.GRAY_800} weight="medium" mt={2}>
									{currentStep.content}
								</Typo>
							</Box>
						</Dialog.Body>
						<Dialog.Footer>
							<Flex justifyContent="space-between" alignItems={'center'} w="100%">
								<Dialog.ActionTrigger asChild>
									<LkButton
										bg={COLORS.WHITE_ALPHA_100}
										borderWidth={1}
										borderStyle={'solid'}
										borderColor={COLORS.GRAY_300}
									>
										<Typo weight="medium" color={COLORS.GRAY_800}>
											Пропустить
										</Typo>
									</LkButton>
								</Dialog.ActionTrigger>
								<Typo color={COLORS.GRAY_800}>
									Шаг {step + 1} из {steps.length}
								</Typo>
								<LkButton onClick={handleNextClick}>
									<Typo color={COLORS.WHITE} weight="semibold">
										{isLastStep ? 'Начать' : 'Продолжить'}
									</Typo>
								</LkButton>
							</Flex>
						</Dialog.Footer>
					</Dialog.Content>
				</Dialog.Positioner>
			</Portal>
		</Dialog.Root>
	);
});
