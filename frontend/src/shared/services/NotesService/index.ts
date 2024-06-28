import { BaseApi } from '@/shared/api/config.ts';
import { HTTP_METHOD } from '@/shared/api/constants.ts';
import { API_ROUTES } from '@/shared/api/options.ts';

export const NotesService = BaseApi.enhanceEndpoints({
    addTagTypes: ['NOTES'],
}).injectEndpoints({
    endpoints: (build) => ({
        getNotes: build.query<
            {
                title: string;
                content: string;
                date: string;
                id: string;
            }[],
            void
        >({
            query: () => API_ROUTES.notes,
            providesTags: ['NOTES'],
        }),
        deleteNote: build.mutation<void, string>({
            query: (id) => ({
                url: API_ROUTES.deleteNote(id),
                method: HTTP_METHOD.DELETE,
            }),
            invalidatesTags: ['NOTES'],
        }),
        createNote: build.mutation<void, { content: string; title: string }>({
            query: (body) => ({
                url: API_ROUTES.notes,
                method: HTTP_METHOD.POST,
                body,
            }),
            invalidatesTags: ['NOTES'],
        }),
    }),
});

export const { useCreateNoteMutation, useDeleteNoteMutation, useGetNotesQuery } = NotesService;
