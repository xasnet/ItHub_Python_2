import { Flex } from '@mantine/core';

import { RootLayout } from '@/app/layouts/RootLayout';

import { AuthForm } from '@/widgets';

export default function LoginPage() {
    return (
        <RootLayout>
            <Flex h='100vh' align='center' justify='center'>
                <AuthForm />
            </Flex>
        </RootLayout>
    );
}
