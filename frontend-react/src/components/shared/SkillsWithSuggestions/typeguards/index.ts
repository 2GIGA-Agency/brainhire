import { SkillItem } from "@/store/slices/vacancyCreation/skillsSlice";

// Type guard для проверки, является ли значение объектом SkillItem
export function isSkillItem(value: unknown): value is SkillItem {
	return (
		typeof value === 'object' &&
		value !== null &&
		'text' in value &&
		typeof (value as any).text === 'string'
	);
}
