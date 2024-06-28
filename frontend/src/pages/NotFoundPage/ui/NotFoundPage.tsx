import { Link } from 'react-router-dom';
import { Button, Flex, Title } from '@mantine/core';

import { RootLayout } from '@/app/layouts/RootLayout';

export default function NotFoundPage() {
    return (
        <RootLayout>
            <section>
                <Flex gap='xl' h='100vh' direction='column' justify='center' align='center'>
                    <Title order={2}>404</Title>
                    <Title order={1}>Страница не найдена</Title>
                    <Button component={Link} to='/' size='large'>
                        Вернуться на главную
                    </Button>
                </Flex>
            </section>
        </RootLayout>
    );
}
