import { ResumeSelectableGroupSkill } from '@/app/(lk)/vacancy/[id]/[candidateId]/types/types';
import { Box, Flex } from '@chakra-ui/react';
import { FiCheck } from 'react-icons/fi';
import { HiOutlineX } from 'react-icons/hi';
import { Typo } from '../Typo/Typo';
import { EllipsisTextWithTooltip } from '@/components/shared/EllipsisTextWithTooltip';

interface SkillItemProps {
	skillKey: string;
	skillData: ResumeSelectableGroupSkill;
	successColor: string;
	failureColor: string;
}

export const SkillItem = ({ skillKey, skillData, successColor, failureColor }: SkillItemProps) => {
	const check = skillData?.check ?? false;
	const description =
		skillData?.description ||
		'В резюме нет явных упоминаний этого навыка, либо навык не был явно выделен.';

	return (
		<>
			<Flex alignItems="center" gap="4px">
				<EllipsisTextWithTooltip
					text={skillKey}
					maxW="220px"
					fontSize="12px"
					fontWeight={500}
				/>
				{check ? (
					<Box as={FiCheck} color={successColor} />
				) : (
					<Box as={HiOutlineX} color={failureColor} />
				)}
			</Flex>
			<Typo size="12px" weight="regular">
				{description}
			</Typo>
		</>
	);
};
