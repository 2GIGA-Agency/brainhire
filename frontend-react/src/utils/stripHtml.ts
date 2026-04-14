export function stripHtml(html: string): string {
	// Проверяем, что мы в браузере
	if (typeof window === 'undefined') return html.replace(/<[^>]*>/g, '');

	const doc = new DOMParser().parseFromString(html, 'text/html');
	return doc.body.textContent ?? '';
}
