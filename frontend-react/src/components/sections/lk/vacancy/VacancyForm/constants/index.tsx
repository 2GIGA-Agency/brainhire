import { AIBotStep } from '../../components/AIBotStep';
import { CreatingVacancyDescription } from '../../components/CreatingVacancyDescription';
import { Interview } from '../../components/Interview';
import { StepConfig } from '../types';
import { VacancySettings } from '../../components/VacancySettings';
import { PreviewVacancy } from '../../components/PreviewVacancy';
import { Testing } from '../../components/Testing';

// constants/vacancyFormSteps.ts
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
			component: <VacancySettings isEdit={isEdit} />,
		},
		{
			id: 'preview',
			title: 'Предпросмотр',
			component: <PreviewVacancy isEdit={isEdit} />,
		},
	];

	return includeAIBot ? steps : steps.filter((step) => step.id !== 'ai-bot');
};
