import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { } from '../../store/actions/post';
import { setModal } from '../../store/actions/modal';

// styles
import './homePage.css';

// components
import Wrapper from '../../components/Layout/Wrapper/Wrapper';
import PostCategories from '../../components/Post/PostCategories/PostCategories';
import Subscribe from '../../components/Subscribe/Subscribe';

// utils
import isEmpty from '../../utils/isEmpty';
import Colors from '../../utils/constants/Colors';

const HomePage = ({ setModal }) => {


    return (
        <article id="homePageStyles_root">
            <section id="homePageStyles_introImageWrap">
                <div id="homePageStyles_introInnerWrap">
                    <img className="homePageStyles_underlayImgLeft" src={require('../../assets/images/widemountain2.jpg')} />
                    <img className="homePageStyles_underlayImgRight" src={require('../../assets/images/widemountain1.jpg')} />
                </div>
                <img id="homePageStyles_mainImg" src={require('../../assets/images/cait2.JPG')} />
            </section>
            {/* <section id="homePageStyles_aboutWrap" style={{ backgroundColor: Colors.accentColor }}>
                <div id="homePageStyles_aboutPWrap">
                    <p className="homePageStyles_pText">
                        passionate about being the hands and feet of god and spreading the good news through writing.
                        just here to be a friend to all. welcome to the update with cait!
                    </p>
                </div>
            </section> */}
            <Subscribe setModal={setModal} />
            <PostCategories />
        </article>
    );
};

HomePage.propTypes = {
    setModal: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    post: state.post
});

export default connect(mapStateToProps, { setModal })(HomePage);