import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchSaved } from '../../store/actions/saved';

// styles
import './savedPage.css';

// components 
import isEmpty from '../../utils/isEmpty';
import SavedItem from '../../components/Post/SavedItem/SavedItem';
import Wrapper from '../../components/Layout/Wrapper/Wrapper';

const SavedPage = ({ fetchSaved, saved: { loading, savedPosts, savedPost } }) => {
    useEffect(() => {
        // if there are no saved posts present then fetch saved posts
        if (loading && isEmpty(savedPosts)) {
            fetchSaved();
        }
    }, [fetchSaved]);

    // render the saved items
    const renderSavedItems = () => {
        if (!loading && !isEmpty(savedPosts)) {
            return Object.values(savedPosts).map((post, i) => {
                return <SavedItem post={post} key={i + 1} />
            });
        }
    };

    return loading ? <h1>LOADING...</h1> : (
        <article>
            <h1 id="savedPageStyles_title">SAVED POSTS</h1>
            <Wrapper>
                {renderSavedItems()}
            </Wrapper>
        </article>
    );
};

SavedPage.propTypes = {
    fetchSaved: PropTypes.func.isRequired,
    saved: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    saved: state.saved
});

export default connect(mapStateToProps, { fetchSaved })(SavedPage);
