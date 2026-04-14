export function convertHtmlToPlainText(htmlText: string): string {
	return htmlText
		.replace(/<p\b[^>]*>/gi, '') // Удаляем <p> (без замены)
		.replace(/<\/p\b[^>]*>/gi, '\n\n') // </p> → \n\n
		.replace(/<br\s*\/?>/gi, '\n') // <br> → \n
		.replace(/<[^>]+>/g, '') // Удаляем все остальные теги
		.replace(/\n{3,}/g, '\n\n') // Убираем лишние переносы (3+ → 2)
		.trim();
}

export function convertPlainTextToHtml(plainText: string): string {
	return plainText
		.split('\n\n')
		.map((paragraph) => paragraph.trim())
		.filter((paragraph) => paragraph.length > 0)
		.map((paragraph) => `<p>${paragraph.replace(/\n/g, '<br>')}</p>`)
		.join('\n');
}
