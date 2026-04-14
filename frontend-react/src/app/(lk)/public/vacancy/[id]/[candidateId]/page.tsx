'use client';

import { ResultsDetalization } from '@/components/sections/lk/candidateOverview/ResultsDetalization';
import { ContentSpinner } from '@/components/shared/ContentSpinner';
import { ScoreItem } from '@/components/shared/ScoringItem/types/types';
import { Typo } from '@/components/shared/Typo/Typo';
import { COLORS } from '@/constants/colors';
import {
	useGetPublicCandidateOverviewQuery,
	useGetTestAttemptByCandidateQuery,
	useGetTestByVacancyIdQuery,
} from '@/store/rtkQuery/api';
import { Breadcrumb } from '@chakra-ui/react';
import { useParams } from 'next/navigation';
import { LiaSlashSolid } from 'react-icons/lia';
import { Overview } from '@/components/sections/lk/candidateOverview/Overview';

export default function PublicCandidateOverviewPage() {
    const params = useParams();
    const candidateId = params.candidateId as string;
    const id = params.id as string;

	const {
		data: candidateData,
		isLoading: isCandidateDataLoading,
		error: fetchCandidateError,
	} = useGetPublicCandidateOverviewQuery({ candidateId });
	const { data: testToVacancy, isLoading: isTestDataLoading } = useGetTestByVacancyIdQuery({
		vacancyId: id,
	});
	const { data: testAttempt, isLoading: isTestAttemptLoading } = useGetTestAttemptByCandidateQuery({
		candidateId,
	});

	if (isCandidateDataLoading) {
		return <ContentSpinner />;
	}

	if (fetchCandidateError || !candidateData) {
		return <Typo color={COLORS.GRAY_800}>Ошибка загрузки данных канидидата...</Typo>;
	}

	const { average_answers_rating } = candidateData.candidate_interview;

	const resultsToDetalization: (ScoreItem | undefined)[] = [
		{
			text: 'Видеоинтервью',
			score: Number(average_answers_rating),
		},
		testToVacancy && testAttempt
			? {
					text: 'Тестирование',
					score: testAttempt.score,
				}
			: undefined,
	];

	return (
		<>
			<Breadcrumb.Root>
				<Breadcrumb.List>
					<Breadcrumb.Item>
						<Breadcrumb.Link href={`/public/vacancy/${id}`}>Просмотр вакансии</Breadcrumb.Link>
					</Breadcrumb.Item>
					<Breadcrumb.Separator>
						<LiaSlashSolid />
					</Breadcrumb.Separator>
					<Breadcrumb.Item>
						<Breadcrumb.CurrentLink>Обзор интервью</Breadcrumb.CurrentLink>
					</Breadcrumb.Item>
				</Breadcrumb.List>
			</Breadcrumb.Root>
			<ResultsDetalization
				results={resultsToDetalization}
				general_scoring={candidateData.candidate_interview.general_scoring}
				isPublic={true}
				candidateFirstName={candidateData.first_name}
				candidateLastName={candidateData.last_name}
			/>

            <Overview
                candidateData={candidateData}
                testToVacancy={testToVacancy}
                testAttempt={testAttempt}
                isPublic={true}
                realtimeCandidateId={candidateId}
            />
		</>
	);
}
