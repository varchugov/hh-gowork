import React from 'react';
import styled from 'styled-components';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LinearProgress from '@material-ui/core/LinearProgress';
import AppBar from '@material-ui/core/AppBar';
import Slide from '@material-ui/core/Slide';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';

import HomePageLink from 'src/components/shared/HomePageLink';

const HeaderContent = styled(Grid)`
    padding: 11px 0px;
`;

const Header = ({ CloseNav, TestNav, UserSettings, progressPercentage }) => {
    const trigger = useScrollTrigger();

    return (
        <React.Fragment>
            <Slide appear={false} direction="down" in={!trigger}>
                <AppBar color="default">
                    <Container maxWidth="xl">
                        <HeaderContent container justify="space-between" alignItems="center">
                            <HomePageLink item />
                            <Grid item>
                                <Grid container direction={'row'}>
                                    {CloseNav && <CloseNav />}
                                    {TestNav && <TestNav />}
                                    {UserSettings && <UserSettings />}
                                </Grid>
                            </Grid>
                        </HeaderContent>
                    </Container>
                    <LinearProgress variant="determinate" value={progressPercentage} />
                </AppBar>
            </Slide>
            <Box m={12} />
        </React.Fragment>
    );
};

export default Header;
