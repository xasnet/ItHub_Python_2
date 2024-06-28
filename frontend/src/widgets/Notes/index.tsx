import { Box } from '@mantine/core';

import { useGetNotesQuery } from '@/shared/services/NotesService';

import { Note } from '@/entities';
import { DeleteNote } from '@/features';

export const Notes = () => {
    const { data } = useGetNotesQuery();

    return <Box py={20}>{data?.map((el) => <Note key={el.id} {...el} actionSlot={<DeleteNote id={el.id} />} />)}</Box>;
};
