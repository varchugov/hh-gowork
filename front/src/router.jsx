import React from "react";
import {
    BrowserRouter,
    Switch,
    Route,
    Link
} from "react-router-dom";
import { useDispatch } from 'react-redux';

import Counter from './features/counter/counter';
import { increment } from './features/counter/counterSlice';

import Home from "./components/home/home";
import Courses from "./components/courses/courses";
import Settings from "./components/settings/settings";


function Router() {
    const dispatch = useDispatch();

    return (
        <BrowserRouter>
            <div>
                <ul>
                    <li>
                        <Link to="/" onClick={() => dispatch(increment())}>GoWork</Link>
                    </li>
                    <li>
                        <Link to="/courses" onClick={() => dispatch(increment())}>Courses</Link>
                    </li>
                    <li>
                        <Link to="/settings" onClick={() => dispatch(increment())}>Settings</Link>
                    </li>
                </ul>

                <Counter />

            <hr />

            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/courses" component={Courses} />
                <Route path="/settings" component={Settings} />
            </Switch>
        </div>
        </BrowserRouter>
    );
}

export default Router;
