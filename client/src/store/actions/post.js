import axios from 'axios';
import { setAlert } from './alert';
import * as types from './types';

//! CREATE POST
export const createPost = (history, { ...formData }) => (dispatch) => {
    dispatch({
        type: types.CREATE_POST
    });
    dispatch(createPostSuccess(history, formData))
};

export const createPostSuccess = (history, formData) => (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    axios.post('/api/posts/create_post', formData, config)
        .then((res) => {
            dispatch({
                type: types.CREATE_POST_SUCCESS,
                payload: res.data.post
            });
            dispatch(setAlert(res.data.serverMsg, 'success'));
            // redirect once successfully created post
            history.push(`/post_content/${res.data.post._id}`);
        })
        .catch((err) => {
            const error = err.response.data.serverMsg;
            if (error) {
                dispatch(setAlert(error, 'error'));
            }
            dispatch({
                type: types.CREATE_POST_FAIL,
            });
        });
};


//! FETCH A SINGLE POST
export const fetchPost = (id) => (dispatch) => {
    dispatch({
        type: types.FETCH_POST
    });
    dispatch(fetchPostSuccess(id))
};
export const fetchPostSuccess = (id) => (dispatch) => {
    axios.get(`/api/posts/fetch_post/${id}`)
        .then((res) => {
            dispatch({
                type: types.FETCH_POST_SUCCESS,
                payload: res.data
            });
        })
        .catch((err) => {
            const error = err.response.data.serverMsg;
            if (error) {
                dispatch(setAlert(error, 'error'));
            }
            dispatch({
                type: types.FETCH_POST_FAIL,
            });
        });
};

//! FETCH LIFESTYLE POSTS
export const fetchLifestyle = () => (dispatch) => {
    dispatch({
        type: types.FETCH_LIFESTYLE
    });
    dispatch(fetchLifestyleSuccess());
};
export const fetchLifestyleSuccess = () => (dispatch) => {
    axios.get('/api/posts/fetch_lifestyle')
        .then((res) => {
            dispatch({
                type: types.FETCH_LIFESTYLE_SUCCESS,
                payload: res.data.posts
            });
        })
        .catch((err) => {
            const error = err.response.data.serverMsg;
            if (error) {
                dispatch(setAlert(error, 'warning'));
            }
            dispatch({
                type: types.FETCH_LIFESTYLE_FAIL,
            });
        });
};

//! FETCH DEVOTIONAL POSTS
export const fetchDevotional = () => (dispatch) => {
    dispatch({
        type: types.FETCH_DEVOTIONAL
    });
    dispatch(fetchDevotionalSuccess());
};
export const fetchDevotionalSuccess = () => (dispatch) => {
    axios.get('/api/posts/fetch_devotional')
        .then((res) => {
            dispatch({
                type: types.FETCH_DEVOTIONAL_SUCCESS,
                payload: res.data.posts
            });
        })
        .catch((err) => {
            const error = err.response.data.serverMsg;
            if (error) {
                dispatch(setAlert(error, 'warning'));
            }
            dispatch({
                type: types.FETCH_DEVOTIONAL_FAIL,
            });
        });

};

//! FETCH WELLNESS POSTS
export const fetchWellness = () => (dispatch) => {
    dispatch({
        type: types.FETCH_WELLNESS
    });
    dispatch(fetchWellnessSuccess());
};
export const fetchWellnessSuccess = () => (dispatch) => {
    axios.get('/api/posts/fetch_wellness')
        .then((res) => {
            dispatch({
                type: types.FETCH_WELLNESS_SUCCESS,
                payload: res.data.posts
            });
        })
        .catch((err) => {
            const error = err.response.data.serverMsg;
            if (error) {
                dispatch(setAlert(error, 'warning'));
            }
            dispatch({
                type: types.FETCH_WELLNESS_FAIL,
            });
        });
};

//! FETCH GRAPHICS POSTS
export const fetchGraphics = () => (dispatch) => {
    dispatch({
        type: types.FETCH_GRAPHICS
    });
    dispatch(fetchGraphicsSuccess());
};

export const fetchGraphicsSuccess = () => (dispatch) => {
    axios.get('/api/posts/fetch_graphics')
        .then((res) => {
            dispatch({
                type: types.FETCH_GRAPHICS_SUCCESS,
                payload: res.data.posts
            });
        })
        .catch((err) => {
            const error = err.response.data.serverMsg;
            if (error) {
                dispatch(setAlert(error, 'warning'));
            }
            dispatch({
                type: types.FETCH_GRAPHICS_FAIL,
            });
        });
};

//! UPDATE POST
export const updatePost = (id, { ...formData }) => (dispatch) => {
    dispatch({
        type: types.UPDATE_POST
    });
    dispatch(updatePostSuccess(id, formData));
};

export const updatePostSuccess = (id, formData) => (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    axios.put(`/api/posts/update_post/${id}`, formData, config)
        .then((res) => {
            dispatch({
                type: types.UPDATE_POST_SUCCESS,
                payload: {
                    id,
                    post: res.data.post
                }
            });
            console.log(res.data);
            dispatch(setAlert(res.data.serverMsg, 'success'));
        })
        .catch((err) => {
            const error = err.response.data.serverMsg;
            if (error) {
                dispatch(setAlert(error, 'warning'));
            }
            dispatch({
                type: types.UPDATE_POST_FAIL,
            });
        });
};

//! DELETE POST
export const deletePost = (id, history) => (dispatch) => {
    dispatch({
        type: types.DELETE_POST
    });
    dispatch(deletePostSuccess(id, history));
};

export const deletePostSuccess = (id, history) => (dispatch) => {
    axios.delete(`/api/posts/delete_post/${id}`)
        .then((res) => {
            dispatch({
                type: types.DELETE_POST_SUCCESS,
                payload: {
                    id: id,
                    post: res.data.post
                }
            });
            dispatch(setAlert(res.data.serverMsg, 'success'));
            history.push('/');
        })
        .catch((err) => {
            const error = err.response.data.serverMsg;
            if (error) {
                dispatch(setAlert(error, 'warning'));
            }
            dispatch({
                type: types.DELETE_POST_FAIL,
            });
        });
};

//! ADD COMMENT
export const addComment = (id, { ...formData }) => (dispatch) => {
    dispatch({
        type: types.ADD_COMMENT
    });
    dispatch(addCommentSuccess(id, formData));
};

export const addCommentSuccess = (id, formData) => (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    axios.put(`/api/posts/add_comment/${id}`, formData, config)
        .then((res) => {
            dispatch({
                type: types.ADD_COMMENT_SUCCESS,
                payload: {
                    id: id,
                    post: res.data.post
                }
            });
            dispatch(setAlert(res.data.serverMsg, 'success'));
        })
        .catch((err) => {
            const error = err.response.data.serverMsg;
            if (error) {
                dispatch(setAlert(error, 'warning'));
            }
            dispatch({
                type: types.ADD_COMMENT_FAIL,
            });
        });
};