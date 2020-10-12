import * as types from './types';

export const setModal = (modalType, modalTitle, modalText, modalActionText, modalAction) => (dispatch) => {
    dispatch({
        type: types.SET_MODAL,
        payload: {
            modalType,
            modalTitle,
            modalText,
            modalActionText,
            modalAction,
        }
    });
};

export const removeModal = () => (dispatch) => {
    dispatch({
        type: types.REMOVE_MODAL
    });
};