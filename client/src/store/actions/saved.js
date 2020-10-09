import axios from 'axios';
import * as types from './types';
import { setAlert } from './alert';

// save post
export const savePost = ({ ...formData }) => (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    axios.post('/api/save/save_post', formData, config)
        .then((res) => {
            dispatch({
                type: types.SAVE_POST,
                payload: res.data.savedPost
            });
            dispatch(setAlert(res.data.serverMsg, 'success'));
        })
        .catch((err) => {
            const error = err.response.data.serverMsg;
            if (error) {
                dispatch(setAlert(error, 'error'));
            }
            dispatch({
                type: types.SAVE_ERROR,
            });
        });
};

// fetch all the saved posts
export const fetchSaved = () => (dispatch) => {
    axios.get('/api/save/fetch_saved')
        .then((res) => {
            dispatch({
                type: types.FETCH_SAVED,
                payload: res.data.savedPosts
            })
        })
        .catch((err) => {
            const error = err.response.data.serverMsg;
            if (error) {
                dispatch(setAlert(error, 'error'));
            }
            dispatch({
                type: types.SAVE_ERROR,
            });
        });
};

// delete a saved post
export const deleteSaved = (id) => (dispatch) => {
    axios.delete(`/api/save/delete_saved/${id}`)
        .then((res) => {
            dispatch({
                type: types.DELETE_SAVED,
                payload: id
            });
            dispatch(setAlert(res.data.serverMsg, 'success'));
        })
        .catch((err) => {
            const error = err.response.data.serverMsg;
            if (error) {
                dispatch(setAlert(error, 'error'));
            }
            dispatch({
                type: types.SAVE_ERROR,
            });
        });
};

// fetch a single saved post
export const fetchSavedPost = (id) => (dispatch) => {
    axios.get(`/api/save/fetch_saved_post/${id}`)
        .then((res) => {
            dispatch({
                type: types.FETCH_SAVED_POST,
                payload: res.data.savedPost
            })
        })
        .catch((err) => {
            const error = err.response.data.serverMsg;
            if (error) {
                dispatch(setAlert(error, 'error'));
            }
            dispatch({
                type: types.SAVE_ERROR,
            });
        });
};

// resave a post
export const resavePost = (id, history, { ...formData }) => (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    axios.put(`/api/save/resave_post/${id}`, formData, config)
        .then((res) => {
            dispatch({
                type: types.RESAVE_POST,
                payload: {
                    id: id,
                    post: res.data.savedPost
                }
            });
            dispatch(setAlert(res.data.serverMsg, 'success'));
            history.push('/saved');
        })
        .catch((err) => {
            const error = err.response.data.serverMsg;
            if (error) {
                dispatch(setAlert(error, 'error'));
            }
            dispatch({
                type: types.SAVE_ERROR,
            });
        });
};

// publish a saved post
export const publishSavedPost = (savedId, history, { ...formData }) => (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    console.log(savedId, formData);
    axios.post('/api/save/publish_saved_post', { savedId, formData }, config)
        .then((res) => {
            // this is for unsaving a post and removing it from the saved reducer
            dispatch({
                type: types.PUBLISH_SAVED_POST_REMOVE,
                payload: savedId
            });
            // this is for adding post the post reducer
            dispatch({
                type: types.PUBLISH_SAVED_POST_ADD,
                payload: res.data.newPost
            });
            dispatch(setAlert(res.data.serverMsg, 'success'));
            const publishedId = res.data.newPost._id;
            if (!publishedId) {
                return;
            }
            history.push(`/post_content/${publishedId}`);
        })
        .catch((err) => {
            const error = err.response.data.serverMsg;
            if (error) {
                dispatch(setAlert(error, 'error'));
            }
            dispatch({
                type: types.SAVE_ERROR,
            });
            dispatch({
                type: types.POST_ERROR,
            });
        });
};