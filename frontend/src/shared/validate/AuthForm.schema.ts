import { z } from 'zod';

export const AuthFormSchema = z.object({
    username: z.string().min(1, 'Обязательное поле'),
    password: z.string().min(1, 'Обязательное поле'),
});

export const RegisterFormSchema = AuthFormSchema.extend({
    confirm: z.string(),
}).superRefine(({ confirm, password }, ctx) => {
    if (confirm !== password) {
        ctx.addIssue({
            code: 'custom',
            message: 'Пароли должны совпадать',
            path: ['confirm'],
        });
    }
});
