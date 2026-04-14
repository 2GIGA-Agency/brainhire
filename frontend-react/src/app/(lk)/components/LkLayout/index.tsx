import { usePathname, useRouter } from 'next/navigation';
import styles from './style.module.scss';
import { Typo } from '@/components/shared/Typo/Typo';
import { Box, Breadcrumb, Flex, List, Skeleton } from '@chakra-ui/react';
import Link from 'next/link';
import { IoArrowBack } from 'react-icons/io5';
import { generateBreadcrumbs } from './utils';
import { BreadCrumbItem } from './types';
import { Toaster } from '@/components/ui/toaster';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { HiOutlineQuestionMarkCircle } from 'react-icons/hi';
import { AiOutlineComment } from 'react-icons/ai';
import {
	selectIsBurgerShow,
	selectIsChatWidgetShow,
	selectIsModalShow,
	selectIsTipsShow,
	selectIsTutorialShow,
	toggleChatWidgetShow,
	toggleIsBurgerShow,
	toggleIsTutorialShow,
} from '@/store/slices/appSlice';
import { TutorialModal } from '@/components/sections/lk/tutorial/TutorialModal';
import { COLORS } from '@/constants/colors';
import { useEffect } from 'react';
import { checkTipsStatus } from '@/store/thunks/app/tutorialThunks';

import Image from 'next/image';
import { Tip } from '@/components/shared/Tip';
import { useGetUnreadCountQuery } from '@/store/rtkQuery/api';
import { ChatWidget } from '@/components/sections/lk/chat/ChatWidget';
import { checkSubdomain } from '@/utils/checkSubdamains';

