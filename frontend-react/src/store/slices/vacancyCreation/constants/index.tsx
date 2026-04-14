// constants/vacancyFormSteps.ts

import { AIBotStep } from '@/components/sections/lk/vacancy/components/AIBotStep';
import { CreatingVacancyDescription } from '@/components/sections/lk/vacancy/components/CreatingVacancyDescription';
import { StepConfig } from '../types/index';
import { Testing } from '@/components/sections/lk/vacancy/components/Testing';
import { VacancySettings } from '@/components/sections/lk/vacancy/components/VacancySettings';
import { PreviewVacancy } from '@/components/sections/lk/vacancy/components/PreviewVacancy';
import { Interview } from '@/components/sections/lk/vacancy/components/Interview';

export const getVacancyFormSteps = (
	isEdit: boolean,
	options?: { includeAIBot?: boolean }
): StepConfig[] => {
	const includeAIBot = options?.includeAIBot ?? true;

	const steps: StepConfig[] = [
		{
			id: 'description',
			title: 'Описание вакансии',
			component: <CreatingVacancyDescription />,
		},
		{
			id: 'ai-bot',
			title: 'Чат-интервью',
			component: <AIBotStep />,
		},
		{
			id: 'interview',
			title: 'Видеоинтервью',
			component: <Interview />,
		},
		// {
		// 	id: 'testing',
		// 	title: 'Тестирование',
		// 	component: <Testing />,
		// },
		{
			id: 'settings',
			title: 'Настройка',
			component: <VacancySettings />,
		},
		{
			id: 'preview',
			title: 'Предпросмотр',
			component: <PreviewVacancy isEdit={isEdit} />,
		},
	];

	return includeAIBot ? steps : steps.filter((step) => step.id !== 'ai-bot');
};
