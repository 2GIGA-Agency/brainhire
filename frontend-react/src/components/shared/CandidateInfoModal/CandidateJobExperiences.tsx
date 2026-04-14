'use client';

import { CompanyFilterApi, Resume } from '@/store/types';
import { Box, List } from '@chakra-ui/react';
import { Typo } from '../Typo/Typo';
import { COLORS } from '@/constants/colors';
import { getCompanyMatchType } from '../../shared/utils/getCompanyMatchType';

interface CandidateJobExperiencesProps {
	resume: Resume;
	companyFilter?: CompanyFilterApi;
}

export const CandidateJobExperiences = ({
	resume,
	companyFilter,
}: CandidateJobExperiencesProps) => {
	const jobExperiences: any = (resume as any).job_experiences;
	const jobExperiencesEntries: [string, any][] = jobExperiences
		? Object.entries(jobExperiences)
		: [];
	const hasJobExperiences = jobExperiencesEntries.length > 0;

	if (!hasJobExperiences) {
		return null;
	}

	const hasWhitelistFilter =
		!!companyFilter &&
		(Array.isArray((companyFilter as any).whitelist?.companies)
			? ((companyFilter as any).whitelist.companies as string[]).length > 0
			: Array.isArray((companyFilter as any).whitelist)
				? ((companyFilter as any).whitelist as string[]).length > 0
				: false);
	const missingWhitelist =
		(companyFilter as any)?.whitelist?.missing &&
		Array.isArray((companyFilter as any).whitelist.missing)
			? ((companyFilter as any).whitelist.missing as string[])
			: [];

	return (
		<Box>
			<Typo size="14px" weight="medium" mb="8px">
				Должности:{' '}
			</Typo>
			<List.Root listStyleType="disc" paddingLeft="24px">
				{jobExperiencesEntries.map(([key, value]) => {
					const companyName = value?.company_name as string | undefined;
					const position = value?.position as string | undefined;
					const duration = value?.duration as string | undefined;

					const matchType = getCompanyMatchType(companyName, companyFilter);

					let bgColor: string;
					let textColor: string;
					if (matchType === 'whitelist') {
						bgColor = '#C6F6D5'; // green.100
						textColor = '#2F855A'; // green.700
					} else if (matchType === 'blacklist') {
						bgColor = '#FED7D7'; // red.100
						textColor = '#C53030'; // red.700
					} else {
						bgColor = '#EDF2F7'; // gray.100
						textColor = '#4A5568'; // gray.700
					}

					return (
						<List.Item key={key}>
							<Typo size="12px" weight="regular" lineHeight="24px">
								<Box
									as="span"
									bgColor={bgColor}
									color={textColor}
									borderRadius="4px"
									px="6px"
									py="1px"
									display="inline-block"
									mr="6px"
									mb="2px"
								>
									{companyName || 'Компания не указана'}
								</Box>{' '}
								{position} {duration}
							</Typo>
						</List.Item>
					);
				})}
			</List.Root>
			{hasWhitelistFilter && missingWhitelist.length > 0 && (
				<Typo size="12px" weight="medium" color={COLORS.RED_400} mt="6px">
					Нет опыта работы в обязательных компаниях: {missingWhitelist.join(', ')}
				</Typo>
			)}
		</Box>
	);
};
