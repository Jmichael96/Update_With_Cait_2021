import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
    AiFillEyeInvisible,
    AiFillEye
} from 'react-icons/ai';
import { connect } from 'react-redux';
import { login } from '../../../store/actions/auth';
import { withRouter } from 'react-router-dom';
import { setModal } from '../../../store/actions/modal';

// styles
import './login.css';

const Login = ({ login, setModal, auth: { isAuthenticated, loading }, history }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    // set for password to be visible 
    const [showPassword, setShowPassword] = useState(false);
    // set true or false for when the form is submitted
    const [isSubmitted, setIsSubmitted] = useState(false);
    // when to render the loading
    const [renderSpinner, setRenderSpinner] = useState(false);

    const { email, password } = formData;

    // checking if the store is loading and if the form is submitted in order to render the spinner
    useEffect(() => {
        if (loading && isSubmitted) {
            setRenderSpinner(true);
        }
        else if (loading && !isSubmitted) {
            setRenderSpinner(false);
        }
    }, [loading, isSubmitted]);

    // use effect to watch isAuthenticated and route to home page if its true
    useEffect(() => {
        if (isAuthenticated) {
            history.push('/');
        }
    }, [isAuthenticated]);

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    // for rendering the correct icon for show password/hide password
    const renderIcons = () => {
        if (showPassword) {
            return <AiFillEyeInvisible onClick={() => setShowPassword(false)} className="passwordIcon" />
        } else if (!showPassword) {
            return <AiFillEye onClick={() => setShowPassword(true)} className="passwordIcon" />
        }
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            setModal('error', 'error', 'Please make sure to fill out each form', 'Okay', () => { });
            return;
        }
        let formData = {
            email,
            password
        };
        // submitted form to true for spinner
        setIsSubmitted(true);
        try {
            // login action
            await login(formData);
        } catch (err) {

        }
        // setting is submitted to false
        setIsSubmitted(false);
    };

    return (
        <article id="loginStyles_formWrap">
            <form onSubmit={(e) => onSubmitHandler(e)} id="loginStyles_form">
                <input
                    type="email"
                    id="loginEmail"
                    className="loginStyles_input"
                    name="email"
                    value={email}
                    placeholder="E-mail"
                    onChange={(e) => onChange(e)}
                />
                <div id="loginStyles_passwordWrap">
                    <input
                        type={!showPassword ? 'password' : 'text'}
                        id="loginPassword"
                        className="loginStyles_input"
                        value={password}
                        onChange={(e) => onChange(e)}
                        name="password"
                        placeholder="password"
                    />
                    {renderIcons()}
                </div>
                <div className="loginStyles_actionWrap">
                    {!renderSpinner ?
                        <button type="submit" id="loginStyles_submitBtn" >
                            SUBMIT
                        </button>
                        :
                        <p>Loading...</p>
                    }
                </div>
            </form>
        </article>
    );
};

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    setModal: PropTypes.func.isRequired,
    history: PropTypes.any,
};

const mapStateToProps = state => ({
    auth: state.auth
});

const exportLogin = withRouter(Login);

export default connect(
    mapStateToProps,
    { login, setModal }
)(exportLogin);
