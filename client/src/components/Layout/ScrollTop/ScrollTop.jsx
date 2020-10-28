import React, { useState } from 'react';
import { FaArrowCircleUp } from 'react-icons/fa';

// styles
import './scrollTop.css';

const ScrollTop = () => {
    const [showScroll, setShowScroll] = useState(false);
    const checkScrollTop = () => {
        if (!showScroll && window.pageYOffset > 300) {
            setShowScroll(true)
        } else if (showScroll && window.pageYOffset <= 300) {
            setShowScroll(false)
        }
    };
    window.addEventListener('scroll', checkScrollTop)

    const scrollTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <FaArrowCircleUp
            className="scrollTopStyles_icon"
            onClick={scrollTop}
            style={{ display: !showScroll ? 'none' : 'block' }}
        />
    );
};

export default ScrollTop;