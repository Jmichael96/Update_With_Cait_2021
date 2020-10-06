import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';

const PostItem = ({ post: { _id, title, coverImage, summary, date, category, like_number, comments } }) => {

    return (
        <Link to={`/post_content/${_id}`}>
            <section className="postItemStyles_card">
                <div>
                    <span className="postCoverImg" dangerouslySetInnerHTML={{ __html: coverImage }}></span>
                    <p className="greyTextWrap">
                        {category.toUpperCase()} {' '}|{' '}<Moment format="MMMM DD, YYYY">{date.toUpperCase()}</Moment>
                    </p>
                    <h3 className="postTitle">{title}</h3>
                </div>
            </section>
        </Link>
    )
};

PostItem.propTypes = {
    post: PropTypes.object.isRequired,
};

export default PostItem;