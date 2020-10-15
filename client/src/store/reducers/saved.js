import * as types from '../actions/types';

const initialState = {
    savedPosts: [],
    savedPost: null,
    loading: false,
    fetchedDbSaved: false
};

export default (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case types.SAVE_POST:
        case types.FETCH_SAVED:
        case types.FETCH_SAVED_POST:
        case types.RESAVE_POST:
        case types.PUBLISH_SAVED_POST_REMOVE:
        case types.DELETE_SAVED:
            return {
                ...state,
                savedPost: null,
                loading: true
            }
        case types.SAVE_POST_FAIL:
            return {
                ...state,
                savedPost: null,
                loading: false
            }
        case types.SAVE_POST_SUCCESS:
            return {
                ...state,
                savedPosts: [payload, ...state.savedPosts],
                savedPost: null,
                loading: false
            };
        case types.FETCH_SAVED_FAIL:
            return {
                ...state,
                savedPosts: [],
                savedPost: null,
                loading: false
            }
        case types.FETCH_SAVED_SUCCESS:
            return {
                ...state,
                savedPosts: payload,
                savedPost: null,
                loading: false,
                fetchedDbSaved: true
            };
        case types.FETCH_SAVED_POST_FAIL:
            return {
                ...state,
                savedPost: null,
                loading: false
            }
        case types.FETCH_SAVED_POST_SUCCESS:
            return {
                ...state,
                savedPost: payload,
                loading: false
            };
        case types.RESAVE_POST_FAIL:
            return {
                ...state,
                savedPost: null,
                loading: false
            }
        case types.RESAVE_POST_SUCCESS:
            return {
                ...state,
                savedPosts: state.savedPosts.map(post =>
                    post._id === payload.id ? { ...post, ...payload.post } : post
                ),
                savedPost: payload.post,
                loading: false
            };
        case types.PUBLISH_SAVED_POST_REMOVE_FAIL:
            return {
                ...state,
                loading: false
            }
        case types.PUBLISH_SAVED_POST_REMOVE_SUCCESS:
            return {
                ...state,
                savedPosts: state.savedPosts.filter(post => post._id !== payload),
                loading: false
            };
        case types.DELETE_SAVED_FAIL:
            return {
                ...state,
                loading: false
            }
        case types.DELETE_SAVED_SUCCESS:
            return {
                ...state,
                savedPosts: state.savedPosts.filter(post => post._id !== payload),
                loading: false
            }
        case types.SAVE_ERROR:
            return {
                ...state,
                savedPosts: [],
                savedPost: null,
                loading: true
            };
        default: return state;
    };
}