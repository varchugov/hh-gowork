import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
    <React.Fragment>
        <h1>Homepage</h1>
        <ul>
            <li>
                <Link to="/signup">Зарегистрироваться</Link>
            </li>
        </ul>
    </React.Fragment>
);

export default Home;
