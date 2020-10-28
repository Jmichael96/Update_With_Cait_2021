import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { AiOutlineMail } from 'react-icons/ai';
import { useSelector } from 'react-redux';

// styles
import './subscribe.css';

// utils
import Colors from '../../utils/constants/Colors';
import isEmpty from '../../utils/isEmpty';

// components
import Wrapper from '../Layout/Wrapper/Wrapper';
import Button from '../Button/Button';
import SmSpinner from '../Layout/SmSpinner/SmSpinner';

const Subscribe = ({ setModal, subscribe }) => {
    // form data state
    const [formData, setFormData] = useState({
        name: '',
        email: ''
    });

    // extracting data from formData obj
    const { name, email } = formData;

    // selecting the state loading data from subscribe reducer
    const subData = useSelector((state) => state.subscribe);

    // on change handler
    const onChangeHandler = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    // on submit handler
    const onSubmitHandler = useCallback(async (e) => {
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
        await subscribe(name, email);
        resetForm();
    }, [name, email, subscribe, setModal]);

    // reset the form
    const resetForm = () => {
        setFormData({
            name: '',
            email: ''
        });
    };

    return (
        <section id="subscribeStyles_root">
            <Wrapper styles={{ margin: '0 1rem' }}>
                <div id="subscribeStyles_cardContentWrap" style={{ backgroundColor: Colors.cardBg }}>
                    <p id="subscribeStyles_infoText" style={{ color: Colors.cardText }}>
                        Subscribe below and get the latest blog updates!
                    </p>
                    <form id="subscribeStyles_form">
                        <Wrapper styles={{ justifyContent: 'center' }}>
                            <input
                                name="name"
                                type="text"
                                placeholder="Full Name"
                                className="subscribeStyles_input"
                                onChange={onChangeHandler}
                                value={name}
                            />
                            <input
                                name="email"
                                type="text"
                                placeholder="your@email.com"
                                onChange={onChangeHandler}
                                className="subscribeStyles_input"
                                value={email}
                            />
                        </Wrapper>
                        <Wrapper>
                            <Button onClick={(e) => onSubmitHandler(e)}>{!subData.loading ? <span>Subscribe <AiOutlineMail className="subscribeStyles_mailIcon" /></span> : <SmSpinner />}</Button>
                        </Wrapper>
                    </form>
                </div>
            </Wrapper>
        </section>
    );
};

Subscribe.propTypes = {
    setModal: PropTypes.func.isRequired,
    subscribe: PropTypes.func.isRequired,
};

export default Subscribe;