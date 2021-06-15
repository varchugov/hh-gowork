import React from 'react';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

import ApiConstants from 'src/api/ApiConstants';

const HHLoginButton = () => {
    const redirectHHLogin = () => {
        window.location.href = `${ApiConstants.API_BASE_URL}/hhlogin`;
    };

    return (
        <Box textAlign="center" py={2}>
            <Button
                variant="outlined"
                size="small"
                style={{ textTransform: 'none', color: '#e1011c' }}
                onClick={redirectHHLogin}
            >
                <Box component="span" width={170} fontWeight="fontWeightBold">
                    Войти через hh.ru
                </Box>
            </Button>
        </Box>
    );
};

export default HHLoginButton;
