export interface Invoice {
	created_at: string; // Дата и время создания в формате ISO 8601
	creator: number; // ID создателя
	creator_full_name: string; // Полное имя создателя
	id: string; // Уникальный идентификатор платежа
	nds: string; // Сумма НДС (в виде строки)
	paid_at: string | null; // Дата и время оплаты в формате ISO 8601
	price_total: string; // Общая сумма платежа (в виде строки)
	receiver: string; // ID получателя (UUID)
	receiver_inn: number; // ИНН получателя
	service_name: string; // Название услуги
	status: string;
	token_amount: number; // Количество токенов
	token_price: string; // Цена одного токена (в виде строки)
}
