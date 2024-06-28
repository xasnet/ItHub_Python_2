export const API_ROUTES = {
    baseUrl: import.meta.env.VITE_API_URL,
    refresh: 'api/token/refresh/',
    register: '/api/user/register/',
    auth: '/api/token/',
    notes: '/api/notes/',
    deleteNote: (id: string) => API_ROUTES.notes + `delete/${id}/`,
};
