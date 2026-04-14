const subdomains = ['bh2', 'bh5', 'bh75', 'bh77', 'bh104'];

export function checkSubdomain() {
	if (typeof window === 'undefined') return false;

	const hostname = window.location.hostname;

	// Извлекаем поддомен из hostname
	const parts = hostname.split('.');
	const currentSubdomain = parts.length >= 2 ? parts[0] : '';

	return subdomains.includes(currentSubdomain);
}
