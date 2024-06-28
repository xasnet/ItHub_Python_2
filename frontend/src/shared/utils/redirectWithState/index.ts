import { redirect } from 'react-router-dom';

export const redirectWithState = (url: string, status: number) =>
    redirect(url, {
        status,
    });
