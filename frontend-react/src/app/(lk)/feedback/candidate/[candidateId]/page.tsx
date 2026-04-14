'use client';

import { Block } from '@/components/shared/Block';
import { Box, Text } from '@chakra-ui/react';

import { VideoInterviewAnswers } from '@/components/sections/lk/candidateOverview/VideoInterviewAnswers';
import { ContentSpinner } from '@/components/shared/ContentSpinner';
import { useGetExternalCandidateOverviewQuery } from '@/store/rtkQuery/api';
import { useParams } from 'next/navigation';
import styles from './style.module.scss';
import { ScoringSystem } from './components/ScoringSystem';
import { CandidateFeedback } from './components/CandidateFeedback';
import { Header } from './components/Header';

const Interview = () => {
	const params = useParams();
	const candidateId = params.candidateId as string;

	const {
		data: candidateData,
		isLoading: isCandidateDataLoading,
		error: fetchCandidateError,
	} = useGetExternalCandidateOverviewQuery({ candidateId: candidateId });

	if (isCandidateDataLoading) {
		return <ContentSpinner />;
	}

	if (fetchCandidateError || !candidateData) {
		return <Text>Ошибка загрузки данных кандидата...</Text>;
	}

	return (
		<>
			<Header />
			<Box className={styles.content}>
				<CandidateFeedback {...candidateData} />
				<ScoringSystem />
				<Box className={styles.tabs}>
					<Block showSeparator={false}>
						<VideoInterviewAnswers candidateData={candidateData} isExternal />
					</Block>
				</Box>
			</Box>
		</>
	);
};

export default Interview;
