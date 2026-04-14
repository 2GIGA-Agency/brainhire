/**
 * Склоняет слово в зависимости от числа
 * @param n — число
 * @param titles — массив из трёх форм: [единственное, для 2–4, для остальных]
 */
function declOfNum(n: number, titles: [string, string, string]): string {
  const cases = [2, 0, 1, 1, 1, 2];
  const mod100 = n % 100;
  if (mod100 >= 11 && mod100 <= 14) {
    return titles[2];
  }
  const mod10 = n % 10;
  return titles[cases[mod10 < 5 ? mod10 : 5]];
}

/**
 * Преобразует общее кол-во месяцев в строку «X год(а/лет) Y месяц(ев)»
 * @param totalMonths — количество месяцев
 */
export function formatExperience(totalMonths: number): string {
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;
  const parts: string[] = [];

  if (years > 0) {
    parts.push(`${years} ${declOfNum(years, ['год', 'года', 'лет'])}`);
  }
  if (months > 0) {
    parts.push(`${months} ${declOfNum(months, ['месяц', 'месяца', 'месяцев'])}`);
  }
  // Если вообще 0 месяцев
  if (parts.length === 0) {
    return '0 месяцев';
  }
  return parts.join(' ');
}
