import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { AiOutlineMail } from 'react-icons/ai';

// styles
import './subscribe.css';

// utils
import Colors from '../../utils/constants/Colors';
import isEmpty from '../../utils/isEmpty';

// components
import Wrapper from '../Layout/Wrapper/Wrapper';

const Subscribe = ({ setModal }) => {
    // form data state
    const [formData, setFormData] = useState({
        name: '',
        email: ''
    });

    // extracting data from formData obj
    const { name, email } = formData;

    // on change handler
    const onChangeHandler = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    // on submit handler
    const onSubmitHandler = (e) => {
        e.preventDefault();
        // email regex
        const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (isEmpty(name) || isEmpty(email)) {
            setModal('error', 'form error', 'Please make sure to fill out both inputs', 'okay', () => { });
            return;
        }
        // check if the email is valid
        if (!emailRegex.test(email)) {
            setModal('error', 'form error', 'The email you have submitted is not in the correct format', 'okay', () => { });
            return;
        }
    };

    return (
        <section id="subscribeStyles_root">
            <Wrapper>
                <div id="subscribeStyles_cardContentWrap" style={{ backgroundColor: Colors.accentColor }}>
                    <p id="subscribeStyles_infoText">
                        Subscribe to get notified when the latest and new blogs drop!
                    </p>
                    <form id="subscribeStyles_form" onSubmit={(e) => { onSubmitHandler(e) }}>
                        <Wrapper styles={{ justifyContent: 'center' }}>
                            <input
                                name="name"
                                type="text"
                                placeholder="First Name"
                                className="subscribeStyles_input"
                                onChange={onChangeHandler}
                            />
                            <input
                                name="email"
                                type="text"
                                placeholder="your@email.com"
                                onChange={onChangeHandler}
                                className="subscribeStyles_input"
                            />
                        </Wrapper>
                        <Wrapper>
                            <button type="submit" id="subscribeStyles_submitBtn">SUBSCRIBE{' '}<AiOutlineMail className="subscribeStyles_mailIcon" /></button>
                        </Wrapper>
                    </form>
                </div>
            </Wrapper>
        </section>
    );
};

Subscribe.propTypes = {
    setModal: PropTypes.func.isRequired,
};

export default Subscribe;