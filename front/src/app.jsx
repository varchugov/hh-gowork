import React from 'react';
import { ThemeProvider, CssBaseline } from '@material-ui/core';
import Router from './router';
import MuiTheme from './muiTheme';

function App() {
    return (
        <ThemeProvider theme={MuiTheme}>
            <CssBaseline />
            <Router />
        </ThemeProvider>
    );
}

export default App;
