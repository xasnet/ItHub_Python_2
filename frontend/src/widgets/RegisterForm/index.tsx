import { Link, useNavigate } from 'react-router-dom';
import { Button, PasswordInput, Stack, TextInput } from '@mantine/core';
import { zodResolver } from '@mantine/form';
import { notifications } from '@mantine/notifications';

import { useSendRegistrationMutation } from '@/shared/services/RegistrationService';
import { isUserAlreadyExists } from '@/shared/types/type-guards/isUserAlreadyExists';
import { RegisterFormSchema } from '@/shared/validate/AuthForm.schema.ts';

import {
    RegisterFormProvider,
    useRegisterForm,
    useShowPassword,
} from '@/widgets/RegisterForm/model/useRegisterForm.ts';

export const RegisterForm = () => {
    const navigate = useNavigate();
    const [register] = useSendRegistrationMutation();
    const [isPasswordShown, { set: setIsPasswordShown }] = useShowPassword();
    const form = useRegisterForm({
        mode: 'uncontrolled',
        initialValues: {
            username: '',
            password: '',
            confirm: '',
        },
        validate: zodResolver(RegisterFormSchema),
    });

    const onSubmit = form.onSubmit(async (values) => {
        const { password, username } = values;
        try {
            await register({ password, username }).unwrap();
            navigate('/login');
        } catch (error) {
            if (error instanceof Error) {
                console.error(error);
            }
            if (isUserAlreadyExists(error)) {
                notifications.show({
                    title: 'Произошла ошибка',
                    message: error?.data.username[0],
                });
            }
        }
    });

    return (
        <RegisterFormProvider form={form}>
            <Stack gap={12}>
                <form onSubmit={onSubmit}>
                    <Stack miw='420' gap={12}>
                        <TextInput
                            autoFocus
                            {...form.getInputProps('username')}
                            placeholder='Введите имя пользователя'
                        />
                        <PasswordInput
                            {...form.getInputProps('password')}
                            withAsterisk
                            placeholder='Введите пароль'
                            visible={isPasswordShown}
                            onVisibilityChange={setIsPasswordShown}
                        />
                        <PasswordInput
                            {...form.getInputProps('confirm')}
                            withAsterisk
                            placeholder='Повторите пароль'
                            visible={isPasswordShown}
                            onVisibilityChange={setIsPasswordShown}
                        />
                        <Button type='submit'>Зарегистрироваться</Button>
                    </Stack>
                </form>
                <Button variant='light' component={Link} to='/login'>
                    Войти
                </Button>
            </Stack>
        </RegisterFormProvider>
    );
};
