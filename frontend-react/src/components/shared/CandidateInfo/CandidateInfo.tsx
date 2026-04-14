import { toaster } from '@/components/ui/toaster';
import { COLORS } from '@/constants/colors';
import axios from '@/utils/axios';
import { Box, Flex } from '@chakra-ui/react';
import { useParams } from 'next/navigation';
import { CopyButton } from '../CopyButton';
import { Typo } from '../Typo/Typo';
import styles from './CandidateInfo.module.scss';
import { Resume } from '@/store/types';

export type CandidateInfoProps = {
	first_name?: string;
	last_name?: string;
	middle_name?: string | null;
	email?: string;
	phone?: string;
	area?: string;
	id?: string;
	resume?: Resume;
	copyButton?: boolean;
};

export const CandidateInfo = ({
	first_name,
	last_name,
	middle_name,
	email,
	phone,
	area,
	id,
	resume,
	copyButton = false,
}: CandidateInfoProps) => {
	const params = useParams();
	const candidateId = params.candidateId as string;
	const vacancyId = params.id as string;

	const externalLink = `${window.location.protocol}//${window.location.host}/public/vacancy/${vacancyId}/${candidateId}`;
	const hhLink = resume?.hh_resume_id ? `https://hh.ru/resume/${resume.hh_resume_id}` : null;

	const fetchResumeLink = async () => {
		if (!id) return;

		try {
			const res = await axios.get<{ resume: string }>(`/api/candidates/${id}/resume/`);
			window.open(res.data.resume);
			return res.data.resume;
		} catch (e: any) {
			toaster.error({ title: 'Возникла ошибка при получении ссылки резюме, попробуйте позже' });
		}
	};

	// Проверки на наличие данных
	const hasName = first_name || last_name || middle_name;
	const hasContactInfo = email || phone || area;
	const hasResume = resume;
	const canFetchResume = id && hasResume;
	const hasHhLink = resume?.hh_resume_id;
	const showCopyButton = copyButton && vacancyId && candidateId;

	return (
		<Flex direction="column" gap="8px" className={styles.candidateInfo}>
			{hasName && (
				<Box>
					<Flex
						justifyContent="space-between"
						alignItems="center"
						flexWrap="wrap"
						gapX={4}
						gapY={3}
					>
						<Typo size="16px" weight="medium" color={COLORS.GRAY_800} flexShrink={0}>
							{last_name && `${last_name} `}
							{first_name && `${first_name} `}
							{middle_name && `${middle_name}`}
						</Typo>
						{showCopyButton && (
							<CopyButton
								title="Внешняя ссылка"
								copyValue={externalLink}
								size="xs"
								bg={COLORS.CYAN_500}
								fontSize="12px"
							/>
						)}
					</Flex>
				</Box>
			)}

			{hasContactInfo && (
				<Box>
					{email && (
						<Flex gap="8px">
							<Typo size="14px" weight="regular" color={COLORS.GRAY_500}>
								Email:{' '}
							</Typo>
							<Typo size="14px" weight="medium" color={COLORS.GRAY_800}>
								{email}
							</Typo>
						</Flex>
					)}
					{phone && (
						<Flex gap="8px">
							<Typo size="14px" weight="regular" color={COLORS.GRAY_500}>
								Телефон:{' '}
							</Typo>
							<Typo size="14px" weight="medium" color={COLORS.GRAY_800}>
								{phone}
							</Typo>
						</Flex>
					)}
					{area && (
						<Flex gap="8px">
							<Typo size="14px" weight="regular" color={COLORS.GRAY_500}>
								Проживает:{' '}
							</Typo>
							<Typo size="14px" weight="medium" color={COLORS.GRAY_800}>
								{area}
							</Typo>
						</Flex>
					)}
				</Box>
			)}

			<Box>
				{canFetchResume && (
					<a
						href="#"
						onClick={(e) => {
							e.preventDefault();
							fetchResumeLink();
						}}
						onKeyDown={(e) => {
							if (e.key === ' ') {
								e.preventDefault();
								fetchResumeLink();
							}
						}}
					>
						<Typo color={COLORS.BLUE_400} size="12px" weight="regular">
							Резюме кандидата
						</Typo>
					</a>
				)}

				{hasHhLink && (
					<a
						href={hhLink!}
						target="_blank"
						rel="noopener noreferrer"
						onKeyDown={(e) => {
							if (e.key === ' ') {
								e.preventDefault();
								window.open(hhLink!, '_blank');
							}
						}}
					>
						<Typo color={COLORS.BLUE_400} size="12px" weight="regular">
							Ссылка на кандидата в HH
						</Typo>
					</a>
				)}
			</Box>
		</Flex>
	);
};
