import React from 'react';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

import ArrowForward from '@material-ui/icons/ArrowForward';

const SubmitButton = (props) => {
    const buttonProps = {};

    if (props.href) {
        buttonProps.href = props.href;
    }

    return (
        <Button
            {...buttonProps}
            type="submit"
            variant="contained"
            fullWidth={true}
            color="default"
            endIcon={<ArrowForward />}
            size="large"
        >
            <Box component="span" width="100%" fontWeight="fontWeightBold" textAlign="center">
                {props.submitButtonText}
            </Box>
        </Button>
    );
};

export default SubmitButton;