const headings: BreadCrumbItem[] = [
	{
		route:
			/^\/vacancy\/([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})\/([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})$/,
		heading: 'Обзор интервью',
	},
	{
		route: /^\/vacancy\/([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})\/edit$/,
		heading: 'Редактирование вакансии',
	},
	{
		route: /^\/vacancy\/([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})$/,
		heading: 'Просмотр вакансии',
		tip: (
			<Box>
				<Typo weight="medium" color={COLORS.GRAY_800}>
					На странице отображаются все детали вакансии, список кандидатов по этапам отбора и
					инструменты управления.
				</Typo>
				<Typo weight="medium" color={COLORS.GRAY_800}>
					Здесь вы можете
				</Typo>
				<List.Root ml={3}>
					<List.Item>
						<Typo weight="medium" color={COLORS.GRAY_800}>
							Настроить бюджет (лимит кандидатов)
						</Typo>
					</List.Item>
					<List.Item>
						<Typo weight="medium" color={COLORS.GRAY_800}>
							Опубликовать/связать вакансию с hh.ru
						</Typo>
					</List.Item>
					<List.Item>
						<Typo weight="medium" color={COLORS.GRAY_800}>
							Загружать резюме вручную или опубликовать ссылку на вакансию
						</Typo>
					</List.Item>
					<List.Item>
						<Typo weight="medium" color={COLORS.GRAY_800}>
							Запустить холодный поиск кандидатов (только если вакансия опубликована на hh.ru и есть
							доступ к базе резюме hh.ru)
						</Typo>
					</List.Item>
					<List.Item>
						<Typo weight="medium" color={COLORS.GRAY_800}>
							Просматривать карточки кандидатов и результаты их собеседований
						</Typo>
					</List.Item>
				</List.Root>
			</Box>
		),
		isParentRoute: true,
	},
	{
		route: /^\/vacancy\/create$/,
		heading: 'Создание вакансии',
		tip: (
			<>
				<Typo weight="medium" color={COLORS.GRAY_800}>
					В процессе создания вакансии (шаги 1-5) заполните обязательные поля (описание, опыт,
					навыки) или используйте ИИ-генерацию. Настройте условия интервью (вопросы, время) и
					опционально добавьте тесты или презентацию.
				</Typo>
				<Typo weight="medium" color={COLORS.GRAY_800} mt={3}>
					После создания опубликуйте вакансию на hh.ru на странице «Просмотр вакансии» – система
					автоматически отберёт кандидатов и проведёт собеседования. Кандидатам приходит ссылка на
					индивидуальное интервью.
				</Typo>
				<Typo weight="medium" color={COLORS.GRAY_800} mt={3}>
					Просматривайте результаты во вкладке «Видеоинтервью».
				</Typo>
			</>
		),
	},
	{
		route: /^\/vacancy$/,
		heading: 'Вакансии',
		tip: (
			<>
				<Typo weight="medium" color={COLORS.GRAY_800}>
					Здесь будут отображаться все ваши вакансии
				</Typo>
				<Typo weight="medium" color={COLORS.GRAY_800}>
					Вы можете:
				</Typo>
				<List.Root mt={3} variant={'plain'}>
					<List.Item display={'flex'} alignItems={'end'}>
						<List.Indicator>
							<Image src="/icons/HiEye.svg" alt={'Посмотреть'} height={16} width={16} />
						</List.Indicator>
						<Typo weight="medium" color={COLORS.GRAY_800}>
							просматривать
						</Typo>
					</List.Item>
					<List.Item>
						<List.Indicator>
							<Image src="/icons/HiPencil.svg" alt={'Редактировать'} height={16} width={16} />
						</List.Indicator>
						<Typo weight="medium" color={COLORS.GRAY_800}>
							редактировать
						</Typo>
					</List.Item>
					<List.Item>
						<List.Indicator>
							<Image src="/icons/CloneVacancy2.svg" alt={'Клонировать'} height={16} width={16} />
						</List.Indicator>
						<Typo weight="medium" color={COLORS.GRAY_800}>
							клонировать
						</Typo>
					</List.Item>
					<List.Item>
						<List.Indicator>
							<Image src="/icons/BsArchiveFill.svg" alt={'Архивировать'} height={16} width={16} />
						</List.Indicator>
						<Typo weight="medium" color={COLORS.GRAY_800}>
							архивировать
						</Typo>
					</List.Item>
				</List.Root>
				<Typo weight="medium" color={COLORS.GRAY_800} mt={3}>
					Архивированные вакансии находятся во вкладке &quot;Архив&quot;
				</Typo>
				<Typo weight="medium" color={COLORS.GRAY_800} mt={3}>
					Чтобы создать вакансию нажмите &quot;Создать вакансию&quot;
				</Typo>
			</>
		),
	},
	{
		route: /^\/finances\/\w+\/edit$/,
		heading: 'Редактирование счета',
	},
	{
		route: /^\/finances\/[A-Za-z0-9]+$/,
		heading: 'Просмотр счёта',
		isParentRoute: true,
	},
	{ route: /^\/finances\/create$/, heading: 'Создание счета' },
	{
		route: /^\/finances$/,
		heading: 'Счета',
		breadCrumbText: 'Финансы',
		tip: (
			<>
				<Typo weight="medium" color={COLORS.GRAY_800}>
					Здесь вы можете увидеть свои счета, пополнить токены (цена зависит от объема покупки).
					Оплата доступна через выбор компании-плательщика с возможностью сохранения или скачивания
					счета.
				</Typo>
				<Typo weight="medium" color={COLORS.GRAY_800} mt={3}>
					Чтобы увеличить количество токенов нажмите &quot;Пополнить баланс&quot;
				</Typo>
			</>
		),
	},
	{ route: /^\/settings$/, heading: 'Настройки' },
	{
		route: /^\/companies$/,
		heading: 'Компании',
		tip: (
			<>
				<Typo weight="medium" color={COLORS.GRAY_800}>
					Здесь будут отображаться все ваши компании
				</Typo>
				<Typo weight="medium" color={COLORS.GRAY_800}>
					Вы можете их:
				</Typo>
				<List.Root mt={3} variant={'plain'}>
					<List.Item>
						<List.Indicator>
							<Image src="/icons/HiPencil.svg" alt={'Редактировать'} height={16} width={16} />
						</List.Indicator>
						<Typo weight="medium" color={COLORS.GRAY_800}>
							редактировать
						</Typo>
					</List.Item>
					<List.Item>
						<List.Indicator>
							<Image src="/icons/BsArchiveFill.svg" alt={'Архивировать'} height={16} width={16} />
						</List.Indicator>
						<Typo weight="medium" color={COLORS.GRAY_800}>
							архивировать
						</Typo>
					</List.Item>
				</List.Root>
				<Typo weight="medium" color={COLORS.GRAY_800} mt={3}>
					Чтобы создать компанию нажмите &quot;Создать компанию&quot;
				</Typo>
			</>
		),
	},
	{
		route: /^\/colleagues$/,
		heading: 'Коллеги',
		tip: (
			<>
				<Typo weight="medium" color={COLORS.GRAY_800}>
					Здесь будут отображаться все приглашённые вами коллеги компании.
				</Typo>
				<Typo weight="medium" color={COLORS.GRAY_800}>
					Вы можете их архивировать
				</Typo>

				<Typo weight="medium" color={COLORS.GRAY_800} mt={3}>
					Чтобы пригласить коллегу нажмите &quot;Добавить коллегу&quot;
				</Typo>
			</>
		),
	},
	{
		route: /^\/chat$/,
		heading: 'Чат',
	},
];

