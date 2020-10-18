import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

// styles
import './recentPosts.css';

// utils
import isEmpty from '../../../utils/isEmpty';
import Colors from '../../../utils/constants/Colors';

// components
import PostItem from '../PostItem/PostItem';
import LgSpinner from '../../Layout/LgSpinner/LgSpinner';
import Wrapper from '../../Layout/Wrapper/Wrapper';

const RecentPosts = ({ fetchRecentPosts, loading, fetchedRecentPosts, recentPosts }) => {
    // fetch the most recent posts under appropriate conditions
    useEffect(() => {
        if (!fetchedRecentPosts) {
            fetchRecentPosts();
        }
    }, [fetchRecentPosts, fetchedRecentPosts]);

    // render the most recent posts
    const renderRecentPosts = () => {
        if (!fetchedRecentPosts && isEmpty(recentPosts)) {
            return null;
        }
        if (fetchedRecentPosts && isEmpty(recentPosts)) {
            return null;
        }
        if (fetchedRecentPosts && !isEmpty(recentPosts)) {
            return Object.values(recentPosts).map((post, i) => {
                return <PostItem post={post} isRecentPosts={true} />;
            });
        }
    };

    return loading ? (<div id="recentPostsStyles_spinnerWrap"><LgSpinner /></div>) : (
        <div id="recentPostsStyles_root">
            <Wrapper>
                {renderRecentPosts()}
            </Wrapper>
        </div>
    );
};

RecentPosts.propTypes = {
    fetchRecentPosts: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    fetchedRecentPosts: PropTypes.bool.isRequired,
    recentPosts: PropTypes.object.isRequired,
};

export default RecentPosts;