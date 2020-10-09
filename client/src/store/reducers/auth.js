import * as types from '../actions/types';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null
};

export default (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case types.LOGIN:
        case types.USER_LOADING:
            return {
                ...state,
                user: null,
                loading: true
            };
        case types.LOGIN_SUCCESS:
        case types.USER_LOADING_SUCCESS:
            localStorage.setItem('token', payload.token);
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false
            };
        case types.USER_LOADING_FAIL:
        case types.LOGOUT:
            localStorage.removeItem('token')
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false
            }
        default: return state;
    }
};