import axios from 'axios';
import * as types from './types';
import { setAlert } from './alert';

//! SAVE POST
export const savePost = ({ ...formData }) => (dispatch) => {
    dispatch({
        type: types.SAVE_POST
    });
    dispatch(savePostSuccess(formData));
};
export const savePostSuccess = (formData) => (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    axios.post('/api/save/save_post', formData, config)
        .then((res) => {
            dispatch({
                type: types.SAVE_POST_SUCCESS,
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
                type: types.SAVE_POST_FAIL,
            });
        });
};

//! FETCH ALL SAVED POSTS
export const fetchSaved = () => (dispatch) => {
    dispatch({
        type: types.FETCH_SAVED
    });
    dispatch(fetchSavedSuccess());
};

export const fetchSavedSuccess = () => (dispatch) => {
    axios.get('/api/save/fetch_saved')
        .then((res) => {
            dispatch({
                type: types.FETCH_SAVED_SUCCESS,
                payload: res.data.savedPosts
            })
        })
        .catch((err) => {
            const error = err.response.data.serverMsg;
            if (error) {
                dispatch(setAlert(error, 'warning'));
            }
            dispatch({
                type: types.FETCH_SAVED_FAIL,
            });
        });
};

//! DELETE SAVED POST
export const deleteSaved = (id) => (dispatch) => {
    dispatch({
        type: types.DELETE_SAVED
    });
    dispatch(deleteSavedSuccess(id));
};
export const deleteSavedSuccess = (id) => (dispatch) => {
    axios.delete(`/api/save/delete_saved/${id}`)
        .then((res) => {
            dispatch({
                type: types.DELETE_SAVED_SUCCESS,
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
                type: types.DELETE_SAVED_FAIL,
            });
        });
};

//! FETCH A SINGLE SAVED POST
export const fetchSavedPost = (id) => (dispatch) => {
    dispatch({
        type: types.FETCH_SAVED_POST
    });
    dispatch(fetchSavedPostSuccess(id));
};
export const fetchSavedPostSuccess = (id) => (dispatch) => {
    axios.get(`/api/save/fetch_saved_post/${id}`)
        .then((res) => {
            dispatch({
                type: types.FETCH_SAVED_POST_SUCCESS,
                payload: res.data.savedPost
            })
        })
        .catch((err) => {
            const error = err.response.data.serverMsg;
            if (error) {
                dispatch(setAlert(error, 'error'));
            }
            dispatch({
                type: types.FETCH_SAVED_POST_FAIL,
            });
        });
};

//! RESAVE A POST
export const resavePost = (id, history, { ...formData }) => (dispatch) => {
    dispatch({
        type: types.RESAVE_POST
    });
    dispatch(resavePostSuccess(id, history, formData));
};

export const resavePostSuccess = (id, history, formData) => (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    axios.put(`/api/save/resave_post/${id}`, formData, config)
        .then((res) => {
            dispatch({
                type: types.RESAVE_POST_SUCCESS,
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
                type: types.RESAVE_POST_FAIL,
            });
        });
};

//! PUBLISH A SAVED POST
export const publishSavedPost = (savedId, history, { ...formData }) => (dispatch) => {
    dispatch({
        type: types.PUBLISH_SAVED_POST_REMOVE
    });
    dispatch({
        type: types.PUBLISH_SAVED_POST_ADD
    });
    dispatch(publishSavedPostSuccess(savedId, history, formData));
};

export const publishSavedPostSuccess = (savedId, history, formData) => (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    axios.post('/api/save/publish_saved_post', { savedId, formData }, config)
        .then((res) => {
            // this is for unsaving a post and removing it from the saved reducer
            dispatch({
                type: types.PUBLISH_SAVED_POST_REMOVE_SUCCESS,
                payload: savedId
            });
            // this is for adding post the post reducer
            dispatch({
                type: types.PUBLISH_SAVED_POST_ADD_SUCCESS,
                payload: res.data.newPost
            });
            dispatch(setAlert(res.data.serverMsg, 'success'));
            history.push(`/post_content/${res.data.newPost._id}`);
        })
        .catch((err) => {
            const error = err.response.data.serverMsg;
            if (error) {
                dispatch(setAlert(error, 'error'));
            }
            dispatch({
                type: types.PUBLISH_SAVED_POST_ADD_FAIL,
            });
            dispatch({
                type: types.PUBLISH_SAVED_POST_REMOVE_FAIL,
            });
        });
};