/**
 * Обрезает текст до заданной длины по последнему слову, не разрезая слова.
 * @param {string} text - Исходный текст для обрезки.
 * @param {number} maxLength - Максимальная желаемая длина текста.
 * @returns {string} - Обрезанный текст с многоточием или исходный текст, если он короче maxLength.
 */
export function truncateTextAtWord(text: string, maxLength: number): string {
	// 1. Если текст и так короче или равен лимиту, возвращаем его без изменений.
	if (text.length <= maxLength) {
		return text;
	}

	// 2. Ищем последний пробел в пределах нашей максимальной длины.
	// Мы ищем в подстроке от начала до maxLength.
	const lastSpaceIndex = text.lastIndexOf(' ', maxLength);

	// 3. Определяем, где резать.
	// Если пробел найден (индекс > -1), используем его позицию.
	// Если нет (например, очень длинное первое слово), то придётся резать жёстко по лимиту.
	const cutIndex = lastSpaceIndex > -1 ? lastSpaceIndex : maxLength;

	// 4. Обрезаем строку по найденному индексу.
	const truncatedText = text.substring(0, cutIndex);

	// 5. Добавляем многоточие.
	return truncatedText + '...';
}
