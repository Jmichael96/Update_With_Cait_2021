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