import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchLifestyle } from '../../store/actions/post';

// styles
import './lifestylePage.css';

const LifestylePage = ({ fetchLifestyle, post: { loading, posts, lifestylePosts } }) => {

    // fetch lifestyle posts on load
    useEffect(() => {
        fetchLifestyle();
    }, []);

    return (
        <section>

        </section>
    )
};

LifestylePage.propTypes = {
    fetchLifestyle: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    post: state.post
});

export default connect(mapStateToProps, { fetchLifestyle })(LifestylePage);