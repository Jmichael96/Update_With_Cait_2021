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
                <div className="postCategoriesStyles_outerCard" onClick={redirectLifestyle}>
                    <main className="postCategoriesStyles_card">

                    </main>
                    <h5 className="postCategoriesStyles_labelText">lifestyle</h5>
                </div>
                <div className="postCategoriesStyles_outerCard" onClick={redirectDevotional}>
                    <main className="postCategoriesStyles_card">

                    </main>
                    <h5 className="postCategoriesStyles_labelText">devotional</h5>
                </div>
                <div className="postCategoriesStyles_outerCard" onClick={redirectGraphics}>
                    <main className="postCategoriesStyles_card">

                    </main>
                    <h5 className="postCategoriesStyles_labelText">graphics</h5>
                </div>
            </div>
        </section>
    );
};

PostCategories.propTypes = {
    history: PropTypes.any,
};

export default withRouter(PostCategories);