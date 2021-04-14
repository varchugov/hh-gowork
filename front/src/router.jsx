import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from 'src/components/home/home';
import Settings from 'src/components/settings/settings';
import Progress from 'src/components/progress/progress';

function Router() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route path="/settings">
                    <Settings />
                </Route>
                <Route path="/progress">
                    <Progress />
                </Route>
            </Switch>
        </BrowserRouter>
    );
}

export default Router;
