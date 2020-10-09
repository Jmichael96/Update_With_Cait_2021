import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

// styles
import './postData.css';

const PostData = ({ post: { _id, title, category, summary, coverImage, content, date } }) => {
    return (
        <section id="postDataStyles_root">
            <h1>{title}</h1>
        </section>
    );
};

PostData.propTypes = {
    post: PropTypes.object.isRequired,
};

export default PostData;