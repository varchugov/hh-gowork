import React, { useState } from 'react';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';

const DonateButton = () => {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <Box textAlign="center" py={2}>
                <Button variant="outlined" color="secondary" onClick={handleClickOpen}>
                    <Box component="span" width={170} fontWeight="fontWeightBold">
                        Поддержать
                    </Box>
                </Button>
            </Box>
            <Dialog open={open} onClose={handleClose}>
                <DialogContent>
                    <iframe
                        src="https://yoomoney.ru/quickpay/shop-widget?writer=seller&targets=%D0%9D%D0%B0%20%D1%80%D0%B0%D0%B7%D0%B2%D0%B8%D1%82%D0%B8%D0%B5%20%D1%82%D1%80%D0%B5%D0%BD%D0%B0%D0%B6%D0%B5%D1%80%D0%B0&targets-hint=&default-sum=100&button-text=13&hint=&successURL=&quickpay=shop&account=410011857650635"
                        width="100%"
                        height="222"
                        frameBorder="0"
                        allowTransparency="true"
                        scrolling="no"
                    ></iframe>
                </DialogContent>
            </Dialog>
        </React.Fragment>
    );
};

export default DonateButton;
