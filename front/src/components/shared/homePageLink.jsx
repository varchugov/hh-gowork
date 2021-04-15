import React from 'react';
import { Link, Box } from '@material-ui/core';
import { withTheme } from '@material-ui/core/styles';

const HomePageLink = (props) => (
    <Box py={2} style={props.theme.h4} fontWeight="fontWeightBold">
        <Link href="/" color="inherit">
            GoWork
        </Link>
    </Box>
);

export default withTheme(HomePageLink);
