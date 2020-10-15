import React, { useState } from 'react';
import PropTypes from 'prop-types';

// styles
import './mobileNav.css';

const MobileNav = () => {
    const [menuStatus, setMenuStatus] = useState('open');
    const [menuStyle, setMenuStyle] = useState('menu');

    // handler for when a menu opens/closes
    const menuHandler = () => {
        switch (menuStatus) {
            case 'open':
                setMenuStatus('close');
                setMenuStyle('menu active');
                break;
            case 'close':
                setMenuStatus('open');
                setMenuStyle('menu');
                break;
            default: break;
        };
    };

    return (
        <div>
            <button id="mobileNavStyles_button" onClick={menuHandler}>menu</button>
            <div className={menuStyle}>
                <ul>
                    <li>
                        <a href="#!">home</a>
                    </li>
                    <li>
                        <a href="#!">saved</a>
                    </li>
                    <li>
                        <a href="#!">stuff</a>
                    </li>
                </ul>
            </div>
        </div>
    );
};

MobileNav.propTypes = {

};

export default MobileNav;