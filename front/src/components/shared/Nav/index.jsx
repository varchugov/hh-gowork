import React from 'react';
import { observer } from 'mobx-react-lite';

import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Box from '@material-ui/core/Box';

import MenuIcon from '@material-ui/icons/Menu';

import store from 'src/store';

import DonateButton from 'src/components/shared/DonateButton';
import Menu from 'src/components/shared/Menu';

import CloseNav from 'src/components/shared/Nav/components/CloseNav';

const Nav = observer(() => (
    <React.Fragment>
        <IconButton onClick={store.sharedNavOpen}>
            <MenuIcon />
        </IconButton>
        <SwipeableDrawer
            anchor={'right'}
            open={store.sharedNav}
            onClose={store.sharedNavClose}
            onOpen={store.sharedNavOpen}
        >
            <Box pt={1} pr={1} display="flex" justifyContent="flex-end">
                <CloseNav />
            </Box>
            <Container>
                <Menu DonateButton={DonateButton} />
            </Container>
        </SwipeableDrawer>
    </React.Fragment>
));

export default Nav;
