'use client';
import { VacancyInfo } from '@/components/shared/VacancyInfo';

import { ContentSpinner } from '@/components/shared/ContentSpinner';
import { Flex, Text } from '@chakra-ui/react';
import { useParams } from 'next/navigation';
import styles from './page.module.scss';
import { useGetCompaniesQuery, useGetExternalVacancyDataQuery } from '@/store/rtkQuery/api';
import { Typo } from '@/components/shared/Typo/Typo';
import { COLORS } from '@/constants/colors';
import { formatVacancyData } from '../utils';
import { ExternalForm } from './components/ExternalForm';

interface ProfessionalRole {
	id: string;
	text: string;
	accept_incomplete_resumes: boolean;
}

interface Area {
	id: string;
	url: string;
	text: string;
}

interface QuestionAnswer {
	bad: string;
	good: string;
}

interface Question {
	answer: QuestionAnswer;
	question: string;
	question_audio_link: string;
}

interface ActiveInterview {
	id: string;
	min_score: number;
	time_per_answer: number;
	level_candidate: string;
	what_checking: string;
	save_audio: boolean;
	save_video: boolean;
	questions: Record<string, Question>;
	root_id: string;
	version: number;
	is_active: boolean;
	vacancy: string;
}

export interface Company {
	company_description: string;
	company_name: string;
	id: string;
	inn: number;
}

export interface Vacancy {
	id: string;
	vacancy_name: string;
	type_employment: string;
	work_schedule: string;
	work_format: string;
	payment_per_month_range: [number, number];
	required_work_experience: string;
	description_responsibilities: string;
	description_requirements: string;
	description_conditions: string;
	skills: string[];
	professional_roles: ProfessionalRole[];
	areas: Area[];
	user_full_name: string;
	active_interview: ActiveInterview;
	root_id: string;
	level_candidate: string;
	version: number;
	is_active: boolean;
	create_date: string;
	vacancy_hh_id: string;
	company: string; // Приходит строка id
	user: number;
	number_days: number;
	number_candidates: number;
	number_best_candidates: number;
}

export interface Ordering {
	order: string;
	value: number;
}

const VacancyViewPageExternal: React.FC = () => {
	const params = useParams();
	const vacancyId = params.id as string;
	const {
		data: vacancy,
		isLoading: vacancyDataLoading,
		error,
	} = useGetExternalVacancyDataQuery(vacancyId);
	const { data: companies, isLoading: companiesLoading } = useGetCompaniesQuery();

	const companyName = companies?.find((i) => i.id === vacancy?.company)?.company_name;

	// Костыль, т.к. с бека летит только id компании
	const vacancyWithCompanyName = {
		...vacancy,
		company: {
			company_name: companyName,
		},
	};

	const vacancyData = formatVacancyData(vacancyWithCompanyName);

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

	if (vacancyDataLoading || companiesLoading) {
		return <ContentSpinner />;
	}

	if (error) {
		return (
			<Flex justifyContent={'center'} alignItems={'center'} h={'80vh'} w={'100%'}>
				<Typo color={COLORS.RED_400} size={'20px'} weight="semibold">
					Произошла ошибка, попробуйте позже...
				</Typo>
			</Flex>
		);
	}

	return (
		<div className={styles.wrapper}>
			<div className={styles.container}>
				<div className={styles.data}>
					<div className={styles.mainBlock}>
						<Flex
							justify="space-between"
							align="center"
							pb={6}
							px={6}
							borderBottom="1px solid rgba(226, 232, 240, 1)"
						>
							<Text textStyle="md" fontWeight={500} mb={2}>
								Данные вакансии
							</Text>
						</Flex>
						<div className={styles.px}>
							<VacancyInfo data={vacancyData} variant="view" />
							{items.map((item) => (
								<Flex mb={4} key={item.value}>
									<Text color="gray.500" textStyle="sm" fontWeight={500} width="50%" flexShrink={0}>
										{item.title}
									</Text>
									<Text
										color="gray.800"
										textStyle="sm"
										fontWeight={500}
										whiteSpace="normal"
										dangerouslySetInnerHTML={{ __html: item?.text as string }}
									/>
								</Flex>
							))}
						</div>
					</div>
					<ExternalForm vacancy={vacancy} />
				</div>
			</div>
		</div>
	);
};

export default VacancyViewPageExternal;
