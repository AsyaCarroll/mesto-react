import React from 'react';
import logo from '../images/logo.svg';
// import './Header.css';

function Header() {
    return (
        <header className="header">
            <img
                src={logo}
                alt="Логотип Mesto"
                className="header__logo"
            />
        </header>
    );
}

export default Header;