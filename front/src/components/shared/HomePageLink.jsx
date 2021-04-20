import React from 'react';

import { Link, Box } from '@material-ui/core';
import { withTheme } from '@material-ui/core/styles';

const HomePageLink = (props) => (
    <Box style={props.theme.h3} fontWeight="fontWeightBold">
        <Link href="/" color="textPrimary">
            GoWork
        </Link>
    </Box>
);

export default withTheme(HomePageLink);
