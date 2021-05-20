import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import CourseHomepage from 'src/components/pages/CourseHomepage';
import Home from 'src/components/pages/Home';
import SignUp from 'src/components/pages/SignUp';
import SignIn from 'src/components/pages/SignIn';
import Test from 'src/components/pages/Test';

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
                <Route path="/course">
                    <CourseHomepage />
                </Route>
                <Route path="/test">
                    <Test />
                </Route>
            </Switch>
        </BrowserRouter>
    );
}

export default Router;
