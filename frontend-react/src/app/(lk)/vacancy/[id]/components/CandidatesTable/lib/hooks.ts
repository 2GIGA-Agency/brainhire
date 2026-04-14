// src/hooks/useSelection.ts
import { useState, useCallback, useEffect, useRef } from 'react';

interface Props {
	length?: number;
}

export function useSelection({ length = 10 }: Props = {}) {
	const [selectedIds, setSelectedIds] = useState<number[]>([]);
	const [isShiftPressed, setIsShiftPressed] = useState(false);
	const lastSelectedIndexRef = useRef<number | null>(null);

	// Используем ref для хранения состояния, чтобы не зависеть от него в useCallback
	const selectedIdsRef = useRef(selectedIds);
	const isShiftPressedRef = useRef(isShiftPressed);

	// Обновляем ref при изменении состояния
	useEffect(() => {
		selectedIdsRef.current = selectedIds;
	}, [selectedIds]);

	useEffect(() => {
		isShiftPressedRef.current = isShiftPressed;
	}, [isShiftPressed]);

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.shiftKey) {
				setIsShiftPressed(true);
			}
		};

		const handleKeyUp = (e: KeyboardEvent) => {
			if (!e.shiftKey) {
				setIsShiftPressed(false);
			}
		};

		window.addEventListener('keydown', handleKeyDown);
		window.addEventListener('keyup', handleKeyUp);

		return () => {
			window.removeEventListener('keydown', handleKeyDown);
			window.removeEventListener('keyup', handleKeyUp);
		};
	}, []);

	// Стабильная функция без зависимостей
	const handleSelect = useCallback((index: number) => {
		const currentSelectedIds = selectedIdsRef.current;
		const currentIsShiftPressed = isShiftPressedRef.current;

		if (!currentIsShiftPressed || lastSelectedIndexRef.current === null) {
			// Обычный выбор
			if (currentSelectedIds.includes(index)) {
				// Снимаем выделение
				setSelectedIds(currentSelectedIds.filter((i) => i !== index));
			} else {
				// Добавляем новый элемент
				setSelectedIds([...currentSelectedIds, index]);
			}
			lastSelectedIndexRef.current = index;
		} else {
			// Выбор диапазона с Shift
			const start = lastSelectedIndexRef.current;
			const end = index;

			const rangeStart = Math.min(start, end);
			const rangeEnd = Math.max(start, end);

			const range: number[] = [];
			for (let i = rangeStart; i <= rangeEnd; i++) {
				range.push(i);
			}

			let newSelectedIds;

			if (!currentSelectedIds.includes(start) && currentSelectedIds.includes(end)) {
				newSelectedIds = currentSelectedIds.filter((i) => !range.includes(i));
			} else {
				newSelectedIds = [...new Set([...currentSelectedIds, ...range])];
			}

			setSelectedIds(newSelectedIds);
			lastSelectedIndexRef.current = index;
		}
	}, []); // Без зависимостей!

	const clearSelection = useCallback(() => {
		setSelectedIds([]);
		lastSelectedIndexRef.current = null;
	}, []);

	const handleSelectAll = useCallback(() => {
		if (selectedIdsRef.current.length === length) {
			clearSelection();
		} else {
			setSelectedIds(Array.from({ length }, (_, i) => i));
		}
	}, [length, clearSelection]); // Длина может меняться при пагинации

	return {
		selectedIds,
		handleSelect,
		handleSelectAll,
		clearSelection,
		isShiftPressed,
	};
}
