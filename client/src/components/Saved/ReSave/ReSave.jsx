import React, { useState, useEffect, useCallback } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import PropTypes from 'prop-types';

// styles
import './reSave.css';

// components
import Wrapper from '../../Layout/Wrapper/Wrapper';

const ReSave = ({ resavePost, publishSavedPost, loading, savedPost: { _id, title, category, summary, coverImage, content } }) => {
    const [formData, setFormData] = useState({
        titleData: title,
        categoryData: category,
        summaryData: summary,
    });

    // react quill cover image
    const [coverImageData, setCoverImageData] = useState(coverImage);
    // react quill content 
    const [contentData, setContentData] = useState(content);
    // when to render spinner
    const [renderSpinner, setRenderSpinner] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const { titleData, categoryData, summaryData } = formData;
    
    useEffect(() => {
        if (!loading) {
            setFormData({
                title: title,
                category: category,
                summary: summary,
            });
            setCoverImageData(coverImage);
            setContentData(content);
        }
    }, [loading, title, category, summary, coverImage, content]);

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

    const publishPostHandler = useCallback(async (e) => {

    });

    const resavePostHandler = useCallback(async (e) => {

    });

    return loading ? <h1>LOADING...</h1> : (
        <article id="resaveStyles_root">
            <form id="resaveStyles_form">
                <div id="resaveStyles_titleCategoryWrap">
                    <input
                        id="resaveStyles_titleInput"
                        type="text"
                        placeholder="Title"
                        className="form-control"
                        name="title"
                        onChange={(e) => onChangeHandler(e)}
                        value={titleData}
                    />
                    <select
                        id="resaveStyles_categoryInput"
                        name="category"
                        onChange={(e) => onChangeHandler(e)}
                        value={categoryData}
                        className="browser-default custom-select">
                        <option>Choose Your Category</option>
                        <option value="Lifestyle">Lifestyle</option>
                        <option value="Devotional">Devotional</option>
                        <option value="Fitness">Fitness</option>
                        <option value="Review">Review</option>
                        <option value="Graphics">Graphics</option>
                    </select>
                </div>
                <Wrapper>
                    <textarea
                        type="text"
                        placeholder="Summary"
                        className="form-control"
                        name="summary"
                        id="resaveStyles_summaryInput"
                        rows="5"
                        onChange={(e) => onChangeHandler(e)}
                        value={summaryData}>
                    </textarea>
                </Wrapper>
                <Wrapper>
                    <ReactQuill
                        id="resaveStyles_coverImgInput"
                        placeholder="Cover Image"
                        name="coverImage"
                        modules={coverImageModules}
                        formats={coverImageFormats}
                        value={coverImageData}
                        onChange={(e) => setCoverImageData(e)}
                    />
                </Wrapper>
                <Wrapper>
                    <ReactQuill
                        id="resaveStyles_contentInput"
                        modules={modules}
                        formats={formats}
                        placeholder="Body"
                        name="content"
                        value={contentData}
                        onChange={(e) => setContentData(e)}
                    />
                </Wrapper>
                <Wrapper>
                    {!renderSpinner ? <button type="button" id="resaveStyles_resaveBtn" onClick={resavePostHandler}>RE-SAVE</button> : <p>LOADING...</p>}
                    {!renderSpinner ?
                        <button type="submit" onClick={(e) => { publishPostHandler(e) }} id="resaveStyles_publishBtn">PUBLISH</button>
                        :
                        <p>LOADING...</p>
                    }
                </Wrapper>
            </form>
        </article>
    );
};

ReSave.propTypes = {
    resavePost: PropTypes.func.isRequired,
    publishSavedPost: PropTypes.func.isRequired,
    savedPost: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
};
const modules = {
    toolbar: [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote'],
        ['link', 'image'],
        [{ 'header': 1 }, { 'header': 2 }],               // custom button values
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
        [{ 'direction': 'rtl' }],                         // text direction
        [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        [{ 'font': [] }],
        [{ 'align': [] }],
        ['clean']
    ],
};
const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'link',
    'image',
    'color',
    'align',
    'background',
    'direction',
    'clean',
];
const coverImageModules = {
    toolbar: [
        'image'
    ]
};
const coverImageFormats = [
    'image',

];
export default ReSave;