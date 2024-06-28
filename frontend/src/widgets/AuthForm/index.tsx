import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, PasswordInput, Stack, TextInput } from '@mantine/core';
import { zodResolver } from '@mantine/form';

import { setAuthorization, useSignInMutation } from '@/shared/services/AuthorizeService';
import { STORAGE } from '@/shared/services/StorageService';
import { AuthFormSchema } from '@/shared/validate/AuthForm.schema.ts';

import { AuthFormProvider, useRegisterForm } from '@/widgets/AuthForm/model/useAuthForm.ts';

export const AuthForm = () => {
    const navigate = useNavigate();
    const [signIn, { data }] = useSignInMutation();
    const form = useRegisterForm({
        mode: 'uncontrolled',
        initialValues: {
            username: '',
            password: '',
        },
        validate: zodResolver(AuthFormSchema),
    });
    const onSubmit = form.onSubmit(async (values) => {
        try {
            await signIn(values).unwrap();
        } catch (e) {
            console.log(e);
            setAuthorization(false);
        }
    });

    useEffect(() => {
        if (!data) return;
        STORAGE.setToken(data.access);
        STORAGE.setRefreshToken(data.refresh);
        setAuthorization(true);
        navigate('/');
    }, [data]);

    return (
        <AuthFormProvider form={form}>
            <Stack miw={420} gap={12}>
                <form onSubmit={onSubmit} style={{ display: 'grid', gap: 12 }}>
                    <TextInput autoFocus {...form.getInputProps('username')} placeholder='Введите имя пользователя' />
                    <PasswordInput {...form.getInputProps('password')} placeholder='Введите пароль' />
                    <Button type='submit'>Войти</Button>
                </form>
                <Button variant='light' component={Link} to='/register'>
                    Регистрация
                </Button>
            </Stack>
        </AuthFormProvider>
    );
};
