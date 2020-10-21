import React from 'react';

// styles
import './aboutPage.css';

// utils
import Colors from '../../utils/constants/Colors';

// components
import Wrapper from '../../components/Layout/Wrapper/Wrapper';

const AboutPage = () => {
    return (
        <article id="aboutPageStyles_root">
            <h2 id="aboutPageStyles_title">About Cait And The Update</h2>
            <Wrapper styles={{ overflow: 'hidden' }}>
                <div className="aboutPageStyles_pRoidWrap">
                    <img alt="polaroid" className="aboutPageStyles_polaroidImg" src={require('../../assets/images/polaroid.png')} />
                    <img alt="poloroid picture" className="aboutPageStyles_innerImg" src={require('../../assets/images/footerImages/footerImg1.JPG')} />
                    <img alt="thumbtack" className="aboutPageStyles_thumbtack" src={require('../../assets/images/thumbtack.png')} />
                </div>
                <div className="aboutPageStyles_pRoidWrap">
                    <img alt="polaroid" className="aboutPageStyles_polaroidImg" src={require('../../assets/images/polaroid.png')} />
                    <img alt="poloroid picture" className="aboutPageStyles_innerImg" src={require('../../assets/images/footerImages/footerImg2.JPG')} />
                    <img alt="thumbtack" className="aboutPageStyles_thumbtack" src={require('../../assets/images/thumbtack.png')} />
                </div>
                <div className="aboutPageStyles_pRoidWrap">
                    <img alt="polaroid" className="aboutPageStyles_polaroidImg" src={require('../../assets/images/polaroid.png')} />
                    <img alt="poloroid picture" className="aboutPageStyles_innerImg" src={require('../../assets/images/cait.JPG')} />
                    <img alt="thumbtack" className="aboutPageStyles_thumbtack" src={require('../../assets/images/thumbtack.png')} />
                </div>
                <div className="aboutPageStyles_pRoidWrap">
                    <img alt="polaroid" className="aboutPageStyles_polaroidImg" src={require('../../assets/images/polaroid.png')} />
                    <img alt="poloroid picture" className="aboutPageStyles_innerImg" src={require('../../assets/images/cait3.JPG')} />
                    <img alt="thumbtack" className="aboutPageStyles_thumbtack" src={require('../../assets/images/thumbtack.png')} />
                </div>
                <div className="aboutPageStyles_pRoidWrap">
                    <img alt="polaroid" className="aboutPageStyles_polaroidImg" src={require('../../assets/images/polaroid.png')} />
                    <img alt="poloroid picture" className="aboutPageStyles_innerImg" src={require('../../assets/images/cait3.JPG')} />
                    <img alt="thumbtack" className="aboutPageStyles_thumbtack" src={require('../../assets/images/thumbtack.png')} />
                </div>
            </Wrapper>
            <section id="aboutPageStyles_contentWrap" style={{ backgroundColor: Colors.accentColor }}>

            </section>
        </article>
    );
};

export default AboutPage;