'use client';

import { CandidateInterview } from '@/app/(lk)/vacancy/[id]/[candidateId]/types/types';
import { CandidateInfo } from '@/components/shared/CandidateInfo/CandidateInfo';
import { formatExperience } from '@/utils/convertMonth';
import { Box, CloseButton, Dialog, Flex, Portal, Tag } from '@chakra-ui/react';
import { FiCheck } from 'react-icons/fi';
import { HiOutlineX } from 'react-icons/hi';
import { LkButton } from '../LkButton';
import { Typo } from '../Typo/Typo';
import { COLORS } from '@/constants/colors';
import { CandidateSkills } from './CandidateSkills';
import { CandidateChatInfo, CandidateInterviewChat, CompanyFilterApi, Resume } from '@/store/types';
import { CandidateJobExperiences } from './CandidateJobExperiences';
import Image from 'next/image';
import { useAppDispatch } from '@/store/store';
import { setIsChatWidgetShow } from '@/store/slices/appSlice';
import { setSearchQuery, setSelectedTopicId } from '@/store/slices/chatSlice';
import { getChatBotScore } from '@/utils/chat_bot_score';

interface Props {
	first_name?: string;
	last_name?: string;
	email?: string;
	phone?: string;
	id?: string;
	vacancyId?: string;
	area?: string;
	resume?: Resume;
	chat_interview?: CandidateInterviewChat | null;
	candidate_interview?: CandidateInterview;
	chat?: CandidateChatInfo | null;
	onClose?: () => void; // Добавляем пропс для закрытия модалки
}

