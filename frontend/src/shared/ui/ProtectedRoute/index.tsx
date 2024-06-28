import { PropsWithChildren, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Center, Loader } from '@mantine/core';
import { jwtDecode } from 'jwt-decode';
import { isNull } from 'lodash-es';

import { setAuthorization, useAuthorization, useSendRefreshTokenMutation } from '@/shared/services/AuthorizeService';
import { STORAGE } from '@/shared/services/StorageService';

export const ProtectedRoute = ({ children }: PropsWithChildren) => {
    const [isAuthorized] = useAuthorization();
    const [refreshToken] = useSendRefreshTokenMutation();
    const auth = async () => {
        const token = STORAGE.getToken();
        if (!token) {
            setAuthorization(false);
            return;
        }
        const decoded = jwtDecode(token);
        const tokenExpires = decoded.exp;
        const now = Date.now() / 1000;

        if (tokenExpires && tokenExpires < now) {
            try {
                const res = await refreshToken();
                if (res && res.data?.access) {
                    STORAGE.setToken(res.data?.access);
                    setAuthorization(true);
                } else {
                    setAuthorization(false);
                }
            } catch (e: unknown) {
                if (e instanceof Error) {
                    console.error(e);
                }
                setAuthorization(false);
            }
        } else {
            setAuthorization(true);
        }
    };

    useEffect(() => {
        auth().catch(() => setAuthorization(false));
    }, []);

    if (isNull(isAuthorized)) {
        return (
            <Center h='100vh'>
                <Loader color='blue' />
            </Center>
        );
    }

    return isAuthorized ? children : <Navigate to='/login' />;
};
