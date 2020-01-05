import React from 'react';
import '../../assets/css/Header.css';

const Header = () => (
    <header className="w3-container w3-center w3-padding-32 image">
        <div className="w3-center">
            <h1>
                <b>MY BLOG</b>
            </h1>
            <p>Welcome to the blog of
                <span className="w3-tag">Dimitris Kaitantzidis</span>
            </p>
        </div>
    </header>
);

export default Header;