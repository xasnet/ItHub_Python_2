import { MantineProvider } from '@/app/providers/MantineProvider';
import { RouterProvider } from '@/app/providers/RouterProvider';
import { BrowserRouter } from 'react-router-dom';
import { StoreProvider } from '@/app/providers/StoreProvider';

export const App = () => {
    return (
        <BrowserRouter>
            <StoreProvider>
                <MantineProvider>
                    <RouterProvider />
                </MantineProvider>
            </StoreProvider>
        </BrowserRouter>
    );
};
