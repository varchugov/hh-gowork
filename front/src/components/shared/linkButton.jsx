import React from 'react';
import { Box, Button } from '@material-ui/core';

const LinkButton = (props) => (
    <Box textAlign="center" py={2}>
        <Button variant="contained" color="primary" size="small" href={props.href}>
            <Box component="span" width={170} fontWeight="fontWeightBold">
                {props.name}
            </Box>
        </Button>
    </Box>
);

export default LinkButton;
