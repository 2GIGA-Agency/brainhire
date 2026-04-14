import { Block } from '@/components/shared/Block';
import { Box, Flex, Tabs } from '@chakra-ui/react';
import styles from './style.module.scss';
import { Typo } from '@/components/shared/Typo/Typo';
import { useAppSelector } from '@/store/store';
import { selectIsTipsShow } from '@/store/slices/appSlice';
import { Tip } from '@/components/shared/Tip';
import { Realtime } from '../Realtime';
import { BehaviorAnalysis } from '../BehaviorAnalysis';
import { VideoInterviewAnswers } from '../VideoInterviewAnswers';
import {
	CandidatesTestingResults,
	TestAttempt,
} from '../CandidateTestingResults/CandidatesTestingResults';
import { CandidateOverview } from '@/app/(lk)/vacancy/[id]/[candidateId]/types/types';
import { Test } from '@/store/slices/vacancyCreation/testingSlice';
import { COLORS } from '@/constants/colors';
import { BotConversationTab } from '../BotConversationTab';
import { ContentSpinner } from '@/components/shared/ContentSpinner';
import { useGetChatMessagesQuery } from '@/store/rtkQuery/api';

interface Props {
	candidateData: CandidateOverview;
	testToVacancy: undefined | Test;
	testAttempt: undefined | TestAttempt;
	isPublic?: boolean;
	realtimeCandidateId?: string; // for public pages pass route candidateId if needed
}

export function Overview({ candidateData, testToVacancy, testAttempt, isPublic = false, realtimeCandidateId }: Props) {
	const isTipShow = useAppSelector(selectIsTipsShow);
	const botSession = candidateData?.chat_interview;

	const hasVideoInterview =
		Boolean(candidateData.candidate_interview?.interview_finish) &&
		Boolean(candidateData.candidate_interview?.average_answers_rating);
	const showBotTab = !isPublic && (Boolean(botSession));
	const hasBehaviorTab = Boolean(candidateData.behavior);
	const hasRealtimeTab = isPublic
		? Boolean(candidateData.realtime_interview)
		: Boolean(candidateData.realtime_interview?.url_realtime);
	const defaultTab = showBotTab ? 'ai_bot' : 'interview';
	const topicId = candidateData?.chat?.topic_id;
	const { data: messagesData, isLoading: isMessagesLoading } = useGetChatMessagesQuery(
		{ 
			topic_id: topicId, 
			page: 1, 
			page_size: 100 
		}, 
		{ 
			skip: !topicId 
		}
	);

	return (
		<Box className={styles.tabs}>
			<Block showSeparator={false}>
				<Tabs.Root defaultValue={defaultTab}>
					<Tabs.List className={styles.tabsHeader} zIndex={999}>
						{showBotTab && (
							<Tabs.Trigger
								_selected={{
									color: '#4299E1',
									border: 'none',
									_before: { bg: COLORS.BLUE_400 },
								}}
								value="ai_bot"
							>
								<Typo weight="medium" color="inherit">
									Чат-интервью
								</Typo>
							</Tabs.Trigger>
						)}
						<Tabs.Trigger
							_selected={{
								color: '#4299E1',
								border: 'none',
								_before: { bg: COLORS.BLUE_400 },
							}}
							value="interview"
						>
							<Flex gap={2}>
								<Typo weight="medium" color="inherit">
									Видеоинтервью
								</Typo>
								{isTipShow && (
									<Tip
										questionIconSize={16}
										content={
											<>
												<Typo weight="medium">
													Оценка вопроса (1–10) формируется автоматически на основе точности и
													полноты ответов :{' '}
												</Typo>
												<Typo weight="medium" mt={2}>
													Красный: 0 – 3 - кандидат не демонстрирует понимания основных аспектов
													задачи или необходимых навыков, Желтый: 4 – 6 - некоторые компоненты
													раскрыты недостаточно, упущены важные детали или навыки., Зеленый: 7 – 10
													- кандидат показывает хорошее понимание задачи и необходимых навыков.
												</Typo>
												<Typo mt={2} weight="medium">
													Чем точнее ответ - тем выше балл.
												</Typo>
											</>
										}
									/>
								)}
							</Flex>
						</Tabs.Trigger>
						{testToVacancy && testAttempt && (
							<Tabs.Trigger
								_selected={{
									color: '#4299E1',
									border: 'none',

									_before: { bg: COLORS.BLUE_400 },
								}}
								value="testing"
							>
								<Typo weight="medium" color="inherit">
									Тестирование
								</Typo>
							</Tabs.Trigger>
						)}
						{hasBehaviorTab && (
							<Tabs.Trigger
								_selected={{
									color: '#4299E1',
									border: 'none',

									_before: { bg: COLORS.BLUE_400 },
								}}
								isDisabled={!hasVideoInterview}
								value="behavior"
							>
								<Typo weight="medium" color="inherit">
									Поведенческое интервью
								</Typo>
							</Tabs.Trigger>
						)}
						{hasRealtimeTab && (
							<Tabs.Trigger
								_selected={{
									color: '#4299E1',
									border: 'none',

									_before: { bg: COLORS.BLUE_400 },
								}}
								isDisabled={!hasVideoInterview}
								value="realtime"
							>
								<Typo weight="medium" color="inherit">
									Real-time интервью
								</Typo>
							</Tabs.Trigger>
						)}
					</Tabs.List>

					{showBotTab && (
						<Tabs.Content value="ai_bot">
							{!botSession ? (
								<ContentSpinner />
							) : botSession ? (
								<BotConversationTab
									session={botSession}
									messages={messagesData?.items || []} // Массив сообщений
            						isLoading={isMessagesLoading}
								/>
							) : (
								<Typo color={COLORS.GRAY_800}>Результаты чат-интервью ещё не сформированы.</Typo>
							)}
						</Tabs.Content>
					)}

					<Tabs.Content value="interview">
						<VideoInterviewAnswers candidateData={candidateData} />
					</Tabs.Content>

					<Tabs.Content value="testing">
						{testToVacancy && testAttempt && (
							<CandidatesTestingResults test={testToVacancy} attempt={testAttempt} />
						)}
					</Tabs.Content>

					{hasBehaviorTab && (
						<Tabs.Content value="behavior">
							{!hasVideoInterview ? (
								<Typo color={COLORS.GRAY_800} textAlign="center" py={6}>
									Поведенческий анализ доступен после завершения видеоинтервью.
								</Typo>
							) : candidateData.behavior?.processed ? (
								<BehaviorAnalysis {...candidateData.behavior.data.candidate_analysis} />
							) : (
								<Typo color={COLORS.GRAY_800}>
									Мы направили запрос нашему ИИ для определения психологического портрета кандидата.
									Как только ИИ обработает запрос, информация появится ниже.{' '}
								</Typo>
							)}
						</Tabs.Content>
					)}

					{hasRealtimeTab && (
						<Tabs.Content value="realtime">
							{!hasVideoInterview ? (
								<Typo color={COLORS.GRAY_800} textAlign="center" py={6}>
									Real-time avatar станет доступен после видеоинтервью.
								</Typo>
							) : (
								<Realtime candidateId={realtimeCandidateId ?? candidateData.id} isPublic={isPublic} />
							)}
						</Tabs.Content>
					)}
				</Tabs.Root>
			</Block>
		</Box>
	);
}
