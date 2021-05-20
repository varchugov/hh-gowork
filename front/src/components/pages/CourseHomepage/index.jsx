import React from 'react';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import Header from 'src/components/shared/Header';
import Golearn from 'src/components/shared/Golearn';
import Menu from 'src/components/shared/Menu';

function CourseHomepage() {
    return (
        <React.Fragment>
            <Header />
            <Container>
                <Grid container justify="space-between">
                    <Golearn />
                </Grid>
                <Menu container justify="space-between" />
            </Container>
        </React.Fragment>
    );
}

export default CourseHomepage;
