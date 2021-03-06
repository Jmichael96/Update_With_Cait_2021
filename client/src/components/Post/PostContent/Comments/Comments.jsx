import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FaArrowAltCircleDown } from 'react-icons/fa';

// styles
import './comments.css';

// components
import CommentItem from './CommentItem/CommentItem';
import AddComment from './AddComment/AddComment';
import Button from '../../../Button/Button';
import Wrapper from '../../../Layout/Wrapper/Wrapper';
// utils
import isEmpty from '../../../../utils/isEmpty';

const Comments = ({ addComment, comments, auth, loading, postId, deleteComment }) => {
    // set limit for how many comments to render on a post
    const [limit, setLimit] = useState(4);
    // set for when the user reaches the max limit of comments
    const [reachedLimit, setReachedLimit] = useState(null);

    // checking if the comment length is equal to the limit
    useEffect(() => {
        if (isEmpty(comments)) {
            setReachedLimit(true);
        } else if (!isEmpty(comments) && Object.keys(comments).length <= 4) {
            setReachedLimit(true);
        }
    }, [comments]);

    // load more posts function to render more posts to view
    const loadMore = () => {
        const commentList = comments;
        const commentLength = Object.keys(commentList).length;
        const currentLimit = limit;
        if (currentLimit < commentLength) {
            setLimit(commentLength);
            setReachedLimit(true);
        } else if (currentLimit >= commentLength) {
            setReachedLimit(false);
        }
    };

    // render the comments 
    const renderComments = () => {
        if (!loading && isEmpty(comments)) {
            return null;
        }
        if (!loading && !isEmpty(comments)) {
            return Object.values(comments).slice(0, limit).map((comment, i) => {
                return <CommentItem key={i + 1} comment={comment} deleteComment={deleteComment} postId={postId} auth={auth} />;
            });
        }
    };

    // render the add comment button and logic
    const renderAddComment = () => {
        return <AddComment addComment={addComment} postId={postId} loading={loading} />
    };

    // render the load more comments button
    const renderLoadMore = () => {
        if (reachedLimit) {
            return null;
        }
        if (!loading && !reachedLimit) {
            return <Button onClick={loadMore}>SEE MORE{' '}<FaArrowAltCircleDown className="commentsStyles_btnIcon" /></Button>
        }
    };

    return (
        <article id="commentsStyles_root">
            {renderAddComment()}
            {renderComments()}
            <Wrapper>
                {renderLoadMore()}
            </Wrapper>
        </article>
    );
};

Comments.propTypes = {
    addComment: PropTypes.func.isRequired,
    deleteComment: PropTypes.func.isRequired,
    comments: PropTypes.array.isRequired,
    auth: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
    postId: PropTypes.string.isRequired,
};

export default Comments;