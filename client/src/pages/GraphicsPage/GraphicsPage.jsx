import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchGraphics } from '../../store/actions/post';
import { FaArrowAltCircleDown } from 'react-icons/fa';

// styles
import './graphicsPage.css';

// components
import PostItem from '../../components/Post/PostItem/PostItem';
import isEmpty from '../../utils/isEmpty';
import Wrapper from '../../components/Layout/Wrapper/Wrapper';

const GraphicsPage = ({ fetchGraphics, post: { loading, graphicsPosts } }) => {
    // set limit for how many blogs to render on page
    const [limit, setLimit] = useState(6);
    // boolean for when limit has been reached
    const [reachedLimit, setReachedLimit] = useState(null);

    // fetch lifestyle posts on load
    useEffect(() => {
        fetchGraphics();
    }, [fetchGraphics]);

    // seeing if the amount of posts to load is greater or less than the limit component state
    useEffect(() => {
        if (!isEmpty(graphicsPosts) && Object.keys(graphicsPosts).length <= 6) {
            setReachedLimit(true);
        }
    }, [graphicsPosts]);

    // load more posts function to render more posts to view
    const loadMore = () => {
        const postList = graphicsPosts;
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
        if (!loading && !isEmpty(graphicsPosts)) {
            return Object.values(graphicsPosts).slice(0, limit).map((post, i) => {
                return <PostItem post={post} key={i + 1} />;
            });
        }
    };

    return (
        <section>
            <Wrapper>
                {loading ? <h1>LOADING...</h1> : renderPosts()}
                {!loading && !reachedLimit ? <button className="lifestylePageStyles_loadMoreBtn" onClick={loadMore}>Show More <FaArrowAltCircleDown className="lifestylePageStyles_downIcon" /></button> : null}
            </Wrapper>
        </section>
    )
};

GraphicsPage.propTypes = {
    fetchGraphics: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    post: state.post
});

export default connect(mapStateToProps, { fetchGraphics })(GraphicsPage);