import * as types from '../actions/types';

const initialState = {
    isOpen: false,
    modalData: {
        modalType: null,
        modalTitle: null,
        modalContent: null,
        modalActionText: null,
        modalAction: () => { },
        Component: null
    }
};

export default (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case types.SET_MODAL:
            return {
                ...state,
                modalData: payload,
                isOpen: true
            }
        case types.REMOVE_MODAL:
            return initialState;
        default: return state;
    };
};