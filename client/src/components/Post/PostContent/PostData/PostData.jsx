import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

// styles
import './postData.css';
import isEmpty from '../../../../utils/isEmpty';

const PostData = ({ post: { title, content, date } }) => {

    return (
        <section id="postDataStyles_root">
            <h1 id="postDataStyles_title">{!isEmpty(title) && title}</h1>
            <p id="postDataStyles_dateWrap">
                <Moment format="MMMM DD, YYYY">{!isEmpty(date) && date.toUpperCase()}</Moment>
            </p>
            <ReactQuill
                id="postDataStyles_content"
                readOnly={true}
                theme={null}
                value={!isEmpty(content) && content}
            />
        </section>
    );
};

PostData.propTypes = {
    post: PropTypes.object.isRequired,
};

export default PostData;