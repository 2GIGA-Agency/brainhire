import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';
import { RootState } from '@/store/store';

export type VacancyBotQuestionType = 'OPEN' | 'BINARY' | 'NUMERIC';
export type VacancyBotEvaluationStrategy = 'STANDARD' | 'CRITICAL' | 'INFO';

export interface VacancyBotQuestion {
	id: string;
	text: string;
	question_type: VacancyBotQuestionType;
	evaluation_strategy: VacancyBotEvaluationStrategy;
}

export interface VacancyBotState {
	isActive: boolean;
	generateAutomaticQuestions: boolean;
	questions: VacancyBotQuestion[];
	additionalInfo: string;
	redFlags: string;
	candidateMessage: string;
}

const createQuestion = (overrides?: Partial<VacancyBotQuestion>): VacancyBotQuestion => ({
	id: uuid(),
	text: overrides?.text ?? '',
	question_type: overrides?.question_type ?? 'OPEN',
	evaluation_strategy: overrides?.evaluation_strategy ?? 'STANDARD',
});

export const buildVacancyBotQuestionsFromText = (text: string | null | undefined): VacancyBotQuestion[] => {
	const lines =
		text
			?.replace(/\r/g, '')
			.split('\n')
			.map((line) => line.trim())
			.filter(Boolean) || [];

	return lines.length ? lines.map((line) => createQuestion({ text: line })) : [createQuestion()];
};

const initialState: VacancyBotState = {
	isActive: false,
	generateAutomaticQuestions: false,
	questions: [createQuestion()],
	additionalInfo: '',
	redFlags: '',
	candidateMessage: '',
};

const vacancyBotSlice = createSlice({
	name: 'vacancyBot',
	initialState,
	reducers: {
			setVacancyBotActive: (state, action: PayloadAction<boolean>) => {
				state.isActive = action.payload;
			},
			setVacancyBotGenerateAutomaticQuestions: (state, action: PayloadAction<boolean>) => {
				state.generateAutomaticQuestions = action.payload;
			},
		setVacancyBotQuestions: (state, action: PayloadAction<VacancyBotQuestion[]>) => {
			state.questions = action.payload.length ? action.payload : [createQuestion()];
		},
		addVacancyBotQuestion: (state) => {
			state.questions.push(createQuestion());
		},
		updateVacancyBotQuestionText: (
			state,
			action: PayloadAction<{ id: string; text: string }>
		) => {
			const question = state.questions.find((item) => item.id === action.payload.id);
			if (question) {
				question.text = action.payload.text;
			}
		},
		updateVacancyBotQuestionType: (
			state,
			action: PayloadAction<{ id: string; question_type: VacancyBotQuestionType }>
		) => {
			const question = state.questions.find((item) => item.id === action.payload.id);
			if (question) {
				question.question_type = action.payload.question_type;
				if (action.payload.question_type === 'BINARY') {
					question.evaluation_strategy = 'CRITICAL';
				} else if (question.evaluation_strategy === 'CRITICAL') {
					question.evaluation_strategy = 'STANDARD';
				}
			}
		},
		updateVacancyBotQuestionEvaluation: (
			state,
			action: PayloadAction<{
				id: string;
				evaluation_strategy: VacancyBotEvaluationStrategy;
			}>
		) => {
			const question = state.questions.find((item) => item.id === action.payload.id);
			if (question) {
				question.evaluation_strategy = action.payload.evaluation_strategy;
			}
		},
		deleteVacancyBotQuestion: (state, action: PayloadAction<string>) => {
			if (state.questions.length > 1) {
				state.questions = state.questions.filter((item) => item.id !== action.payload);
			} else {
				state.questions[0] = createQuestion();
			}
		},
		setVacancyBotAdditionalInfo: (state, action: PayloadAction<string>) => {
			state.additionalInfo = action.payload;
		},
		setVacancyBotRedFlags: (state, action: PayloadAction<string>) => {
			state.redFlags = action.payload;
		},
		setVacancyBotCandidateMessage: (state, action: PayloadAction<string>) => {
			state.candidateMessage = action.payload;
		},
		resetVacancyBot: () => initialState,
	},
});

export const {
	setVacancyBotActive,
	setVacancyBotQuestions,
	addVacancyBotQuestion,
	updateVacancyBotQuestionText,
	updateVacancyBotQuestionType,
	updateVacancyBotQuestionEvaluation,
	deleteVacancyBotQuestion,
	setVacancyBotGenerateAutomaticQuestions,
	setVacancyBotAdditionalInfo,
	setVacancyBotRedFlags,
	setVacancyBotCandidateMessage,
	resetVacancyBot,
} = vacancyBotSlice.actions;

export const selectVacancyBot = (state: RootState) => state.vacancyCreation.vacancyBot;

export { initialState as vacancyBotInitialState };
export default vacancyBotSlice.reducer;
