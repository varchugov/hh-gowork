import React from 'react';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

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
