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

// ------------------------Попытка тестироавния канидидата--------------------------------

// Определяем интерфейс для ответа кандидата
export interface CandidateAnswer {
    id: number; // Уникальный идентификатор ответа
    attempt: number; // Идентификатор попытки теста
    question: number; // Идентификатор вопроса
    selected_answer: number; // Идентификатор выбранного ответа
    question_text: string; // Текст вопроса
    selected_answer_text: string; // Текст выбранного ответа
    is_correct: boolean; // Флаг правильности ответа
}

// Определяем интерфейс для попытки теста
export interface TestAttempt {
    id: number; // Уникальный идентификатор попытки
    candidate: string; // UUID кандидата
    test: number; // Идентификатор теста
    started_at: string; // Дата и время начала теста (ISO строка)
    finished_at: string; // Дата и время завершения теста (ISO строка)
    score: number; // Общий балл за тест
    candidate_answers: CandidateAnswer[]; // Массив ответов кандидата
}