import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { } from '../../store/actions/post';

// styles
import './homePage.css';

// components
import isEmpty from '../../utils/isEmpty';

const HomePage = ({ }) => {


    return (
        <article id="homePageStyles_root">
            <section id="homePageStyles_introImageWrap">
                <div id="homePageStyles_introInnerWrap">
                    <img className="homePageStyles_underlayImgLeft" src={require('../../assets/images/widemountain2.jpg')} />
                    <img id="homePageStyles_mainImg" src={require('../../assets/images/cait.JPG')} />
                    <img className="homePageStyles_underlayImgRight" src={require('../../assets/images/widemountain1.jpg')} />
                </div>
            </section>
        </article>
    );
};

HomePage.propTypes = {

};

const mapStateToProps = (state) => ({
    post: state.post
});

export default connect(mapStateToProps, {})(HomePage);