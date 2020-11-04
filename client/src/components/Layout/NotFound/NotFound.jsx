import React from 'react';

// components
import Wrapper from '../Wrapper/Wrapper';

// styles
import './notFound.css';

const NotFound = () => {
    return (
        <article>
            <h1 id="errorTitle">ERROR 404</h1>
            <Wrapper>
                <div class="bubble">
                    <div class="bubbleContent">
                        <p class="quote">I find your lack of navigation disturbing...</p>
                    </div>
                </div>
            </Wrapper>
            <Wrapper>
                <img id="vaderImg" src={require('../../../assets/images/vader.png')} />
            </Wrapper>
        </article>
    )
};

export default NotFound;