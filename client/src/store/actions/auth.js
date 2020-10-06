import axios from 'axios';
import { setAlert } from './alert';
import * as types from './types';
import setAuthToken from '../../utils/setAuthToken';

// Load User
export const loadUser = () => (dispatch) => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }

    axios.get('/api/auth/load_user')
        .then((res) => {
            dispatch({
                type: types.USER_LOADED,
                payload: res.data
            });
        })
        .catch((err) => {
            dispatch({
                type: types.NOT_AUTHENTICATED
            });
        });
};

// register
export const register = ({ ...formData }) => dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    axios.post('/api/auth/register', formData, config)
        .then((res) => {
            dispatch({
                type: types.REGISTER_SUCCESS,
                payload: res.data
            });
            dispatch(loadUser());
            dispatch(setAlert('Successfully registered!', 'success'))

        })
        .catch((err) => {
            const error = err.response.data.serverMsg;
            if (error) {
                dispatch(setAlert(error, 'danger'));
            }
            dispatch({
                type: types.REGISTER_FAIL
            });
        });
};

// login
export const login = ({ email, password }) => dispatch => {
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
            dispatch(setAlert('Logged in successfully', 'success'));
        })
        .catch((err) => {
            const error = err.response.data.serverMsg;
            if (error) {
                dispatch(setAlert(error, 'danger'));
            }
            dispatch({
                type: types.LOGIN_FAIL
            });
        });
};

// logout 
export const logout = () => dispatch => {
    dispatch({ type: types.LOGOUT });
    dispatch(setAlert('You have successfully logged out!', 'success'));
}