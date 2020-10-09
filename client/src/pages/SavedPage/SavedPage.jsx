import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchSaved, deleteSaved } from '../../store/actions/saved';
import { setModal } from '../../store/actions/modal';

// styles
import './savedPage.css';

// components 
import isEmpty from '../../utils/isEmpty';
import SavedItem from '../../components/Saved/SavedItem/SavedItem';
import Wrapper from '../../components/Layout/Wrapper/Wrapper';

const SavedPage = ({ fetchSaved, deleteSaved, setModal, saved: { loading, savedPosts } }) => {
    useEffect(() => {
        // if there are no saved posts present then fetch saved posts
        if (isEmpty(savedPosts)) {
            fetchSaved();
        }
    }, [fetchSaved]);

    // render the saved items
    const renderSavedItems = () => {
        if (!loading && !isEmpty(savedPosts)) {
            return Object.values(savedPosts).map((post, i) => {
                return <SavedItem post={post} key={i + 1} deleteSaved={deleteSaved} setModal={setModal} />
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
    deleteSaved: PropTypes.func.isRequired,
    setModal: PropTypes.func.isRequired,
    saved: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    saved: state.saved
});

export default connect(mapStateToProps, { fetchSaved, deleteSaved, setModal })(SavedPage);