'use client';

import React, { useState, useLayoutEffect, useRef, useCallback } from 'react';

// Эта версия компонента более гибкая и работает с вашим <Typography>
interface ClientClampProps {
	children: string; // Ожидаем только текст
	className?: string;
	as?: React.ElementType; // Позволяем передавать 'as' и другие пропсы
	[key: string]: any; // Для остальных пропсов
}

// Вспомогательная функция для обрезки по последнему слову
function truncateByWord(text: string): string {
	const lastSpaceIndex = text.trimEnd().lastIndexOf(' ');
	if (lastSpaceIndex > -1) {
		return text.substring(0, lastSpaceIndex);
	}
	return ''; // Если пробелов нет, возвращаем пустую строку
}

export const ClientClamp: React.FC<ClientClampProps> = ({
	children,
	as: Component = 'div',
	...props
}) => {
	const [clampedText, setClampedText] = useState(children);
	const elementRef = useRef<HTMLElement>(null);

	const clampText = useCallback(() => {
		const element = elementRef.current;
		if (!element) return;

		// 1. Временно возвращаем полный текст для корректных измерений
		element.innerText = children;

		// 2. Проверяем, есть ли переполнение
		if (element.scrollHeight <= element.clientHeight) {
			setClampedText(children); // Переполнения нет
			return;
		}

		// 3. Если есть, начинаем обрезать по словам
		let fittingText = children;
		while (element.scrollHeight > element.clientHeight && fittingText.length > 0) {
			fittingText = truncateByWord(fittingText);
			// Проверяем с многоточием
			element.innerText = fittingText + '...';
		}

		// 4. Устанавливаем финальный обрезанный текст
		setClampedText(fittingText + '...');
	}, [children]);

	// useLayoutEffect, чтобы избежать "мигания" полного текста
	useLayoutEffect(() => {
		clampText();

		const resizeObserver = new ResizeObserver(clampText);
		if (elementRef.current) {
			resizeObserver.observe(elementRef.current);
		}

		return () => resizeObserver.disconnect();
	}, [clampText]);

	return (
		// Используем тот же тег и пропсы, что и ваш Typography
		<Component ref={elementRef} {...props}>
			{clampedText}
		</Component>
	);
};
