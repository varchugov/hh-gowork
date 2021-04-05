import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './components/pages/home/home';
import SignUp from './components/pages/signUp/signUp';
import SignIn from './components/pages/signIn/signIn';

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
