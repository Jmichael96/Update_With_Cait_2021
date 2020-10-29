import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchLifestyle } from '../../store/actions/post';
import { FaArrowAltCircleDown } from 'react-icons/fa';

// styles
import './lifestylePage.css';

// components
import PostItem from '../../components/Post/PostItem/PostItem';
import isEmpty from '../../utils/isEmpty';
import Wrapper from '../../components/Layout/Wrapper/Wrapper';
import LgSpinner from '../../components/Layout/LgSpinner/LgSpinner';
import Button from '../../components/Button/Button';

const LifestylePage = ({ fetchLifestyle, post: { loading, fetchedDbLifestyle, lifestylePosts } }) => {
    // set limit for how many blogs to render on page
    const [limit, setLimit] = useState(6);
    // boolean for when limit has been reached
    const [reachedLimit, setReachedLimit] = useState(null);

    // fetch lifestyle posts on load
    useEffect(() => {
        // if there are no posts then fetch lifestyle posts
        if (!fetchedDbLifestyle) {
            fetchLifestyle();
        }
    }, [fetchLifestyle, fetchedDbLifestyle]);

    // seeing if the amount of posts to load is greater or less than the limit component state
    useEffect(() => {
        if (!isEmpty(lifestylePosts) && Object.keys(lifestylePosts).length <= 6) {
            setReachedLimit(true);
        }
    }, [lifestylePosts]);

    // load more posts function to render more posts to view
    const loadMore = () => {
        const postList = lifestylePosts;
        const postLength = Object.keys(postList).length;
        const currentLimit = limit;
        if (currentLimit < postLength) {
            setLimit(postLength);
            setReachedLimit(true);
        } else if (currentLimit >= postLength) {
            setReachedLimit(false);
        }
    };

    // render the child post item component
    const renderPosts = () => {
        if (!loading && !isEmpty(lifestylePosts)) {
            return Object.values(lifestylePosts).slice(0, limit).map((post, i) => {
                return <PostItem post={post} key={i + 1} />;
            });
        }
    };

    // render the load more button
    const renderLoadMoreBtn = () => {
        if (!loading && isEmpty(lifestylePosts)) {
            return null;
        }
        if (loading && isEmpty(lifestylePosts)) {
            return null;
        }
        if (!loading && !isEmpty(lifestylePosts) && !reachedLimit) {
            return <Button onClick={loadMore}>Show More <FaArrowAltCircleDown className="lifestylePageStyles_downIcon" /></Button>
        }
    };

    return loading ? <LgSpinner /> : (
        <section id="lifestylePageStyles_root">
            <Wrapper>
                {!loading && fetchedDbLifestyle && renderPosts()}
            </Wrapper>
            <Wrapper>
                {renderLoadMoreBtn()}
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