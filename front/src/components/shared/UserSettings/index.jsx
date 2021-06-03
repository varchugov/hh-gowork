import React, { useState, useRef } from 'react';
import { withRouter } from 'react-router-dom';

import IconButton from '@material-ui/core/IconButton';
import Popper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

import PersonIcon from '@material-ui/icons/Person';

import Cookies from 'js-cookie';

import Api from 'src/api';

const UserSettings = (props) => {
    const [requestIsInProcess, setRequestState] = useState(false);
    const [popperIsVisible, setPopperVisibility] = useState(false);

    const userName = Cookies.get('gw_email');
    const buttonRef = useRef();
    const anchorEl = buttonRef.current;
    const popperId = popperIsVisible ? 'simple-popper' : undefined;

    const handleButtonClick = () => {
        setPopperVisibility(true);
    };

    const handleClickAway = () => {
        setPopperVisibility(false);
    };

    const processLogoutApiResponse = (response) => {
        if (response && response.status >= 200 && response.status < 300) {
            Cookies.remove('gw_email');
            props.history.push('/signin');
        }
    };

    const onLogout = () => {
        setRequestState(true);
        Api.logout().then((response) => {
            processLogoutApiResponse(response);
        });
    };

    return (
        <Box display={'inline'}>
            <ClickAwayListener onClickAway={handleClickAway}>
                <Box>
                    <IconButton ref={buttonRef} aria-describedby={popperId} onClick={handleButtonClick}>
                        <PersonIcon />
                    </IconButton>
                    <Popper
                        id={popperId}
                        open={popperIsVisible}
                        anchorEl={anchorEl}
                        placement={'bottom-end'}
                        transition
                    >
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

export default withRouter(UserSettings);
