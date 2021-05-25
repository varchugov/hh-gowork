import React from 'react';
import styled from 'styled-components';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import HomePageLink from 'src/components/shared/HomePageLink';

const HeaderContent = styled(Grid)`
    padding: 11px 0px;
`;

const Header = ({ CloseNav, TestNav, UserSettings }) => {
    return (
        <header>
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
        </header>
    );
};

export default Header;
