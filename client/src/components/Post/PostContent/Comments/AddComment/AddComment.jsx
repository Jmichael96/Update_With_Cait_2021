import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

// styles 
import './addComment.css';

// components
import isEmpty from '../../../../../utils/isEmpty';

const AddComment = ({ addComment, loading, postId }) => {
    const [formData, setFormData] = useState({
        name: '',
        text: ''
    });
    // setting modal 
    const [displayModal, setDisplayModal] = useState(false);
    // on submit change to true
    const [isSubmitted, setIsSubmitted] = useState(false);
    // set to render spinner
    const [renderSpinner, setRenderSpinner] = useState(false);
    // render an error message with this state
    const [formError, setFormError] = useState();
    // extracting contents from form data
    const { name, text } = formData;

    // checking if store is loading and if user submitted form to render spinner accordingly
    useEffect(() => {
        if (loading && isSubmitted) {
            setRenderSpinner(true);
        } else if (loading && !isSubmitted) {
            setRenderSpinner(false);
        }
    }, [loading, isSubmitted]);

    // on change handler
    const onChangeHandler = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const renderForm = () => {
        return (
            <form id="addCommentStyles_form">
                <input className="addCommentStyles_inputs" name="name" placeholder="Your Name" value={name} onChange={(e) => onChangeHandler(e)} />
                <textarea className="addCommentStyles_inputs" name="text" rows="4" placeholder="Type a comment..." value={text} onChange={(e) => onChangeHandler(e)}></textarea>
            </form>
        );
    };

    // on form submission
    const onSubmitHandler = useCallback(async (e) => {
        e.preventDefault();
        // setting the form submission to true
        setIsSubmitted(true);
        // setting the form error to null
        setFormError();

        if (isEmpty(name) && isEmpty(text)) {
            setIsSubmitted(false);
            setFormError('Please add a name and message');
            return;
        }
        if (isEmpty(name)) {
            setIsSubmitted(false);
            setFormError('Please submit a name');
            return;
        }
        if (isEmpty(text)) {
            setIsSubmitted(false);
            setFormError('Please enter a message');
            return;
        }
        let formData = {
            name,
            text
        };
        await addComment(postId, formData);
        resetHandler();
        setIsSubmitted(false);
        setDisplayModal(false);
    }, [addComment, name, text, postId]);

    // reset form
    const resetHandler = () => {
        setFormData({
            name: '',
            text: ''
        });
    }
    return (
        <article id="addCommentStyles_root">
            <button onClick={() => setDisplayModal(true)}>ADD COMMENT</button>
            <div id="addCommentStyles_open-modal" className="addCommentStyles_modal-window" style={{
                visibility: displayModal ? 'visible' : 'hidden',
                opacity: displayModal ? 1 : 0,
                pointerEvents: displayModal ? 'auto' : 'none',
            }}>
                <div>
                    <div id="addCommentStyles_modalHeader">
                        <h4>EDIT POST</h4>
                    </div>
                    <div id="addCommentStyles_modalContent">
                        {renderForm()}
                        <span id="addCommentStyles_errorMsg">{!isEmpty(formError) && formError}</span>
                    </div>
                    <div id="addCommentStyles_btnWrap">
                        <button id="addCommentStyles_cancelBtn" onClick={() => setDisplayModal(false)}>CANCEL</button>
                        {!renderSpinner ? <button id="addCommentStyles_updateBtn" onClick={(e) => { onSubmitHandler(e) }}>SUBMIT</button> : <h1>LOADING</h1>}
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