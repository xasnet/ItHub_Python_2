import { Flex } from '@mantine/core';

import { RootLayout } from '@/app/layouts/RootLayout';

import { RegisterForm } from '@/widgets/RegisterForm';

export default function RegisterPage() {
    return (
        <RootLayout>
            <Flex h='100vh' align='center' justify='center'>
                <RegisterForm />
            </Flex>
        </RootLayout>
    );
}
