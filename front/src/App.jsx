import React from 'react';

import { CssBaseline, ThemeProvider } from '@material-ui/core';

import MuiTheme from 'src/MuiTheme';

import Router from 'src/Router';
import Header from 'src/components/shared/Header';

function App() {
    return (
        <ThemeProvider theme={MuiTheme}>
            <CssBaseline />
            <Header />
            <main>
                <Router />
            </main>
        </ThemeProvider>
    );
}

export default App;
