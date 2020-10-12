import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

// styles 
import './addComment.css';

// components

const AddComment = ({ addComment, loading }) => {
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
                <div id="addCommentStyles_inputWrap">
                    <input id="addCommentStyles_nameInput" name="name" placeholder="Your Name" value={name} onChange={onChangeHandler} />
                    <textarea id="addCommentStyles_textInput" rows="4" placeholder="Type a comment..." value={text} onChange={onChangeHandler} ></textarea>
                </div>
            </form>
        );
    };

    // on form submission
    const onSubmitHandler = useCallback(async (e) => {
        e.preventDefault();
    }, []);

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
                    </div>
                    <div id="addCommentStyles_btnWrap">
                        <button id="addCommentStyles_cancelBtn" onClick={() => setDisplayModal(false)}>CANCEL</button>
                        {!renderSpinner ? <button id="addCommentStyles_updateBtn" onClick={(e) => { onChangeHandler(e) }}>COMMENT</button> : <h1>LOADING</h1>}
                    </div>
                </div>
            </div>
        </article>
    )
};

AddComment.propTypes = {
    addComment: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
};

export default AddComment;