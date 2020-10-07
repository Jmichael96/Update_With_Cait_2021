import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchLifestyle } from '../../store/actions/post';

// styles
import './lifestylePage.css';

// components
import PostItem from '../../components/Post/PostItem/PostItem';
import isEmpty from '../../utils/isEmpty';
import Wrapper from '../../components/Layout/Wrapper/Wrapper';

const LifestylePage = ({ fetchLifestyle, post: { loading, lifestylePosts } }) => {

    // fetch lifestyle posts on load
    useEffect(() => {
        fetchLifestyle();
    }, [fetchLifestyle]);

    const renderPosts = () => {
        if (!loading && !isEmpty(lifestylePosts)) {
            return Object.values(lifestylePosts).map((post, i) => {
                return <PostItem post={post} key={i + 1} />;
            });
        }
    };

    return (
        <section>
            <Wrapper>
                {loading ? <h1>LOADING...</h1> : renderPosts()}
            </Wrapper>
        </section>
    )
};

LifestylePage.propTypes = {
    fetchLifestyle: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    post: state.post
});

export default connect(mapStateToProps, { fetchLifestyle })(LifestylePage);