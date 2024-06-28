import { createTheme, MantineProvider as Mantine } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { NavigationProgress } from '@mantine/nprogress';
import type { PropsWithChildren } from 'react';

const theme = createTheme({});

export function MantineProvider({ children }: PropsWithChildren) {
    return (
        <Mantine theme={theme}>
            <NavigationProgress />
            <Notifications />
            {children}
        </Mantine>
    );
}
