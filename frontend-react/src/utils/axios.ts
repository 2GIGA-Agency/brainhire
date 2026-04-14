import axios, {
	AxiosError,
	AxiosRequestConfig,
	AxiosResponse,
	InternalAxiosRequestConfig,
} from 'axios';

interface FailedRequest {
	resolve: (token: string) => void;
	reject: (error: AxiosError) => void;
}

let isRefreshing = false;
let failedQueue: FailedRequest[] = [];

// Функция обработки очереди запросов, ожидающих обновления токена
const processQueue = (error: AxiosError | null, token: string | null) => {
	failedQueue.forEach((prom) => {
		if (error) {
			prom.reject(error);
		} else if (token) {
			prom.resolve(token);
		}
	});
	failedQueue = [];
};

// Интерсептор запросов: добавляет токен в заголовки
axios.interceptors.request.use(
	(config: InternalAxiosRequestConfig) => {
		const token = localStorage.getItem('access');
		if (token && config.headers) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => Promise.reject(error)
);

// Интерсептор ответов: обновление токена или перенаправление на /login при 401
axios.interceptors.response.use(
	(response: AxiosResponse) => response,
	async (error: AxiosError) => {
		const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

		if (!originalRequest || !originalRequest.url) {
			return Promise.reject(error);
		}

		// Если ошибка при обновлении токена — удаляем токены и отправляем на логин
		if (originalRequest.url.includes('/api/token/refresh/')) {
			localStorage.removeItem('access');
			localStorage.removeItem('refresh');
			if (
				!window.location.href.includes('public') &&
				!window.location.href.includes('login') &&
				!window.location.href.includes('register') &&
				!window.location.href.includes('external')
			) {
				window.location.href = '/login';
			}

			return Promise.reject(error);
		}

		// Если 401 (Unauthorized) и запрос ещё не был повторён
		if (error.response?.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;
			const refreshToken = localStorage.getItem('refresh');

			if (refreshToken) {
				if (isRefreshing) {
					return new Promise((resolve, reject) => {
						failedQueue.push({ resolve, reject });
					})
						.then((token) => {
							if (originalRequest.headers) {
								originalRequest.headers.Authorization = `Bearer ${token}`;
							}
							return axios(originalRequest);
						})
						.catch((err) => Promise.reject(err));
				}

				isRefreshing = true;
				return new Promise((resolve, reject) => {
					axios
						.post('/api/token/refresh/', { refresh: refreshToken })
						.then(({ data }) => {
							// Сохраняем новый access token и обновляем заголовки
							localStorage.setItem('access', data.access);
							localStorage.setItem('refresh', data.refresh);
							axios.defaults.headers.common['Authorization'] = `Bearer ${data.access}`;
							if (originalRequest.headers) {
								originalRequest.headers.Authorization = `Bearer ${data.access}`;
							}
							processQueue(null, data.access);
							resolve(axios(originalRequest));
						})
						.catch((err) => {
							processQueue(err, null);
							localStorage.removeItem('access');
							localStorage.removeItem('refresh');
							if (
								!window.location.href.includes('public') &&
								!window.location.href.includes('login') &&
								!window.location.href.includes('register') &&
								!window.location.href.includes('external')
							) {
								window.location.href = '/login';
							}

							reject(err);
						})
						.finally(() => {
							isRefreshing = false;
						});
				});
			} else {
				// Если refresh token отсутствует, удаляем access и refresh токены и отправляем на логин
				localStorage.removeItem('access');
				localStorage.removeItem('refresh');
				if (
					!window.location.href.includes('public') &&
					!window.location.href.includes('login') &&
					!window.location.href.includes('register') &&
					!window.location.href.includes('external')
				) {
					window.location.href = '/login';
				}
			}
		}

		return Promise.reject(error);
	}
);

export default axios;
