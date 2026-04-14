// Функция для определения ставки НДС на основе даты создания счета
export const getVatRateByDate = (createdAt: string | Date): number => {
	const date = new Date(createdAt);
	const thresholdDate = new Date('2026-01-01T00:00:00');

	// Если дата создания раньше 01.01.2026 - НДС 20%, иначе 22%
	return date < thresholdDate ? 20 : 22;
};

// Функция для расчета НДС
export const calculateVAT = (summary: number, vatRate: number): number => {
	return parseFloat(((summary * vatRate) / (100 + vatRate)).toFixed(2));
};
