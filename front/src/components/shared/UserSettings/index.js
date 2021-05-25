import React, { useState, useRef } from 'react';
import { IconButton, Popper, Paper, Avatar, Button, Box, ClickAwayListener } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';

import Api from 'src/api';

const processLogoutApiResponse = (response) => {
    if (response && response.status >= 200 && response.status < 300) {
        // Убрать, когда на бэк добавят cookie без атрибута httpOnly
        document.cookie = 'userName=userName; max-age=0';
        // /////////////////////////////////////////////////////////
        document.location.href = '/signin';
    }
};

const getCookie = (name) => {
    const matches = document.cookie.match(new RegExp(`(?:^|; )${name.replace(/([$?*|{}\]\\^])/g, '\\$1')}=([^;]*)`));

    return matches ? decodeURIComponent(matches[1]) : undefined;
};

const UserSettings = () => {
    const [requestIsInProcess, setRequestState] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    const userName = getCookie('userName');

    const divRef = useRef();
    const isVisible = Boolean(anchorEl);
    const id = isVisible ? 'simple-popper' : undefined;

    const handleClick = () => {
        setAnchorEl(divRef.current);
    };

    const handleClickAway = () => {
        setAnchorEl(null);
    };

    const onLogout = () => {
        setRequestState(true);
        Api.logout()
            .then((response) => {
                processLogoutApiResponse(response);
            })
            .finally(() => {
                setRequestState(false);
            });
    };

    return (
        <Box display={'inline'}>
            <ClickAwayListener onClickAway={handleClickAway}>
                <Box>
                    <IconButton ref={divRef} aria-describedby={id} onClick={handleClick}>
                        <PersonIcon />
                    </IconButton>
                    <Popper id={id} open={isVisible} anchorEl={anchorEl} placement={'bottom-end'} transition>
                        <Paper>
                            <Box display={'flex'} alignItems={'center'} flexDirection={'column'} p={2}>
                                <Avatar>{userName ? userName[0] : ''}</Avatar>
                                <Box m={2}>{userName}</Box>
                                <Button
                                    variant={'contained'}
                                    fullWidth={true}
                                    color={'default'}
                                    size={'large'}
                                    disabled={requestIsInProcess}
                                    onClick={onLogout}
                                >
                                    Выйти
                                </Button>
                            </Box>
                        </Paper>
                    </Popper>
                </Box>
            </ClickAwayListener>
        </Box>
    );
};

export default UserSettings;
