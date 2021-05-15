import React from 'react';
import styled from 'styled-components';

import { Link, Box } from '@material-ui/core';
import { withTheme } from '@material-ui/core/styles';

const HomePageBox = styled(Box)`
    margin: 7px 0;
`;

const HomePageLink = (props) => (
    <HomePageBox style={props.theme.h3} fontWeight="fontWeightBold">
        <Link href="/" color="textPrimary">
            GoWork
        </Link>
    </HomePageBox>
);

export default withTheme(HomePageLink);
