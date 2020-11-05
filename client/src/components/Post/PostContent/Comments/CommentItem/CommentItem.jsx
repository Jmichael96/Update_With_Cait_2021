import React, { useState } from 'react';
import PropTypes from 'prop-types';

// styles
import './commentItem.css';

// components
import DeleteComment from '../DeleteComment/DeleteComment';

// utils 
import Colors from '../../../../../utils/constants/Colors';

const CommentItem = ({ comment: { _id, authorName, content, date }, deleteComment, postId, auth: { loading, isAuthenticated } }) => {
    // using for mouse enter and mouse leave in the delete comment icon
    const [mouseVisible, setMouseVisible] = useState(false);

    // function for setting mouse visible
    const mouseEnter = () => {
        setMouseVisible(true);
    };
    // function for setting mouse to invisible
    const mouseLeave = () => {
        setMouseVisible(false);
    };

    // check if the user is on mobile and render the correct delete button
    const checkMobileHandler = () => {
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            return true;
        }
        return false;
    };

    return (
        <section className="commentItemStyles_commentCard" style={{ backgroundColor: Colors.cardBg }} onMouseEnter={mouseEnter} onMouseLeave={mouseLeave}>
            <div className="commentItemStyles_commentNameWrap">
                <h6 style={{ color: Colors.cardText }}>{authorName}</h6>
            </div>
            <div className="commentItemStyles_commentTextWrap">
                <p style={{ color: Colors.cardText }}>{content}</p>
            </div>
            <div className="commentItemStyles_commentDateWrap">
                <p style={{ color: Colors.cardDate }}>{new Date(date).toLocaleString()}</p>
            </div>
            {!loading && isAuthenticated &&
                <div className="commentItemStyles_deleteCommentWrap" style={{ display: !mouseVisible ? 'none' : 'block' }}>
                    <DeleteComment
                        commentId={_id}
                        deleteHandler={deleteComment}
                        postId={postId}
                    />
                </div>
            }
        </section>
    )
};

CommentItem.propTypes = {
    deleteComment: PropTypes.func.isRequired,
    comment: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    postId: PropTypes.string.isRequired,
};

export default CommentItem;