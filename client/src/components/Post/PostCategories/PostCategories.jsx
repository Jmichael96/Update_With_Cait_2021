import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

// styles
import './postCategories.css';

// utils
import Colors from '../../../utils/constants/Colors';

const PostCategories = ({ history }) => {
    // redirect to lifestyle posts
    const redirectLifestyle = () => {
        history.push('/lifestyle');
    };
    // redirect to devotional posts
    const redirectDevotional = () => {
        history.push('/devotional');
    };
    // redirect to graphics posts
    const redirectGraphics = () => {
        history.push('/graphics');
    };

    return (
        <section id="postCategoriesStyles_root">
            <div id="postCategoriesStyles_relativeBg" style={{ backgroundColor: Colors.accentColor }}>
                <div className="postCategoriesStyles_outerCard" onClick={redirectLifestyle} style={{ backgroundColor: Colors.cardBg }}>
                    <main className="postCategoriesStyles_card">

                    </main>
                    <h5 className="postCategoriesStyles_labelText" style={{ color: Colors.cardText }}>lifestyle</h5>
                </div>
                <div className="postCategoriesStyles_outerCard" onClick={redirectDevotional} style={{ backgroundColor: Colors.cardBg }}>
                    <main className="postCategoriesStyles_card">

                    </main>
                    <h5 className="postCategoriesStyles_labelText" style={{ color: Colors.cardText }}>devotional</h5>
                </div>
                <div className="postCategoriesStyles_outerCard" onClick={redirectGraphics} style={{ backgroundColor: Colors.cardBg }}>
                    <main className="postCategoriesStyles_card">

                    </main>
                    <h5 className="postCategoriesStyles_labelText" style={{ color: Colors.cardText }}>graphics</h5>
                </div>
            </div>
        </section>
    );
};

PostCategories.propTypes = {
    history: PropTypes.any,
};

export default withRouter(PostCategories);