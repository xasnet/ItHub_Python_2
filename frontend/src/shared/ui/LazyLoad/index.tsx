import { useEffect } from 'react';
import { nprogress } from '@mantine/nprogress';

export const LazyLoad = () => {
    useEffect(() => {
        nprogress.start();

        return () => {
            nprogress.complete();
        };
    });

    return null;
};
