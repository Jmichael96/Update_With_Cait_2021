import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { createPost } from '../../store/actions/post';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { setModal } from '../../store/actions/modal';

// components
import CreatePost from '../../components/Post/CreatePost/CreatePost';
import isEmpty from '../../utils/isEmpty';

// styles
import './createPostPage.css';

const CreatePostPage = ({ createPost, setModal, post: { loading, post }, history }) => {

    // use effect watching for a new post and will redirect to new location
    useEffect(() => {
        if (!loading && !isEmpty(post)) {
            history.push(`/post_content/${post._id}`);
        }
    }, [post, loading]);

    const renderCreatePost = () => {
        return <CreatePost createPost={createPost} setModal={setModal} loading={loading} />;
    };

    return (
        <article>
            {renderCreatePost()}
        </article>
    );
};

CreatePostPage.propTypes = {
    createPost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
    setModal: PropTypes.func.isRequired,
    history: PropTypes.any,
};

const mapStateToProps = (state) => ({
    post: state.post
});

const exportCreatePostPage = withRouter(CreatePostPage);

export default connect(mapStateToProps, { createPost, setModal })(exportCreatePostPage);