import { formatNumber } from './formatNumber';

export function paymentFormat(payment = [0,0]) {
	const payment_ot = payment[0];
	const payment_do = payment[1];

	if (payment_ot > 0 && payment_do > 0) {
		return `${formatNumber(payment_ot)} - ${formatNumber(payment_do)} руб.`;
	} else if (payment_ot > 0 && payment_do === 0) {
		return `От ${formatNumber(payment_ot)} руб.`;
	} else if (payment_do > 0 && payment_ot === 0) {
		return `До ${formatNumber(payment_do)} руб.`;
	} else {
		return 'Не указана';
	}
}
