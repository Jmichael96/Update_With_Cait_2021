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

// components 
import SmSpinner from '../../Layout/SmSpinner/SmSpinner';
import Button from '../../Button/Button';

// utils
import Colors from '../../../utils/constants/Colors';

const Login = ({ login, setModal, auth: { isAuthenticated, loading }, history }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    // set for password to be visible 
    const [showPassword, setShowPassword] = useState(false);
    // extracting formData 
    const { email, password } = formData;

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
            setModal('error', 'form error', 'Please make sure to fill out each form', 'Okay', () => { });
            return;
        }
        try {
            let formData = {
                email,
                password
            };
            // login action
            await login(formData);
        } catch (err) {

        }
    };
    return (
        <article id="loginStyles_formWrap" style={{ backgroundColor: Colors.secondaryBgColor }}>
            <form id="loginStyles_form">
                <div>
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
                        <Button onClick={(e) => onSubmitHandler(e)} >
                            {!loading ? 'SUBMIT' : <SmSpinner />}
                        </Button>
                    </div>
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
