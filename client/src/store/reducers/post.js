import * as types from '../actions/types';

const initialState = {
    devotionalPosts: [],
    wellnessPosts: [],
    graphicsPosts: [],
    lifestylePosts: [],
    recentPosts: [],
    post: null,
    loading: false,
    fetchedDbLifestyle: false,
    fetchedDbGraphics: false,
    fetchedDbWellness: false,
    fetchedDbDevotional: false,
    fetchedRecentPosts: false
};

export default (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case types.CREATE_POST:
        case types.FETCH_DEVOTIONAL:
        case types.FETCH_GRAPHICS:
        case types.FETCH_WELLNESS:
        case types.FETCH_LIFESTYLE:
        case types.PUBLISH_SAVED_POST_ADD:
        case types.FETCH_POST:
        case types.FETCH_RECENT:
            return {
                ...state,
                post: null,
                loading: true
            };
        case types.DELETE_POST:
        case types.UPDATE_POST:
            return {
                ...state,
                loading: true
            };
        case types.CREATE_POST_FAIL:
            return {
                ...state,
                post: null,
                loading: false
            };
        case types.CREATE_POST_SUCCESS:
            let createdPostCategory = payload.category;
            // return post to the correct destination

            let updatedRecentPosts = [];
            if (state.fetchedRecentPosts) {
                // removing the last item inside the array
                state.recentPosts.pop();
                // pushing the contents to the array
                updatedRecentPosts.push(...state.recentPosts);
                updatedRecentPosts.unshift(payload);
            }
            return {
                ...state,
                post: payload,
                loading: false,
                devotionalPosts: createdPostCategory === 'Devotional' ? [payload, ...state.devotionalPosts] : state.devotionalPosts,
                lifestylePosts: createdPostCategory === 'Lifestyle' ? [payload, ...state.lifestylePosts] : state.lifestylePosts,
                graphicsPosts: createdPostCategory === 'Graphics' ? [payload, ...state.graphicsPosts] : state.graphicsPosts,
                wellnessPosts: createdPostCategory === 'Wellness' ? [payload, ...state.wellnessPosts] : state.wellnessPosts,
                recentPosts: !state.fetchedRecentPosts ? state.recentPosts : updatedRecentPosts
            };

        case types.FETCH_POST_FAIL:
            return {
                ...state,
                post: null,
                loading: false
            };
        case types.FETCH_POST_SUCCESS:
            return {
                ...state,
                post: payload,
                loading: false
            };
        case types.FETCH_LIFESTYLE_FAIL:
            return {
                ...state,
                lifestylePosts: [],
                post: null,
                loading: false
            };
        case types.FETCH_LIFESTYLE_SUCCESS:
            return {
                ...state,
                lifestylePosts: payload,
                post: null,
                loading: false,
                fetchedDbLifestyle: true
            };
        case types.FETCH_DEVOTIONAL_FAIL:
            return {
                ...state,
                devotionalPosts: [],
                post: null,
                loading: false
            };
        case types.FETCH_DEVOTIONAL_SUCCESS:
            return {
                ...state,
                devotionalPosts: payload,
                post: null,
                loading: false,
                fetchedDbDevotional: true
            };
        case types.FETCH_WELLNESS_FAIL:
            return {
                ...state,
                wellnessPosts: [],
                post: null,
                loading: false
            };
        case types.FETCH_WELLNESS_SUCCESS:
            return {
                ...state,
                wellnessPosts: payload,
                post: null,
                loading: false,
                fetchedDbWellness: true
            };
        case types.FETCH_GRAPHICS_FAIL:
            return {
                ...state,
                graphicsPosts: [],
                post: null,
                loading: false
            };
        case types.FETCH_GRAPHICS_SUCCESS:
            return {
                ...state,
                graphicsPosts: payload,
                post: null,
                loading: false,
                fetchedDbGraphics: true
            };
        case types.FETCH_RECENT_FAIL:
            return {
                ...state,
                recentPosts: [],
                loading: false,
            };
        case types.FETCH_RECENT_SUCCESS:
            return {
                ...state,
                recentPosts: payload,
                loading: false,
                fetchedRecentPosts: true
            };
        case types.PUBLISH_SAVED_POST_ADD_FAIL:
            return {
                ...state,
                post: null,
                loading: false
            };
        case types.PUBLISH_SAVED_POST_ADD_SUCCESS:
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
                        lifestylePosts: [payload, ...state.lifestylePosts]
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
        case types.UPDATE_POST_FAIL:
            return {
                ...state,
                loading: false
            };
        case types.UPDATE_POST_SUCCESS:
            // extracting category from updated post
            let updatedCategory = payload.post.category;
            return {
                ...state,
                post: payload.post,
                devotionalPosts: updatedCategory === 'Devotional' ? [payload.post, ...state.devotionalPosts] : state.devotionalPosts,
                lifestylePosts: updatedCategory === 'Lifestyle' ? [payload.post, ...state.lifestylePosts] : state.lifestylePosts,
                graphicsPosts: updatedCategory === 'Graphics' ? [payload.post, ...state.graphicsPosts] : state.graphicsPosts,
                wellnessPosts: updatedCategory === 'Wellness' ? [payload.post, ...state.wellnessPosts] : state.wellnessPosts,
                loading: false
            };
        case types.DELETE_POST_FAIL:
            return {
                ...state,
                loading: false
            };
        case types.DELETE_POST_SUCCESS:
            // extracting the category from the deleted post
            let deletedCategory = payload.post.category
            return {
                ...state,
                post: null,
                devotionalPosts: deletedCategory === 'Devotional' ? state.devotionalPosts.filter(post => post._id !== payload.id) : state.devotionalPosts,
                lifestylePosts: deletedCategory === 'Lifestyle' ? state.lifestylePosts.filter(post => post._id !== payload.id) : state.lifestylePosts,
                graphicsPosts: deletedCategory === 'Graphics' ? state.graphicsPosts.filter(post => post._id !== payload.id) : state.graphicsPosts,
                wellnessPosts: deletedCategory === 'Wellness' ? state.wellnessPosts.filter(post => post._id !== payload.id) : state.wellnessPosts,
                loading: false
            };
        case types.ADD_COMMENT_FAIL:
            return {
                ...state,
                loading: false
            };
        case types.ADD_COMMENT_SUCCESS:
            // extracting the category for the comment added post
            let addedCommentCat = payload.post.category;
            return {
                ...state,
                post: { ...state.post, comments: payload.post.comments },
                devotionalPosts: addedCommentCat === 'Devotional' ? state.devotionalPosts.map(post =>
                    post._id === payload.id ? { ...post, comments: payload.post.comments } : post
                ) : state.devotionalPosts,
                lifestylePosts: addedCommentCat === 'Lifestyle' ? state.lifestylePosts.map(post =>
                    post._id === payload.id ? { ...post, comments: payload.post.comments } : post
                ) : state.lifestylePosts,
                graphicsPosts: addedCommentCat === 'Graphics' ? state.graphicsPosts.map(post =>
                    post._id === payload.id ? { ...post, comments: payload.post.comments } : post
                ) : state.graphicsPosts,
                wellnessPosts: addedCommentCat === 'Wellness' ? state.wellnessPosts.map(post =>
                    post._id === payload.id ? { ...post, comments: payload.post.comments } : post
                ) : state.wellnessPosts,
                loading: false
            };
        case types.DELETE_COMMENT_FAIL:
            return {
                ...state,
                loading: false
            };
        case types.DELETE_COMMENT_SUCCESS:
            // extracting the category
            let deletedPostCat = payload.post.category;
            return {
                ...state,
                post: { ...state.post, comments: payload.post.comments },
                devotionalPosts: deletedPostCat === 'Devotional' ? state.devotionalPosts.map(post =>
                    post._id === payload.id ? { ...post, comments: payload.post.comments } : post
                ) : state.devotionalPosts,
                lifestylePosts: deletedPostCat === 'Lifestyle' ? state.lifestylePosts.map(post =>
                    post._id === payload.id ? { ...post, comments: payload.post.comments } : post
                ) : state.lifestylePosts,
                graphicsPosts: deletedPostCat === 'Graphics' ? state.graphicsPosts.map(post =>
                    post._id === payload.id ? { ...post, comments: payload.post.comments } : post
                ) : state.graphicsPosts,
                wellnessPosts: deletedPostCat === 'Wellness' ? state.wellnessPosts.map(post =>
                    post._id === payload.id ? { ...post, comments: payload.post.comments } : post
                ) : state.wellnessPosts,
            };
        case types.LIKE_POST:
            return {
                ...state,
                post: { ...state.post, like_number: payload }
            };
        case types.LIKE_POST_FAIL:
            return {
                ...state,
                loading: false
            };
        case types.LIKE_POST_SUCCESS:
            let likedPostCat = payload.post.category;
            return {
                ...state,
                devotionalPosts: likedPostCat === 'Devotional' ? state.devotionalPosts.map(post =>
                    post._id === payload.id ? { ...post, like_number: payload.post.like_number } : post
                ) : state.devotionalPosts,
                lifestylePosts: likedPostCat === 'Lifestyle' ? state.lifestylePosts.map(post =>
                    post._id === payload.id ? { ...post, like_number: payload.post.like_number } : post
                ) : state.lifestylePosts,
                graphicsPosts: likedPostCat === 'Graphics' ? state.graphicsPosts.map(post =>
                    post._id === payload.id ? { ...post, like_number: payload.post.like_number } : post
                ) : state.graphicsPosts,
                wellnessPosts: likedPostCat === 'Wellness' ? state.wellnessPosts.map(post =>
                    post._id === payload.id ? { ...post, like_number: payload.post.like_number } : post
                ) : state.wellnessPosts,
            }
        case types.UNLIKE_POST:
            return {
                ...state,
                post: { ...state.post, like_number: payload }
            };
        case types.UNLIKE_POST_FAIL:
            return {
                ...state,
                loading: false
            };
        case types.UNLIKE_POST_SUCCESS:
            let unlikedPostCat = payload.post.category;
            return {
                ...state,
                devotionalPosts: unlikedPostCat === 'Devotional' ? state.devotionalPosts.map(post =>
                    post._id === payload.id ? { ...post, like_number: payload.post.like_number } : post
                ) : state.devotionalPosts,
                lifestylePosts: unlikedPostCat === 'Lifestyle' ? state.lifestylePosts.map(post =>
                    post._id === payload.id ? { ...post, like_number: payload.post.like_number } : post
                ) : state.lifestylePosts,
                graphicsPosts: unlikedPostCat === 'Graphics' ? state.graphicsPosts.map(post =>
                    post._id === payload.id ? { ...post, like_number: payload.post.like_number } : post
                ) : state.graphicsPosts,
                wellnessPosts: unlikedPostCat === 'Wellness' ? state.wellnessPosts.map(post =>
                    post._id === payload.id ? { ...post, like_number: payload.post.like_number } : post
                ) : state.wellnessPosts,
            };
        default: return state;
    };
};