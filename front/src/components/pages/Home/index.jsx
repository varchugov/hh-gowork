import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <React.Fragment>
            <h1>Homepage</h1>
            <ul>
                <li>
                    <Link to="/signup">Зарегистрироваться</Link>
                </li>
                <li>
                    <Link to="/signin">Войти</Link>
                </li>
            </ul>
        </React.Fragment>
    );
}

export default Home;
