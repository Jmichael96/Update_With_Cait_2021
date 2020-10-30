import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';

// styles 
import './addComment.css';

// components
import Button from '../../../../Button/Button';

// utils
import isEmpty from '../../../../../utils/isEmpty';

const AddComment = ({ addComment, postId }) => {
    const [formData, setFormData] = useState({
        authorName: '',
        content: ''
    });
    // setting modal 
    const [displayModal, setDisplayModal] = useState(false);
    // render an error message with this state
    const [formError, setFormError] = useState();
    // extracting contents from form data
    const { authorName, content } = formData;

    // on change handler
    const onChangeHandler = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const renderForm = () => {
        return (
            <form id="addCommentStyles_form">
                <input className="addCommentStyles_inputs" name="authorName" placeholder="Your Name" value={authorName} onChange={(e) => onChangeHandler(e)} />
                <textarea className="addCommentStyles_inputs" name="content" rows="4" placeholder="Type a comment..." value={content} onChange={(e) => onChangeHandler(e)}></textarea>
            </form>
        );
    };

    // on form submission
    const onSubmitHandler = useCallback(async (e) => {
        e.preventDefault();
        // setting the form error to null
        setFormError();

        if (isEmpty(authorName) && isEmpty(content)) {
            setFormError('Please add a name and message');
            return;
        }
        if (isEmpty(authorName)) {
            setFormError('Please submit a name');
            return;
        }
        if (isEmpty(content)) {
            setFormError('Please enter a message');
            return;
        }
        let formData = {
            authorName,
            content
        };
        await addComment(postId, formData);
        resetHandler();
        setDisplayModal(false);
    }, [addComment, authorName, content, postId]);

    // reset form
    const resetHandler = () => {
        setFormData({
            authorName: '',
            content: ''
        });
    }
    return (
        <article id="addCommentStyles_root">
            <Button onClick={() => setDisplayModal(true)}>ADD COMMENT</Button>
            <div id="addCommentStyles_open-modal" className="addCommentStyles_modal-window" style={{
                visibility: displayModal ? 'visible' : 'hidden',
                opacity: displayModal ? 1 : 0,
                pointerEvents: displayModal ? 'auto' : 'none',
            }}>
                <div>
                    <div id="addCommentStyles_modalHeader">
                        <h4>ADD COMMENT</h4>
                    </div>
                    <div id="addCommentStyles_modalContent">
                        {renderForm()}
                        <span id="addCommentStyles_errorMsg">{!isEmpty(formError) && formError}</span>
                    </div>
                    <div id="addCommentStyles_btnWrap">
                        <Button onClick={() => { setDisplayModal(false); resetHandler(); }}>CANCEL</Button>
                        <Button onClick={(e) => { onSubmitHandler(e) }}>SUBMIT</Button>
                    </div>
                </div>
            </div>
        </article>
    )
};

AddComment.propTypes = {
    addComment: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    postId: PropTypes.string.isRequired,
};

export default AddComment;