import React from 'react';
import PropTypes from 'prop-types';

// styles
import './comments.css';

// components
import isEmpty from '../../../../utils/isEmpty';
import CommentItem from './CommentItem/CommentItem';
import AddComment from './AddComment/AddComment';
import DeleteComment from './DeleteComment/DeleteComment';

const Comments = ({ addComment, comments, auth, loading, postId, deleteComment }) => {

    // render the comments 
    const renderComments = () => {
        if (!loading && isEmpty(comments)) {
            return null;
        }
        if (!loading && !isEmpty(comments)) {
            return Object.values(comments).map((comment, i) => {
                return <CommentItem key={i + 1} comment={comment} deleteComment={deleteComment} postId={postId} auth={auth} />;
            });
        }
    };

    const renderAddComment = () => {
        return <AddComment addComment={addComment} postId={postId} loading={loading} />
    };

    return (
        <article id="commentsStyles_root">
            {renderAddComment()}
            {renderComments()}
        </article>
    );
};

Comments.propTypes = {
    addComment: PropTypes.func.isRequired,
    deleteComment: PropTypes.func.isRequired,
    comments: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
    postId: PropTypes.string.isRequired,
};

export default Comments;