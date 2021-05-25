import React from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';

import MuiTheme from 'src/MuiTheme';

import Router from 'src/Router';

function App() {
    return (
        <ThemeProvider theme={MuiTheme}>
            <CssBaseline />
            <Router />
        </ThemeProvider>
    );
}

export default App;
