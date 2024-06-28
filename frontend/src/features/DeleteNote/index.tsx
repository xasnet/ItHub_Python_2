import { Button, CloseIcon } from '@mantine/core';

import { useDeleteNoteMutation } from '@/shared/services/NotesService';

export const DeleteNote = ({ id }: { id: string }) => {
    const [deleteNote, { isLoading }] = useDeleteNoteMutation();

    return (
        <Button
            w='fit-content'
            onClick={() => deleteNote(id)}
            loading={isLoading}
            rightSection={<CloseIcon width={20} height={20} />}
        >
            Удалить
        </Button>
    );
};
