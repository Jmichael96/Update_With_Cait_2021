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
        case types.USER_LOADING_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                user: payload,
                loading: false
            };
        case types.LOGIN_SUCCESS:
            localStorage.setItem('token', payload.token);
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false
            };
        case types.LOGOUT:
            return {
                ...state,
                loading: true
            };
        case types.LOGOUT_FAIL:
            return {
                ...state,
                loading: false
            };
        case types.USER_LOADING_FAIL:
        case types.LOGOUT_SUCCESS:
            localStorage.removeItem('token')
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                user: null
            }
        default: return state;
    }
};