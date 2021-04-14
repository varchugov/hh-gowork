import React from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import store from 'src/store/store';

const Home = observer(() => (
    <React.Fragment>
        <h1>Homepage</h1>
        <ul>
            <li>
                <Link to="/settings" onClick={store.updateLinkClicksCount}>
                    Settings
                </Link>
            </li>
            <li>
                <Link to="/progress" onClick={store.updateLinkClicksCount}>
                    Course progress
                </Link>
            </li>
        </ul>
        <h2>Link clicks: {store.linkClicksCount}</h2>
    </React.Fragment>
));

export default Home;
