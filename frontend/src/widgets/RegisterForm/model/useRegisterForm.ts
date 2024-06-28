import { createFormContext } from '@mantine/form';
import { z } from 'zod';

import { createStore } from '@/shared/utils';
import { RegisterFormSchema } from '@/shared/validate/AuthForm.schema.ts';

type RegisterFormProps = z.infer<typeof RegisterFormSchema>;

export const [RegisterFormProvider, useRegisterFormContext, useRegisterForm] = createFormContext<RegisterFormProps>();

export const [useShowPassword] = createStore(false);
