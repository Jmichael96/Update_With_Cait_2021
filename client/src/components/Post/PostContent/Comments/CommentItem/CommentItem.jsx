import React from 'react';
import PropTypes from 'prop-types';

// styles
import './commentItem.css';

const CommentItem = ({ comment: { name, text, date} }) => {

    return (
        <section className="commentItemStyles_commentCard">
            <div className="commentItemStyles_commentNameWrap">
                <h6>{name}</h6>
            </div>
            <div className="commentItemStyles_commentTextWrap">
                <p>{text}</p>
            </div>
            <div className="commentItemStyles_commentDateWrap">
                <p>{new Date(date).toLocaleString()}</p>
            </div>
        </section>
    )
};

CommentItem.propTypes = {
    comment: PropTypes.object.isRequired,
};

export default CommentItem;