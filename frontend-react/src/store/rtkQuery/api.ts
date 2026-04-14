import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import axios from '@/utils/axios';
import {
	CandidateOverview,
	ExternalCandidateOverview,
} from '@/app/(lk)/vacancy/[id]/[candidateId]/types/types';
import {
	DeleteMessageResponse,
	GetChatResponse,
	GetChatsQueryParams,
	GetChatsResponse,
	GetUnreadCountQueryParams,
	GetUnreadCountResponse,
	MarkMessagesAsViewedResponse,
	MessageOut,
	SendMessageRequest,
	SendMessageResponse,
	GetVacanciesResponse,
} from '@/types/Chat';
import { Comment, SendCommentParameters } from './types/Comments';
import { Test, TestAttempt } from './types/Test';
import { Company } from '../types';
import {
	PublicCandidatesOrdering,
	PublicPaginatedCandidatesResponse,
	PublicVacancyResponse,
} from './types/PublicPages';
import { DomainsResponse } from './types/Domains';
import { DefaultPatternsResponse } from './types/Patterns';
import { FetchLimitsResponse, ReduceLimitsParameters, ReduceLimitsResponse } from './types/Limits';
import { ActiveHHVacanciesResponse, VacancyCheckStatusResponse } from './types/ActiveHHVacancies';
import { Vacancy } from '@/app/(lk)/vacancy/[id]/types';
import { CandidatesResponse, GetCandidatesParams } from './types/Candidates';
import { IVacanciesParams, IVacanciesResponse } from './types/Vacancies';
import { CandidateBotSession, BotConversationMessage,GetChatMessagesParams,GetChatMessagesResponse } from '@/store/types/BotGateway';

export interface Profile {
	first_name: string;
	last_name: string;
	email: string;
	middle_name: string;
	phone: string;
	professional_role: string;
	hh_status: boolean;
	avito_status: boolean;
	date_joined: string;
	user_photo: string;
	photo_url: string;
	hh_burned_token: boolean;
	tips: boolean;
	tutorial: boolean;
}

interface Wallet {
	id: string;
	name: string;
	balance_token: number;
	created_at: string;
}

export interface BulkActionParams {
	vacancyRootId: string;
	action: 'delete' | 'invite' | 'reject'; 
	candidate_ids: string[];
}

export interface BulkActionResponse {
	overall_status: string;
	summary: { total: number; processed: number; skipped: number; errors: number };
	results: any[];
}

import { AxiosRequestConfig } from 'axios'; // Убедитесь, что импортировали тип

// Приватная функция-обертка, которая выполняет запрос и обрабатывает ошибки
// Она не будет экспортироваться из файла
async function axiosRequestWrapper<ResultType>(axiosConfig: AxiosRequestConfig) {
	try {
		const response = await axios(axiosConfig);
		return { data: response.data as ResultType };
	} catch (error: any) {
		return {
			error: {
				status: error.response?.status,
				data: error.response?.data,
			},
		};
	}
}

/**
 * Создает queryFn для RTK Query, где URL задается вручную:
 * либо как статическая строка,createManualQueryFn либо формируется функцией-билдером.
 *
 * Эта функция НЕ добавляет query-параметры автоматически.
 * Вы полностью контролируете конечный URL.
 */
export const createManualQueryFn =
	<ResultType, ParamsType = void>(
		method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
		urlOrUrlBuilder: string | ((params: ParamsType) => string)
	) =>
	async (params?: ParamsType) => {
		let finalUrl: string;

		// Определяем URL в зависимости от того, передана строка или функция
		if (typeof urlOrUrlBuilder === 'function') {
			finalUrl = params ? urlOrUrlBuilder(params) : (urlOrUrlBuilder as any)();
		} else {
			finalUrl = urlOrUrlBuilder;
		}

		// Для POST/PUT запросов параметры становятся телом запроса
		const requestData = method === 'POST' || method === 'PUT' ? params : undefined;

		return axiosRequestWrapper<ResultType>({
			method,
			url: finalUrl,
			data: requestData,
		});
	};

/**
 * Создает queryFn для RTK Query, который принимает базовый URL
 * и автоматически преобразует все параметры в query string (search params).
 *
 * Идеально для простых GET-запросов к коллекциям с фильтрацией/пагинацией.
 */
