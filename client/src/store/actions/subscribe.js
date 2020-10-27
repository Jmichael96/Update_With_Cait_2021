import axios from 'axios';
import * as types from '../actions/types';
import { setAlert } from './alert';

//! NEW SUBSCRIPTION
export const subscribe = (name, email) => (dispatch) => {
    dispatch({
        type: types.SUBSCRIBE
    });
    dispatch(subscribeSuccess(name, email));
};

export const subscribeSuccess = (name, email) => (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    axios.post('/api/subscribe/new_sub', { name, email }, config)
        .then((res) => {
            dispatch({
                type: types.SUBSCRIBE_SUCCESS
            });
            dispatch(setAlert(res.data.serverMsg, 'success'));
        })
        .catch((err) => {
            const error = err.response.data.serverMsg;
            if (error) {
                dispatch(setAlert(error, 'error'));
            }
            dispatch({
                type: types.SUBSCRIBE_FAIL,
            });
        });
};

//! UNSUBSCRIBE
export const unSubscribe = (email) => (dispatch) => {
    dispatch({
        type: types.UNSUBSCRIBE
    });
    dispatch(unSubscribeSuccess(email));
};

export const unSubscribeSuccess = (email) => (dispatch) => {

    axios.delete('/api/subscribe/unsubscribe', {
        params: {
            email: email
        }
    }).then((res) => {
        dispatch({
            type: types.UNSUBSCRIBE_SUCCESS,
        });
        dispatch(setAlert(res.data.serverMsg, 'success'));
    })
        .catch((err) => {
            const error = err.response.data.serverMsg;
            if (error) {
                dispatch(setAlert(error, 'error'));
            }
            dispatch({
                type: types.UNSUBSCRIBE_FAIL,
            });
        });
};

//! FETCH SUBS
export const fetchSubs = () => (dispatch) => {
    dispatch({
        type: types.FETCH_SUBS
    });
    dispatch(fetchSubsSuccess());
};

export const fetchSubsSuccess = () => (dispatch) => {
    axios.get('/api/subscribe/fetch_subs') 
    .then((res) => {
        dispatch({
            type: types.FETCH_SUBS_SUCCESS,
            payload: res.data.subs
        });
        dispatch(setAlert(res.data.serverMsg, 'success'));
    })
    .catch((err) => {
        const error = err.response.data.serverMsg;
        if (error) {
            dispatch(setAlert(error, 'error'));
        }
        dispatch({
            type: types.FETCH_SUBS_FAIL,
        });
    });
};