import React from 'react';
import { Link } from 'react-router-dom';

// styles
import './postCategories.css';

// utils
import Colors from '../../../utils/constants/Colors';

const PostCategories = () => {
    return (
        <section id="postCategoriesStyles_root">
            <div id="postCategoriesStyles_relativeBg" style={{ backgroundColor: Colors.accentColor }}>
                <div className="postCategoriesStyles_outerCard">
                    <main className="postCategoriesStyles_card">

                    </main>
                    <button className="postCategoriesStyles_button">lifestyle</button>
                </div>
                <div className="postCategoriesStyles_outerCard">
                    <main className="postCategoriesStyles_card">

                    </main>
                    <button>devotional</button>
                </div>
                <div className="postCategoriesStyles_outerCard">
                    <main className="postCategoriesStyles_card">

                    </main>
                    <button>graphics</button>
                </div>
            </div>
        </section>
    );
};

export default PostCategories;