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
                return <PostItem key={i + 1} post={post} />;
            });
        }
    };

    return (
        <section id="recentPostsStyles_root" style={{ backgroundColor: Colors.accentColor }}>
            <div>
                {!loading && fetchedRecentPosts && <h3 id="recentPostStyles_title">In Case You Missed It</h3>}
                <Wrapper>
                    {!loading ? renderRecentPosts() : <div id="recentPostsStyles_spinnerWrap"><LgSpinner /></div>}
                </Wrapper>
            </div>
        </section>
    );
};

RecentPosts.propTypes = {
    fetchRecentPosts: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    fetchedRecentPosts: PropTypes.bool.isRequired,
    recentPosts: PropTypes.array.isRequired,
};

export default RecentPosts;