export const createSearchQueryFn =
	<ResultType, ParamsType = void>(method: 'GET' | 'POST' | 'PUT' | 'DELETE', baseUrl: string) =>
	async (params?: ParamsType) => {
		let finalUrl = baseUrl;
		let requestData: any = undefined;

		if (method === 'GET' || method === 'DELETE') {
			if (params) {
				const searchParams = new URLSearchParams();
				for (const key in params) {
					if (Object.prototype.hasOwnProperty.call(params, key)) {
						const value = params[key as keyof ParamsType];
						if (Array.isArray(value)) {
							value.forEach((item) => {
								if (item !== null && item !== undefined) {
									searchParams.append(key, String(item));
								}
							});
						} else if (value !== undefined && value !== null) {
							searchParams.append(key, String(value));
						}
					}
				}
				const serializedParams = searchParams.toString();
				if (serializedParams) {
					finalUrl = `${finalUrl}?${serializedParams}`;
				}
			}
		} else {
			requestData = params;
		}

		return axiosRequestWrapper<ResultType>({
			method,
			url: finalUrl,
			data: requestData,
		});
	};

// Хелпер для запросов, где часть параметров идет в URL, а часть в тело
const createAxiosQueryWithSeparateParams = <T, K extends { [key: string]: any }>(
	method: 'POST' | 'PUT' | 'DELETE',
	urlBuilder: string | ((params: K) => string), // Принимаем и строку, и функцию
	bodyParamsExtractor: (params: K) => any
) => {
	return async (params: K): Promise<{ data: T } | { error: { status: number; data: any } }> => {
		try {
			const finalUrl = typeof urlBuilder === 'function' ? urlBuilder(params) : urlBuilder;
			const response = await axios({
				method,
				url: finalUrl,
				data: bodyParamsExtractor(params),
			});
			return { data: response.data };
		} catch (e) {
			return {
				error: {
					status: (e as any)?.response?.status || 500,
					data: (e as any)?.response?.data || 'An error occurred',
				},
			};
		}
	};
};

const mapAxiosError = (error: any) => ({
	status: error?.response?.status || 500,
	data: error?.response?.data || 'An error occurred',
});

