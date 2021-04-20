import React from 'react';

import { Container, Grid } from '@material-ui/core';

import Paragraph from 'src/components/shared/Paragraph';

const menu = {
    paragraphs: [
        {
            id: '1',
            header: '§ Введение',
            links: ['Поиск работы'],
        },
        {
            id: '2',
            header: '§ Резюме',
            links: ['Формат', 'О чем писать?', 'Достижения', 'О себе'],
        },
        {
            id: '3',
            header: '§ Сопроводительное',
            links: ['Зачем?', 'Обязательные пункты', 'Практика'],
        },
        {
            id: '4',
            header: '§ Собеседование',
            links: ['Подготовка', 'Частые вопросы', 'Практика'],
        },
    ],
};

function CourseHomepage() {
    return (
        <Container>
            <Grid container justify="space-between">
                {menu.paragraphs.map((item) => (
                    <Grid key={item}>
                        <Paragraph value={item} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}

export default CourseHomepage;
