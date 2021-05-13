import React from 'react';
import { observer } from 'mobx-react-lite';

import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';

import MenuIcon from '@material-ui/icons/Menu';

import store from 'src/store';

import Header from 'src/components/shared/Header';
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
            <Header CloseNav={CloseNav} />
            <Container>
                <Menu />
            </Container>
        </SwipeableDrawer>
    </React.Fragment>
));

export default Nav;