export const brainApi = createApi({
	reducerPath: 'brainApi',
	baseQuery: fetchBaseQuery(),
	tagTypes: [
		'Comments',
		'Companies',
		'Limits',
		'ChatList',
		'ChatMessages',
		'Profile',
		'Candidates',
		'BotSession',
		'Vacancies',
	],
	endpoints: (build) => ({
		getProfile: build.query<Profile, void>({
			queryFn: createManualQueryFn<Profile>('GET', '/api/profiles/'),
			providesTags: ['Profile'],
		}),
		getWallet: build.query<Wallet[], void>({
			queryFn: createManualQueryFn<Wallet[]>('GET', '/api/finance/wallet/'),
		}),

		getCompanies: build.query<Company[], void>({
			queryFn: createManualQueryFn<Company[]>('GET', `/api/companies/`),
			providesTags: ['Companies'],
		}),
		createCompany: build.mutation<Company, { company_description: string; inn: string }>({
			queryFn: createManualQueryFn<Company, { company_description: string; inn: string }>(
				'POST',
				`/api/companies`
			),
			invalidatesTags: ['Companies'],
		}),

		getCandidateOverview: build.query<CandidateOverview, { candidateId: string }>({
			queryFn: createManualQueryFn<CandidateOverview, { candidateId: string }>(
				'GET',
				(params) => `/api/candidates/${params.candidateId}`
			),
		}),

		getBotSessionByCandidate: build.query<CandidateBotSession, { candidateId: string }>({
			queryFn: createManualQueryFn<CandidateBotSession, { candidateId: string }>(
				'GET',
				(params) => `/api/bot-gateway/control/result?candidate_id=${params.candidateId}`
			),
			providesTags: ['BotSession'],
			keepUnusedDataFor: 30,
		}),

		getChatMessages: build.query<GetChatMessagesResponse, GetChatMessagesParams>({
			// createSearchQueryFn автоматически превратит объект params в строку запроса:
			// ?topic_id=...&page=1&page_size=100
			queryFn: createSearchQueryFn<GetChatMessagesResponse, GetChatMessagesParams>(
				'GET',
				'/api/chat-hh/messages'
			),
			providesTags: (_result, _error, { topic_id }) => [
				{ type: 'ChatMessages', id: topic_id }
			],
			keepUnusedDataFor: 1,
		}),

		getExternalCandidateOverview: build.query<ExternalCandidateOverview, { candidateId: string }>({
			queryFn: createManualQueryFn<ExternalCandidateOverview, { candidateId: string }>(
				'GET',
				(params) => `/api/candidates/${params.candidateId}/public/feedback/`
			),
		}),

		getLimits: build.query<FetchLimitsResponse, { vacancyRootId: string }>({
			queryFn: createManualQueryFn<FetchLimitsResponse, { vacancyRootId: string }>(
				'GET',
				(params) => `/api/vacancies/limits/${params.vacancyRootId}/`
			),
			providesTags: ['Limits'],
			keepUnusedDataFor: 1,
		}),
		increaseLimits: build.mutation<
			FetchLimitsResponse,
			{ vacancyRootId: string; increment: number }
		>({
			queryFn: createAxiosQueryWithSeparateParams<
				FetchLimitsResponse,
				{ vacancyRootId: string; increment: number }
			>(
				'POST',
				(params) => `/api/vacancies/limits/${params.vacancyRootId}/increase/`,
				(params) => ({ increment: params.increment })
			),
			invalidatesTags: ['Limits'],
		}),
		refundLimits: build.mutation<ReduceLimitsResponse, ReduceLimitsParameters>({
			queryFn: createAxiosQueryWithSeparateParams<ReduceLimitsResponse, ReduceLimitsParameters>(
				'POST',
				`/api/vacancies/limits/refund_limits/`,
				(params) => ({ vacancy_id: params.vacancy_id, refund_limits: params.refund_limits })
			),
		}),

		getPublicVacancy: build.query<PublicVacancyResponse, { vacancyId: string }>({
			query: ({ vacancyId }) => `/api/vacancies/public/${vacancyId}`,
		}),

		getPublicCandidatesList: build.query<
			PublicPaginatedCandidatesResponse,
			{ vacancyRootId: string; ordering?: PublicCandidatesOrdering; page?: number }
		>({
			query: ({ vacancyRootId, ordering, page }) => ({
				url: `/api/candidates/public/vacancies/${vacancyRootId}/`,
				params: {
					ordering,
					page,
				},
			}),
		}),

		getPublicCandidateOverview: build.query<CandidateOverview, { candidateId: string }>({
			query: ({ candidateId }) => `/api/candidates/${candidateId}/public/interview`,
		}),

		getCommentsByCandidate: build.query<Comment[], { candidateId: string }>({
			queryFn: createManualQueryFn<Comment[], { candidateId: string }>(
				'GET',
				(params) => `/api/candidates/comments/by_candidate/${params.candidateId}`
			),
			providesTags: ['Comments'],
		}),

		sendCommentByCandidate: build.mutation<SendCommentParameters, SendCommentParameters>({
			queryFn: createManualQueryFn<SendCommentParameters, SendCommentParameters>(
				'POST',
				`/api/candidates/comments/`
			),
			invalidatesTags: ['Comments'],
		}),

		getTestByVacancyId: build.query<Test, { vacancyId: string }>({
			queryFn: createManualQueryFn<Test, { vacancyId: string }>(
				'GET',
				(params) => `/api/testing/tests/by_vacancy/${params.vacancyId}`
			),
		}),
		getTestAttemptByCandidate: build.query<TestAttempt, { candidateId: string }>({
			queryFn: createManualQueryFn<TestAttempt, { candidateId: string }>(
				'GET',
				(params) => `/api/testing/test_attempts/by_candidate/${params.candidateId}`
			),
		}),

		getDomains: build.query<DomainsResponse, void>({
			query: () => '/api/select_domain/',
		}),

		getPatterns: build.query<DefaultPatternsResponse, void>({
			queryFn: createManualQueryFn<DefaultPatternsResponse>(
				'GET',
				`/api/vacancies/templates/messages/`
			),
		}),

		getActiveHhVacancies: build.query<ActiveHHVacanciesResponse, void>({
			queryFn: createManualQueryFn<ActiveHHVacanciesResponse>(
				'GET',
				'/api/hh/vacancy/get_active_hh_vacancies/'
			),
		}),

		getVacancyDataById: build.query<Vacancy, { vacancyId: string }>({
			queryFn: createManualQueryFn<Vacancy, { vacancyId: string }>(
				'GET',
				(params) => `/api/vacancies/${params.vacancyId}`
			),
		}),

		getVacancyCheckStatus: build.query<VacancyCheckStatusResponse, { vacancyRootId: string }>({
			queryFn: createManualQueryFn<VacancyCheckStatusResponse, { vacancyRootId: string }>(
				'GET',
				(params) => `/api/hh/vacancy/check_creation/${params.vacancyRootId}`
			),
			keepUnusedDataFor: 1,
		}),

		getExternalVacancyData: build.query<any, string>({
			query: (vacancyId) => `/api/vacancies/external/${vacancyId}/`,
		}),

		getChats: build.query<GetChatsResponse, GetChatsQueryParams | void>({
			queryFn: createSearchQueryFn<GetChatsResponse, GetChatsQueryParams>(
				'GET',
				'/api/chat-hh/chats'
			),

			providesTags: (result) =>
				result?.items
					? [
							{ type: 'ChatList' as const, id: 'LIST' },
							...result.items.map((item) => ({ type: 'ChatList' as const, id: item.topic_id })),
						]
					: [{ type: 'ChatList' as const, id: 'LIST' }],
		}),

		getBotMessagesBySession: build.query<BotConversationMessage[], { sessionId: string }>({
			queryFn: createManualQueryFn<BotConversationMessage[], { sessionId: string }>(
				'GET',
				(params) => `/api/bot-gateway/messages/?session_id=${params.sessionId}`
			),
			providesTags: ['BotSession'],
		}),

		getChat: build.query<GetChatResponse, { topicId: string }>({
			queryFn: createManualQueryFn<GetChatResponse, { topicId: string }>(
				'GET',
				(params) => `/api/chat-hh/chats/${params.topicId}/`
			),
			providesTags: (_result, _error, { topicId }) => [{ type: 'ChatMessages', id: topicId }],
			keepUnusedDataFor: 1,
		}),

		sendMessage: build.mutation<SendMessageResponse, SendMessageRequest>({
			queryFn: createManualQueryFn<SendMessageResponse, SendMessageRequest>(
				'POST',
				'/api/chat-hh/messages/send/'
			),
			async onQueryStarted({ topic_id, text }, { dispatch, queryFulfilled }) {
				try {
					const { data: response } = await queryFulfilled;

					dispatch(
						brainApi.util.updateQueryData('getChat', { topicId: topic_id }, (draft) => {
							const newMessage: MessageOut = {
								id: response.message_id ?? Date.now(),
								topic_id: topic_id,
								text: text,
								created_at: new Date().toISOString(),
								direction: 'employer',
								delivery_status: response.status === 'queued' ? 'pending' : response.status,
								created_by: 'brain',
								tenant: '',
								hh_message_id: '',
								attachments_json: null,
								brain_read: true,
								brain_read_at: null,
								delivery_error: null,
								can_delete: false,
							};
							draft.push(newMessage);
						})
					);
				} catch (err) {
					console.error('Failed to send message:', err);
				}
			},
			invalidatesTags: (_result, _error, { topic_id }) => [
				{ type: 'ChatList', id: topic_id },
				{ type: 'ChatList', id: 'LIST' },
			],
		}),

		markMessagesAsViewed: build.mutation<MarkMessagesAsViewedResponse, { topicId: string }>({
			queryFn: async ({ topicId }) => {
				try {
					const response = await axios.put<MarkMessagesAsViewedResponse>(
						`/api/chat-hh/chats/${topicId}/messages/viewed/`
					);
					return { data: response.data };
				} catch (error) {
					return { error: mapAxiosError(error) };
				}
			},
			invalidatesTags: (_result, _error, { topicId }) => [
				{ type: 'ChatList', id: topicId },
				{ type: 'ChatList', id: 'LIST' },
			],
		}),

		getUnreadCount: build.query<GetUnreadCountResponse, GetUnreadCountQueryParams | void>({
			queryFn: createManualQueryFn<GetUnreadCountResponse, GetUnreadCountQueryParams>(
				'GET',
				'/api/chat-hh/chats/unread_count'
			),
		}),

		deleteMessage: build.mutation<DeleteMessageResponse, { messageId: number; topicId: string }>({
			queryFn: createManualQueryFn<DeleteMessageResponse, { messageId: number }>(
				'DELETE',
				(params) => `/api/chat-hh/messages/${params.messageId}`
			),
			async onQueryStarted({ messageId, topicId }, { dispatch, queryFulfilled }) {
				const patchResult = dispatch(
					brainApi.util.updateQueryData('getChat', { topicId: topicId }, (draft) => {
						const index = draft.findIndex((msg) => msg.id === messageId);
						if (index !== -1) {
							draft.splice(index, 1);
						}
					})
				);
				try {
					await queryFulfilled;
				} catch {
					patchResult.undo();
				}
			},
		}),

		getVacanciesForChat: build.query<GetVacanciesResponse, void>({
			queryFn: createManualQueryFn<GetVacanciesResponse>('GET', `/api/chat-hh/vacancies`),
		}),

		getCandidates: build.query<CandidatesResponse, GetCandidatesParams>({
			queryFn: createManualQueryFn<CandidatesResponse, GetCandidatesParams>(
				'GET',
				// Мы сами строим и путь, и query string
				(params) => {
					const { vacancyRootId, ...queryParams } = params;
					const searchParams = new URLSearchParams(
						queryParams as Record<string, string>
					).toString();

					const baseUrl = `/api/candidates/vacancy_root_id/${vacancyRootId}/`;
					return searchParams ? `${baseUrl}?${searchParams}` : baseUrl;
				}
			),
			providesTags: (result, error, { vacancyRootId }) => [
				{ type: 'Candidates', id: vacancyRootId },
			],
			keepUnusedDataFor: 1,
		}),

		getVacancies: build.query<IVacanciesResponse, IVacanciesParams>({
			queryFn: createManualQueryFn<IVacanciesResponse, IVacanciesParams>(
				'GET',
				(params) => `/api/vacancies?is_archived=${params.is_archived}`
			),
			providesTags: (result) =>
				result
					? [
							...result.map(({ id }) => ({ type: 'Vacancies' as const, id })),
							{ type: 'Vacancies', id: 'LIST' },
						]
					: [{ type: 'Vacancies', id: 'LIST' }],
		}),

		cloneVacancy: build.mutation<void, { vacancy_id: string; company_id: string }>({
			queryFn: createManualQueryFn<void, { vacancy_id: string; company_id: string }>(
				'POST',
				`/api/vacancies/create_duplicate_vacancy/`
			),
			invalidatesTags: [{ type: 'Vacancies', id: 'LIST' }], // После клонирования обновляем весь список
		}),

		archiveVacancy: build.mutation<void, { vacancy_id: string }>({
			queryFn: createManualQueryFn<void, { vacancy_id: string }>(
				'DELETE',
				(params) => `/api/vacancies/${params.vacancy_id}/`
			),
			invalidatesTags: [{ type: 'Vacancies', id: 'LIST' }],
		}),

		unarchiveVacancy: build.mutation<void, { vacancy_id: string }>({
			queryFn: createManualQueryFn<void, { vacancy_id: string }>(
				'PATCH',
				(params) => `/api/vacancies/unarchive_vacancy/${params.vacancy_id}/`
			),
			invalidatesTags: [{ type: 'Vacancies', id: 'LIST' }],
		}),

		bulkCandidatesAction: build.mutation<BulkActionResponse, BulkActionParams>({
            queryFn: createAxiosQueryWithSeparateParams<BulkActionResponse, BulkActionParams>(
                'POST',
                (params) => `/api/candidates/vacancy/${params.vacancyRootId}/bulk-actions/`,
                (params) => ({
                    action: params.action,
                    candidate_ids: params.candidate_ids,
                })
            ),
            // Инвалидируем тег Candidates, чтобы таблица обновилась сама после удаления
            invalidatesTags: (result, error, { vacancyRootId }) => [
                { type: 'Candidates', id: vacancyRootId },
            ],
        }),
	}),
});

