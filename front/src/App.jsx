import React from 'react';

import { CssBaseline, ThemeProvider } from '@material-ui/core';

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
