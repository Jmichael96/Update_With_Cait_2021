import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPost } from '../../store/actions/post';

// styles
import './postContentPage.css';

const PostContentPage = ({ match, post, fetchPost }) => {
    useEffect(() => {
        const id = match.params.id;
        if (!post) {
            fetchPost(id);
        }
    }, []);
};

PostContentPage.propTypes = {
    fetchPost: PropTypes.func.isRequired,
    post: PropTypes.any,
    match: PropTypes.any,
};

const mapDispatchToProps = ({ posts }, ownProps) => (dispatch) => {
    return {
        post: posts[ownProps.match.params.id],
        fetchPost: (id) => { dispatch(fetchPost(id)) }
    }
}
const mapStateToProps = (state) => ({
    auth: state.auth,
    postData: state.post
});

export default connect(mapStateToProps, mapDispatchToProps)(PostContentPage);