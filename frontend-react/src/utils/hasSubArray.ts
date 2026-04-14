export function hasSubarray(mainArray: any[], subarray: any[]) {
	if (!Array.isArray(mainArray) || !Array.isArray(subarray)) {
		return false; // Обработка некорректных входных данных
	}

	if (subarray.length === 0) {
		return true; // Пустой подмассив всегда присутствует
	}

	if (subarray.length > mainArray.length) {
		return false; // Подмассив не может быть длиннее основного массива
	}

	for (let i = 0; i <= mainArray.length - subarray.length; i++) {
		const slice = mainArray.slice(i, i + subarray.length);
		if (slice.length === subarray.length && slice.every((val, index) => val === subarray[index])) {
			return true; // Подмассив найден
		}
	}

	return false; // Подмассив не найден
}
