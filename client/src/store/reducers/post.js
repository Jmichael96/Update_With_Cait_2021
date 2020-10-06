import * as types from '../actions/types';

const initialState = {
    posts: [],
    devotionalPosts: [],
    fitnessPosts: [],
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