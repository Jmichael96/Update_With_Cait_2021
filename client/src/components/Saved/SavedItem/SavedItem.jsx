import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Moment from 'react-moment';
import { AiFillTag } from 'react-icons/ai';
import { FaTrash } from 'react-icons/fa';

// styles
import './savedItem.css';

// utils
import Colors from '../../../utils/constants/Colors';

const SavedItem = ({ deleteSaved, setModal, post: { _id, title, category, date }, history }) => {
    // using the state for mouse enter and mouse leave
    const [mouse, setMouse] = useState(false);

    // redirect function to redirect to saved post content for publishing or resaving post
    const redirectHandler = () => {
        history.push(`/saved_post/${_id}`);
    };

    const confirmDeleteHandler = (e) => {
        setModal('confirm', 'Are you sure?', 'You cannot go back once confirming', 'yes delete', () => { deleteSaved(_id) });
    };

    // for mouse enter
    const mouseEnter = () => {
        setMouse(true);
    };
    // for mouse leave
    const mouseLeave = () => {
        setMouse(false);
    };

    return (
        <article className="savedItemStyles_card" onMouseEnter={mouseEnter} onMouseLeave={mouseLeave} style={{ backgroundColor: Colors.cardBg }}>
            <div className="savedItemStyles_innerWrap">
                {category && <section className="savedItemStyles_categoryWrap">
                    <AiFillTag className="savedItemStyles_categoryIcon" />
                    <a className="savedItemStyles_category" href="#!" style={{ color: Colors.cardText}}>{category.toUpperCase()}</a>
                </section>
                }
                {title && <h4 className="savedItemStyles_title">{title}</h4>}
                <p className="savedItemStyles_date">
                    <Moment format="MMMM DD, YYYY">{date.toUpperCase()}</Moment>
                </p>
            </div>
            <a href="#!" className="savedItemStyles_deleteWrap" onClick={confirmDeleteHandler}><FaTrash style={{ display: !mouse ? 'none' : 'block' }} className="savedItemStyles_deleteIcon" /></a>
            <button className="savedItemStyles_openBtn" onClick={redirectHandler} style={{ display: !mouse ? 'none' : 'block' }}>OPEN</button>
        </article>
    );
};

SavedItem.propTypes = {
    post: PropTypes.object.isRequired,
    deleteSaved: PropTypes.func.isRequired,
    setModal: PropTypes.func.isRequired,
    history: PropTypes.any,
};

export default withRouter(SavedItem);