export const CandidateInfoModal = ({
	first_name,
	last_name,
	email,
	phone,
	id, // ID кандидата
	vacancyId,
	area,
	resume,
	chat_interview,
	candidate_interview,
	chat,
	onClose,
}: Props) => {
	const dispatch = useAppDispatch();
	const successColor = COLORS.GREEN_400;
	const failureColor = COLORS.RED_400;

	// Защита от undefined
	const hasResumeData = !!resume;
	const hasAIBotInterview = !!chat_interview;
	const stack = resume?.stack as any;
	const mandatorySkillKeys: string[] =
		stack && typeof stack === 'object'
			? Object.keys(stack).filter((key) => key !== 'selectable_skills')
			: [];
	const selectableGroups: any[] = Array.isArray(stack?.selectable_skills)
		? (stack.selectable_skills as any[])
		: [];
	const hasExtractedSkills = Array.isArray(resume?.extracted_skills)
		? resume.extracted_skills.length > 0
		: false;
	const hasSkills =
		mandatorySkillKeys.length > 0 || selectableGroups.length > 0 || hasExtractedSkills;

	const resumeCompanyFilter = resume?.company_filter as CompanyFilterApi | undefined;

	const hasExperienceData =
		resume?.total_experience_months ||
		resume?.relevant_experience_months ||
		resume?.work_experience;
	const hasExplain = resume?.explain;
	const hasSummary = resume?.summary_output !== undefined || resume?.short_description;
	const hasInterviewLink = candidate_interview?.average_answers_rating && vacancyId && id;
	const hasBotResult =
		hasAIBotInterview &&
		Boolean(
			chat_interview?.approve ||
			chat_interview?.score !== null ||
			(chat_interview?.description && chat_interview?.description.trim().length > 0)
		);
	const showInterviewButton = Boolean(vacancyId && id && (hasInterviewLink || hasBotResult));
	const candidateChatBotStatus = getChatBotScore(chat_interview?.score || 0);

	// Функция для открытия чата
	const handleOpenChat = () => {
		if (chat?.topic_id) {
			// Закрываем модалку если передана функция onClose
			if (onClose) {
				onClose();
			}

			// Устанавливаем ID чата и открываем виджет
			dispatch(setSelectedTopicId(chat.topic_id));
			dispatch(setIsChatWidgetShow(true));
			dispatch(setSearchQuery(chat.topic_id));
		}
	};

	return (
		<Portal>
			<Dialog.Backdrop />
			<Dialog.Positioner>
				<Dialog.Content>
					<Dialog.Header>
						<Dialog.Title>
							<Typo size="20px" weight="semibold" color={COLORS.GRAY_800}>
								Информация о кандидате
							</Typo>
						</Dialog.Title>
					</Dialog.Header>

					<Dialog.Body>
						<Box>
							<CandidateInfo
								first_name={first_name}
								last_name={last_name}
								email={email}
								resume={resume}
								phone={phone || ''}
								area={area || ''}
								id={id}
							/>

							<Flex mt="32px" direction="column" gap="12px">
								{hasAIBotInterview && (
									<>
									<Flex align="center">
										<Typo size="16px" weight="medium" color={COLORS.GRAY_800} mr={1}>
											Чат-интервью:
										</Typo>
										{ chat_interview?.approve ? (
											<Box as={FiCheck} color={successColor} />
										) : (
											<Box as={HiOutlineX} color={failureColor} />
										)}
									</Flex>
									<Box mb={3}>
										<Flex align="center">
											<Typo fontSize="14px" weight="medium">
												Оценка:{' '}
												{chat_interview?.score
													? (
														<Tag.Root color="white" bg={candidateChatBotStatus.bg} size="lg">
															<Tag.Label>{candidateChatBotStatus.title}</Tag.Label>
														</Tag.Root>
													)
													: 'Нет оценки'}
											</Typo>
										</Flex>
										<Typo fontSize="12px" weight="regular" mt="8px">
											{ chat_interview.description }
										</Typo>
									</Box>
									</>
								)}

								{hasResumeData && hasExperienceData && (
									<>
										<Typo size="16px" weight="medium" color={COLORS.GRAY_800}>
											Оценка резюме:
										</Typo>
										{!resume?.total_experience_months && !resume?.relevant_experience_months ? (
											resume?.work_experience !== undefined && (
												<Flex align="center">
													<Typo size="14px" weight="medium" color={COLORS.GRAY_800} mr={2}>
														Опыт работы
													</Typo>
													{resume.work_experience ? (
														<Box as={FiCheck} color={successColor} />
													) : (
														<Box as={HiOutlineX} color={failureColor} />
													)}
												</Flex>
											)
										) : (
											<Flex align="center">
												<Typo size="14px" weight="medium" mr={2}>
													Общий опыт работы:{' '}
													{formatExperience(resume?.total_experience_months || 0)}
												</Typo>
												{resume?.work_experience !== undefined &&
													(resume.work_experience ? (
														<Box as={FiCheck} color={successColor} />
													) : (
														<Box as={HiOutlineX} color={failureColor} />
													))}
											</Flex>
										)}
									</>
								)}

								{hasResumeData && hasSkills && (
									<Box>
										<Typo size="14px" weight="medium" marginBottom="8px">
											Навыки:{' '}
										</Typo>
										<CandidateSkills resume={resume} />
									</Box>
								)}

								{hasResumeData && (resume?.job_experiences || resumeCompanyFilter) && (
									<CandidateJobExperiences resume={resume} companyFilter={resumeCompanyFilter} />
								)}

								{hasResumeData && hasExplain && (
									<Box>
										<Typo fontSize="14px" weight="medium">
											Объяснение:{' '}
										</Typo>
										<Typo fontSize="12px" weight="regular" mt="8px">
											{resume.explain}
										</Typo>
									</Box>
								)}

								{hasResumeData && hasSummary && (
									<Flex gap="8px" alignItems="center">
										<Typo size="14px" weight="medium">
											Итог:{' '}
										</Typo>
										<Typo
											size="12px"
											weight="semibold"
											lineHeight="24px"
											padding="2px 8px"
											bgColor={`${resume?.summary_output ? successColor : failureColor}`}
											color={COLORS.WHITE}
											borderRadius="6px"
										>
											{!resume?.short_description
												? resume?.summary_output
													? 'Полностью соответствует требованиям'
													: 'Не соответствует требованиям'
												: resume.short_description}
										</Typo>
									</Flex>
								)}
							</Flex>
						</Box>
					</Dialog.Body>

					<Dialog.Footer>
						<Flex gap="12px" justifyContent="flex-end" width="100%">
							{/* Кнопка открытия чата */}
							{chat?.topic_id && (
								<LkButton onClick={handleOpenChat}>
									<Image src="/icons/message.svg" alt="Открыть чат" width={16} height={16} />
									<Typo weight="semibold" color={COLORS.WHITE}>
										Открыть чат
									</Typo>
								</LkButton>
							)}

							{/* Кнопка обзора интервью */}
							{showInterviewButton && (
								<LkButton bg={COLORS.TEAL_400}>
									<a href={`/vacancy/${vacancyId}/${id}`} target="_blank" rel="noopener noreferrer">
										<Typo weight="semibold" color={COLORS.WHITE}>
											Обзор интервью
										</Typo>
									</a>
								</LkButton>
							)}
						</Flex>
					</Dialog.Footer>

					<Dialog.CloseTrigger asChild mt="8px">
						<CloseButton size="sm" />
					</Dialog.CloseTrigger>
				</Dialog.Content>
			</Dialog.Positioner>
		</Portal>
	);
};
