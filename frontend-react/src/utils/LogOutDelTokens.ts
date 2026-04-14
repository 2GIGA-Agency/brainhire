import { redirect } from 'next/navigation';

export function logOutAndClearTokens(): void {
    // Удаляем access и refresh токены из localStorage
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    
    // Редирект на страницу логина
    redirect('/login');
}