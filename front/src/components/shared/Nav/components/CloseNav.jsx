import React from 'react';

import IconButton from '@material-ui/core/IconButton';

import HighlightOffIcon from '@material-ui/icons/HighlightOff';

import store from 'src/store';

const CloseNav = () => (
    <IconButton onClick={store.sharedNavClose}>
        <HighlightOffIcon />
    </IconButton>
);

export default CloseNav;
