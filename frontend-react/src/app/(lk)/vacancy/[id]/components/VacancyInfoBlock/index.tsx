import { Block } from '@/components/shared/Block';
import styles from './style.module.scss';
import { Flex, Box, Button, useTooltip, useClipboard, Accordion, Text } from '@chakra-ui/react';
import { COLORS } from '@/constants/colors';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { selectIsTipsShow, toggleIsModalShow } from '@/store/slices/appSlice';
import { Typo } from '@/components/shared/Typo/Typo';
import { HiOutlineQuestionMarkCircle } from 'react-icons/hi';
import Image from 'next/image';
import { Vacancy } from '../../types';
import { formatVacancyData } from '../../utils';
import { Tooltip as ChakraTooltip } from '@chakra-ui/react';
import { VacancyInfo } from '@/components/shared/VacancyInfo';
import { LkButton } from '@/components/shared/LkButton';
import { useRouter } from 'next/navigation';

export function VacancyInfoBlock({ vacancy }: { vacancy: Vacancy }) {
	const dispatch = useAppDispatch();
	const router = useRouter();

	const isTipsShow = useAppSelector(selectIsTipsShow);
	const vacancyExternalLink = useClipboard({
		value:
			typeof window == 'undefined'
				? ''
				: `${window.location.protocol}//${window.location.host}/vacancy/${vacancy.root_id}/external`,
	});

	const vacancyPublicLink = useClipboard({
		value:
			typeof window == 'undefined'
				? ''
				: `${window.location.protocol}//${window.location.host}/public/vacancy/${vacancy?.root_id}/`,
	});

	const infoTooltip = useTooltip({ positioning: { placement: 'top' } });

	const items = [
		{
			value: 'a',
			title: 'Обязанности',
			text: vacancy?.description_responsibilities,
		},
		{
			value: 'b',
			title: 'Требования',
			text: vacancy?.description_requirements,
		},
		{
			value: 'c',
			title: 'Условия',
			text: vacancy?.description_conditions,
		},
	];

	const vacancyData = formatVacancyData(vacancy);
	const hrBotSections = [
		{ label: 'Обязательные вопросы', text: vacancy.hrBotMandatoryQuestions },
		{ label: 'Редфлаги', text: vacancy.hrBotRedFlags },
		{ label: 'Дополнительная информация', text: vacancy.hrBotAdditionalInfo },
	].filter((section) => section.text && section.text.trim());
	const shouldRenderHrBotInfo = Boolean(vacancy.hrBotActive || hrBotSections.length);

	const handleMouseInfoEnter = () => {
		dispatch(toggleIsModalShow());
		infoTooltip.setOpen(true);
	};
	const handleMouseInfoLeave = () => {
		dispatch(toggleIsModalShow());
		infoTooltip.setOpen(false);
	};

	return (
		<Block
			heading={
				<Box className={styles.heading}>
					<Flex alignItems="center" gap={2}>
						<Typo size="16px" weight="medium" color={COLORS.GRAY_800}>
							Данные вакансии
						</Typo>
						{isTipsShow && (
							<Box mb="1px" className={styles.tip}>
								<HiOutlineQuestionMarkCircle
									cursor={'help'}
									size={16}
									onMouseEnter={handleMouseInfoEnter}
									onMouseLeave={handleMouseInfoLeave}
								/>
							</Box>
						)}
					</Flex>
					<Flex alignItems={'center'} gap={2} className={styles.headingButtons}>
						<Button
							colorPalette="teal"
							variant="solid"
							size="xs"
							bg={COLORS.TEAL_400}
							_hover={{ bg: COLORS.TEAL_500 }}
							mr={2}
							onClick={vacancyPublicLink.copy}
							className={styles.copyLinkButton}
						>
							{vacancyPublicLink.copied ? (
								<Flex gap={2}>
									<Image
										src="/icons/done.svg"
										width={14}
										height={14}
										alt="done"
										className={styles.done}
									/>{' '}
									<Typo weight="semibold" color={COLORS.WHITE}>
										Скопировано!
									</Typo>
								</Flex>
							) : (
								<>
									<Image src="/icons/link.svg" alt="Add Icon" width={14} height={14} />
									<Typo weight="semibold" color={COLORS.WHITE}>
										Отчёт по вакансии
									</Typo>
								</>
							)}
						</Button>
						<ChakraTooltip.RootProvider value={infoTooltip}>
							<ChakraTooltip.Trigger asChild>
								<Button
									colorPalette="teal"
									variant="solid"
									size="xs"
									bg={COLORS.TEAL_400}
									_hover={{ bg: COLORS.TEAL_500 }}
									mr={2}
									onClick={vacancyExternalLink.copy}
									className={styles.copyLinkButton}
								>
									{vacancyExternalLink.copied ? (
										<Flex gap={2}>
											<Image
												src="/icons/done.svg"
												width={14}
												height={14}
												alt="done"
												className={styles.done}
											/>{' '}
											<Typo weight="semibold" color={COLORS.WHITE}>
												Скопировано!
											</Typo>
										</Flex>
									) : (
										<>
											<Image src="/icons/link.svg" alt="Add Icon" width={14} height={14} />
											<Typo weight="semibold" color={COLORS.WHITE}>
												Внешняя ссылка на вакансию
											</Typo>
										</>
									)}
								</Button>
							</ChakraTooltip.Trigger>

							{isTipsShow && (
								<ChakraTooltip.Positioner>
									<ChakraTooltip.Content bg={COLORS.WHITE} p={3}>
										<ChakraTooltip.Arrow
											stroke={`${COLORS.WHITE} !important`}
											borderColor={`${COLORS.WHITE} !important`}
										>
											<ChakraTooltip.ArrowTip
												bg={`${COLORS.WHITE} !important`}
												borderColor={`${COLORS.WHITE} !important`}
											/>
										</ChakraTooltip.Arrow>
										<Typo weight="medium" color={COLORS.GRAY_800}>
											Ссылку вы можете опубликовать на онлайн-ресурсах, таких как ваш веб-сайт или
											социальные сети.
											<br /> Кандидаты будут заполнять данные, прикреплять резюме и попадать в
											разбор.
										</Typo>
									</ChakraTooltip.Content>
								</ChakraTooltip.Positioner>
							)}
						</ChakraTooltip.RootProvider>

						<LkButton
							bg={COLORS.BLUE_400}
							onClick={() => router.push(`/vacancy/${vacancy.id}/edit`)}
						>
							<Image src="/icons/edit.svg" alt="Add Icon" width={14} height={14} />{' '}
							<Typo weight="semibold" color={COLORS.WHITE}>
								Редактировать
							</Typo>
						</LkButton>
					</Flex>
				</Box>
			}
		>
			<Box className={styles.px}>
				<VacancyInfo data={vacancyData} variant="view" />
				<Accordion.Root collapsible w="100%" variant="plain">
					{items.map((item, index) => (
						<Accordion.Item key={index} value={item.value} w="100%" mb={4}>
							<Accordion.ItemTrigger
								w="100%"
								display="flex"
								justifyContent="space-between"
								alignItems="center"
								bg="gray.50"
								pl={2}
								pr={2}
							>
								<Typo as="span" whiteSpace="normal" p={1}>
									{item.title}
								</Typo>
								<Accordion.ItemIndicator />
							</Accordion.ItemTrigger>
							<Accordion.ItemContent w="100%">
								<Text
									whiteSpace="normal"
									dangerouslySetInnerHTML={{ __html: item?.text as string }}
									p={4}
								/>
							</Accordion.ItemContent>
						</Accordion.Item>
					))}
				</Accordion.Root>
				{shouldRenderHrBotInfo && (
					<Box
						mt={6}
						p={4}
						borderRadius="12px"
						border="1px solid #E2E8F0"
						bg={COLORS.WHITE}
					>
						<Flex justifyContent="space-between" alignItems="center" mb={3}>
							<Typo size="16px" weight="medium" color={COLORS.GRAY_800}>
								Чат-интервью
							</Typo>
							<Text
								color={vacancy.hrBotActive ? COLORS.GREEN_600 : COLORS.GRAY_600}
								fontWeight={500}
								fontSize="14px"
							>
								{vacancy.hrBotActive ? 'Включён' : 'Отключён'}
							</Text>
						</Flex>
						{hrBotSections.length ? (
							<Box display="flex" flexDirection="column" gap={3}>
								{hrBotSections.map((section) => (
									<Box key={section.label}>
										<Typo size="14px" weight="semibold" color={COLORS.GRAY_700} mb={1}>
											{section.label}
										</Typo>
										<Text color={COLORS.GRAY_800} whiteSpace="pre-line">
											{section.text}
										</Text>
									</Box>
								))}
							</Box>
						) : (
							<Text color={COLORS.GRAY_600}>Инструкции пока не заданы.</Text>
						)}
					</Box>
				)}
			</Box>
		</Block>
	);
}
