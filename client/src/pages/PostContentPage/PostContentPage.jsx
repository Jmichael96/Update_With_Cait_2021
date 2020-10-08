import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPost } from '../../store/actions/post';
import { useParams } from 'react-router-dom';

// styles
import './postContentPage.css';

// components
import isEmpty from '../../utils/isEmpty';

const PostContentPage = ({ post: { post, loading }, fetchPost }) => {
    // fetching param through react-router-dom
    let { id } = useParams();
    useEffect(() => {
        // if (isEmpty(post)) {
            // fetching post if post does not exist
            fetchPost(id);
        // }
    }, [id]);
    return (
        <h1>POST CONTENT</h1>
    )
};

PostContentPage.propTypes = {
    fetchPost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    post: state.post
});

export default connect(mapStateToProps, { fetchPost })(PostContentPage);