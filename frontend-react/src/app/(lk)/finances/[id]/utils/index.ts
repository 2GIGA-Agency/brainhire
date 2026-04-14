import { convert } from 'number-to-words-ru';

export const formatNumber = (value: number) => {
	return new Intl.NumberFormat('ru-RU').format(value);
};

export const formatPrice = (price: number) => {
	if (price == null) return '--';
	return new Intl.NumberFormat('ru-RU', {
		style: 'currency',
		currency: 'RUB',
	}).format(price);
};

export const convertToWords = (num: number) => {
	const result = convert(num);
	return result.replace('00 копеек', 'ноль копеек');
};
