import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// styles
import './editPost.css';

const EditPost = ({ updatePost, loading, post: { _id, title, category, summary, coverImage, content, like_number, comments } }) => {

    return (
        <article id="editPostStyles_root">
            <h1>Thingy</h1>
            <input />
        </article>
    );
};

EditPost.propTypes = {
    updatePost: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    post: PropTypes.object.isRequired,
};

export default EditPost;