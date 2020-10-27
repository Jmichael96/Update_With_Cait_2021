import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { unSubscribe } from '../../store/actions/subscribe';
import { setModal } from '../../store/actions/modal';

// styles
import './unSubscribePage.css';

// components
import SmSpinner from '../../components/Layout/SmSpinner/SmSpinner';
import Button from '../../components/Button/Button';
import Wrapper from '../../components/Layout/Wrapper/Wrapper';

// utils
import Colors from '../../utils/constants/Colors';
import isEmpty from '../../utils/isEmpty';

const UnSubscribePage = ({ sub: { loading }, unSubscribe, setModal }) => {
    const [email, setEmail] = useState('');

    // on submit
    const onSubmitHandler = useCallback(async (e) => {
        e.preventDefault();
        // email regex
        const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (isEmpty(email)) {
            setModal('error', 'email error', 'Please make sure to submit an email.', 'okay', () => { });
            return;
        }
        if (!emailRegex.test(email)) {
            setModal('error', 'email error', 'Please enter a valid email', 'okay', () => { });
            return;
        }
        console.log(email);
        await unSubscribe(email);
        resetInput();
    }, [unSubscribe, email]);

    // empty input email
    const resetInput = () => {
        setEmail('');
    };

    return (
        <article id="unsubscribeStyles_root">
            <section id="unsubscribeStyles_formWrap" style={{ backgroundColor: Colors.secondaryBgColor }}>
                <form id="unsubscribeStyles_form">
                    <Wrapper>
                        <input
                            type="text"
                            placeholder="your@email.com"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            id="unsubscribeStyles_input"
                        />
                    </Wrapper>
                    <Wrapper>
                        <Button onClick={(e) => onSubmitHandler(e)} >
                            {!loading ? 'SUBMIT' : <SmSpinner />}
                        </Button>
                    </Wrapper>
                </form>
            </section>
        </article>
    )
};

UnSubscribePage.propTypes = {
    unSubscribe: PropTypes.func.isRequired,
    setModal: PropTypes.func.isRequired,
    sub: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    sub: state.subscribe
});

export default connect(mapStateToProps, { unSubscribe, setModal })(UnSubscribePage);