// Экспортируем хуки для использования в компонентах
// GET
export const {
	useGetProfileQuery,
	useGetWalletQuery,
	useGetCandidateOverviewQuery,
	useGetBotSessionByCandidateQuery,
	useGetChatMessagesQuery,
	useGetBotMessagesBySessionQuery,
	useGetCommentsByCandidateQuery,
	useGetTestByVacancyIdQuery,
	useGetTestAttemptByCandidateQuery,
	useGetCompaniesQuery,
	useGetExternalCandidateOverviewQuery,
	useGetPublicCandidateOverviewQuery,
	useGetPublicVacancyQuery,
	useGetPublicCandidatesListQuery,
	useGetDomainsQuery,
	useGetPatternsQuery,

	useGetLimitsQuery,
	useIncreaseLimitsMutation,
	useRefundLimitsMutation,

	useGetActiveHhVacanciesQuery,
	useGetVacancyDataByIdQuery,
	useGetVacancyCheckStatusQuery,
	useGetExternalVacancyDataQuery,
	useGetChatsQuery,
	useLazyGetChatsQuery,
	useGetChatQuery,
	useGetUnreadCountQuery,
	useGetVacanciesForChatQuery,
	useGetCandidatesQuery,

	useGetVacanciesQuery,
	useCloneVacancyMutation,
	useArchiveVacancyMutation,
	useUnarchiveVacancyMutation,

	useBulkCandidatesActionMutation,
} = brainApi;
// POST
export const {
	useSendCommentByCandidateMutation,
	useCreateCompanyMutation,
	useMarkMessagesAsViewedMutation,
	useSendMessageMutation,
	useDeleteMessageMutation,
} = brainApi;
