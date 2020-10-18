import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchDevotional } from '../../store/actions/post';
import { FaArrowAltCircleDown } from 'react-icons/fa';

// styles
import './devotionalPage.css';

// components
import PostItem from '../../components/Post/PostItem/PostItem';
import isEmpty from '../../utils/isEmpty';
import Wrapper from '../../components/Layout/Wrapper/Wrapper';
import LgSpinner from '../../components/Layout/LgSpinner/LgSpinner';

const DevotionalPage = ({ fetchDevotional, post: { loading, fetchedDbDevotional, devotionalPosts } }) => {
    // set limit for how many blogs to render on page
    const [limit, setLimit] = useState(6);
    // boolean for when limit has been reached
    const [reachedLimit, setReachedLimit] = useState(null);

    // fetch lifestyle posts on load
    useEffect(() => {
        // if there are not any devotional posts then fetch posts
        if (!fetchedDbDevotional) {
            fetchDevotional();
        }
    }, [fetchDevotional]);

    // seeing if the amount of posts to load is greater or less than the limit component state
    useEffect(() => {
        if (!isEmpty(devotionalPosts) && Object.keys(devotionalPosts).length <= 6) {
            setReachedLimit(true);
        }
    }, [devotionalPosts]);

    // load more posts function to render more posts to view
    const loadMore = () => {
        const postList = devotionalPosts;
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
        if (!loading && !isEmpty(devotionalPosts)) {
            return Object.values(devotionalPosts).slice(0, limit).map((post, i) => {
                return <PostItem post={post} key={i + 1} />;
            });
        }
    };

    // render the load more button
    const renderLoadMoreBtn = () => {
        if (!loading && isEmpty(devotionalPosts)) {
            return null;
        }
        if (loading && isEmpty(devotionalPosts)) {
            return null;
        }
        if (!loading && !isEmpty(devotionalPosts) && !reachedLimit) {
            return <button className="devotionalPageStyles_loadMoreBtn" onClick={loadMore}>Show More <FaArrowAltCircleDown className="devotionalPageStyles_downIcon" /></button>
        }
    };


    return loading ? <LgSpinner /> : (
        <section>
            <Wrapper>
                {!loading && fetchedDbDevotional && renderPosts()}
            </Wrapper>
            <Wrapper>
                {renderLoadMoreBtn()}
            </Wrapper>
        </section>
    )
};

DevotionalPage.propTypes = {
    fetchDevotional: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    post: state.post
});

export default connect(mapStateToProps, { fetchDevotional })(DevotionalPage);