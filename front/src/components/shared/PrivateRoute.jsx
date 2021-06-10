import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import Cookies from 'js-cookie';

const PrivateRoute = (props) => {
    const userIsLoggedIn = Cookies.get('gw_email') !== undefined;

    return (
        <Route exact path={props.path}>
            {userIsLoggedIn ? props.children : <Redirect to={'/unauthorized'} />}
        </Route>
    );
};

export default PrivateRoute;
