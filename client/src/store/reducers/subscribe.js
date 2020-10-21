import * as types from '../actions/types';

const initialState = {
    loading: false
};

export default function (state = initialState, action) {
    const { type } = action;

    switch (type) {
        case types.SUBSCRIBE:
            return {
                ...state,
                loading: true
            };
        case types.SUBSCRIBE_FAIL:
        case types.SUBSCRIBE_SUCCESS:
            return {
                ...state,
                loading: false
            };
        default: return state;
    };
};