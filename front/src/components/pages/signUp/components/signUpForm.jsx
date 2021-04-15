import React from 'react';
import { observer } from 'mobx-react-lite';
import { Box, TextField } from '@material-ui/core';
import SubmitButton from './submitButton';
import store from '../../../../store/store';

const SignUpForm = observer((props) => (
    <form onSubmit={store.incrementSignUpStep}>
        <Box mx={2} my={6}>
            <TextField label={props.textFieldName} required={true} variant="outlined" fullWidth={true} />
        </Box>
        <SubmitButton submitButtonText={props.submitButtonText} />
    </form>
));

export default SignUpForm;
