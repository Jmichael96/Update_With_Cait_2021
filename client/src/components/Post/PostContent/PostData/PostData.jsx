import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

// styles
import './postData.css';

const PostData = ({ post: { title, content, date } }) => {

    return (
        <section id="postDataStyles_root">
            <h1 id="postDataStyles_title">{title}</h1>
            <p id="postDataStyles_dateWrap">
                <Moment format="MMMM DD, YYYY">{date.toUpperCase()}</Moment>
            </p>
            <ReactQuill
                id="postDataStyles_content"
                readOnly={true}
                theme={null}
                value={content}
            />
        </section>
    );
};

PostData.propTypes = {
    post: PropTypes.object.isRequired,
};

export default PostData;