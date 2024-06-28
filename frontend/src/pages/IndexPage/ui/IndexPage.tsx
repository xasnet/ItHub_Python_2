import { Button, Container, Stack, Textarea, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';

import { RootLayout } from '@/app/layouts/RootLayout';
import { useCreateNoteMutation } from '@/shared/services/NotesService';

import { Notes } from '@/widgets';

export default function IndexPage() {
    const [createNote, { isLoading }] = useCreateNoteMutation();
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            title: '',
            content: '',
        },
        validate: {
            title: (value) => (!value.length ? 'Обязательное поле' : null),
            content: (value) => (!value.length ? 'Обязательное поле' : null),
        },
    });

    const onSubmit = form.onSubmit(async (values) => {
        try {
            await createNote(values);
        } catch (e) {
            if (e instanceof Error) {
                console.log(e.message);
            }
        }
    });

    const titleProps = form.getInputProps('title');
    const contentProps = form.getInputProps('content');

    return (
        <RootLayout>
            <section>
                <Container>
                    <Title my={20}>Записки</Title>
                    <Notes />
                </Container>
            </section>
            <section>
                <Container>
                    <form onSubmit={onSubmit}>
                        <Stack gap={12} maw={420}>
                            <TextInput label='Название:' placeholder='Введите заголовок' {...titleProps} />
                            <Textarea label='Текст записки:' placeholder='Введите текст' {...contentProps} />
                            <Button loading={isLoading} type='submit'>
                                Отправить
                            </Button>
                        </Stack>
                    </form>
                </Container>
            </section>
        </RootLayout>
    );
}
