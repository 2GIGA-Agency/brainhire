'use client';

import { ContentSpinner } from '@/components/shared/ContentSpinner';
import { useGetPublicVacancyQuery } from '@/store/rtkQuery/api';
import { useParams } from 'next/navigation';
import styles from './style.module.scss';
import { Accordion, Box, Flex, Text } from '@chakra-ui/react';
import { Block } from '@/components/shared/Block';
import { VacancyInfo } from '@/components/shared/VacancyInfo';
import { Typo } from '@/components/shared/Typo/Typo';
import { COLORS } from '@/constants/colors';
import { CandidatesTable } from './components/CandidatesTable';
import { formatVacancyData } from '@/app/(lk)/vacancy/[id]/utils';

export default function PublicVacancyPage() {
	const params = useParams();
	const id = params.id as string;
	const { data: vacancy, isLoading } = useGetPublicVacancyQuery({ vacancyId: id });

	if (isLoading) {
		return <ContentSpinner />;
	}

	if (!vacancy) {
		return <h1>Произошла ошибка получения данных о вакансии</h1>;
	}

	const vacancyData = formatVacancyData(vacancy);

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

	return (
		<Box className={styles.wrapper}>
			<Box className={styles.container}>
				<Box className={styles.data}>
					<Block
						heading={
							<Box className={styles.heading}>
								<Flex alignItems="center" gap={2}>
									<Typo size="16px" weight="medium" color={COLORS.GRAY_800}>
										Данные вакансии
									</Typo>
								</Flex>
							</Box>
						}
					>
						<Box className={styles.px}>
							<VacancyInfo data={vacancyData} variant="view" />
							<Accordion.Root collapsible w="100%" variant="plain">
								{items.map((item, index) => (
									<Accordion.Item key={index} value={item.value} w="100%" mb={4}>
										<Accordion.ItemTrigger
											w="100%"
											display="flex"
											justifyContent="space-between"
											alignItems="center"
											bg="gray.50"
											pl={2}
											pr={2}
										>
											<Text as="span" whiteSpace="normal" p={1}>
												{item.title}
											</Text>
											<Accordion.ItemIndicator />
										</Accordion.ItemTrigger>
										<Accordion.ItemContent w="100%">
											<Text
												whiteSpace="normal"
												dangerouslySetInnerHTML={{ __html: item?.text as string }}
												p={4}
											/>
										</Accordion.ItemContent>
									</Accordion.Item>
								))}
							</Accordion.Root>
						</Box>
					</Block>
				</Box>
				<CandidatesTable vacancyRootId={vacancy.root_id} />
			</Box>
		</Box>
	);
}
