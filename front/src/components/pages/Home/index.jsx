import React from 'react';
import { Link } from 'react-router-dom';

import Header from 'src/components/shared/Header';

function Home() {
    return (
        <React.Fragment>
            <Header />
            <h1>Homepage</h1>
            <ul>
                <li>
                    <Link to="/signup">Зарегистрироваться</Link>
                </li>
                <li>
                    <Link to="/signin">Войти</Link>
                </li>
                <li>
                    <Link to="/course">Курс</Link>
                </li>
                <li>
                    <Link to="/test">Тест</Link>
                </li>
                <li>
                    <Link to="/interview">Собеседование</Link>
                </li>
            </ul>
        </React.Fragment>
    );
}

export default Home;
