import { z } from 'zod';

import { BaseApi } from '@/shared/api/config.ts';
import { HTTP_METHOD } from '@/shared/api/constants.ts';
import { API_ROUTES } from '@/shared/api/options.ts';
import { AuthFormSchema } from '@/shared/validate/AuthForm.schema.ts';

const RegistrationService = BaseApi.enhanceEndpoints({
    addTagTypes: [],
}).injectEndpoints({
    endpoints: (build) => ({
        sendRegistration: build.mutation<void, z.infer<typeof AuthFormSchema>>({
            query: (body) => ({
                url: API_ROUTES.register,
                method: HTTP_METHOD.POST,
                body,
            }),
        }),
    }),
});

export const { useSendRegistrationMutation } = RegistrationService;
