import React from 'react';
import styled from 'styled-components';

import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import withTheme from '@material-ui/core/styles/withTheme';

const HomePageBox = styled(Box)`
    margin: 7px 24px 7px 0;
`;

const HomePageLink = (props) => (
    <HomePageBox style={props.theme.h3} fontWeight="fontWeightBold">
        <Link href="/" color="textPrimary">
            GoWork
        </Link>
    </HomePageBox>
);

export default withTheme(HomePageLink);
