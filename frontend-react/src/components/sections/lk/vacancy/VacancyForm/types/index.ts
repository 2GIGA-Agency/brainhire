// types/vacancyForm.ts
export type VacancyFormStep =
	| 'description'
	| 'ai-bot'
	| 'interview'
	| 'testing'
	| 'settings'
	| 'preview';

export interface StepConfig {
	id: VacancyFormStep;
	title: string;
	component: React.ReactNode;
}
