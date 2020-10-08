import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchSavedPost, resavePost, publishSavedPost } from '../../store/actions/saved';
import { useParams } from 'react-router-dom';

// styles
import './savedPostContentPage.css';

// components
import isEmpty from '../../utils/isEmpty';
import ReSave from '../../components/Saved/ReSave/ReSave';

const SavedPostContentPage = ({ fetchSavedPost, resavePost, publishSavedPost, saved: { loading, savedPost } }) => {
    // getting the param id
    let { id } = useParams();
    useEffect(() => {
        // if (isEmpty(savedPost)) {
        fetchSavedPost(id);
        // }
    }, [fetchSavedPost]);

    // render the re save component
    const renderResave = () => {
        if (!loading && !isEmpty(savedPost)) {
            return <ReSave savedPost={savedPost} resavePost={resavePost} publishSavedPost={publishSavedPost} loading={loading} />
        }
    };

    return loading ? <h1>LOADING...</h1> : (
        <article>
            <h1>saved post</h1>
            {renderResave()}
        </article>
    );
};

SavedPostContentPage.propTypes = {
    fetchSavedPost: PropTypes.func.isRequired,
    resavePost: PropTypes.func.isRequired,
    publishSavedPost: PropTypes.func.isRequired,
    saved: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    saved: state.saved
});

export default connect(mapStateToProps, { fetchSavedPost, resavePost, publishSavedPost })(SavedPostContentPage);