import { Block } from '@/components/shared/Block';
import { CandidateInfo } from '@/components/shared/CandidateInfo';
import { LkButton } from '@/components/shared/LkButton';
import { Typo } from '@/components/shared/Typo/Typo';
import { COLORS } from '@/constants/colors';
import { Flex } from '@chakra-ui/react';
import { useState } from 'react';
import { HiPencil } from 'react-icons/hi';
import { CommentsModal } from './CommentsModal';
import { Candidate } from '@/store/types';
import Image from 'next/image';
import { useAppDispatch } from '@/store/store';
import { setSearchQuery, setSelectedTopicId } from '@/store/slices/chatSlice';
import { setIsChatWidgetShow } from '@/store/slices/appSlice';

interface Props {
	candidateData: Candidate;
}

export function CandidateBlock({ candidateData }: Props) {
	const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
	const dispatch = useAppDispatch();

	// Функция для открытия чата с кандидатом
	const handleOpenChat = () => {
		if (candidateData?.chat?.topic_id) {
			// Устанавливаем ID чата и открываем виджет
			dispatch(setSelectedTopicId(candidateData?.chat.topic_id));
			dispatch(setIsChatWidgetShow(true));
			dispatch(setSearchQuery(candidateData?.chat.topic_id));
		}
	};

	return (
		<>
			<CommentsModal
				isOpen={isCommentModalOpen}
				setIsOpen={setIsCommentModalOpen}
				candidateId={candidateData?.id}
			/>
			<Block>
				<CandidateInfo {...candidateData} copyButton />
				<Flex gap="8px" mt="8px">
					{/* Кнопка открытия чата с кандидатом */}
					{candidateData?.chat?.topic_id && (
						<LkButton
							icon={
								<Image src="/icons/message.svg" alt="Чат с кандидатом" width={16} height={16} />
							}
							onClick={handleOpenChat}
						>
							<Typo color={COLORS.WHITE} size="14px" weight="semibold">
								Чат с кандидатом
							</Typo>
						</LkButton>
					)}

					{/* Кнопка открытия комментариев */}
					<LkButton
						bg={COLORS.TEAL_400}
						icon={<HiPencil />}
						onClick={() => setIsCommentModalOpen(true)}
						_hover={{ bg: COLORS.TEAL_500 }}
						_active={{ bg: COLORS.TEAL_600 }}
					>
						<Typo color={COLORS.WHITE} size="14px" weight="semibold">
							Комментарии
						</Typo>
					</LkButton>
				</Flex>

				{candidateData?.candidate_interview?.general_recommendations && (
					<>
						<Typo fontSize="14px" fontWeight="500" mt="24px">
							Обратная связь:
						</Typo>
						<Typo fontSize="14px" fontWeight="400" mt="16px">
							{candidateData?.candidate_interview.general_recommendations}
						</Typo>
					</>
				)}
			</Block>
		</>
	);
}
