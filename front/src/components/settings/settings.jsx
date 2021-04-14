import React from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import store from 'src/store/store';

const Settings = observer(() => (
    <React.Fragment>
        <h1>Settings</h1>
        <Link to="/" onClick={store.updateLinkClicksCount}>
            Homepage
        </Link>
        <h2>Link clicks: {store.linkClicksCount}</h2>
    </React.Fragment>
));

export default Settings;
