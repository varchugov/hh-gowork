import React from 'react';

import { Grid } from '@material-ui/core';

import Paragraph from 'src/components/shared/Menu/components/Paragraph';

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

const Menu = (props) => (
    <Grid {...props}>
        {menu.paragraphs.map((item) => (
            <Grid key={item.id}>
                <Paragraph value={item} />
            </Grid>
        ))}
    </Grid>
);

export default Menu;
