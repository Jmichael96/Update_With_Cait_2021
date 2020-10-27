import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchSubs } from '../../store/actions/subscribe';
import { AiFillDelete } from 'react-icons/ai';

// styles
import './subDataPage.css';

// components
import Wrapper from '../../components/Layout/Wrapper/Wrapper';
import SmSpinner from '../../components/Layout/SmSpinner/SmSpinner';
import LgSpinner from '../../components/Layout/LgSpinner/LgSpinner';
import Button from '../../components/Button/Button';

// utils
import Colors from '../../utils/constants/Colors';
import isEmpty from '../../utils/isEmpty';

const SubDataPage = ({ fetchSubs, subs: { loading, subs } }) => {

    useEffect(() => {
        if (!loading && isEmpty(subs)) {
            fetchSubs();
        }
    }, [subs, loading, fetchSubs]);

    // delete handler
    const onDeleteHandler = (id) => {
        console.log(id);
    };

    // render all the subs accordingly
    const renderSubs = () => {
        if (!loading && isEmpty(subs)) {
            return null;
        }
        return Object.values(subs).map((sub, i) => {
            return (
                <tr key={i + 1}>
                    <td data-column="NAME">{sub.name}</td>
                    <td data-column="EMAIL">{sub.email}</td>
                    <td data-column="" className="subDataPageStyles_deleteTd"><Wrapper><Button onClick={() => onDeleteHandler(sub._id)} isdelete="true">{!loading ? <span><AiFillDelete /></span> : <SmSpinner />}</Button></Wrapper></td>
                </tr>
            );
        });
    };

    return loading ? <LgSpinner /> : (
        <article id="subDataPageStyles_root">
            <Wrapper>
                <p id="subDataPageStyles_subLengthText">{subs.length} TOTAL SUBSCRIPTIONS</p>
            </Wrapper>
            <Wrapper>
                <table>
                    <thead>
                        <tr>
                            <th style={{ backgroundColor: Colors.secondaryBgColor }}>NAME</th>
                            <th style={{ backgroundColor: Colors.secondaryBgColor }}>EMAIL</th>
                            <th style={{ backgroundColor: Colors.secondaryBgColor }}>DELETE</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderSubs()}
                    </tbody>
                </table>
            </Wrapper>
        </article>
    );
};

SubDataPage.propTypes = {
    fetchSubs: PropTypes.func.isRequired,
    subs: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    subs: state.subscribe
});

export default connect(mapStateToProps, { fetchSubs })(SubDataPage);