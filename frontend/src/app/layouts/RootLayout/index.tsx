import type { PropsWithChildren } from 'react';
import { AppShell, Button } from '@mantine/core';
import { useAuthorization } from '@/shared/services/AuthorizeService';
import { Link } from 'react-router-dom';

export const RootLayout = ({ children }: PropsWithChildren) => {
    const [isAuth] = useAuthorization();

    return (
        <AppShell>
            {isAuth && (
                <AppShell.Header p={12}>
                    <Button w='fit-content' component={Link} display='block' ml='auto' to='/logout'>
                        Выйти
                    </Button>
                </AppShell.Header>
            )}
            <AppShell.Main>{children}</AppShell.Main>
        </AppShell>
    );
};
