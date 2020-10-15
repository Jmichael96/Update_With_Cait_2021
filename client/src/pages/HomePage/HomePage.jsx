import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchLifestyle, fetchDevotional, fetchGraphics, fetchWellness } from '../../store/actions/post';

// styles

// components
import isEmpty from '../../utils/isEmpty';

const HomePage = ({ fetchLifestyle, fetchDevotional, fetchGraphics, fetchWellness, post: { loading, lifestylePosts, devotionalPosts, graphicsPosts, wellnessPosts } }) => {

    // fetch all the posts appropriately 
    // useEffect(() => {
    //     fetchPostsHandler();
    // }, []);

    // const fetchPostsHandler = async () => {
    //     if (!loading && isEmpty(lifestylePosts)) {
    //         await fetchLifestyle();
    //     }
    //     if (!loading && isEmpty(devotionalPosts)) {
    //         await fetchDevotional();
    //     }
    //     if (!loading && isEmpty(graphicsPosts)) {
    //         await fetchGraphics();
    //     }
    //     if (!loading && isEmpty(wellnessPosts)) {
    //         await fetchWellness();
    //     }
    // };

    return (
        <article>
            <h1>Home Page</h1>
        </article>
    );
};

HomePage.propTypes = {
    fetchLifestyle: PropTypes.func.isRequired,
    fetchDevotional: PropTypes.func.isRequired,
    fetchGraphics: PropTypes.func.isRequired,
    fetchWellness: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    post: state.post
});

export default connect(mapStateToProps, { fetchLifestyle, fetchDevotional, fetchGraphics, fetchWellness })(HomePage);