// Страницы на которых необходимо прятать хлебные крошки и заголовок раздела
const hideHeadingOnPages = [
	'/signin',
	'/signup',
	'/twostep',
	'/success',
	'/maintenance',
	'/login',
	'/profile',
	'/public',
	/^\/vacancy\/[0-9a-fA-F-]{36}\/external$/,
	/^\/vacancy\/[0-9a-fA-F-]{36}\/[0-9a-fA-F-]{36}$/, // Страница с обзором интервью кандидата, убираем, потому что необходимо сделать отличное поведение, которое завязано на vacancyId, который передаётся в url
	/^\/feedback\/candidate\/[0-9a-zA-Z-]{36}$/,
	'/forgot-password',
	'/chat',
];

// Страницы, на которых необходимо прятать подсказки и виджет чата
const hideTipsAndChatOnPages = [
	'/signin',
	'/signup',
	'/twostep',
	'/success',
	'/maintenance',
	'/login',
	'/profile',
	'/public',
	/^\/vacancy\/[0-9a-fA-F-]{36}\/external$/,
	/^\/feedback\/candidate\/[0-9a-zA-Z-]{36}$/,
	'/forgot-password',
	'/chat',
];

interface Props {
	children: React.ReactNode;
}

export function LkLayout({ children }: Props) {
	const pathname = usePathname();
	const router = useRouter();
	const dispatch = useAppDispatch();

	const isBurgerShow = useAppSelector(selectIsBurgerShow);
	const isTutorialShow = useAppSelector(selectIsTutorialShow);
	const isTipsShow = useAppSelector(selectIsTipsShow);
	const isModalShow = useAppSelector(selectIsModalShow);
	const isChatWidgetShow = useAppSelector(selectIsChatWidgetShow);

	const isShow = isBurgerShow || isTutorialShow || isModalShow;

	const shouldHideHeading = hideHeadingOnPages.some((path) =>
		typeof path === 'string' ? pathname.startsWith(path) : path.test(pathname)
	);
	const shouldHideTipsAndChatWidget = hideTipsAndChatOnPages.some((path) =>
		typeof path === 'string' ? pathname.startsWith(path) : path.test(pathname)
	);

	const { data: unreadCount, isLoading } = useGetUnreadCountQuery(undefined, {
		skip: shouldHideTipsAndChatWidget,
	});

	const breadcrumbs = generateBreadcrumbs(headings, pathname);

	const currentHeading = headings.find((i) => pathname.match(i.route));
	const heading = currentHeading?.heading;
	const tip = currentHeading?.tip;

	const isSpecialAccess = checkSubdomain();

	const handleGoBack = () => {
		// Проверяем, есть ли история навигации в текущей вкладке
		if (window.history.length > 1) {
			router.back();
			return;
		}

		// Если истории нет (например, новая вкладка), используем referrer
		if (document.referrer) {
			const referrerUrl = new URL(document.referrer);
			const currentUrl = new URL(window.location.href);

			// Переходим на referrer только если это наш же сайт (из соображений безопасности)
			if (referrerUrl.hostname === currentUrl.hostname) {
				router.push(document.referrer);
				return;
			}
		}

		// Запасной вариант: если нет ни истории, ни referrer, переходим на главную страницу портала
		router.push('/vacancy');
	};

	const handleModalClick = () => {
		if (isTutorialShow) {
			dispatch(toggleIsTutorialShow());
		}

		if (isBurgerShow) {
			dispatch(toggleIsBurgerShow());
		}
	};

	useEffect(() => {
		if (!shouldHideTipsAndChatWidget) {
			dispatch(checkTipsStatus());
		}
	}, [dispatch]);

	return (
		<>
			<Toaster />
			<main className={styles.main}>
				{isShow && <Box className={styles.modal} onClick={handleModalClick}></Box>}
				{isTutorialShow && <TutorialModal />}
				<div className={styles.container}>
					{!shouldHideHeading && (
						<>
							<Box mb={8} className={styles.arrowBack}>
								<IoArrowBack
									size="24px"
									onClick={handleGoBack}
									cursor={'pointer'}
									tabIndex={0}
									onKeyDown={(e) => {
										if (e.key === 'Enter' || e.key === ' ') {
											e.preventDefault();
											handleGoBack();
										}
									}}
									aria-label="Вернуться назад"
								/>
							</Box>
							<Breadcrumb.Root mb={'32px'} className={styles.breadCrumbs}>
								<Breadcrumb.List>
									{breadcrumbs.map((crumb, index) => (
										<Breadcrumb.Item key={index}>
											{index === breadcrumbs.length - 1 ? (
												<Breadcrumb.CurrentLink>{crumb.label}</Breadcrumb.CurrentLink>
											) : (
												<Link href={crumb.href} tabIndex={0}>
													{crumb.label + ' '}
												</Link>
											)}
											{index < breadcrumbs.length - 1 && (
												<Breadcrumb.Separator ml={2} mr={1}>
													/
												</Breadcrumb.Separator>
											)}
										</Breadcrumb.Item>
									))}
								</Breadcrumb.List>
							</Breadcrumb.Root>
							<Flex gap={2} alignItems="center">
								{heading && (
									<Typo size="20px" weight="semibold">
										{heading}
									</Typo>
								)}
								{isTipsShow && tip && <Tip placement="right" content={tip} />}
							</Flex>
						</>
					)}
					{children}
				</div>

				{!shouldHideTipsAndChatWidget && (
					<Box
						className={styles.chatWidgetWrapper}
						onClick={() => dispatch(toggleChatWidgetShow())}
						onKeyDown={(e) => {
							if (e.key === 'Enter' || e.key === ' ') {
								e.preventDefault();
								dispatch(toggleChatWidgetShow());
							}
						}}
						tabIndex={0}
						role="button"
						aria-label={`Открыть чат HH. Непрочитанных сообщений: ${unreadCount?.unread_chats || 0}`}
					>
						<Box className={styles.chatWidgetIcon}>
							<AiOutlineComment
								className={styles.chatWidgetTrigger}
								color={COLORS.WHITE}
								cursor={'pointer'}
								size={30}
								title="Чат HH"
							/>
						</Box>

						{isLoading ? (
							<Skeleton
								h={6}
								w={10}
								p={0.5}
								borderRadius="16px"
								top={-1.5}
								right={-1}
								pos={'absolute'}
							/>
						) : (
							unreadCount &&
							unreadCount?.unread_chats > 0 && (
								<Typo
									className={styles.unreadCount}
									size="12px"
									color={COLORS.WHITE}
									weight="medium"
								>
									{unreadCount.unread_chats}
								</Typo>
							)
						)}
					</Box>
				)}

				{!shouldHideTipsAndChatWidget && isTipsShow && !isTutorialShow && (
					<Box
						className={styles.tutorialWrapper}
						tabIndex={0}
						onKeyDown={(e) => {
							if (e.key === 'Enter' || e.key === ' ') {
								e.preventDefault();
								dispatch(toggleIsTutorialShow());
							}
						}}
						onClick={() => dispatch(toggleIsTutorialShow())}
						role="button"
						aria-label="Открыть туториал"
					>
						<HiOutlineQuestionMarkCircle
							className={styles.tutorial}
							color={COLORS.BLUE_400}
							cursor={'pointer'}
							size={50}
							title="Туториал"
						/>
					</Box>
				)}
			</main>
			{isChatWidgetShow && <ChatWidget />}
		</>
	);
}
