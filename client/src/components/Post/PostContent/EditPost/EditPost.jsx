import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

// styles
import './editPost.css';

// components
import isEmpty from '../../../../utils/isEmpty';
import Wrapper from '../../../Layout/Wrapper/Wrapper';

const EditPost = ({ setTitleData, titleData, coverImageData, contentData, setCoverImageData, setContentData }) => {

    return (
        <article id="editPostStyles_root">
            <h1>Thingy</h1>
            <form>
                <div id="resaveStyles_titleCategoryWrap">
                    <input value={titleData} name="titleData" onChange={(e) => setTitleData(e.target.value)} />
                    {/* <select
                        id="resaveStyles_categoryInput"
                        name="categoryData"
                        onChange={(e) => onChangeHandler(e)}
                        value={categoryData}
                        className="browser-default custom-select">
                        <option>Choose Your Category</option>
                        <option value="Lifestyle">Lifestyle</option>
                        <option value="Devotional">Devotional</option>
                        <option value="Fitness">Fitness</option>
                        <option value="Review">Review</option>
                        <option value="Graphics">Graphics</option>
                    </select> */}
                </div>
                <Wrapper>
                    {/* <textarea
                        type="text"
                        placeholder="Summary"
                        className="form-control"
                        name="summaryData"
                        id="resaveStyles_summaryInput"
                        rows="5"
                        onChange={(e) => onChangeHandler(e)}
                        value={summaryData}>
                    </textarea> */}
                </Wrapper>
                <Wrapper>
                    <ReactQuill
                        id="resaveStyles_coverImgInput"
                        placeholder="Cover Image"
                        name="coverImageData"
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
                        name="contentData"
                        value={contentData}
                        onChange={(e) => setContentData(e)}
                    />
                </Wrapper>
            </form>
        </article>
    );
};

EditPost.propTypes = {
    titleData: PropTypes.any,
    setTitleData: PropTypes.func.isRequired,
    coverImageData: PropTypes.any,
    contentData: PropTypes.any,
    setCoverImageData: PropTypes.func.isRequired,
    setContentData: PropTypes.func.isRequired,
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

export default EditPost;