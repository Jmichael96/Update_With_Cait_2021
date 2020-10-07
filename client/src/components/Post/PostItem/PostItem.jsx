import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import { FaCommentAlt, FaArrowAltCircleRight } from 'react-icons/fa';

// styles 
import './postItem.css';

const PostItem = ({ post: { _id, title, coverImage, summary, date, category, like_number, comments } }) => {

    return (
        <Link to={`/post_content/${_id}`}>
            <article className="postItemStyles_card">
                <div className="postItemStyles_contentWrap">
                    <span className="postItemStyles_coverImg" dangerouslySetInnerHTML={{ __html: coverImage }}></span>
                    <p className="postItemStyles_greyTextWrap">
                        {category.toUpperCase()} {' '}|{' '}<Moment format="MMMM DD, YYYY">{date.toUpperCase()}</Moment>
                    </p>
                    <h3 className="postItemStyles_title">{title}</h3>
                </div>
                <section className="postItemStyles_btnWrap">
                    <button className="postItemStyles_readMoreBtn">READ MORE {' '} <FaArrowAltCircleRight className="postItemStyles_rightArrowIcon" /></button>
                    <section className="postItemStyles_commentWrap">
                        <FaCommentAlt className="postItemStyles_commentIcon" />
                        <span className="postItemStyles_commentLength">{comments.length}</span>
                    </section>
                </section>
            </article>
        </Link>
    )
};

PostItem.propTypes = {
    post: PropTypes.object.isRequired,
};

export default PostItem;