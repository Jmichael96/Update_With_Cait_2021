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
                loading: false
            };
        case types.FETCH_SAVED:
            return {
                ...state,
                savedPosts: payload,
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
                savedPost: payload,
                loading: false
            };
        case types.PUBLISH_SAVED_POST_REMOVE:
            return {
                ...state,
                savedPosts: [payload.unsavedPost, ...state.savedPosts],
                loading: false
            };
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