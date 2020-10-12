import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

// styles
import './postContent.css';

// components
import PostData from './PostData/PostData';
import isEmpty from '../../../utils/isEmpty';
import Wrapper from '../../Layout/Wrapper/Wrapper';
import EditPost from './EditPost/EditPost';

const PostContent = ({ updatePost, loading, post, auth, setModal, deletePost, history }) => {

    const renderPostData = () => {
        if (!loading && isEmpty(post)) {
            return null;
        }
        if (!loading && !isEmpty(post)) {
            return <PostData post={post} />
        }
    };
    const renderLikes = () => {

    };

    const renderComments = () => {

    };

    const renderEditComponent = () => {
        if (!isEmpty(post)) {
            if (!loading && !auth.isAuthenticated) {
                return null;
            }

            if (!loading && auth.isAuthenticated) {
                return <EditPost post={post} setModal={setModal} updatePost={updatePost} loading={loading} />;
            }
        }
    };
    // render the delete post
    const renderDeleteBtn = () => {
        if (!loading && !isEmpty(post)) {
            if (!auth.loading && !auth.isAuthenticated) {
                return null;
            }
            if (!auth.loading && auth.isAuthenticated) {

                return <button onClick={() => { setModal('confirm', 'delete post', 'Are you sure you want to delete this post?', 'confirm', () => { deletePost(post._id, history) }) }} type="button">DELETE</button>
            }
        }
    };

    return (
        <article id="postContentStyles_root">
            <div id="postContentStyles_authActionBtnWrap">
                {renderEditComponent()}
                {renderDeleteBtn()}
            </div>
            <Wrapper>
                {loading ? <h1>LOADING...</h1> : renderPostData()}
            </Wrapper>
        </article>
    );
};

PostContent.propTypes = {
    updatePost: PropTypes.func.isRequired,
    setModal: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    post: PropTypes.object,
    auth: PropTypes.object.isRequired,
    history: PropTypes.any,
};

export default withRouter(PostContent);