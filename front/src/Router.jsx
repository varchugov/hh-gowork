import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import CourseHomepage from 'src/components/pages/CourseHomepage';
import PrivateRoute from 'src/components/shared/PrivateRoute';
import Home from 'src/components/pages/Home';
import SignUp from 'src/components/pages/SignUp';
import SignIn from 'src/components/pages/SignIn';
import Test from 'src/components/pages/Test';
import Interview from 'src/components/pages/Interview';
import Unauthorized from 'src/components/pages/Unauthorized';

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
                <Route path="/unauthorized">
                    <Unauthorized />
                </Route>
                <PrivateRoute path="/course">
                    <CourseHomepage />
                </PrivateRoute>
                <PrivateRoute path="/test">
                    <Test />
                </PrivateRoute>
                <PrivateRoute path="/interview">
                    <Interview />
                </PrivateRoute>
            </Switch>
        </BrowserRouter>
    );
}

export default Router;
