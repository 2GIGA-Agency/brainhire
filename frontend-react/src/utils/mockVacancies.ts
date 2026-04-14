import { v4 as uuidv4 } from 'uuid'; // Для генерации уникальных ID

export interface Idded {
	id: string;
[key: string]: string;
}

// Функция для генерации случайных дат
function getRandomDate(start: Date, end: Date): string {
	return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
		.toISOString()
		.split('T')[0];
}

// Функция для генерации случайных чисел
function getRandomInt(min: number, max: number): number {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Функция для генерации случайных имен
function getRandomName(): string {
	const names = ['Иван', 'Петр', 'Сидор', 'Алексей', 'Дмитрий', 'Мария', 'Анна', 'Елена', 'Ольга'];
	return names[Math.floor(Math.random() * names.length)];
}

/**
 * Функция для генерации моковых данных
 * @param count - Количество вакансий
 * @param headers - Массив заголовков
 * @param actions - Доступные действия (опционально)
 * @returns Массив объектов типа Idded[]
 */
export function generateMockData(count: number, headers: string[]): Idded[] {
	const rows: Idded[] = [];
	for (let i = 0; i < count; i++) {
		const row: Idded = { id: uuidv4() };
		headers.forEach((header) => {
			switch (header) {
				case 'Дата создания':
					row[header] = getRandomDate(new Date(2022, 0, 1), new Date());
					break;
				case 'Название вакансии':
					row[header] = `Вакансия ${getRandomInt(1, 100)}`;
					break;
				case 'Компания':
					row[header] = `Компания ${getRandomInt(1, 50)}`;
					break;
				case 'Кандидаты':
					row[header] = getRandomInt(0, 50).toString(); // Преобразуем число в строку
					break;
				case 'Кандитаты 7+':
					row[header] = getRandomInt(0, 10).toString(); // Преобразуем число в строку
					break;
				case 'Дней в работе':
					row[header] = getRandomInt(1, 100).toString(); // Преобразуем число в строку
					break;
				case 'Создатель':
					row[header] = `${getRandomName()} ${getRandomName()}ов`;
					break;
			}
		});
		rows.push(row);
	}
	return rows;
}
