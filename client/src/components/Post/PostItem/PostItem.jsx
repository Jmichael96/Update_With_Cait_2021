import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { FaComment, FaHeart } from 'react-icons/fa';
import { ImCircleRight } from 'react-icons/im';
import { withRouter } from 'react-router-dom';

// styles 
import './postItem.css';

// utils
import isEmpty from '../../../utils/isEmpty';
import Colors from '../../../utils/constants/Colors';

// components
import Wrapper from '../../Layout/Wrapper/Wrapper';

const PostItem = ({ post: { _id, title, coverImage, summary, date, category, like_number, comments }, history }) => {
    const redirectHandler = () => {
        history.push(`/post_content/${_id}`);
    };
    // render the post item like_number
    const renderLikeNumber = () => {
        if (isEmpty(like_number)) {
            return <span className="postItemStyles_iconNum">0</span>;
        }
        else {
            return <span className="postItemStyles_iconNum">{like_number}</span>
        }
    };
    // render the post item comment length
    const renderCommentNumber = () => {
        if (isEmpty(comments)) {
            return <span className="postItemStyles_iconNum">0</span>;
        }
        else {
            return <span className="postItemStyles_iconNum">{comments.length}</span>
        }
    };

    return (
        <article className="postItemStyles_card" onClick={redirectHandler} style={{ backgroundColor: Colors.cardBg }}>
            <Wrapper>
                <div className="postItemStyles_innerCard">
                    <Wrapper>
                        <div className="postItemStyles_coverImgWrap">
                            <span className="postItemStyles_coverImg" dangerouslySetInnerHTML={{ __html: !isEmpty(coverImage) && coverImage }}></span>
                        </div>
                    </Wrapper>
                    <div className="postItemStyles_contentWrap">
                        <h3 className="postItemStyles_title" style={{ color: Colors.cardText }}>{!isEmpty(title) && title}</h3>
                        <p className="postItemStyles_date" style={{ color: Colors.cardDate }}>
                            <Moment format="MMMM DD, YYYY">{!isEmpty(date) && date.toUpperCase()}</Moment>
                        </p>
                        <div style={{ borderColor: Colors.accentColor }} className="postItemStyles_divider"></div>
                        {!isEmpty(summary) && <p className="postItemStyles_summary" style={{ color: Colors.cardText }}>{summary}</p>}
                        <Wrapper styles={{ justifyContent: 'space-between' }}>
                            <div className="postItemStyles_iconWrap" style={{ color: Colors.cardText }}>
                                <FaHeart className="postItemStyles_icon" />
                                {renderLikeNumber()}
                            </div>
                            <div className="postItemStyles_iconWrap" style={{ color: Colors.cardText }}>
                                <FaComment className="postItemStyles_icon" />
                                {renderCommentNumber()}
                            </div>
                        </Wrapper>
                        <Wrapper>
                            <button className="postItemStyles_readBtn" style={{ backgroundColor: Colors.buttonBg }}><ImCircleRight style={{ color: Colors.buttonText }} className="postItemStyles_readIcon" /></button>
                        </Wrapper>
                    </div>
                </div>
            </Wrapper>
        </article>
    );
};

PostItem.propTypes = {
    post: PropTypes.object.isRequired,
    history: PropTypes.any,
};

export default withRouter(PostItem);