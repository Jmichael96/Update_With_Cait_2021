import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { FaComment, FaArrowAltCircleRight } from 'react-icons/fa';
import { ImHeart } from 'react-icons/im';
import { withRouter } from 'react-router-dom';

// styles 
import './postItem.css';

const PostItem = ({ post: { _id, title, coverImage, summary, date, category, like_number, comments }, history }) => {

    const redirectHandler = () => {
        history.push(`/post_content/${_id}`);
    };

    return (
        <article className="postItemStyles_card" onClick={redirectHandler}>
            <div className="postItemStyles_contentWrap">
                <span className="postItemStyles_coverImg" dangerouslySetInnerHTML={{ __html: coverImage }}></span>
                <p className="postItemStyles_greyTextWrap">
                    {category.toUpperCase()} {' '}|{' '}<Moment format="MMMM DD, YYYY">{date.toUpperCase()}</Moment>
                </p>
                <h3 className="postItemStyles_title">{title}</h3>
                <p className="postItemStyles_summary">{summary}</p>
            </div>
            <section className="postItemStyles_btnWrap">
                <button className="postItemStyles_readMoreBtn">READ MORE {' '} <FaArrowAltCircleRight className="postItemStyles_rightArrowIcon" /></button>
                <section className="postItemStyles_iconWrap">
                    <div className="postItemStyles_likeWrap">
                        <ImHeart className="postItemStyles_likeIcon" />
                        <span className="postItemStyles_likeNumber">{like_number}</span>
                    </div>
                    <div className="postItemStyles_commentWrap">
                        <FaComment className="postItemStyles_commentIcon" />
                        <span className="postItemStyles_commentLength">{comments.length}</span>
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