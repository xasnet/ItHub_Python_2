import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { routerConfig } from '@/shared/config/router';
import { Center, Loader } from '@mantine/core';
import { LazyLoad } from '@/shared/ui';

export const RouterProvider = () => {
    return (
        <Suspense
            fallback={
                <>
                    <LazyLoad />
                    <Center h='100vh'>
                        <Loader />
                    </Center>
                </>
            }
        >
            <Routes>
                {Object.values(routerConfig).map((route) => (
                    <Route key={route.path} {...route} />
                ))}
            </Routes>
        </Suspense>
    );
};
