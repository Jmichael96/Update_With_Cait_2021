import * as types from '../actions/types';

const initialState = {
    subs: [],
    loading: false
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case types.SUBSCRIBE:
        case types.UNSUBSCRIBE:
        case types.FETCH_SUBS:
            return {
                ...state,
                loading: true
            };
        case types.SUBSCRIBE_FAIL:
        case types.SUBSCRIBE_SUCCESS:
        case types.UNSUBSCRIBE_FAIL:
        case types.UNSUBSCRIBE_SUCCESS:
        case types.FETCH_SUBS_FAIL:
            return {
                ...state,
                subs: [],
                loading: false
            };
        case types.FETCH_SUBS_SUCCESS:
            return {
                ...state,
                subs: payload,
                loading: false
            };
        default: return state;
    };
};