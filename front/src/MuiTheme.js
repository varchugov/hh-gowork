import { createMuiTheme } from '@material-ui/core';
import green from '@material-ui/core/colors/green';

const MuiTheme = createMuiTheme({
    h1: {
        fontSize: '54px',
        letterSpacing: '-1.5px',
        lineHeight: '1.2',
    },
    h2: {
        fontSize: '30px',
    },
    h3: {
        fontSize: '24px',
    },
    h4: {
        fontSize: '20px',
    },
    h5: {
        fontSize: '18px',
    },
    h6: {
        fontSize: '14px',
    },
    form: {
        maxWidth: '340px',
    },
    typography: {
        fontFamily: 'Roboto-light, Sans-Serif',
    },
    palette: {
        primary: green,
    },
    paragraph: {
        fontSize: '14px',
        lineHeight: '30px',
        marginTop: '15px',
        marginBottom: '15px',
    },
    videoPlayer: {
        display: 'block',
        width: '500px',
        maxWidth: '100%',
        marginTop: '15px',
        marginBottom: '15px',
    },
});

export default MuiTheme;
