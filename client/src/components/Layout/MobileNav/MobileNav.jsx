import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { AiFillInstagram, AiFillLinkedin, AiFillFacebook } from 'react-icons/ai';

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
        <div className="mobileNavStyles_authLinkWrap">
            <Link to="/" className="mobileNavStyles_navLink" onClick={() => { toggleNavIcon(); menuHandler() }}><span style={{ color: Colors.navText }} className="mobileNavStyles_navSpan">HOME</span></Link>
            <Link to="/lifestyle" className="mobileNavStyles_navLink" onClick={() => { toggleNavIcon(); menuHandler() }}><span style={{ color: Colors.navText }} className="mobileNavStyles_navSpan">LIFESTYLE</span></Link>
            <Link to="/devotional" className="mobileNavStyles_navLink" onClick={() => { toggleNavIcon(); menuHandler() }}><span style={{ color: Colors.navText }} className="mobileNavStyles_navSpan">DEVOTIONAL</span></Link>
            <Link to="/wellness" className="mobileNavStyles_navLink" onClick={() => { toggleNavIcon(); menuHandler() }}><span style={{ color: Colors.navText }} className="mobileNavStyles_navSpan">WELLNESS</span></Link>
            <Link to="/graphics" className="mobileNavStyles_navLink" onClick={() => { toggleNavIcon(); menuHandler() }}><span style={{ color: Colors.navText }} className="mobileNavStyles_navSpan">GRAPHICS</span></Link>
            <Link to="/about" className="mobileNavStyles_navLink" onClick={() => { toggleNavIcon(); menuHandler() }}><span style={{ color: Colors.navText }} className="mobileNavStyles_navSpan">ABOUT</span></Link>
            <Link to="/my_subs" className="mobileNavStyles_navLink" onClick={() => { toggleNavIcon(); menuHandler() }}><span style={{ color: Colors.navText }} className="mobileNavStyles_navSpan">MY SUBS</span></Link>
            <a href="#!" className="mobileNavStyles_navLink" onClick={() => { logout(); toggleNavIcon(); menuHandler() }}>
                <span className="mobileNavStyles_navSpan" style={{ color: Colors.navText }}>LOGOUT</span>
            </a>
        </div>
    );

    // guest links
    const guestLinks = (
        <div className="mobileNavStyles_guestLinkWrap">
            <Link to="/" className="mobileNavStyles_navLink" onClick={() => { toggleNavIcon(); menuHandler() }}><span style={{ color: Colors.navText }} className="mobileNavStyles_navSpan">HOME</span></Link>
            <Link to="/lifestyle" className="mobileNavStyles_navLink" onClick={() => { toggleNavIcon(); menuHandler() }}><span style={{ color: Colors.navText }} className="mobileNavStyles_navSpan">LIFESTYLE</span></Link>
            <Link to="/devotional" className="mobileNavStyles_navLink" onClick={() => { toggleNavIcon(); menuHandler() }}><span style={{ color: Colors.navText }} className="mobileNavStyles_navSpan">DEVOTIONAL</span></Link>
            <Link to="/wellness" className="mobileNavStyles_navLink" onClick={() => { toggleNavIcon(); menuHandler() }}><span style={{ color: Colors.navText }} className="mobileNavStyles_navSpan">WELLNESS</span></Link>
            <Link to="/graphics" className="mobileNavStyles_navLink" onClick={() => { toggleNavIcon(); menuHandler() }}><span style={{ color: Colors.navText }} className="mobileNavStyles_navSpan">GRAPHICS</span></Link>
            <Link to="/about" className="mobileNavStyles_navLink" onClick={() => { toggleNavIcon(); menuHandler() }}><span style={{ color: Colors.navText }} className="mobileNavStyles_navSpan">ABOUT</span></Link>
        </div>
    );

    return (
        <div id="mobilNavStyles_root">
            <div id="mobileNavStyles_navBtnWrap">
                <div className="mobileNavStyles__socialIconWrap">
                    <AiFillFacebook className="mobileNavStyles_socialIcon" />
                    <AiFillInstagram className="mobileNavStyles_socialIcon" />
                    <AiFillLinkedin className="mobileNavStyles_socialIcon" />
                </div>
                <a id="mobileNavStyles_menuBtn" className={`${!navToggle ? '' : 'active'}`} onClick={() => { toggleNavIcon(); menuHandler() }} href="#"><span></span></a>
            </div>
            <div className={menuStyle} style={{ backgroundColor: Colors.accentColor }}>
                <img id="mobileNavStyles_caitLogoImg" alt="logo" src={require('../../../assets/images/UWCNavLogo.PNG')} />
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