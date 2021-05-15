import React from 'react';
import { observer } from 'mobx-react-lite';
import { Select, MenuItem, Container, MobileStepper, Box, Button } from '@material-ui/core';
import { KeyboardArrowLeft } from '@material-ui/icons';
import { withTheme } from '@material-ui/core/styles';

import store from 'src/store';

import Form from 'src/components/shared/Form';
import Header from 'src/components/shared/Header';
import LinkButton from 'src/components/shared/LinkButton';
import SubmitButton from 'src/components/shared/SubmitButton';

const Index = observer((props) => {
    const tutorialSteps = [
        <React.Fragment key="0">
            <Box style={props.theme.h1}>Регистрация</Box>
            <Box style={props.theme.h2}>
                Начните учиться
                <br />
                прямо сейчас
            </Box>
            <Form
                textFields={[{ label: 'E-Mail', type: 'email' }]}
                submitButtonText="Регистрация"
                onSubmit={store.incrementSignUpStep}
            />
            <LinkButton href="/signin" name="Войти" />
        </React.Fragment>,
        <React.Fragment key="1">
            <Box style={props.theme.h4}>Придумайте пароль, чтобы зайти в тренажер</Box>
            <Form
                textFields={[
                    { label: 'Введите пароль', type: 'password' },
                    { label: 'Повторите пароль', type: 'password' },
                ]}
                submitButtonText="Далее"
                onSubmit={store.incrementSignUpStep}
            />
            <Box mt={3} style={props.theme.h5} textAlign="center">
                Шаг 2 из 3-х
            </Box>
        </React.Fragment>,
        <React.Fragment key="2">
            <Box style={props.theme.h4}>В какой профессиональной области вы ищете работу?</Box>
            <Box px={2} py={6}>
                <Select labelId="label" value="item-0" variant="outlined" fullWidth={true}>
                    <MenuItem value="item-0">Профессия 1</MenuItem>
                    <MenuItem value="item-1">Профессия 2</MenuItem>
                </Select>
            </Box>
            <SubmitButton href="/" submitButtonText="Начать учиться" />
        </React.Fragment>,
    ];

    return (
        <React.Fragment>
            <Header />
            <Container>
                <Box maxWidth={props.theme.form.maxWidth} mx="auto">
                    {tutorialSteps[store.signUpStep]}
                    <MobileStepper
                        steps={tutorialSteps.length}
                        position="static"
                        activeStep={store.signUpStep}
                        nextButton={<Box flex={1} />}
                        backButton={
                            <Box flex={1}>
                                {store.signUpStep !== 0 && (
                                    <Button size="small" onClick={store.decrementSignUpStep}>
                                        <KeyboardArrowLeft />
                                        Назад
                                    </Button>
                                )}
                            </Box>
                        }
                    />
                </Box>
            </Container>
        </React.Fragment>
    );
});

export default withTheme(Index);
