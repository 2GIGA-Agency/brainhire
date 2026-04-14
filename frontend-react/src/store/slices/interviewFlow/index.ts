import { RootState } from '@/store/store';
import {
	fetchTestAttemptsByCandidate,
	fetchTestingByVacancy,
	sendCode,
	sendVideoCheck,
	startInterview,
} from '@/store/thunks';
import { createTestAttempt } from '@/store/thunks/interviewFlow/testing/createTestAttempt';
import { fetchVideoInterviewAttempt } from '@/store/thunks/interviewFlow/videoInterview/fetchVideoInterviewAttemptThunk';
import {
	CandidateVideoInterview,
	InterviewSteps,
	PersonalInterviewResponse,
	SendCodeResponse,
	TestAttemptResponse,
	TestingByVacancyResponse,
	TestingQuestion,
	VideoInterviewQuestion,
} from '@/store/types';
import { mapObjectToArray } from '@/utils/mapObjectToArray';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InterviewFlowState {
	startInterviewData: PersonalInterviewResponse | null;

	isLoadingVideoCheck: boolean;
	videoCheckError: boolean;
	videoCheckSuccess: boolean | null;

	currentStep: InterviewSteps;

	candidateId: string;
	candidateInterviewId: string;

	downloadSpeed: string | null;
	uploadSpeed: string | null;

	sendCodeError: boolean;
	sendCodeLoading: boolean;

	// Ошибка на этапе проверки микрофона
	microphoneError: string;

	// Анти-фрод
	devToolsCount: number;
	lostWindowFocusCount: number;
	copyCount: number;

	// Видео-интервью
	videoInterviewQuestions: VideoInterviewQuestion[];
	currentVideoQuestionIdx: number;
	isVideoInterviewAttempt: boolean;
	isVideoInterivewPart: boolean;
	videoInterviewAttemptData: CandidateVideoInterview | null;

	// Тест
	fetchTestingLoading: boolean;
	interviewHasTest: boolean;
	testingInterviewQuestions: TestingQuestion[];
	isTestingPart: boolean;
	isTestingAttempt: boolean;
	currentTestingQuestionIdx: number;
	vacancyTestingData: TestingByVacancyResponse | null;
	testAttemptData: TestAttemptResponse | null;
	attemptTestingAnswersCount: number;
	currentTestQuestion: TestingQuestion | null;

	startInterviewStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
	error: string | null;
}

const initialState: InterviewFlowState = {
	currentStep: InterviewSteps.START,

	downloadSpeed: null,
	uploadSpeed: null,

	startInterviewData: null,
	startInterviewStatus: 'idle',

	candidateId: '',
	candidateInterviewId: '',
	sendCodeError: false,
	sendCodeLoading: true,

	error: null,

	// Ошибка на этапе проверки микрофона
	microphoneError: '',

	// Видео-интервью
	currentVideoQuestionIdx: 0,
	videoInterviewQuestions: [],
	isVideoInterviewAttempt: false,
	isVideoInterivewPart: false,
	videoInterviewAttemptData: null,

	// Анти-фрод
	lostWindowFocusCount: 0,
	devToolsCount: 0,
	copyCount: 0,

	// Тестирование
	fetchTestingLoading: true,
	interviewHasTest: false,
	currentTestQuestion: null,
	vacancyTestingData: null,
	currentTestingQuestionIdx: 0,
	testingInterviewQuestions: [],
	testAttemptData: null,
	attemptTestingAnswersCount: 0,
	isTestingAttempt: false,
	isTestingPart: false,

	isLoadingVideoCheck: false,
	videoCheckError: false,
	videoCheckSuccess: null,
};

