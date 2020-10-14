import axios from 'axios';
import { setAlert } from './alert';
import * as types from './types';
import setAuthToken from '../../utils/setAuthToken';

//! LOAD USER
export const loadUser = () => (dispatch) => {
    dispatch({
        type: types.USER_LOADING
    });
    dispatch(loadUserSuccess());
};

export const loadUserSuccess = () => (dispatch) => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }

    axios.get('/api/auth/load_user')
        .then((res) => {
            dispatch({
                type: types.USER_LOADING_SUCCESS,
                payload: res.data
            });
        })
        .catch((err) => {
            dispatch({
                type: types.USER_LOADING_FAIL
            });
        });
};

//! LOGIN
export const login = ({ email, password }) => dispatch => {
    dispatch({
        type: types.LOGIN
    });
    dispatch(loginSuccess(email, password));
};

export const loginSuccess = (email, password) => (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const formData = { email, password };

    axios.post('/api/auth/login', formData, config)
        .then((res) => {
            dispatch({
                type: types.LOGIN_SUCCESS,
                payload: res.data
            });
            dispatch(loadUser());
            dispatch(setAlert('Logged in successfully, hi babe!', 'success'));
        })
        .catch((err) => {
            const error = err.response.data.serverMsg;
            if (error) {
                dispatch(setAlert(error, 'error'));
            }
            dispatch({
                type: types.LOGIN_FAIL
            });
        });
};

//! LOGOUT 
export const logout = () => dispatch => {
    dispatch({ type: types.LOGOUT });
    dispatch(logoutSuccess());
}
export const logoutSuccess = () => (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    axios.put('/api/auth/logout', config)
        .then((res) => {
            dispatch({
                type: types.LOGOUT_SUCCESS
            });
            dispatch(setAlert('You have successfully logged out. Goodbye Caitlyn!', 'success'));
        })
        .catch((err) => {
            const error = err.response.data.serverMsg;
            if (error) {
                dispatch(setAlert(error, 'error'));
            }
            dispatch({
                type: types.LOGOUT_FAIL
            });
        });
};