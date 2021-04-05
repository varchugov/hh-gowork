import React from 'react';
import { observer } from 'mobx-react-lite';
import { Select, MenuItem, Container, MobileStepper, Box } from '@material-ui/core';
import { withTheme } from '@material-ui/core/styles';
import Form from '../../shared/form';
import SubmitButton from '../../shared/submitButton';
import HomePageLink from '../../shared/homePageLink';
import LinkButton from '../../shared/linkButton';
import store from '../../../store/store';

const SignUp = observer((props) => {
    const tutorialSteps = [
        <React.Fragment key="0">
            <Box style={props.theme.h1}>Регистрация</Box>
            <Box style={props.theme.h2}>
                Начните учиться
                <br />
                прямо сейчас
            </Box>
            <Form textFields={['E-Mail']} submitButtonText="Регистрация" onSubmit={store.incrementSignUpStep} />
            <LinkButton href="/signin" name="Войти" />
        </React.Fragment>,
        <React.Fragment key="1">
            <Box style={props.theme.h4}>Придумайте пароль, чтобы зайти в тренажер</Box>
            <Form textFields={['Пароль']} submitButtonText="Далее" onSubmit={store.incrementSignUpStep} />
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
        <Container>
            <HomePageLink />
            <Box maxWidth={props.theme.form.maxWidth} mx="auto">
                {tutorialSteps[store.signUpStep]}
                <MobileStepper
                    steps={tutorialSteps.length}
                    position="static"
                    activeStep={store.signUpStep}
                    nextButton={<span />}
                    backButton={<span />}
                />
            </Box>
        </Container>
    );
});

export default withTheme(SignUp);
