// Функция для получения корневого домена
export const getRootDomain = () => {
	const hostname = window.location.hostname;
	const protocol = window.location.protocol;
	const domain = hostname.split('.').slice(1);

	return `${protocol}//${domain}`;
};
