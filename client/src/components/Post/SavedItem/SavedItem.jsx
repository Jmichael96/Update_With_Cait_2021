import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Moment from 'react-moment';
import { AiFillTag } from 'react-icons/ai';

// styles
import './savedItem.css';

const SavedItem = ({ post: { _id, title, category, summary, coverImage, content, date }, history }) => {
    // redirect function to redirect to saved post content for publishing or resaving post
    const redirectHandler = () => {
        history.push(`saved_post/${_id}`);
    };

    return (
        <article className="savedItemStyles_card" onClick={redirectHandler}>
            <div className="savedItemStyles_innerWrap">
                {category && <section className="savedItemStyles_categoryWrap">
                    <AiFillTag className="savedItemStyles_categoryIcon" />
                    <a className="savedItemStyles_category">{category.toUpperCase()}</a>
                </section>
                }
                {title && <h4 className="savedItemStyles_title">{title}</h4>}
                <p className="savedItemStyles_date">
                    <Moment format="MMMM DD, YYYY">{date.toUpperCase()}</Moment>
                </p>
            </div>
        </article>
    );
};

SavedItem.propTypes = {
    post: PropTypes.object.isRequired,
    history: PropTypes.any,
};

export default withRouter(SavedItem);