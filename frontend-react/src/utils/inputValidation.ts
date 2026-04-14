const LETTER_REGEX = /[A-Za-zА-Яа-яЁё]/;

// Разрешаем буквы (ru/en), цифры, пробел, дефис, точку, решетку, плюс, слэш и кавычки.
const MANUAL_INPUT_ALLOWED_CHARS_REGEX = /^[A-Za-z0-9А-Яа-яЁё .#+/"'-]+$/;

/**
 * Нормализует текстовый ввод: сжимает пробелы и обрезает края.
 */
export const normalizeTextInput = (raw: string): string =>
	raw.replace(/\s+/g, ' ').trim();

/**
 * Универсальная валидация ручного текстового ввода.
 * Условия:
 * - не пустая строка;
 * - только разрешенные символы;
 * - есть хотя бы одна буква (не только цифры или спецсимволы).
 */
export const isTextInputValid = (raw: string): boolean => {
	const value = normalizeTextInput(raw);
	if (!value) return false;

	if (!MANUAL_INPUT_ALLOWED_CHARS_REGEX.test(value)) {
		return false;
	}

	// Запрещаем строки без букв (например, только цифры или спецсимволы)
	if (!LETTER_REGEX.test(value)) {
		return false;
	}

	return true;
};
