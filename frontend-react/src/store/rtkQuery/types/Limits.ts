// Ответ получения количества лимитов
export interface FetchLimitsResponse {
	id: string;
	vacancy_root_id: string;
	limit_reviews: number;
	count_reviews: number;
}

// Параметры для увеличения лимитов
export interface IncreaseLimitsParameters {
	increment: number; // На какое количество необходимо увеличить количество лимитов
}

// Параметры для уменьшения лимитов
export interface ReduceLimitsParameters {
	vacancy_id: string;
	refund_limits: 'all' | number;
}

// Ответ, получаемый при уменьшении лимитов
export interface ReduceLimitsResponse {
	message: string;
	task_id: string;
}
