import React from 'react';

import Box from '@material-ui/core/Box';

import SubmitButton from './SubmitButton';
import ExtendedFormControl from './ExtendedFormControl';

const Form = (props) => {
    return (
        <form onSubmit={props.onSubmit}>
            {props.textFields.map((textField) => (
                <Box key={textField.label} mx={2} mt={3}>
                    <ExtendedFormControl label={textField.label} type={textField.type} />
                </Box>
            ))}
            <Box mt={3}>
                <SubmitButton submitButtonText={props.submitButtonText} />
            </Box>
        </form>
    );
};

export default Form;
