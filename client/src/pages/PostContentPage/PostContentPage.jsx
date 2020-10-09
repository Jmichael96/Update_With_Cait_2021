import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPost, updatePost } from '../../store/actions/post';
import { useParams } from 'react-router-dom';

// styles
import './postContentPage.css';

// components
import isEmpty from '../../utils/isEmpty';
import PostContent from '../../components/Post/PostContent/PostContent';

const PostContentPage = ({ post: { post, loading }, fetchPost, updatePost }) => {
    // fetching param through react-router-dom
    let { id } = useParams();
    useEffect(() => {
        fetchPost(id);
    }, [id]);

    return (
        <article>
            <h1>POST CONTENT</h1>
            <PostContent post={post} loading={loading} updatePost={updatePost} />
        </article>
    );
};

PostContentPage.propTypes = {
    fetchPost: PropTypes.func.isRequired,
    updatePost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    post: state.post
});

export default connect(mapStateToProps, { fetchPost, updatePost })(PostContentPage);