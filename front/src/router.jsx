import React from "react";
import {
    BrowserRouter,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Home from "./components/home/home";
import Courses from "./components/courses/courses";
import Settings from "./components/settings/settings";

function Router() {
    return (
        <BrowserRouter>
            <div>
                <ul>
                    <li>
                        <Link to="/">GoWork</Link>
                    </li>
                    <li>
                        <Link to="/courses">Courses</Link>
                    </li>
                    <li>
                        <Link to="/settings">Settings</Link>
                    </li>
                </ul>

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
