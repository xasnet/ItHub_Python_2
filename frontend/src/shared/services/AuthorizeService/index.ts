import { BaseApi } from '@/shared/api/config.ts';
import { HTTP_METHOD } from '@/shared/api/constants.ts';
import { API_ROUTES } from '@/shared/api/options.ts';
import { STORAGE } from '@/shared/services/StorageService';
import { createStore } from '@/shared/utils';

export const [useAuthorization, { set: setAuthorization }] = createStore<boolean | null>(null);

export const AuthorizeService = BaseApi.enhanceEndpoints({
    addTagTypes: ['REFRESH'],
}).injectEndpoints({
    endpoints: (build) => ({
        sendRefreshToken: build.mutation<{ access: string }, void>({
            query: () => {
                const refresh = STORAGE.getRefreshToken();
                return {
                    url: API_ROUTES.refresh,
                    method: HTTP_METHOD.POST,
                    body: {
                        refresh,
                    },
                };
            },
        }),
        signIn: build.mutation<{ access: string; refresh: string }, { username: string; password: string }>({
            query: (body) => ({
                url: API_ROUTES.auth,
                method: HTTP_METHOD.POST,
                body,
            }),
        }),
    }),
});

export const { useSendRefreshTokenMutation, useSignInMutation } = AuthorizeService;
