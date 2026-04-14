// src/store/slices/vacancyCreation/testingSlice.ts
import { RootState } from '@/store/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Интерфейс для ответа на вопрос
export interface Answer {
    id: number;
    text: string;
    is_correct: boolean;
}

// Интерфейс для вопроса
export interface GeneratedQuestion {
    id: number;
    text: string;
    order: number;
    answers: Answer[];
}

// Интерфейс для теста
export interface Test {
    id: number;
    title: string;
    description: string;
    questions: GeneratedQuestion[];
    vacancy: string;
    vacancy_name: string;
    isGenerating: boolean;
}

// Состояние тестирования
export interface TestingState {
    isTestRequired: boolean; // Флаг необходимости тестирования
    generatedTest: Test | null; // Сгенерированный тест
}

// Начальное состояние
const initialState: TestingState = {
    isTestRequired: false,
    generatedTest: null,
};

// Создание слайса
const testingSlice = createSlice({
    name: 'testing',
    initialState,
    reducers: {
        setIsTestRequired: (state, action: PayloadAction<boolean>) => {
            state.isTestRequired = action.payload;
        },
        setGeneratedTest: (state, action: PayloadAction<Test>) => {
            state.generatedTest = action.payload;
        },
        resetTestingState: (state) => {
            state.isTestRequired = false;
            state.generatedTest = null;
        },
        resetTesting: () => initialState
    }
});

// Экспорт действий и редьюсера
export const { setIsTestRequired, setGeneratedTest, resetTestingState, resetTesting } = testingSlice.actions;
export const selectTesting = (state: RootState) =>
    state.vacancyCreation.testing;
export default testingSlice.reducer;