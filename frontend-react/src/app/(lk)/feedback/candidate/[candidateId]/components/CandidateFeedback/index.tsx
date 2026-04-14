import { ExternalCandidateOverview } from '@/app/(lk)/vacancy/[id]/[candidateId]/types/types';
import { Block } from '@/components/shared/Block';
import { Typo } from '@/components/shared/Typo/Typo';
import { COLORS } from '@/constants/colors';
import { Box } from '@chakra-ui/react';

export const CandidateFeedback = (candidateData: ExternalCandidateOverview) => (
	<Block>
		<Box>
			<Typo size="16px" weight="medium" color={COLORS.GRAY_800}>
				{candidateData.last_name} {candidateData.first_name}
			</Typo>
			<Typo fontSize="14px" fontWeight="500" mt="24px">
				Обратная связь:
			</Typo>
			<Typo fontSize="14px" fontWeight="400" mt="16px">
				{candidateData.candidate_interview.general_recommendations}
			</Typo>
		</Box>
	</Block>
);
