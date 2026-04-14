import { ConfirmedModal } from '@/components/shared/ConfirmedModal';
import {
	Box,
	Button,
	createListCollection,
	Field,
	Flex,
	HStack,
	Separator,
	Tag,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import styles from './Publications.module.scss';
import { Block } from '@/components/shared/Block';
import { Typo } from '@/components/shared/Typo/Typo';
import {
	useGetActiveHhVacanciesQuery,
	useGetProfileQuery,
	useGetVacancyCheckStatusQuery,
	useGetVacancyDataByIdQuery,
} from '@/store/rtkQuery/api';
import { CgDanger } from 'react-icons/cg';
import { Selection } from '@/components/shared/Selection';
import axios from '@/utils/axios';
import { isAxiosError } from 'axios';
import { toaster } from '@/components/ui/toaster';
import { COLORS } from '@/constants/colors';
import { LkButton } from '@/components/shared/LkButton';
import { PublicationsSkeleton } from './components/PublicationsSkeleton';

interface PublicationsProps {
	vacancyId: string;
	vacancyRootId: string;
}

export const Publications: React.FC<PublicationsProps> = ({ vacancyId, vacancyRootId }) => {
	const [linkOpenModal, setLinkOpenModal] = useState(false);
	const [draftOpenModal, setDratOpenModal] = useState(false);
	const [selectedHHVacancy, setSelectedHHVacancy] = useState('');
	const [connectHeadHunterError, setHHConnectError] = useState('');
	const [isPublicationsLoading, setPublicationsLoading] = useState(false);

	const { data, isLoading: isHhVacanciesLoading } = useGetActiveHhVacanciesQuery();
	// Использую тут let, а сверху cosnt, т.к. линтер ругается на то, что isHhVacanciesLoading нигде не изменяется и из-за этого
	let activeHhVacancies = data;
	const {
		data: vacancy,
		refetch,
		isLoading: isVacancyLoading,
	} = useGetVacancyDataByIdQuery({ vacancyId });
	const { data: profile, isLoading: isProfileLoading } = useGetProfileQuery();
	const {
		data: vacancyCheckCreate,
		isLoading: isVacancyCheckCreateLoading,
		isFetching: isVacancyCheckCreateFetching,
		refetch: createRefetch,
	} = useGetVacancyCheckStatusQuery({ vacancyRootId });

	const isLoading =
		isHhVacanciesLoading ||
		isVacancyLoading ||
		isProfileLoading ||
		isVacancyCheckCreateLoading ||
		isVacancyCheckCreateFetching ||
		isPublicationsLoading;

	if (isLoading) {
		return <PublicationsSkeleton />;
	}

	if (!activeHhVacancies) {
		activeHhVacancies = [];
	}

	const collectionItems = activeHhVacancies.map((i) => ({
		label: `${i.name} - ${i.area}`,
		value: i.id,
	}));

	const activeHHVacanciesCollection = createListCollection({ items: collectionItems });

	const connectHeadHunterVacancy = async () => {
		setPublicationsLoading(true);
		try {
			await axios.post('/api/hh/vacancy/create_link/', {
				brain_vacancy_id: vacancy?.id,
				hh_vacancy_url: selectedHHVacancy,
			});
			await refetch(); // refetch после успеха
			await createRefetch();
			setSelectedHHVacancy('');
		} catch (e: unknown) {
			if (isAxiosError(e)) {
				setHHConnectError(e?.response?.data?.message);
			}
		} finally {
			setPublicationsLoading(false); // Выполняется в любом случае
		}
	};

	const disconnectHeadHunterVacancy = async () => {
		setPublicationsLoading(true);
		try {
			const data = {
				vacancy_hh_id: Number(vacancy?.vacancy_hh_id),
			};
			await axios.delete('/api/hh/vacancy/delete_link/', {
				data,
			});
			await refetch(); // refetch после успеха
			await createRefetch();
		} catch (e: unknown) {
			if (isAxiosError(e)) {
				setHHConnectError(e?.response?.data?.message);
			}
		} finally {
			setPublicationsLoading(false); // Выполняется в любом случае
		}
	};

	const onPublicHH = () => {
		const promise = axios.post('/api/hh/vacancy/create/', {
			vacancy_root_id: vacancy?.root_id,
		});

		toaster.promise(promise, {
			success: {
				title: 'Вакансия опубликована!',
			},
			error: {
				title: 'Ошибка публикации, попробуйте позже...',
			},
			loading: { title: 'Публикуем вакансию...' },
		});

		promise.then(() => {
			refetch();
			createRefetch();
		});
	};

	const handleDeleteLink = async () => {
		setLinkOpenModal(false);
		await disconnectHeadHunterVacancy();
	};

	const handleDeleteDraft = () => {
		setDratOpenModal(false);
		const promise = axios.delete(`/api/hh/vacancy/delete_draft/${vacancyRootId}/`);

		toaster.promise(promise, {
			success: {
				title: `Черновик в hh.ru был удалён`,
			},
			error: {
				title: `Произошла ошибка удаления черновика, попробуйте позже`,
			},
			loading: {
				title: `Выполняем удаление...`,
			},
		});

		// ИСПРАВЛЕНО: Вызываем refetch ПОСЛЕ успешного выполнения promise
		promise.then(() => {
			refetch();
			createRefetch();
		});
	};

	return (
		<>
			<ConfirmedModal
				title="Отвязать вакансию от hh.ru"
				text="Вы уверены что хотите удалить связь с вакансией на hh.ru?"
				buttonConfirmText="Да"
				buttonCancelText="Нет"
				isOpen={linkOpenModal}
				onClose={() => setLinkOpenModal(false)}
				action={handleDeleteLink}
			/>
			<ConfirmedModal
				title="Удалить черновик в hh.ru"
				text="Вы уверены что хотите удалить черновик в hh.ru?"
				buttonConfirmText="Да"
				buttonCancelText="Нет"
				isOpen={draftOpenModal}
				onClose={() => setDratOpenModal(false)}
				action={handleDeleteDraft}
			/>
			<Block
				paddingDisabled={true}
				paddingTop="24px"
				separatorProps={{ marginTop: '16px', marginBottom: '16px' }}
				heading={
					<Flex justifyContent="space-between" alignItems="center" w={'100%'}>
						<Typo color={COLORS.GRAY_800} weight="medium">
							Подключение к HH.ru
						</Typo>
						{profile?.hh_status ? (
							<Tag.Root size="md" colorPalette={'green'}>
								<Typo color={COLORS.GRAY_800} weight="medium">
									Активно
								</Typo>
							</Tag.Root>
						) : (
							<Tag.Root size="md" colorPalette={'gray'}>
								<Typo color={COLORS.GRAY_800} weight="medium">
									Не активно
								</Typo>
							</Tag.Root>
						)}
					</Flex>
				}
				helpTipText={
					<Typo weight="medium">
						Чтобы опубликовать или связать существующую вакансию на hh.ru, убедитесь, что ваш
						профиль подключен к hh. <br /> Для этого перейдите в профиль (находится справа в верхнем
						углу).
					</Typo>
				}
			>
				<Box className={styles.px}>
					{vacancy?.vacancy_hh_id && (
						<Box padding="0 12px">
							<Block marginTop={'0px'} paddingDisabled={true} padding="12px">
								<Flex justifyContent={'space-between'}>
									<Typo weight="medium">Импорт из папки:</Typo>
									<Typo weight="medium">Все неразобранные</Typo>
								</Flex>
								<Flex justifyContent="end" mt="12px">
									<Button
										variant="surface"
										size="xs"
										width="100%"
										colorPalette="red"
										onClick={() => setLinkOpenModal(true)}
									>
										Удалить связь вакансиии с hh.ru
									</Button>
								</Flex>
							</Block>
						</Box>
					)}

					{!vacancyCheckCreate?.vacancy_status && !vacancy?.vacancy_hh_id && (
						<>
							<Box className={styles.paddingned}>
								<Block
									mt="0"
									paddingDisabled={true}
									padding="8px"
									separatorProps={{ marginBottom: '16px' }}
								>
									<Flex alignItems={'center'}>
										<Typo color={COLORS.GRAY_800} weight="medium" ml="5px" flexGrow={1}>
											Опубликовать черновик
										</Typo>

										<LkButton
											flexShrink={1}
											size="sm"
											colorPalette="blue"
											onClick={onPublicHH}
											disabled={!profile?.hh_status}
										>
											Опубликовать
										</LkButton>
									</Flex>
								</Block>
							</Box>
							<HStack mt="3" mb="1">
								<Separator flex="1" />
								<Typo color={COLORS.GRAY_800} size="12px" flexShrink="0">
									или
								</Typo>
								<Separator flex="1" />
							</HStack>
							<Flex
								gap={4}
								justify="space-between"
								align="center"
								pt={2}
								className={styles.paddingned}
							>
								<Field.Root invalid={Boolean(connectHeadHunterError)}>
									<Selection
										collection={activeHHVacanciesCollection}
										value={[selectedHHVacancy]}
										onChange={(value) => setSelectedHHVacancy(value as string)}
									/>
									<Field.ErrorText>{connectHeadHunterError}</Field.ErrorText>
								</Field.Root>
								<LkButton onClick={connectHeadHunterVacancy} disabled={!selectedHHVacancy}>
									Связать
								</LkButton>
							</Flex>
						</>
					)}

					{vacancyCheckCreate?.vacancy_status && !vacancy?.vacancy_hh_id && (
						<>
							<Flex
								ml={'20px'}
								gap="1"
								alignItems={'center'}
								className={styles.paddingned}
								mb="12px"
							>
								<CgDanger size="17" color={COLORS.RED_400} />
								<Typo weight="medium">Ожидается оплата вакансии на hh.ru</Typo>
							</Flex>
							<Box padding="0 12px">
								<Block marginTop={'0px'} paddingDisabled={true} padding="12px">
									<Flex justifyContent={'space-between'}>
										<Typo weight="medium">Импорт из папки:</Typo>
										<Typo weight="medium">Все неразобранные</Typo>
									</Flex>
									<Flex justifyContent="end" mt="12px">
										<Button
											variant="surface"
											size="xs"
											width="100%"
											colorPalette="red"
											onClick={() => setDratOpenModal(true)}
										>
											Удалить черновик в hh.ru
										</Button>
									</Flex>
								</Block>
							</Box>
						</>
					)}
				</Box>
			</Block>
		</>
	);
};
