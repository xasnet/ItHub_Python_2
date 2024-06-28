import type { ReactNode } from 'react';
import { Paper, Stack, Text, Title } from '@mantine/core';

interface NoteProps {
    title: string;
    content: string;
    date: string;
    actionSlot?: ReactNode;
}

export const Note = ({ title, date, content, actionSlot }: NoteProps) => (
    <Paper withBorder p={20} mb={12}>
        <Stack gap={12}>
            <Title order={4}>{title}</Title>
            <Text>{content}</Text>
            <Text>{date}</Text>
            {actionSlot}
        </Stack>
    </Paper>
);
