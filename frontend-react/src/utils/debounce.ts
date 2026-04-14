export function debounce<T extends (...args: any[]) => void>(
	wait: number,
	callback: T,
	immediate = false
) {
	let timeout: ReturnType<typeof setTimeout> | null;

	const debounced = function <U>(this: U, ...args: Parameters<typeof callback>) {
		const later = () => {
			timeout = null;
			if (!immediate) {
				callback.apply(this, args);
			}
		};
		const callNow = immediate && !timeout;

		if (timeout !== null) {
			clearTimeout(timeout);
		}

		timeout = setTimeout(later, wait);

		if (callNow) {
			callback.apply(this, args);
		}
	};

	// Добавляем метод отмены
	debounced.cancel = () => {
		if (timeout !== null) {
			clearTimeout(timeout);
			timeout = null;
		}
	};

	return debounced;
}
