import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPost, updatePost, deletePost, addComment, deleteComment, likePost, unlikePost } from '../../store/actions/post';
import { useParams } from 'react-router-dom';
import { setModal } from '../../store/actions/modal';

// styles
import './postContentPage.css';

// components
import isEmpty from '../../utils/isEmpty';
import PostContent from '../../components/Post/PostContent/PostContent';
import LgSpinner from '../../components/Layout/LgSpinner/LgSpinner';

const PostContentPage = ({ post: { post, loading }, auth, fetchPost, updatePost, setModal, deletePost, addComment, deleteComment, likePost, unlikePost }) => {
    // fetching param through react-router-dom
    let { id } = useParams();
    useEffect(() => {
        fetchPost(id);
    }, [id]);

    return loading ? <LgSpinner /> : (
        <article>
            <PostContent
                post={post}
                auth={auth}
                loading={loading}
                updatePost={updatePost}
                setModal={setModal}
                deletePost={deletePost}
                addComment={addComment}
                deleteComment={deleteComment}
                likePost={likePost}
                unlikePost={unlikePost}
            />
        </article>
    );
};

PostContentPage.propTypes = {
    fetchPost: PropTypes.func.isRequired,
    updatePost: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired,
    setModal: PropTypes.func.isRequired,
    addComment: PropTypes.func.isRequired,
    deleteComment: PropTypes.func.isRequired,
    likePost: PropTypes.func.isRequired,
    unlikePost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    post: state.post
});

export default connect(mapStateToProps, { fetchPost, updatePost, setModal, deletePost, addComment, deleteComment, likePost, unlikePost })(PostContentPage);