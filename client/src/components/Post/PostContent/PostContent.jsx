import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { FaComment } from 'react-icons/fa';
import { ImHeart } from 'react-icons/im';

// styles
import './postContent.css';

// components
import PostData from './PostData/PostData';
import isEmpty from '../../../utils/isEmpty';
import Wrapper from '../../Layout/Wrapper/Wrapper';
import EditPost from './EditPost/EditPost';
import Comments from './Comments/Comments';
import Likes from './Likes/Likes';

const PostContent = ({ updatePost, loading, post, auth, setModal, deletePost, history, addComment, deleteComment, likePost }) => {

    const renderPostData = () => {
        if (!loading && isEmpty(post)) {
            return null;
        }
        if (!loading && !isEmpty(post)) {
            return <PostData post={post} />
        }
    };
    const renderLikes = () => {
        if (!loading && isEmpty(post)) {
            return null;
        }
        if (!loading && !isEmpty(post)) {
            return <Likes post={post} loading={loading} likePost={likePost} />
        }
    };

    const renderComments = () => {
        if (!loading && isEmpty(post)) {
            return null;
        }
        if (!loading && !isEmpty(post)) {
            return <Comments addComment={addComment} deleteComment={deleteComment} postId={post._id} loading={loading} auth={auth} comments={post.comments} />
        }
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

    // render the like amount
    const renderLikeNum = () => {
        if (!loading && isEmpty(post)) {
            return null;
        }
        if (!loading && post.like_number === null) {
            return 0;
        }
        if (!loading && post.like_number >= 1) {
            return post.like_number;
        }
    };
    // render the comment amount
    const renderCommentNum = () => {
        if (!loading && isEmpty(post)) {
            return null;
        }
        if (!loading && isEmpty(post.comments)) {
            return 0;
        }
        if (!loading && post.comments.length >= 1) {
            return post.comments.length;
        }
    }
    return (
        <article id="postContentStyles_root">
            <div id="postContentStyles_authActionBtnWrap">
                {renderEditComponent()}
                {renderDeleteBtn()}
            </div>
            <Wrapper>
                {loading ? <h1>LOADING...</h1> : renderPostData()}
            </Wrapper>

            {!loading &&
                <Wrapper styles={{ justifyContent: 'flex-start' }}>
                    <div id="postContentStyles_likeAmountWrap">
                        <ImHeart />{' '}{renderLikeNum()}
                    </div>
                    <div id="postContentStyles_commentAmountWrap">
                        <FaComment />{' '}{renderCommentNum()}
                    </div>
                </Wrapper>
            }
            {renderLikes()}
            {renderComments()}
        </article >
    );
};

PostContent.propTypes = {
    updatePost: PropTypes.func.isRequired,
    setModal: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired,
    addComment: PropTypes.func.isRequired,
    deleteComment: PropTypes.func.isRequired,
    likePost: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    post: PropTypes.object,
    auth: PropTypes.object.isRequired,
    history: PropTypes.any,
};

export default withRouter(PostContent);