import { z } from 'zod';

export const vacancyResponseSchema = z.object({
	lastName: z
		.string()
		.transform((val) => val.trim()) // Убираем пробелы
		.pipe(z.string().min(1, 'Фамилия обязательна для заполнения')),
	firstName: z
		.string()
		.transform((val) => val.trim()) // Убираем пробелы
		.pipe(z.string().min(1, 'Имя обязательно для заполнения')),
	email: z
		.string()
		.transform((val) => val.trim()) // Убираем пробелы и для email
		.pipe(z.string().email('Введите корректный email')),

	resume: z.array(z.any()).min(1, 'Файл резюме обязателен'),

	privacyPolicy: z.boolean().refine((val) => val === true, {
		message: 'Вы должны принять политику обработки персональных данных',
	}),
	personalDataConsent: z.boolean().refine((val) => val === true, {
		message: 'Вы должны дать согласие на обработку персональных данных',
	}),
});

export type VacancyResponseFormValues = z.infer<typeof vacancyResponseSchema>;
