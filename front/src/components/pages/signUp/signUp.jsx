import React from 'react';
import { observer } from 'mobx-react-lite';
import { Select, MenuItem, Button, Container, MobileStepper, Link, Box } from '@material-ui/core';
import { withTheme } from '@material-ui/core/styles';
import SignUpForm from './components/signUpForm';
import SubmitButton from './components/submitButton';
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
            <SignUpForm textFieldName="E-Mail" submitButtonText="Регистрация" />
            <Box textAlign="center" py={2}>
                <Button variant="contained" color="primary" size="small" href="/">
                    <Box component="span" width={170} fontWeight="fontWeightBold">
                        ВОЙТИ
                    </Box>
                </Button>
            </Box>
        </React.Fragment>,
        <React.Fragment key="1">
            <Box style={props.theme.h3}>Придумайте пароль, чтобы зайти в тренажер</Box>
            <SignUpForm textFieldName="Пароль" submitButtonText="Далее" />
            <Box mt={3} style={props.theme.h4} textAlign="center">
                Шаг 2 из 3-х
            </Box>
        </React.Fragment>,
        <React.Fragment key="2">
            <Box style={props.theme.h3}>В какой профессиональной области вы ищете работу?</Box>
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
            <Box py={2} style={props.theme.h3} fontWeight="fontWeightBold">
                <Link href="/" color="inherit">
                    GoWork
                </Link>
            </Box>
            <Box maxWidth={340} mx="auto">
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
