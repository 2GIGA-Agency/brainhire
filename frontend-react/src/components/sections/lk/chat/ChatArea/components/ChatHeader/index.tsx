import { memo, useState } from 'react';
import { IChatListItem } from '@/types/Chat';
import { LkButton } from '@/components/shared/LkButton';
import { Typo } from '@/components/shared/Typo/Typo';
import { BsArrowLeft } from 'react-icons/bs';
import { HiEye } from 'react-icons/hi';
import clsx from 'clsx';
import styles from './style.module.scss';
import { COLORS } from '@/constants/colors';
import { UserNameSkeleton } from '../UserNameSkeleton';
import { formatCandidateCaption } from '../../utils';
import { VacancyInfoSkeleton } from '../VacancyInfoSkeleton';
import { CandidateInfoModal } from '@/components/shared/CandidateInfoModal/CandidateInfoModal';
import { useGetCandidateOverviewQuery } from '@/store/rtkQuery/api';
import { Dialog } from '@chakra-ui/react';
import { CandidateInfoSkeleton } from './components/CandidateInfoSkeleton';
import { CandidateButtonSkeleton } from './components/CandidateInfoButtonSkeleton';

interface ChatHeaderProps {
	chat: IChatListItem;
	vacancy: any;
	isLoading: boolean;
	isMobile: boolean;
	withBackButton: boolean;
	onBack?: () => void;
}

export const ChatHeader = memo(function ChatHeader({
	chat,
	vacancy,
	isLoading,
	isMobile,
	withBackButton,
	onBack,
}: ChatHeaderProps) {
	const [isCandidateModalOpen, setIsCandidateModalOpen] = useState(false);

	const candidateId = chat.candidate_id;

	const {
		data: candidateData,
		isLoading: isCandidateLoading,
		isFetching: isCandidateFetching,
	} = useGetCandidateOverviewQuery({ candidateId: candidateId || '' }, { skip: !candidateId });

	const handleVacancyView = () => {
		if (vacancy?.id && typeof window !== 'undefined') {
			window.open(`/vacancy/${vacancy.id}`, '_blank');
		}
	};

	const handleCandidateView = () => {
		if (candidateId) {
			setIsCandidateModalOpen(true);
		}
	};

	const handleCloseCandidateModal = () => {
		setIsCandidateModalOpen(false);
	};

	// Определяем состояние загрузки кандидата
	const isCandidateDataLoading = isCandidateLoading || isCandidateFetching;

	return (
		<>
			<header className={styles.header}>
				<div className={clsx(styles.headerText, isMobile && styles.isMobile)}>
					{withBackButton && (
						<button type="button" className={styles.backButton} onClick={onBack} aria-label="Назад">
							<BsArrowLeft size="24px" />
						</button>
					)}
					{isLoading ? (
						<UserNameSkeleton />
					) : (
						<>
							<div className={styles.candidateName}>
								<Typo size="18px" weight="semibold" color={COLORS.GRAY_800}>
									{formatCandidateCaption(chat)}
								</Typo>
							</div>

							{/* Блок с кнопкой/скелетоном кандидата */}
							<div className={styles.candidateAction}>
								{candidateId ? (
									<>
										{isCandidateDataLoading ? (
											<CandidateButtonSkeleton isMobile={isMobile} />
										) : candidateData ? (
											<LkButton
												icon={<HiEye />}
												bg={COLORS.TEAL_400}
												onClick={handleCandidateView}
												heightSize="medium"
												size="sm"
												disabled={isCandidateDataLoading || !candidateId}
											>
												{!isMobile && (
													<Typo size="14px" weight="semibold" color={COLORS.WHITE}>
														Просмотреть кандидата
													</Typo>
												)}
											</LkButton>
										) : null}
									</>
								) : (
									// Если candidateId нет, показываем скелетон информации
									<CandidateInfoSkeleton />
								)}
							</div>
						</>
					)}
				</div>
				<div className={clsx(styles.vacancyInfo, isMobile && styles.reducedVacancyInfo)}>
					<div>
						{isLoading ? (
							<VacancyInfoSkeleton />
						) : (
							<>
								{!isMobile && (
									<Typo size="14px" color={COLORS.GRAY_800} weight="regular">
										Вакансия
									</Typo>
								)}
								<Typo size="14px" color={COLORS.GRAY_800} weight="semibold" mt={1}>
									{vacancy?.vacancy_name}
								</Typo>
							</>
						)}
					</div>
					{!isLoading && vacancy && (
						<div className={styles.vacancyAction}>
							<LkButton
								icon={<HiEye />}
								bg={COLORS.TEAL_400}
								onClick={handleVacancyView}
								heightSize="medium"
							>
								{!isMobile && (
									<Typo size="14px" weight="semibold" color={COLORS.WHITE}>
										Просмотреть вакансию
									</Typo>
								)}
							</LkButton>
						</div>
					)}
				</div>
			</header>

			{/* Модальное окно с информацией о кандидате */}
			{candidateData && (
				<Dialog.Root
					lazyMount
					open={isCandidateModalOpen}
					onOpenChange={(e) => setIsCandidateModalOpen(e.open)}
				>
					<CandidateInfoModal
						first_name={candidateData.first_name}
						last_name={candidateData.last_name}
						email={candidateData.email}
						phone={candidateData.phone || undefined}
						id={candidateData.id}
						vacancyId={vacancy?.id}
						area={candidateData.area}
						resume={candidateData.resume}
						chat_interview={candidateData.chat_interview}
						candidate_interview={candidateData.candidate_interview}
						chat={candidateData.chat}
						onClose={handleCloseCandidateModal}
					/>
				</Dialog.Root>
			)}
		</>
	);
});
