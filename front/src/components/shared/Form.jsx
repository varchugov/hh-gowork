import React from 'react';

import { Box, TextField } from '@material-ui/core';

import SubmitButton from 'src/components/shared/SubmitButton';

const Form = (props) => (
    <form onSubmit={props.onSubmit}>
        {props.textFields.map((textField) => (
            <Box key={textField} mx={2} mt={3}>
                <TextField label={textField} required={true} variant="outlined" fullWidth={true} />
            </Box>
        ))}
        <Box mt={3}>
            <SubmitButton submitButtonText={props.submitButtonText} />
        </Box>
    </form>
);

export default Form;
