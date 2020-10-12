import React from 'react';
import PropTypes from 'prop-types';

// styles

// components
import isEmpty from '../../../../utils/isEmpty';
import CommentItem from './CommentItem/CommentItem';
import AddComment from './AddComment/AddComment';

const Comments = ({ addComment, comments, auth, loading }) => {
    // render the comments 
    const renderComments = () => {
        if (!loading && isEmpty(comments)) {
            return null;
        }
        if (!loading && !isEmpty(comments)) {
            return Object.values(comments).map((comment, i) => {
                return <CommentItem key={i + 1} comment={comment} />
            });
        }
    };

    const renderAddComment = () => {
        return <AddComment addComment={addComment} loading={loading} />
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
    comments: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
};

export default Comments;