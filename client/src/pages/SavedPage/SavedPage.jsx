import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchSaved } from '../../store/actions/saved';

// styles
import './savedPage.css';

// components 
import isEmpty from '../../utils/isEmpty';

const SavedPage = ({ fetchSaved, saved: { loading, savedPosts, savedPost } }) => {
    useEffect(() => {
        // if there are no saved posts present then fetch saved posts
        if (loading && isEmpty(savedPosts)) {
            fetchSaved();
        }
    }, [fetchSaved]);
    
    return (
        <h1>saved posts</h1>
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
