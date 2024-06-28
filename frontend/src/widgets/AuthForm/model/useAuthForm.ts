import { createFormContext } from '@mantine/form';
import { z } from 'zod';

import { AuthFormSchema } from '@/shared/validate/AuthForm.schema.ts';

type AuthFormProps = z.infer<typeof AuthFormSchema>;

export const [AuthFormProvider, useAuthFormContext, useRegisterForm] = createFormContext<AuthFormProps>();
