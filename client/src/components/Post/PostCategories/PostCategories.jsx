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
                <main className="postCategoriesStyles_card">
                    
                </main>
                <main className="postCategoriesStyles_card">
                    
                </main>
                <main className="postCategoriesStyles_card">

                </main>
            </div>
        </section>
    );
};

export default PostCategories;