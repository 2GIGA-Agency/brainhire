// types/vacancyForm.ts
import { ReactNode } from 'react';

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
	component: ReactNode;
}
