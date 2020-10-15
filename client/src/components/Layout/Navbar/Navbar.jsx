import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../../store/actions/auth';
import { Link } from 'react-router-dom';

// components
import SmSpinner from '../SmSpinner/SmSpinner';
import MobileNav from '../MobileNav/MobileNav';

// styles
import './navbar.css';

const Navbar = ({ auth: { isAuthenticated, loading, user }, logout }) => {
    const [isAuth, setIsAuth] = useState(false);
    // set whether or not the mobile nav should be set
    const [mobilize, setMobilize] = useState(null);

    // set if a user is authenticated to render appropriate nav links
    useEffect(() => {
        if (!isAuthenticated) {
            setIsAuth(false);
        } else if (isAuthenticated) {
            setIsAuth(true);
        }
    }, [isAuthenticated]);

    // listener for the windows width
    useEffect(() => {
        resizeHandler();
        window.addEventListener('resize', resizeHandler);

        return () => window.removeEventListener('resize', resizeHandler);
    }, []);
    // function to handle inside the resize event listener
    const resizeHandler = () => {
        console.log('fired')
        if (window.innerWidth >= 1025) {
            setMobilize(false);
        } else if (window.innerWidth <= 1024) {
            setMobilize(true);
        }
    };

    const authLinks = (
        <section className="navLinkWrap">
            <Link to="/" className="nav-link"><span className="navSpan">HOME</span></Link>
            <div className="navStyles_dropdownWrapper">
                <ul>
                    <li><span className="navSpan">POSTS</span>
                        <ul>
                            <li><Link to="/lifestyle" className="nav-link"><span className="navSpan">LIFESTYLE</span></Link></li>
                            <li> <Link to="/devotional" className="nav-link"><span className="navSpan">DEVOTIONAL</span></Link></li>
                            <li><Link to="/wellness" className="nav-link"><span className="navSpan">WELLNESS</span></Link></li>
                            <li><Link to="/graphics" className="nav-link"><span className="navSpan">GRAPHICS</span></Link></li>
                        </ul>
                    </li>
                </ul>
            </div>
            <Link to="/create_post" className="nav-link"><span className="navSpan">CREATE</span></Link>
            <Link to="/saved" className="nav-link"><span className="navSpan">SAVED</span></Link>

            <a href="#!" className="nav-link" onClick={() => logout()}>
                {!loading ? <span className="navSpan">LOGOUT</span> : <SmSpinner />}
            </a>
            {/* <p>{!loading && !isEmpty(user) && <p>Welcome {user.name}</p>}</p> */}
        </section>
    );

    const guestLinks = (
        <section className="navLinkWrap">
            <Link to="/" className="nav-link"><span className="navSpan">HOME</span></Link>
            <Link to="/lifestyle" className="nav-link"><span className="navSpan">LIFESTYLE</span></Link>
            <Link to="/devotional" className="nav-link"><span className="navSpan">DEVOTIONAL</span></Link>
            <Link to="/wellness" className="nav-link"><span className="navSpan">WELLNESS</span></Link>
            <Link to="/graphics" className="nav-link"><span className="navSpan">GRAPHICS</span></Link>
            <Link to="/login1996">LOGIN</Link>
        </section>
    );

    // render the navbars accordingly
    const renderNavs = () => {
        if (mobilize === false) {
            return (
                <div>
                    {/* <div class="navLogoWrapper"> */}
                    <img id="navLogo" alt="UWC Logo" src={require('../../../assets/images/UWCNavLogo.PNG')} />
                    {/* </div> */}
                    {!loading && !isAuth ? guestLinks : authLinks}
                </div>
            )
        } else if (mobilize === true) {
            return <MobileNav />
        }
    };
    return (
        <div>
            <div className="nav">
                {renderNavs()}
            </div>
        </div>
    );
};

Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { logout }
)(Navbar);