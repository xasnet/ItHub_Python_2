import {
    type BaseQueryFn,
    createApi,
    type FetchArgs,
    fetchBaseQuery,
    type FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import { Mutex } from 'async-mutex';

import { STORAGE } from '@/shared/services/StorageService';
import { isRefreshTokenResponse } from '@/shared/types/type-guards/isRefreshTokenResponse';
import { redirectWithState } from '@/shared/utils';

import { API_ROUTES } from './options';

const mutex = new Mutex();

export const prepareHeaders = (headers: Headers) => {
    const token = STORAGE.getToken();

    if (token && !headers.has('refresh_token')) {
        headers.set('authorization', `Bearer ${token}`);
    }

    return headers;
};

export const baseRequestOptions = {
    baseUrl: API_ROUTES.baseUrl,
    prepareHeaders: prepareHeaders,
};

export const baseQuery = fetchBaseQuery(baseRequestOptions);

export const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
    args,
    api,
    extraOptions
) => {
    await mutex.waitForUnlock();
    let result = await baseQuery(args, api, extraOptions);
    if (result?.error) {
        if (result?.error.status === 468) {
            if (!mutex.isLocked()) {
                const release = await mutex.acquire();
                try {
                    const refresh = await baseQuery(
                        {
                            // TODO: тут надо поправить на актуальный
                            url: '/api/token/refresh/',
                            method: 'POST',
                            body: {
                                refresh_token: STORAGE.getRefreshToken(),
                            },
                            redirect: 'follow',
                        },
                        api,
                        extraOptions
                    );

                    if (refresh.data && isRefreshTokenResponse(refresh.data)) {
                        STORAGE.setToken(refresh.data.accessToken);
                        STORAGE.setRefreshToken(refresh.data.refreshToken);
                        result = await baseQuery(args, api, extraOptions);
                    }

                    release();

                    if (refresh.error) {
                        STORAGE.deleteToken();
                        throw Error('Пользователь не авторизован');
                    }
                } catch {
                    redirectWithState('/error', 401);
                }
            } else {
                await mutex.waitForUnlock();
                result = await baseQuery(args, api, extraOptions);
            }
        } else if (result.error.status === 403) {
            redirectWithState('/error', 403);
        }
    }

    return result;
};

export const BaseApi = createApi({
    reducerPath: 'api',
    tagTypes: [''],
    baseQuery: baseQueryWithReauth,
    endpoints: () => ({}),
});
