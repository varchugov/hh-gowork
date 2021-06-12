import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import CourseHomepage from 'src/components/pages/CourseHomepage';
import PrivateRoute from 'src/components/shared/PrivateRoute';
import SignUp from 'src/components/pages/SignUp';
import SignIn from 'src/components/pages/SignIn';
import Test from 'src/components/pages/Test';
import Interview from 'src/components/pages/Interview';

function Router() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/">
                    <Redirect to={'/course'} />
                </Route>
                <Route path="/signup">
                    <SignUp />
                </Route>
                <Route path="/signin">
                    <SignIn />
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
