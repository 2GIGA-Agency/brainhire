import {
	ResumeSelectableGroup,
	ResumeSelectableGroupSkill,
} from '@/app/(lk)/vacancy/[id]/[candidateId]/types/types';
import { Box, Flex, List } from '@chakra-ui/react';
import { FiCheck } from 'react-icons/fi';
import { HiChevronDown, HiChevronUp, HiOutlineX } from 'react-icons/hi';
import { Typo } from '../Typo/Typo';
import { COLORS } from '@/constants/colors';
import { SkillItem } from './SkillItem';

interface SelectableSkillsGroupProps {
	group: ResumeSelectableGroup;
	index: number;
	isExpanded: boolean;
	onToggle: () => void;
	successColor: string;
	failureColor: string;
}

export const SelectableSkillsGroup = ({
	group,
	index,
	isExpanded,
	onToggle,
	successColor,
	failureColor,
}: SelectableSkillsGroupProps) => {
	const groupSkills: [string, ResumeSelectableGroupSkill][] = Object.entries(group)
		.filter(([key, value]) => {
			if (key === 'check' || key === 'min_count') return false;
			return (
				value &&
				typeof value === 'object' &&
				'check' in (value as ResumeSelectableGroupSkill) &&
				'description' in (value as ResumeSelectableGroupSkill)
			);
		})
		.map(([key, value]) => [key, value as ResumeSelectableGroupSkill]);

	if (!groupSkills.length) return null;

	const groupCheck = Boolean(group.check);
	const minCount = Number(group.min_count || 1);

	return (
		<List.Item key={`group-${index}`}>
			<Flex alignItems="center" gap="6px" cursor="pointer" onClick={onToggle}>
				<Typo size="12px" weight="medium">
					Не менее {minCount} из списка
				</Typo>
				{groupCheck ? (
					<Box as={FiCheck} color={successColor} />
				) : (
					<Box as={HiOutlineX} color={failureColor} />
				)}
				{isExpanded ? (
					<Box as={HiChevronUp} color={COLORS.GRAY_600} boxSize="12px" />
				) : (
					<Box as={HiChevronDown} color={COLORS.GRAY_600} boxSize="12px" />
				)}
			</Flex>
			{isExpanded && (
				<List.Root listStyleType="disc" paddingLeft="20px" mt="4px">
					{groupSkills.map(([skillName, skillData]) => (
						<List.Item key={skillName}>
							<SkillItem
								skillKey={skillName}
								skillData={skillData}
								successColor={successColor}
								failureColor={failureColor}
							/>
						</List.Item>
					))}
				</List.Root>
			)}
		</List.Item>
	);
};

