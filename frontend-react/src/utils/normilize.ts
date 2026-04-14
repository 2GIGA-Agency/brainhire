// Функция для нормализации номера телефона (оставляем только цифры)
export const normalizePhone = (phone: string): string => {
  return phone.replace(/\D/g, '');
};