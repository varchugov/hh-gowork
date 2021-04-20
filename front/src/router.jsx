import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from 'src/components/pages/Home';
import SignUp from 'src/components/pages/SignUp';
import SignIn from 'src/components/pages/SignIn';

function Router() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route path="/signup">
                    <SignUp />
                </Route>
                <Route path="/signin">
                    <SignIn />
                </Route>
            </Switch>
        </BrowserRouter>
    );
}

export default Router;
