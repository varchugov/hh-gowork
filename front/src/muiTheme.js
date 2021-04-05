import { createMuiTheme } from '@material-ui/core';
import { green } from '@material-ui/core/colors';

const MuiTheme = createMuiTheme({
    h1: {
        fontSize: '54px',
        letterSpacing: '-1.5px',
    },
    h2: {
        fontSize: '30px',
    },
    h3: {
        fontSize: '20px',
    },
    h4: {
        fontSize: '18px',
    },
    typography: {
        fontFamily: 'Roboto, Sans-Serif',
    },
    palette: {
        primary: green,
    },
});

export default MuiTheme;
