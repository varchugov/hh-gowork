import React from 'react';
import { Container, Box } from '@material-ui/core';
import { withTheme } from '@material-ui/core/styles';
import Form from '../../shared/form';
import HomePageLink from '../../shared/homePageLink';
import LinkButton from '../../shared/linkButton';

const SignIn = (props) => {
    return (
        <Container>
            <HomePageLink />
            <Box maxWidth={props.theme.form.maxWidth} mx="auto">
                <Box style={props.theme.h1}>Вход в тренажер</Box>
                <Box style={props.theme.h3} mt={3}>
                    Введите данные, указанные при регистрации
                </Box>
                <Form textFields={['E-Mail', 'Пароль']} submitButtonText="Войти" />
                <LinkButton href="/signup" name="Регистрация" />
            </Box>
        </Container>
    );
};

export default withTheme(SignIn);
