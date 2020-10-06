import axios from 'axios';
import { setAlert } from './alert';
import * as types from './types';

// create post
export const createPost = ({ ...formData }) => (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    axios.post('/api/posts/create_post', formData, config)
        .then((res) => {
            dispatch({
                type: types.CREATE_POST,
                payload: res.data.post
            });
            dispatch(setAlert(res.data.serverMsg, 'success'));
        })
        .catch((err) => {
            const error = err.response.data.serverMsg;
            if (error) {
                dispatch(setAlert(error, 'error'));
            }
            dispatch({
                type: types.POST_ERROR,
            });
        });
};

// fetch a single post
export const fetchPost = (id) => (dispatch) => {
    axios.get(`/api/posts/fetch_post/${id}`)
        .then((res) => {
            dispatch({
                type: types.FETCH_POST,
                payload: res.data
            });
        })
        .catch((err) => {
            const error = err.response.data.serverMsg;
            if (error) {
                dispatch(setAlert(error, 'error'));
            }
            dispatch({
                type: types.POST_ERROR,
            });
        });
};

// fetch lifestyle posts
export const fetchLifestyle = () => (dispatch) => {
    axios.get('/api/posts/fetch_lifestyle')
        .then((res) => {
            dispatch({
                type: types.FETCH_LIFESTYLE,
                payload: res.data.posts
            });
        })
        .catch((err) => {
            const error = err.response.data.serverMsg;
            if (error) {
                dispatch(setAlert(error, 'error'));
            }
            dispatch({
                type: types.POST_ERROR,
            });
        });
};