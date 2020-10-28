import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchRecentPosts } from '../../store/actions/post';
import { subscribe } from '../../store/actions/subscribe';
import { setModal } from '../../store/actions/modal';
import { Link } from 'react-router-dom';

// styles
import './homePage.css';

// components
import Wrapper from '../../components/Layout/Wrapper/Wrapper';
import PostCategories from '../../components/Post/PostCategories/PostCategories';
import Subscribe from '../../components/Subscribe/Subscribe';
import RecentPosts from '../../components/Post/RecentPosts/RecentPosts';
import Footer from '../../components/Layout/Footer/footer';
import Button from '../../components/Button/Button';

// utils
import Colors from '../../utils/constants/Colors';

const HomePage = ({ setModal, fetchRecentPosts, post: { loading, recentPosts, fetchedRecentPosts }, auth, subscribe }) => {

    const renderCounter = () => {
        if (!auth.loading && auth.isAuthenticated) {
            return (
                <div id="homePageStyles_hitCounterWrap">
                    <a href="https://www.hitwebcounter.com" rel="noopener noreferrer" target="_blank">
                        <img src="https://hitwebcounter.com/counter/counter.php?page=7696640&style=0010&nbdigits=5&type=page&initCount=0" title="Total Website Hits" alt="Web Hits" border="0" /></a>
                </div>
            )
        }
    }
    return (
        <article id="homePageStyles_root">
            <section id="homePageStyles_introImageWrap">
                <div id="homePageStyles_introInnerWrap">
                    <img className="homePageStyles_underlayImgLeft" alt="" src={require('../../assets/images/widemountain2.jpg')} />
                    <img className="homePageStyles_underlayImgRight" alt="" src={require('../../assets/images/widemountain1.jpg')} />
                </div>
                <img id="homePageStyles_mainImg" alt="" src={require('../../assets/images/cait2.JPG')} />
            </section>
            <Subscribe setModal={setModal} subscribe={subscribe} />
            <PostCategories />
            <section id="homePageStyles_aboutWrap">
                <Wrapper>
                    <div id="homePageStyles_aboutCard" style={{ backgroundColor: Colors.cardBg }}>
                        <Wrapper styles={{ justifyContent: 'space-evenly' }}>
                            <img id="homePageStyles_aboutImg" alt="caitlyn" src={require('../../assets/images/aboutImages/aboutImg1.JPG')} />
                            <div id="homePageStyles_aboutPWrap">
                                <Wrapper>
                                    <p className="homePageStyles_pText" style={{ color: Colors.cardText }}>
                                        Passionate about being the hands and feet of God and spreading the Good News through writing.
                                        Here to be a friend to all. Welcome to The Update With Cait!
                                    </p>
                                </Wrapper>
                                <Wrapper>
                                    <Link to="/about">
                                        <Button>READ MORE</Button>
                                    </Link>
                                </Wrapper>
                            </div>
                        </Wrapper>
                    </div>
                </Wrapper>
                {/* <Wrapper styles={{ justifyContent: 'space-evenly' }}>
                    <div id="homePageStyles_aboutImgWrap" style={{ borderColor: Colors.accentColor }}>
                        <img id="homePageStyles_aboutImg" alt="caitlyn" src={require('../../assets/images/aboutImages/aboutImg1.JPG')} />
                    </div>
                    <div id="homePageStyles_aboutPWrap">
                        <Wrapper>
                            <p className="homePageStyles_pText">
                                Passionate about being the hands and feet of god and spreading the good news through writing.
                                Just here to be a friend to all. Welcome to the Update With Cait!
                        </p>
                        </Wrapper>
                        <Wrapper>
                            <Link to="/about">
                                <Button>READ MORE</Button>
                            </Link>
                        </Wrapper>
                    </div>
                </Wrapper> */}
            </section>
            <RecentPosts fetchRecentPosts={fetchRecentPosts} recentPosts={recentPosts} loading={loading} fetchedRecentPosts={fetchedRecentPosts} />
            {!loading && fetchedRecentPosts && <Footer />}
            {renderCounter()}
        </article>
    );
};

HomePage.propTypes = {
    setModal: PropTypes.func.isRequired,
    fetchRecentPosts: PropTypes.func.isRequired,
    subscribe: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    post: state.post,
    auth: state.auth
});

export default connect(mapStateToProps, { setModal, fetchRecentPosts, subscribe })(HomePage);