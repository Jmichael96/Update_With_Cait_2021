import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// styles
import './mobileNav.css';

// components
import Colors from '../../../utils/constants/Colors';

const MobileNav = ({ logout, isAuthenticated, authLoading, user }) => {
    const [menuStatus, setMenuStatus] = useState('open');
    const [menuStyle, setMenuStyle] = useState('menu');
    const [navToggle, setNavToggle] = useState(false);

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

    // toggle nav function for the button
    const toggleNavIcon = () => {
        setNavToggle(!navToggle);
    };

    // authenticated nav links
    const authLinks = (
        <div id="mobileNavStyles_authLinkWrap">
            <Link to="/" className="nav-link"><span className="navSpan">HOME</span></Link>
            <Link to="/lifestyle" className="nav-link"><span className="navSpan">LIFESTYLE</span></Link>
            <Link to="/devotional" className="nav-link"><span className="navSpan">DEVOTIONAL</span></Link>
            <Link to="/wellness" className="nav-link"><span className="navSpan">WELLNESS</span></Link>
            <Link to="/graphics" className="nav-link"><span className="navSpan">GRAPHICS</span></Link>
            <a href="#!" className="nav-link" onClick={() => logout()}>
                <span className="navSpan">LOGOUT</span>
            </a>
        </div>
    );
    // guest links
    const guestLinks = (
        <div id="mobileNavStyles_guestLinkWrap">
            <Link to="/" className="nav-link"><span className="navSpan">HOME</span></Link>
            <Link to="/lifestyle" className="nav-link"><span className="navSpan">LIFESTYLE</span></Link>
            <Link to="/devotional" className="nav-link"><span className="navSpan">DEVOTIONAL</span></Link>
            <Link to="/wellness" className="nav-link"><span className="navSpan">WELLNESS</span></Link>
            <Link to="/graphics" className="nav-link"><span className="navSpan">GRAPHICS</span></Link>
        </div>
    );

    return (
        <div id="mobilNavStyles_root">
            <div id="mobileNavStyles_button" onClick={() => { toggleNavIcon(); menuHandler() }} className={`${!navToggle ? '' : 'open'}`}>
                <span style={{ backgroundColor: Colors.accentColor }}></span>
                <span style={{ backgroundColor: Colors.accentColor }}></span>
                <span style={{ backgroundColor: Colors.accentColor }}></span>
                <span style={{ backgroundColor: Colors.accentColor }}></span>
                <span style={{ backgroundColor: Colors.accentColor }}></span>
                <span style={{ backgroundColor: Colors.accentColor }}></span>
            </div>
            <div className={menuStyle}>
                {!authLoading && !isAuthenticated ? guestLinks : authLinks}
            </div>
        </div>
    );
};

MobileNav.propTypes = {
    logout: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    authLoading: PropTypes.bool.isRequired,
    user: PropTypes.object,
};

export default MobileNav;