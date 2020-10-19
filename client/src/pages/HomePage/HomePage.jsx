import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchRecentPosts } from '../../store/actions/post';
import { setModal } from '../../store/actions/modal';
import { Link } from 'react-router-dom';

// styles
import './homePage.css';

// components
import Wrapper from '../../components/Layout/Wrapper/Wrapper';
import PostCategories from '../../components/Post/PostCategories/PostCategories';
import Subscribe from '../../components/Subscribe/Subscribe';
import LgSpinner from '../../components/Layout/LgSpinner/LgSpinner';
import RecentPosts from '../../components/Post/RecentPosts/RecentPosts';

// utils
import isEmpty from '../../utils/isEmpty';
import Colors from '../../utils/constants/Colors';

const HomePage = ({ setModal, fetchRecentPosts, post: { loading, recentPosts, fetchedRecentPosts } }) => {

    return (
        <article id="homePageStyles_root">
            <section id="homePageStyles_introImageWrap">
                <div id="homePageStyles_introInnerWrap">
                    <img className="homePageStyles_underlayImgLeft" src={require('../../assets/images/widemountain2.jpg')} />
                    <img className="homePageStyles_underlayImgRight" src={require('../../assets/images/widemountain1.jpg')} />
                </div>
                <img id="homePageStyles_mainImg" src={require('../../assets/images/cait2.JPG')} />
            </section>
            <Subscribe setModal={setModal} />
            <PostCategories />
            <section id="homePageStyles_aboutWrap" style={{ borderColor: Colors.accentColor }}>
                <Wrapper styles={{ justifyContent: 'space-evenly' }}>
                    <div id="homePageStyles_aboutImgWrap" style={{ borderColor: Colors.accentColor }}>
                        <img id="homePageStyles_aboutImg" alt="caitlyn" src={require('../../assets/images/cait.JPG')} />
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
                                <button id="homePageStyles_aboutBtn">READ MORE</button>
                            </Link>
                        </Wrapper>
                    </div>
                </Wrapper>
            </section>
            <RecentPosts fetchRecentPosts={fetchRecentPosts} recentPosts={recentPosts} loading={loading} fetchedRecentPosts={fetchedRecentPosts} />
        </article>
    );
};

HomePage.propTypes = {
    setModal: PropTypes.func.isRequired,
    fetchRecentPosts: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    post: state.post
});

export default connect(mapStateToProps, { setModal, fetchRecentPosts })(HomePage);