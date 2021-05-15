import React from 'react';

import { Container, Box } from '@material-ui/core';
import { withTheme } from '@material-ui/core/styles';

import Form from 'src/components/shared/Form';
import Header from 'src/components/shared/Header';
import LinkButton from 'src/components/shared/LinkButton';

const Index = (props) => {
    return (
        <React.Fragment>
            <Header />
            <Container>
                <Box maxWidth={props.theme.form.maxWidth} mx="auto">
                    <Box style={props.theme.h1}>Вход в тренажер</Box>
                    <Box style={props.theme.h3} mt={3}>
                        Введите данные, указанные при регистрации
                    </Box>
                    <Form
                        textFields={[
                            { label: 'E-Mail', type: 'email' },
                            { label: 'Пароль', type: 'password' },
                        ]}
                        submitButtonText="Войти"
                    />
                    <LinkButton href="/signup" name="Регистрация" />
                </Box>
            </Container>
        </React.Fragment>
    );
};

export default withTheme(Index);
