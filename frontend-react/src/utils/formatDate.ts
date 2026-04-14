export const formatDate = (isoDate: string): string => {
	if (!isoDate) {
		throw new Error('Invalid date provided');
	}

	// Создаем объект Date из строки ISO 8601
	const date = new Date(isoDate);

	// Проверяем, является ли дата валидной
	if (isNaN(date.getTime())) {
		throw new Error('Invalid date format');
	}

	// Извлекаем год, месяц и день
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0'); // Месяцы начинаются с 0, поэтому добавляем 1
	const day = String(date.getDate()).padStart(2, '0');

	// Возвращаем дату в формате YYYY-MM-DD
	return `${day}.${month}.${year}`;
};

export const formatDateToDateTime = (isoDate: string): string => {
	// Создаем объект Date из строки ISO
	const date = new Date(isoDate);

	// Извлекаем день, месяц, год, часы, минуты и секунды
	const day = String(date.getDate()).padStart(2, '0'); // День с ведущим нулем
	const month = String(date.getMonth() + 1).padStart(2, '0'); // Месяц (нумерация с 0)
	const year = date.getFullYear(); // Год

	const hours = String(date.getHours()).padStart(2, '0'); // Часы
	const minutes = String(date.getMinutes()).padStart(2, '0'); // Минуты
	const seconds = String(date.getSeconds()).padStart(2, '0'); // Секунды

	// Формируем строку в формате DD.MM.YYYY HH:mm:ss
	return `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
};

// Форматирует дату и время в локали ru-RU без секунд.
// Возвращает '—' если значение не задано.
export const formatDateTime = (iso?: string | null): string => {
	if (!iso) return '—';
	const date = new Date(iso);
	if (isNaN(date.getTime())) return '—';
	return date.toLocaleString('ru-RU', {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
		hour: '2-digit',
		minute: '2-digit',
	});
};

// Форматирует дату и время с коротким годом (например, 25 вместо 2025)
// Возвращает '—' если значение не задано
export const formatDateTimeShortYear = (iso?: string | null): string => {
	if (!iso) return '—';
	const date = new Date(iso);
	if (isNaN(date.getTime())) return '—';

	// Форматируем дату с помощью Intl.DateTimeFormat
	const formatter = new Intl.DateTimeFormat('ru-RU', {
		month: '2-digit',
		day: '2-digit',
		hour: '2-digit',
		minute: '2-digit',
	});

	const parts = formatter.formatToParts(date);

	// Получаем компоненты даты
	let day = '';
	let month = '';
	let hour = '';
	let minute = '';

	for (const part of parts) {
		switch (part.type) {
			case 'day':
				day = part.value;
				break;
			case 'month':
				month = part.value;
				break;
			case 'hour':
				hour = part.value;
				break;
			case 'minute':
				minute = part.value;
				break;
		}
	}

	// Получаем короткий год (последние 2 цифры)
	const year = date.getFullYear().toString().slice(-2);

	// Формат: DD.MM.YY HH:mm
	return `${day}.${month}.${year} ${hour}:${minute}`;
};
