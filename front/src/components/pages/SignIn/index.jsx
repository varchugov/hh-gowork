import React, { useState, useCallback, useEffect } from 'react';
import { withRouter } from 'react-router-dom';

import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import withTheme from '@material-ui/core/styles/withTheme';

import Cookies from 'js-cookie';

import Form from 'src/components/shared/Form';
import Header from 'src/components/shared/Header';
import HHLoginButton from 'src/components/shared/HHLoginButton';
import LinkButton from 'src/components/shared/LinkButton';

import Api from 'src/api';

const SignIn = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [formErrorMessage, setFormErrorMessage] = useState(null);
    const [requestIsInProcess, setRequestState] = useState(false);
    const [componentIsMounted, setComponentIsMounted] = useState(true);

    const emailName = 'email';
    const passwordName = 'password';

    useEffect(() => {
        if (Cookies.get('gw_email')) {
            props.history.push('/course');
        }

        return () => setComponentIsMounted(false);
    }, [props.history, componentIsMounted]);

    const onInputChange = useCallback((value, name) => {
        switch (name) {
            case emailName:
                setEmail(value);
                break;
            case passwordName:
                setPassword(value);
                break;
        }
    }, []);

    const processLoginApiResponse = useCallback(
        (response) => {
            if (response.status >= 200 && response.status < 300) {
                props.history.push('/course');
            }
        },
        [props.history]
    );

    const onLoginError = useCallback((error) => {
        if (error.response && error.response.status) {
            const status = error.response.status;

            if (status >= 400 && status < 500) {
                setFormErrorMessage('используйте другие данные для авторизации');
            } else {
                setFormErrorMessage('что-то пошло не так, попробуйте еще раз');
            }
        } else {
            setFormErrorMessage('проверьте интернет-подключение и попробуйте еще раз');
        }
    }, []);

    const onLoginSubmit = useCallback(
        (event) => {
            event.preventDefault();
            setFormErrorMessage(null);
            setRequestState(true);
            Api.login(email, password)
                .then((response) => {
                    processLoginApiResponse(response);
                })
                .catch(onLoginError)
                .finally(() => {
                    if (componentIsMounted) {
                        setRequestState(false);
                    }
                });
        },
        [email, password, processLoginApiResponse, onLoginError, componentIsMounted]
    );

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
                        fields={[
                            {
                                label: 'E-Mail',
                                type: 'email',
                                value: email,
                                errorMessage: null,
                                name: emailName,
                            },
                            {
                                label: 'Пароль',
                                type: 'password',
                                value: password,
                                errorMessage: null,
                                name: passwordName,
                            },
                        ]}
                        submitButtonText="Войти"
                        submitButtonIsDisabled={requestIsInProcess}
                        onSubmit={onLoginSubmit}
                        onInputChange={onInputChange}
                        errorMessage={formErrorMessage}
                    />
                    <HHLoginButton />
                    <LinkButton href="/signup" name="Регистрация" color={'primary'} />
                </Box>
            </Container>
        </React.Fragment>
    );
};

export default withRouter(withTheme(SignIn));
