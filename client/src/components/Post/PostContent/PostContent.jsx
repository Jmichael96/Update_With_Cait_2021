import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

// styles
import './postContent.css';

// components
import PostData from './PostData/PostData';
import isEmpty from '../../../utils/isEmpty';

const PostContent = ({ updatePost, loading, post }) => {
    const renderPostData = () => {
        if (!loading && !isEmpty(post)) {
            return <PostData post={post} />
        }
    };
    const renderLikes = () => {

    };
    const renderComments = () => {

    };
    const renderEditPost = () => {

    };
    return (
        <article>
            {loading ? <h1>LOADING...</h1> : renderPostData()}
        </article>
    );
};

PostContent.propTypes = {
    updatePost: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    post: PropTypes.object.isRequired,
};

export default PostContent;