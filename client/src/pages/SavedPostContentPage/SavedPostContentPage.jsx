import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react';
import { fetchSavedPost } from '../../store/actions/saved';

// styles
import './savedPostContentPage.css';

// components

const SavedPostContentPage = ({ fetchSavedPost, saved: { loading, savedPost } }) => {

};

SavedPostContentPage.propTypes = {
    fetchSavedPost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    saved: state.saved
});

export default connect(mapStateToProps, { fetchSavedPost })(SavedPostContentPage);