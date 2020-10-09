import * as types from '../actions/types';

const initialState = {
    posts: [],
    devotionalPosts: [],
    wellnessPosts: [],
    graphicsPosts: [],
    lifestylePosts: [],
    post: null,
    loading: true,
};

export default (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case types.CREATE_POST:
            let createdPostCategory = payload.category;
            // return post to the correct destination
            const sortPost = (cat) => {
                return {
                    ...state,
                    ...cat,
                    post: payload,
                    loading: false
                }
            };
            switch (createdPostCategory) {
                case 'Devotional':
                    let devoState = {
                        devotionalPosts: [payload, ...state.devotionalPosts]
                    }
                    return tempState(devoState);
                case 'Lifestyle':
                    let lifeState = {
                        devotionalPosts: [payload, ...state.lifestylePosts]
                    }
                    return tempState(lifeState);
                case 'Graphics':
                    let graphicState = {
                        graphicsPosts: [payload, ...state.graphicsPosts]
                    }
                    return tempState(graphicState);
                case 'Wellness':
                    let wellnessState = {
                        wellnessPosts: [payload, ...state.wellnessPosts]
                    }
                    return tempState(wellnessState);
                default: return state;
            }

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
            let publishedPostCategory = payload.category;
            // created a function to return the state that was needed
            const tempState = (cat) => {
                return {
                    ...state,
                    ...cat,
                    post: payload,
                    loading: false
                }
            };

            switch (publishedPostCategory) {
                case 'Devotional':
                    let devoState = {
                        devotionalPosts: [payload, ...state.devotionalPosts]
                    }
                    return tempState(devoState);
                case 'Lifestyle':
                    let lifeState = {
                        devotionalPosts: [payload, ...state.lifestylePosts]
                    }
                    return tempState(lifeState);
                case 'Graphics':
                    let graphicState = {
                        graphicsPosts: [payload, ...state.graphicsPosts]
                    }
                    return tempState(graphicState);
                case 'Wellness':
                    let wellnessState = {
                        wellnessPosts: [payload, ...state.wellnessPosts]
                    }
                    return tempState(wellnessState);
                default: return state;
            }
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