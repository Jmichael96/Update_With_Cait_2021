import * as types from '../actions/types';

const initialState = {
    posts: [],
    devotionalPosts: [],
    wellnessPosts: [],
    graphicsPosts: [],
    lifestylePosts: [],
    reviewPosts: [],
    post: null,
    loading: true,
};

export default (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case types.CREATE_POST:
            return {
                ...state,
                posts: [payload, ...state.posts],
                post: payload,
                loading: false
            };
        case types.FETCH_POST:
            return {
                ...state,
                post: payload,
                loading: false
            };
        case types.FETCH_LIFESTYLE:
            return {
                ...state,
                lifestylePosts: payload,
                post: null,
                loading: false
            };
        case types.FETCH_DEVOTIONAL:
            return {
                ...state,
                devotionalPosts: payload,
                post: null,
                loading: false
            };
        case types.FETCH_WELLNESS:
            return {
                ...state,
                wellnessPosts: payload,
                post: null,
                loading: false
            };
        case types.FETCH_GRAPHICS:
            return {
                ...state,
                graphicsPosts: payload,
                post: null,
                loading: false
            };
        case types.PUBLISH_SAVED_POST_ADD:
            return {
                ...state,
                posts: [payload, ...state.posts],
                post: payload,
                loading: false
            };
        case types.POST_ERROR:
            return {
                posts: [],
                devotionalPosts: [],
                fitnessPosts: [],
                graphicsPosts: [],
                lifestylePosts: [],
                reviewPosts: [],
                post: null,
                loading: true,
            };
        default: return state;
    };
};