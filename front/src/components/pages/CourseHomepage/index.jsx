import React from 'react';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import Golearn from 'src/components/shared/Golearn';
import Header from 'src/components/shared/Header';
import Menu from 'src/components/shared/Menu';
import UserSettings from 'src/components/shared/UserSettings';

function CourseHomepage() {
    return (
        <React.Fragment>
            <Header UserSettings={UserSettings} progressPercentage={0} />
            <Container>
                <Grid container justify="space-around">
                    <Golearn />
                </Grid>
                <Menu container justify="space-around" />
            </Container>
        </React.Fragment>
    );
}

export default CourseHomepage;
