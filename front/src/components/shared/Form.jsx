import React from 'react';

import Box from '@material-ui/core/Box';

import SubmitButton from 'src/components/shared/SubmitButton';
import ExtendedFormControl from 'src/components/shared/ExtendedFormControl';

const Form = (props) => {
    return (
        <form onSubmit={props.onSubmit}>
            {props.fields.map((textField) => (
                <Box key={textField.name} mx={2} mt={3}>
                    <ExtendedFormControl
                        label={textField.label}
                        type={textField.type}
                        onChange={props.onInputChange}
                        value={textField.value}
                        errorMessage={textField.errorMessage}
                        name={textField.name}
                    />
                </Box>
            ))}
            {props.errorMessage && (
                <Box color={'error.main'} mx={2} mt={5}>
                    {props.errorMessage}
                </Box>
            )}
            <Box mt={3}>
                <SubmitButton submitButtonText={props.submitButtonText} disabled={props.submitButtonIsDisabled} />
            </Box>
        </form>
    );
};

export default Form;
