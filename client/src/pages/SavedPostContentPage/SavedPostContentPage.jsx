import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react';
import { fetchSavedPost } from '../../store/actions/saved';
import { useParams } from 'react-router-dom';

// styles
import './savedPostContentPage.css';

// components
import isEmpty from '../../utils/isEmpty';

const SavedPostContentPage = ({ fetchSavedPost, saved: { loading, savedPost } }) => {
    // getting the param id
    let { id } = useParams();
    useEffect(() => {
        if (!loading && isEmpty(savedPost)) {
            fetchSavedPost(id);
        }
    }, [fetchSavedPost]);

    return loading ? <h1>LOADING...</h1> : (
        <article>
            <h1>saved post</h1>
        </article>
    );
};

SavedPostContentPage.propTypes = {
    fetchSavedPost: PropTypes.func.isRequired,
    saved: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    saved: state.saved
});

export default connect(mapStateToProps, { fetchSavedPost })(SavedPostContentPage);