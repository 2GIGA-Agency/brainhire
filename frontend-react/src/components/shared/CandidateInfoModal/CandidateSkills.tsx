'use client';

import { useEffect, useState } from 'react';
import { List } from '@chakra-ui/react';
import { Typo } from '../Typo/Typo';
import { COLORS } from '@/constants/colors';
import { MandatorySkillItem } from './MandatorySkillItem';
import { SelectableSkillsGroup } from './SelectableSkillsGroup';
import { Resume, ResumeSelectableGroup, ResumeStack } from '@/store/types';
import { hasSelectableSkills } from '@/utils/typeguards';

interface CandidateSkillsProps {
	resume: Resume;
}

export const CandidateSkills = ({ resume }: CandidateSkillsProps) => {
	const successColor = COLORS.GREEN_400;
	const failureColor = COLORS.RED_400;

	let stack: ResumeStack | null = resume.stack ?? null;

	if (stack && typeof stack === 'object') {
		const keysWithoutGroups = Object.keys(stack).filter((key) => key !== 'selectable_skills');
		const selectableGroupsRaw = Array.isArray((stack as any).selectable_skills)
			? ((stack as any).selectable_skills as ResumeSelectableGroup[])
			: [];

		if (keysWithoutGroups.length === 0 && selectableGroupsRaw.length === 0) {
			stack = null;
		}
	}

	const selectableGroups: ResumeSelectableGroup[] = hasSelectableSkills(stack)
		? stack.selectable_skills
		: [];

	const mandatorySkills: string[] =
		stack && typeof stack === 'object'
			? Object.keys(stack).filter((key) => key !== 'selectable_skills')
			: [];

	const [expandedGroups, setExpandedGroups] = useState<boolean[]>([]);

	useEffect(() => {
		if (selectableGroups.length > 0) {
			setExpandedGroups(new Array(selectableGroups.length).fill(false));
		} else {
			setExpandedGroups([]);
		}
	}, [selectableGroups.length]);

	const toggleGroup = (index: number) => {
		setExpandedGroups((prev) => {
			const next = [...prev];
			next[index] = !next[index];
			return next;
		});
	};

	if (!stack) {
		return (
			<Typo size="12px" paddingLeft="0px">
				{resume?.extracted_skills.join(', ') ?? ''}
			</Typo>
		);
	}

	return (
		<List.Root listStyleType="disc" paddingLeft="24px">
			{mandatorySkills.map((skillKey) => (
				<List.Item key={skillKey}>
					<MandatorySkillItem
						stack={stack}
						skillKey={skillKey}
						successColor={successColor}
						failureColor={failureColor}
					/>
				</List.Item>
			))}

			{selectableGroups.map((group, index) => (
				<SelectableSkillsGroup
					key={`group-${index}`}
					group={group}
					index={index}
					isExpanded={expandedGroups[index] ?? false}
					onToggle={() => toggleGroup(index)}
					successColor={successColor}
					failureColor={failureColor}
				/>
			))}
		</List.Root>
	);
};
