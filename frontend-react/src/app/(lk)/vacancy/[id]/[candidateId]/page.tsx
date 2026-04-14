'use client';

import { Box, Breadcrumb } from '@chakra-ui/react';
import { ContentSpinner } from '@/components/shared/ContentSpinner';
import { ScoreItem } from '@/components/shared/ScoringItem/types/types';
import {
	useGetCandidateOverviewQuery,
	useGetTestAttemptByCandidateQuery,
	useGetTestByVacancyIdQuery,
} from '@/store/rtkQuery/api';
import { useParams } from 'next/navigation';
import styles from './page.module.scss';
import { COLORS } from '@/constants/colors';
import { Typo } from '@/components/shared/Typo/Typo';
import { ResultsDetalization } from '@/components/sections/lk/candidateOverview/ResultsDetalization';
import { CandidateBlock } from './components/CandidateBlock';
import { OrderRealtime } from '@/components/sections/lk/candidateOverview/Realtime/OrderRealtime';
import { OrderBehaviorAnalysis } from '@/components/sections/lk/candidateOverview/BehaviorAnalysis/OrderBehaviorAnalysis';
import { Overview } from '@/components/sections/lk/candidateOverview/Overview';
import { checkSubdomain } from '@/utils/checkSubdamains';

const Interview = () => {
	const params = useParams();
	const candidateId = params.candidateId as string;
	const vacancyId = params.id as string;

	// Данные берём из RTK Query
	const {
		data: candidateData,
		isLoading: isCandidateDataLoading,
		error: fetchCandidateError,
	} = useGetCandidateOverviewQuery({ candidateId });
	const { data: testToVacancy, isLoading: isTestDataLoading } = useGetTestByVacancyIdQuery({
		vacancyId,
	});
	const { data: testAttempt, isLoading: isTestAttemptLoading } = useGetTestAttemptByCandidateQuery({
		candidateId,
	});
	const botSession = candidateData?.chat_interview

	const isSpecialAccess = checkSubdomain();

	if (isCandidateDataLoading || isTestDataLoading || isTestAttemptLoading) {
		return <ContentSpinner />;
	}

	if (fetchCandidateError || !candidateData) {
		return <Typo color={COLORS.GRAY_800}>Ошибка загрузки данных канидидата...</Typo>;
	}

	const candidateInterview = candidateData.candidate_interview;
	const average_answers_rating = candidateInterview?.average_answers_rating ?? null;

	const hasVideoInterview =
		Boolean(candidateInterview?.interview_finish) && Boolean(candidateInterview?.average_answers_rating);

	const botScoreItem =
		botSession && botSession.score !== null
			? {
					text: 'Чат-интервью',
					score: botSession.score,
			  }
			: undefined;

	const interviewScoreItem = candidateInterview
		? {
				text: 'Видеоинтервью',
				score: Number(average_answers_rating),
		  }
		: undefined;

	const testScoreItem = testToVacancy && testAttempt
		? {
				text: 'Тестирование',
				score: testAttempt.score,
			}
		: undefined;

	const resultsToDetalization: (ScoreItem | undefined)[] = [
		botScoreItem,
		interviewScoreItem,
		testScoreItem,
	];

	return (
		<>
			<Breadcrumb.Root>
				<Breadcrumb.List>
					<Breadcrumb.Item>
						<Breadcrumb.Link href="/vacancy">BRaiN</Breadcrumb.Link>
					</Breadcrumb.Item>
					<Breadcrumb.Separator ml={0.5} mr={0.5}>
						/
					</Breadcrumb.Separator>
					<Breadcrumb.Item>
						<Breadcrumb.Link href="/vacancy">Вакансии</Breadcrumb.Link>
					</Breadcrumb.Item>
					<Breadcrumb.Separator ml={0.5} mr={0.5}>
						/
					</Breadcrumb.Separator>
					<Breadcrumb.Item>
						<Breadcrumb.Link href={`/vacancy/${vacancyId}`}>Просмотр вакансии</Breadcrumb.Link>
						<Breadcrumb.Separator ml={2} mr={0.5}>
							/
						</Breadcrumb.Separator>
					</Breadcrumb.Item>
					<Breadcrumb.Item>
						<Breadcrumb.CurrentLink>Обзор интервью</Breadcrumb.CurrentLink>
					</Breadcrumb.Item>
				</Breadcrumb.List>
			</Breadcrumb.Root>
			<Box className={styles.content}>
				<CandidateBlock candidateData={candidateData} />

				<ResultsDetalization
					results={resultsToDetalization}
					general_scoring={candidateInterview?.general_scoring}
				/>
				{isSpecialAccess && !candidateData.realtime_interview && (
					<OrderRealtime candidateId={candidateId} isVideoInterviewPassed={hasVideoInterview} />
				)}
				{!candidateData.behavior && (
					<OrderBehaviorAnalysis candidateId={candidateId} isVideoInterviewPassed={hasVideoInterview} />
				)}

				<Overview
					candidateData={candidateData}
					testToVacancy={testToVacancy}
					testAttempt={testAttempt}
				/>
			</Box>
		</>
	);
};

export default Interview;
