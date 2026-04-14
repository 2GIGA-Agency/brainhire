// src/utils/useTruncateByHeight.ts

import { useState, useLayoutEffect, RefObject, useCallback } from 'react';

/**
 * Хук для обрезки текста по высоте контейнера.
 * Он отслеживает, переполняет ли текст контейнер, и если да,
 * обрезает его по словам до тех пор, пока он не поместится, добавляя многоточие.
 *
 * @param ref - React-ref на HTML-элемент, содержащий текст.
 * @param originalText - Исходный, полный текст для отображения.
 * @returns {string} - Обрезанный или полный текст, готовый к отображению.
 */
export function useTruncateByHeight(ref: RefObject<HTMLElement>, originalText: string): string {
	const [truncatedText, setTruncatedText] = useState(originalText);

	// useCallback мемоизирует функцию, чтобы она не создавалась заново при каждом рендере
	const truncate = useCallback(() => {
		const element = ref.current;
		if (!element) {
			return;
		}

		// 1. ВРЕМЕННО возвращаем полный текст в DOM, чтобы правильно измерить его высоту.
		// Это важно для случаев, когда контейнер увеличивается в размере (например, при ресайзе).
		element.innerText = originalText;

		// 2. Проверяем, есть ли переполнение. Если нет, то ничего не делаем.
		// Добавляем небольшой запас (>=), чтобы избежать погрешностей округления в некоторых браузерах.
		if (element.scrollHeight <= element.clientHeight) {
			setTruncatedText(originalText);
			return;
		}

		// 3. Если есть переполнение, начинаем обрезку.
		const words = originalText.split(' ');
		let newText = originalText;

		// Удаляем по одному слову с конца, пока текст не поместится.
		// Прямая манипуляция innerText для измерения - самый быстрый способ.
		while (element.scrollHeight > element.clientHeight && words.length > 0) {
			words.pop();
			newText = words.join(' ') + '...';
			element.innerText = newText;
		}

		// 4. Обновляем состояние React окончательным результатом ОДИН раз.
		setTruncatedText(newText);
	}, [originalText, ref]);

	useLayoutEffect(() => {
		// Запускаем функцию при монтировании и при изменении входных данных
		truncate();

		// Добавляем слушатель на изменение размера окна
		window.addEventListener('resize', truncate);

		// Обязательно очищаем слушатель
		return () => {
			window.removeEventListener('resize', truncate);
		};
		// ИСПРАВЛЕННЫЙ МАССИВ ЗАВИСИМОСТЕЙ
	}, [truncate]); // Теперь зависимость - это сама функция truncate

	return truncatedText;
}
