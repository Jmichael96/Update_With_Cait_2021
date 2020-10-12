import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { FaComment, FaArrowAltCircleRight } from 'react-icons/fa';
import { ImHeart } from 'react-icons/im';
import { withRouter } from 'react-router-dom';

// styles 
import './postItem.css';

// components
import isEmpty from '../../../utils/isEmpty';

const PostItem = ({ post: { _id, title, coverImage, summary, date, category, like_number, comments }, history }) => {

    const redirectHandler = () => {
        history.push(`/post_content/${_id}`);
    };
    // render the post item like_number
    const renderLikeNumber = () => {
        if (isEmpty(like_number)) {
            return <span className="postItemStyles_commentLength">0</span>;
        }
        else {
            return <span className="postItemStyles_commentLength">{like_number}</span>
        }
    };
    // render the post item comment length
    const renderCommentNumber = () => {
        if (isEmpty(comments)) {
            return <span className="postItemStyles_commentLength">0</span>;
        }
        else {
            return <span className="postItemStyles_commentLength">{comments.length}</span>
        }
    };
    return (
        <article className="postItemStyles_card" onClick={redirectHandler}>
            <div className="postItemStyles_contentWrap">
                <span className="postItemStyles_coverImg" dangerouslySetInnerHTML={{ __html: !isEmpty(coverImage) && coverImage }}></span>
                <p className="postItemStyles_greyTextWrap">
                    {category.toUpperCase()} {' '}|{' '}<Moment format="MMMM DD, YYYY">{date.toUpperCase()}</Moment>
                </p>
                <h3 className="postItemStyles_title">{!isEmpty(title) && title}</h3>
                <p className="postItemStyles_summary">{!isEmpty(summary) && summary}</p>
            </div>
            <section className="postItemStyles_btnWrap">
                <button className="postItemStyles_readMoreBtn">READ MORE {' '} <FaArrowAltCircleRight className="postItemStyles_rightArrowIcon" /></button>
                <section className="postItemStyles_iconWrap">
                    <div className="postItemStyles_likeWrap">
                        <ImHeart className="postItemStyles_likeIcon" />
                        <span className="postItemStyles_likeNumber">{renderLikeNumber()}</span>
                    </div>
                    <div className="postItemStyles_commentWrap">
                        <FaComment className="postItemStyles_commentIcon" />
                        {renderCommentNumber()}
                    </div>
                </section>
            </section>
        </article>
    );
};

PostItem.propTypes = {
    post: PropTypes.object.isRequired,
    history: PropTypes.any,
};

export default withRouter(PostItem);