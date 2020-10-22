import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { BsHeartFill } from 'react-icons/bs';

// styles
import './likes.css';

// components
import Button from '../../../Button/Button';

// utils
import isEmpty from '../../../../utils/isEmpty';

const Likes = ({ likePost, unlikePost, post: { _id, like_number }, loading }) => {
    // to distinguish when a post is liked or unlikthe user and when to call each function
    const [isLiked, setIsLiked] = useState(false);

    // handler for like and unlike
    const handleLikes = async () => {
        if (!isLiked) {
            setIsLiked(true);
            let newNum = +like_number;
            newNum += 1;
            await likePost(_id, newNum);
        }
        else if (isLiked) {
            setIsLiked(false);
            let newUnlikeNum = +like_number;
            newUnlikeNum -= 1;
            await unlikePost(_id, newUnlikeNum);
        }
    };

    return (
        <article id="likesStyles_root">
            <div id="likesStyles_likeActionWrap">
                <Button id="likesStyles_likeBtn" onClick={handleLikes}><BsHeartFill className="likesStyles_heartIcon" style={{ color: !isLiked ? 'grey' : 'red' }} />{' '}{!isLiked ? 'LIKE' : 'LIKED'}</Button>
            </div>
        </article>
    );
};

Likes.propTypes = {
    likePost: PropTypes.func.isRequired,
    unlikePost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
};

export default Likes;