export const interviewFlowSlice = createSlice({
	name: 'interviewFlow',
	initialState,
	reducers: {
		clearInterviewFlow(state) {
			state.startInterviewData = null;
			state.startInterviewStatus = 'idle';
			state.error = null;
		},
		setCurrentStep(state, action: PayloadAction<InterviewSteps>) {
			state.currentStep = action.payload;
		},
		setCandidateId(state, action: PayloadAction<string>) {
			state.candidateId = action.payload;
		},
		setInternetSpeed(state, action: PayloadAction<{ upload: string; download: string }>) {
			state.downloadSpeed = action.payload.download;
			state.uploadSpeed = action.payload.upload;
		},
		retryVideoCheck(state) {
			state.isLoadingVideoCheck = false;
			state.videoCheckError = false;
			state.videoCheckSuccess = null;
		},
		// Test
		setNextTestingQuestion(state) {
			state.currentTestingQuestionIdx += 1;
		},
		setIsTestingPart(state, action: PayloadAction<boolean>) {
			state.isTestingPart = action.payload;
		},

		// VideoInterview
		setIsVideoInterviewPart(state, action: PayloadAction<boolean>) {
			state.isVideoInterivewPart = action.payload;
		},
		setNextInterviewQuestion(state) {
			state.currentVideoQuestionIdx += 1;
		},

		// AntiFrod
		incrementLostWindowCount(state) {
			state.lostWindowFocusCount += 1;
		},
		incrementDevToolsCount(state) {
			state.devToolsCount += 1;
		},
		incrementCopyCount(state) {
			state.copyCount += 1;
		},
		setLostWindowCount(state, action: PayloadAction<{ count: number }>) {
			state.lostWindowFocusCount = action.payload.count;
		},
		setDevToolsCount(state, action: PayloadAction<{ count: number }>) {
			state.devToolsCount = action.payload.count;
		},
		setCopyCount(state, action: PayloadAction<{ count: number }>) {
			state.copyCount = action.payload.count;
		},
		setError(state, action: PayloadAction<string>) {
			state.error = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(startInterview.pending, (state) => {
				state.startInterviewStatus = 'loading';
				state.error = null;
			})
			.addCase(
				startInterview.fulfilled,
				(state, action: PayloadAction<PersonalInterviewResponse>) => {
					state.startInterviewStatus = 'succeeded';
					state.startInterviewData = action.payload;
					const videoInterviewQuestions = mapObjectToArray<VideoInterviewQuestion>(
						action.payload?.vacancy_with_interview?.active_interview?.questions || {},
						'questionId'
					);
					state.videoInterviewQuestions = videoInterviewQuestions;
				}
			)
			.addCase(startInterview.rejected, (state, action) => {
				state.startInterviewStatus = 'failed';
				state.error = action.payload as string;
				state.sendCodeError = true;
				state.sendCodeLoading = false;
			})

			// ========== sendCode (отправка кода кандидату) ==========
			.addCase(sendCode.fulfilled, (state, action: PayloadAction<SendCodeResponse>) => {
				state.candidateInterviewId = action.payload.candidate_interview_id;
				state.sendCodeLoading = false;
			})
			.addCase(sendCode.pending, (state) => {
				state.sendCodeLoading = true;
			})
			.addCase(sendCode.rejected, (state) => {
				state.sendCodeError = true;
				state.sendCodeLoading = false;
			})

			// === fetchTestingByVacancy (получение данных о теста по вакансии) ===

			.addCase(fetchTestingByVacancy.fulfilled, (state, action) => {
				state.fetchTestingLoading = false;
				state.vacancyTestingData = action.payload;
				state.testingInterviewQuestions = action.payload.questions;
				state.interviewHasTest = true;
			})
			.addCase(fetchTestingByVacancy.pending, (state) => {
				state.fetchTestingLoading = true;
			})

			.addCase(fetchTestingByVacancy.rejected, (state) => {
				state.interviewHasTest = false;
				state.fetchTestingLoading = false;
			})

			// == createTestAttempt ==

			.addCase(createTestAttempt.fulfilled, (state) => {
				state.isTestingAttempt = true;
			})

			// === fetchTestAttemptsByCandidate ===

			.addCase(
				fetchTestAttemptsByCandidate.fulfilled,
				(state, action: PayloadAction<TestAttemptResponse>) => {
					state.testAttemptData = action.payload;
					state.isTestingAttempt = true;
					state.currentTestingQuestionIdx = action.payload.candidate_answers.length;
				}
			)

			.addCase(fetchTestAttemptsByCandidate.rejected, (state) => {
				state.isTestingAttempt = false;
			})

			// == fetchVideoAttemptByCandidate ==
			.addCase(
				fetchVideoInterviewAttempt.fulfilled,
				(state, action: PayloadAction<CandidateVideoInterview>) => {
					state.videoInterviewAttemptData = action.payload;
					if (action.payload.interview_start) {
						state.isVideoInterviewAttempt = true;
					}
					state.currentVideoQuestionIdx =
						action.payload.state_questions == null ? 0 : Number(action.payload.state_questions) - 1;
				}
			)

			// sendVideoCheck
			.addCase(sendVideoCheck.pending, (state) => {
				state.isLoadingVideoCheck = true;
			})
			.addCase(sendVideoCheck.fulfilled, (state) => {
				state.isLoadingVideoCheck = false;
				state.videoCheckSuccess = true;
			})
			.addCase(sendVideoCheck.rejected, (state, action: PayloadAction<string | undefined>) => {
				state.isLoadingVideoCheck = false;
				state.videoCheckError = true;
				state.videoCheckSuccess = false;
				if (action.payload) {
					state.microphoneError = JSON.parse(action.payload).error;
				}
			});
	},
});

export const {
	clearInterviewFlow,
	setCurrentStep,
	setCandidateId,
	setInternetSpeed,
	retryVideoCheck,
	setError,
} = interviewFlowSlice.actions;

// Селектор на начальные данные
export const selectStartInterviewData = (state: RootState) =>
	state.interviewFlow.startInterviewData;

// Селектор для ошибки микрофона
export const selectMicrophoneError = (state: RootState) => state.interviewFlow.microphoneError;

// Селектор id кандидата
export const selectCandidateId = (state: RootState) => state.interviewFlow.candidateId;

// Селекторы для теста
export const selectCurrentTestQuestionIdx = (state: RootState) =>
	state.interviewFlow.currentTestingQuestionIdx; // Индекс текущего вопроса
export const selectTestingInterviewQuestions = (state: RootState) =>
	state.interviewFlow.testingInterviewQuestions; // Получение вопросов теста
export const selectTestAttemptData = (state: RootState) => state.interviewFlow.testAttemptData; // Данные о попытке теста
export const selectVacancyTestingData = (state: RootState) =>
	state.interviewFlow.vacancyTestingData; // Получение информации о тесте по вакансии
export const selectAttemptTestingAnswersCount = (state: RootState) =>
	state.interviewFlow.attemptTestingAnswersCount; // Количество отвеченых вопросов
export const selectIsTestingAttempt = (state: RootState) => state.interviewFlow.isTestingAttempt; // Была ли попытка теста
export const selectIsTestingPart = (state: RootState) => state.interviewFlow.isTestingPart; // Начат ли тест

// Селекторы для видео-части интервью
export const selectIsVideoInterviewPart = (state: RootState) =>
	state.interviewFlow.isVideoInterivewPart;
export const selectCurrentVideoInterviewQuestionIdx = (state: RootState) =>
	state.interviewFlow.currentVideoQuestionIdx;
export const selectVideoInterviewQuestions = (state: RootState) =>
	state.interviewFlow.videoInterviewQuestions;
export const selectVideoInterviewAttemptData = (state: RootState) =>
	state.interviewFlow.videoInterviewAttemptData;
export const selectIsVideoInterviewAttempt = (state: RootState) =>
	state.interviewFlow.isVideoInterviewAttempt;

// Селекторы для информации о кандидате
export const selectCandidateInterviewId = (state: RootState) =>
	state.interviewFlow.candidateInterviewId;

// Тест actions
export const { setNextTestingQuestion, setIsTestingPart } = interviewFlowSlice.actions;

// Видео-интревью actions
export const { setNextInterviewQuestion, setIsVideoInterviewPart } = interviewFlowSlice.actions;

// Анти-фрод actions
export const {
	incrementCopyCount,
	incrementDevToolsCount,
	incrementLostWindowCount,
	setLostWindowCount,
	setDevToolsCount,
	setCopyCount,
} = interviewFlowSlice.actions;

export default interviewFlowSlice.reducer;
