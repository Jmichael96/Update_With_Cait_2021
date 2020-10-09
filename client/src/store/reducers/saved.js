import * as types from '../actions/types';

const initialState = {
    savedPosts: [],
    savedPost: null,
    loading: true
};

export default (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case types.SAVE_POST:
            return {
                ...state,
                savedPosts: [payload, ...state.savedPosts],
                savedPost: null,
                loading: false
            };
        case types.FETCH_SAVED:
            return {
                ...state,
                savedPosts: payload,
                savedPost: null,
                loading: false
            };
        case types.FETCH_SAVED_POST:
            return {
                ...state,
                savedPost: payload,
                loading: false
            };
        case types.RESAVE_POST:
            return {
                ...state,
                savedPosts: state.savedPosts.map(post =>
                    post._id === payload.id ? { ...post, ...payload.post } : post
                ),
                savedPost: null,
                loading: false
            };
        case types.PUBLISH_SAVED_POST_REMOVE:
            return {
                ...state,
                savedPosts: state.savedPosts.filter(post => post._id !== payload),
                loading: false
            };
        case types.DELETE_SAVED:
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