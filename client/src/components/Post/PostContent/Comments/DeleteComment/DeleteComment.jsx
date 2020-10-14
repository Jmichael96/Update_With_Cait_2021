import React from 'react';
import PropTypes from 'prop-types';
import { RiDeleteBin2Fill } from 'react-icons/ri';

// styles
import './deleteComment.css';

const DeleteComment = ({ deleteHandler, postId, commentId }) => {
    const onDelete = () => {
        if (!postId || !commentId) {
            return;
        }
        deleteHandler(postId, commentId);
    };

    return <RiDeleteBin2Fill className="deleteCommentStyles_icon" onClick={onDelete} />;
};

DeleteComment.propTypes = {
    deleteHandler: PropTypes.func.isRequired,
    postId: PropTypes.string.isRequired,
    commentId: PropTypes.string.isRequired,
    propStyles: PropTypes.object,
};

export default DeleteComment;