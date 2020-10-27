import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { unSubscribe } from '../../store/actions/subscribe';

// styles
import './unSubscribePage.css';

// components
import SmSpinner from '../../components/Layout/SmSpinner/SmSpinner';

// utils
import Colors from '../../utils/constants/Colors';
import isEmpty from '../../utils/isEmpty';

const UnSubscribePage = ({ sub: { loading } }) => {
    const [email, setEmail] = useState('');
    return (
        <article>
            <h1>Unsubscribe</h1>
        </article>
    )
};

UnSubscribePage.propTypes = {
    sub: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    sub: state.subscribe
});

export default connect(mapStateToProps)(UnSubscribePage);