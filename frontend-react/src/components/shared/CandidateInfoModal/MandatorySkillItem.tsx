import { ResumeSelectableGroupSkill, ResumeStack } from '@/store/types';
import { SkillItem } from './SkillItem';

interface MandatorySkillItemProps {
	stack: ResumeStack | null;
	skillKey: string;
	successColor: string;
	failureColor: string;
}

export const MandatorySkillItem = ({
	stack,
	skillKey,
	successColor,
	failureColor,
}: MandatorySkillItemProps) => {
	if (!stack) return null;

	// Проверяем, что ключ существует в объекте
	if (!(skillKey in stack)) return null;

	const entry = stack[skillKey as keyof ResumeStack] as ResumeSelectableGroupSkill;

	if (!entry) return null;

	return (
		<SkillItem
			skillKey={skillKey}
			skillData={entry}
			successColor={successColor}
			failureColor={failureColor}
		/>
	);
};
