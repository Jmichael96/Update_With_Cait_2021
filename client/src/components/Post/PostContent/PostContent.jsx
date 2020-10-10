import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

// styles
import './postContent.css';

// components
import PostData from './PostData/PostData';
import isEmpty from '../../../utils/isEmpty';
import Wrapper from '../../Layout/Wrapper/Wrapper';
import EditPost from './EditPost/EditPost';

const PostContent = ({ updatePost, loading, post, auth, setModal }) => {

    const renderPostData = () => {
        if (!loading && !isEmpty(post)) {
            return <PostData post={post} />
        }
    };
    const renderLikes = () => {

    };

    const renderComments = () => {

    };
    const renderer = () => {
        return <EditPost updatePost={updatePost} loading={loading} post={post} />;
    }
    const editPostHandler = () => {
        setModal('component', 'EDITOR', null, 'UPDATE', () => { }, renderer)
    };

    return (
        <article>
            {!loading && auth.isAuthenticated && <button onClick={editPostHandler}>EDIT</button>}
            <Wrapper>
                {loading ? <h1>LOADING...</h1> : renderPostData()}
            </Wrapper>
        </article>
    );
};

PostContent.propTypes = {
    updatePost: PropTypes.func.isRequired,
    setModal: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
};

export default PostContent;