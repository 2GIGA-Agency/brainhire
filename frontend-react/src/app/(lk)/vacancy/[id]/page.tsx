'use client';
import { Block } from '@/components/shared/Block';
import { useGetVacancyDataByIdQuery } from '@/store/rtkQuery/api';
import axios from '@/utils/axios';
import { Box } from '@chakra-ui/react';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import { Limits } from './components/Limits/Limits';
import { LimitsSkeleton } from './components/Limits/components/LimitsSkeleton';
import { Publications } from './components/Publications';
import { PublicationsSkeleton } from './components/Publications/components/PublicationsSkeleton';
import { VacancyInfoBlock } from './components/VacancyInfoBlock';
import { VacancyInfoBlockSkeleton } from './components/VacancyInfoBlock/VacancyInfoBlockSkeleton';

import styles from './Vacancy.module.scss';
import { CandidatesTable } from './components/CandidatesTable';
import { CandidatesTableSkeleton } from './components/CandidatesTable/components/CandidateTableSkeleton';

const VacancyViewPage: React.FC = () => {
	const params = useParams();
	const vacancyId = params.id as string;
	const [outboundState, setOutboundState] = useState(false);
	const { data: vacancy, isLoading: isVacancyDataLoading } = useGetVacancyDataByIdQuery({
		vacancyId,
	});
	useEffect(() => {
		const checkOutboundStatus = async () => {
			try {
				const response = await axios.get('/api/hh/outbound_search/check_outbound_access/');
				setOutboundState(response.status === 200);
			} catch {
				setOutboundState(false);
			}
		};
		if (vacancy?.vacancy_hh_id) {
			checkOutboundStatus();
		}
	}, [vacancy]);

	return (
		<Box className={styles.wrapper}>
			<Box className={styles.container}>
				<Box className={styles.data}>
					{isVacancyDataLoading ? (
						<VacancyInfoBlockSkeleton />
					) : (
						vacancy && <VacancyInfoBlock vacancy={vacancy} />
					)}

					<Box className={styles.secondaryBlock}>
						{isVacancyDataLoading ? (
							<LimitsSkeleton />
						) : (
							vacancy && <Limits vacancyId={vacancy.id} vacancyRootId={vacancy.root_id} />
						)}

						{isVacancyDataLoading ? (
							<PublicationsSkeleton />
						) : (
							vacancy && <Publications vacancyId={vacancy.id} vacancyRootId={vacancy.root_id} />
						)}
					</Box>
				</Box>

				<Block position={'relative'}>
					{isVacancyDataLoading ? (
						<CandidatesTableSkeleton />
					) : (
						vacancy && (
							<CandidatesTable
								vacancyId={vacancy.id}
								vacancyRootId={vacancy.root_id}
								vacancySkills={vacancy.skills}
								vacancyRequiredWorkExperience={vacancy.required_work_experience}
								vacancyHhId={vacancy.vacancy_hh_id}
								isOutboundAvailable={outboundState}
								companyFilter={vacancy.company_filter}
							/>
						)
					)}
				</Block>
			</Box>
		</Box>
	);
};

export default VacancyViewPage;
