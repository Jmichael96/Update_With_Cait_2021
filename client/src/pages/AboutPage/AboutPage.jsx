import React, { useEffect, useState } from 'react';

// styles
import './aboutPage.css';

// utils
import Colors from '../../utils/constants/Colors';

// components
import Wrapper from '../../components/Layout/Wrapper/Wrapper';

const AboutPage = () => {
    // set whether or not the mobile nav should be set
    const [mobilize, setMobilize] = useState(null);
    // listener for the windows width
    useEffect(() => {
        resizeHandler();
        window.addEventListener('resize', resizeHandler);

        return () => window.removeEventListener('resize', resizeHandler);
    }, []);
    // function to handle inside the resize event listener
    const resizeHandler = () => {
        if (window.innerWidth >= 1025) {
            setMobilize(false);
        } else if (window.innerWidth <= 1024) {
            setMobilize(true);
        }
    };

    return (
        <article id="aboutPageStyles_root">
            {mobilize === true &&
                <Wrapper styles={{ overflow: 'hidden', marginTop: '2rem' }}>
                    <div className="aboutPageStyles_pRoidWrap">
                        <img alt="polaroid" className="aboutPageStyles_polaroidImg" src={require('../../assets/images/polaroid.png')} />
                        <img alt="poloroid picture" className="aboutPageStyles_innerImg" src={require('../../assets/images/footerImages/footerImg9.JPG')} />
                        <img alt="thumbtack" className="aboutPageStyles_thumbtack" src={require('../../assets/images/thumbtack.png')} />
                    </div>
                </Wrapper>}
            {mobilize === false &&
                <Wrapper styles={{ overflow: 'hidden', marginTop: '2rem' }}>
                    <div className="aboutPageStyles_pRoidWrap">
                        <img alt="polaroid" className="aboutPageStyles_polaroidImg" src={require('../../assets/images/polaroid.png')} />
                        <img alt="poloroid picture" className="aboutPageStyles_innerImg" src={require('../../assets/images/aboutImages/aboutImg2.JPG')} />
                        <img alt="thumbtack" className="aboutPageStyles_thumbtack" src={require('../../assets/images/thumbtack.png')} />
                    </div>
                    <div className="aboutPageStyles_pRoidWrap">
                        <img alt="polaroid" className="aboutPageStyles_polaroidImg" src={require('../../assets/images/polaroid.png')} />
                        <img alt="poloroid picture" className="aboutPageStyles_innerImg" src={require('../../assets/images/footerImages/footerImg2.JPG')} />
                        <img alt="thumbtack" className="aboutPageStyles_thumbtack" src={require('../../assets/images/thumbtack.png')} />
                    </div>
                    <div className="aboutPageStyles_pRoidWrap">
                        <img alt="polaroid" className="aboutPageStyles_polaroidImg" src={require('../../assets/images/polaroid.png')} />
                        <img alt="poloroid picture" className="aboutPageStyles_innerImg" src={require('../../assets/images/aboutImages/aboutImg3.JPG')} />
                        <img alt="thumbtack" className="aboutPageStyles_thumbtack" src={require('../../assets/images/thumbtack.png')} />
                    </div>
                    <div className="aboutPageStyles_pRoidWrap">
                        <img alt="polaroid" className="aboutPageStyles_polaroidImg" src={require('../../assets/images/polaroid.png')} />
                        <img alt="poloroid picture" className="aboutPageStyles_innerImg" src={require('../../assets/images/aboutImages/aboutImg4.JPG')} />
                        <img alt="thumbtack" className="aboutPageStyles_thumbtack" src={require('../../assets/images/thumbtack.png')} />
                    </div>
                    <div className="aboutPageStyles_pRoidWrap">
                        <img alt="polaroid" className="aboutPageStyles_polaroidImg" src={require('../../assets/images/polaroid.png')} />
                        <img alt="poloroid picture" className="aboutPageStyles_innerImg" src={require('../../assets/images/aboutImages/aboutImg1.JPG')} />
                        <img alt="thumbtack" className="aboutPageStyles_thumbtack" src={require('../../assets/images/thumbtack.png')} />
                    </div>
                </Wrapper>}
            <h2 id="aboutPageStyles_title">About Cait And The Update</h2>
            <Wrapper>
                <section id="aboutPageStyles_contentWrap" style={{ backgroundColor: Colors.accentColor }}>
                    <p className="aboutPageStyles_aboutText">As some of you may know,
                    this is the third Update With Cait blog.
                    The journey originally started about a decade ago on Blogspot where
                    I shared songs I had written (I know – yikes!). The song blog shifted into
                    a collection of stories (another big yikes), only to take a final shift to a
                    collection of my life experiences, devotionals and diverse topics.
                    I’ve been back and forth throughout these last ten years and after
                        an almost two-year blogging hiatus, I'm back!</p>
                    <p className="aboutPageStyles_aboutText">Quick shout-out though! Much love and
                    thanks to my web-developer boyfriend, Jeffrey, for creating this website
                    for me and being so accommodating throughout the process.
                        If you need a website, he’s your guy!</p>
                    <p className="aboutPageStyles_aboutText">So here’s a little about me…</p>
                    <p className="aboutPageStyles_aboutText">I’m Caitlyn Ellis and I’m a current student at the
                    C.T. Bauer College of Business at the University of Houston pursuing a master’s
                    degree in accounting. I’m a member of two accounting clubs within Bauer and an
                    officer for one of them. Outside of school, I’m an amateur power-builder with
                    the hope of competing in strongman competitions after graduation,
                        and I spend a lot of time snuggling my cat.</p>
                    <p className="aboutPageStyles_aboutText">But enough about me.
                        let me tell you a little more about the purpose of the update…</p>
                    <p className="aboutPageStyles_aboutText">I’m a firm believer that one of the best
                    ways I can spread God’s word is through writing. I feel this is the way I
                    reach the largest audience and the way I get people to genuinely listen.
                    As christians, we are called to spread the gospel and love one another,
                    and that’s what I hope to do with this blog in addition to sharing my regular life.
                        If you’re in need of positivity, you’re in the right place.</p>
                    <p className="aboutPageStyles_aboutText">Welcome to the update.</p>
                </section>
            </Wrapper>
            {mobilize === true &&
                <Wrapper styles={{ overflow: 'hidden', marginTop: '2rem' }}>
                    <div className="aboutPageStyles_pRoidWrap">
                        <img alt="polaroid" className="aboutPageStyles_polaroidImg" src={require('../../assets/images/polaroid.png')} />
                        <img alt="poloroid picture" className="aboutPageStyles_innerImg" src={require('../../assets/images/footerImages/footerImg1.JPG')} />
                        <img alt="thumbtack" className="aboutPageStyles_thumbtack" src={require('../../assets/images/thumbtack.png')} />
                    </div>
                </Wrapper>}
        </article>
    );
};

export default AboutPage;