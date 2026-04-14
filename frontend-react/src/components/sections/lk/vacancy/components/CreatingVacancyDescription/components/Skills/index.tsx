// src/components/sections/lk/vacancy/create/Skills.tsx
import { Block } from '@/components/shared/Block';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { selectSkills, setSkills } from '@/store/slices/vacancyCreation/skillsSlice';
import { SkillsWithSuggestions } from '@/components/shared/SkillsWithSuggestions';
import { SelectableSkills } from '@/components/sections/lk/vacancy/components/CreatingVacancyDescription/components/SelectableSkills';
import { Box, Separator } from '@chakra-ui/react';

export const Skills = () => {
	const dispatch = useAppDispatch();
	const skills = useAppSelector(selectSkills);

	// Обработчик выбора навыка из подсказок
	const handleSkillSelect = (skill: string) => {
		const skillText = JSON.parse(skill).text;
		dispatch(setSkills([...skills, skillText]));
	};

	// Удаление выбранного навыка
	const handleRemoveSkill = (skillToRemove: string) => {
		dispatch(setSkills(skills.filter((skill) => skill !== skillToRemove)));
	};

	return (
		<Block
			headingText="Навыки"
			isDanger={true}
			subHeadingText="Выберите только обязательные навыки, без которых кандидаты не будут допущены к собеседованию"
		>
			<SkillsWithSuggestions
				isOutbound={false}
				selectedSkills={skills}
				onSelect={handleSkillSelect}
				onRemove={handleRemoveSkill}	/>

			{/* Разделительная линия, которая не доходит до краёв */}
			<Box px="8px" my="16px">
				<Separator />
			</Box>

			{/* Группы выборочных навыков без заголовка и описания */}
			<SelectableSkills />
		</Block>
	);
};
