import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// styles
import './postContent.css';

// components
import PostData from './PostData/PostData';
import isEmpty from '../../../utils/isEmpty';
import Wrapper from '../../Layout/Wrapper/Wrapper';
import EditPost from './EditPost/EditPost';

const PostContent = ({ updatePost, loading, post, auth, setModal }) => {

    // const [titleData, setTitleData] = useState('');
    // const [categoryData, setCategoryData] = useState('');
    // const [summaryData, setSummaryData] = useState('');
    // // react quill cover image
    // const [coverImageData, setCoverImageData] = useState('');
    // // react quill content 
    // const [contentData, setContentData] = useState('');

    // // setting all default data to form inputs for editing
    // useEffect(() => {
    //     if (!loading && !isEmpty(post)) {
    //         // extracting the post contents
    //         const { title, category, summary, coverImage, content } = post;
    //         setTitleData(isEmpty(title) ? '' : title);
    //         setCategoryData(isEmpty(category) ? '' : category);
    //         setSummaryData(isEmpty(summary) ? '' : summary);
    //         setCoverImageData(isEmpty(coverImage) ? '' : coverImage);
    //         setContentData(isEmpty(content) ? '' : content);
    //     }
    // }, [post]);



    const renderPostData = () => {
        if (!loading && !isEmpty(post)) {
            return <PostData post={post} />
        }
    };
    const renderLikes = () => {

    };

    const renderComments = () => {

    };
    //! EDIT SECTION

    // render this through the edit post modal
    const modalComponentHandler = () => {
        return <EditPost post={post} />;
    };
    // edit post function which renders a modal
    const editPostHandler = () => {
        setModal('component', 'EDITOR', null, 'UPDATE', () => { }, modalComponentHandler);
    };

    const renderEditComponent = () => {
        if (!isEmpty(post)) {
            if (!loading && !auth.isAuthenticated) {
                return null;
            }

            if (!loading && auth.isAuthenticated) {
                return <EditPost post={post} setModal={setModal} updatePost={updatePost} loading={loading} />;
            }
        }
    };

    return (
        <article>
            {renderEditComponent()}
            <Wrapper>
                {loading ? <h1>LOADING...</h1> : renderPostData()}
            </Wrapper>
        </article>
    );
};

PostContent.propTypes = {
    updatePost: PropTypes.func.isRequired,
    setModal: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    post: PropTypes.object,
    auth: PropTypes.object.isRequired,
};

export default PostContent;