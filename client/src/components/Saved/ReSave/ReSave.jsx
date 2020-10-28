import React, { useState, useEffect, useCallback } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { AiOutlineDownload, AiFillCheckCircle } from 'react-icons/ai';

// styles
import './reSave.css';

// components
import Wrapper from '../../Layout/Wrapper/Wrapper';
import validate from '../../../utils/validateForm';
import SmSpinner from '../../Layout/SmSpinner/SmSpinner';
import Button from '../../Button/Button';

// utils
import isEmpty from '../../../utils/isEmpty';
const ReSave = ({ resavePost, publishSavedPost, loading, setModal, savedPost: { _id, title, category, summary, coverImage, content }, history }) => {
    const [formData, setFormData] = useState({
        titleData: '',
        categoryData: '',
        summaryData: '',
    });
    // react quill cover image
    const [coverImageData, setCoverImageData] = useState('');
    // react quill content 
    const [contentData, setContentData] = useState('');

    // extracting data from formData obj
    const { titleData, categoryData, summaryData } = formData;

    useEffect(() => {
        if (!loading) {
            setFormData({
                titleData: isEmpty(title) ? '' : title,
                categoryData: isEmpty(category) ? '' : category,
                summaryData: isEmpty(summary) ? '' : summary,
            });

            setCoverImageData(isEmpty(coverImage) ? '' : coverImage);
            setContentData(isEmpty(content) ? '' : content);
        }
    }, [loading, title, category, summary, coverImage, content]);

    // on change handler
    const onChangeHandler = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const publishPostHandler = useCallback(async (e) => {
        e.preventDefault();
        if (!validate(titleData, categoryData, summaryData, coverImageData, contentData, setModal)) {
            return;
        }
        try {
            let form = {
                title: titleData,
                category: categoryData,
                summary: summaryData,
                coverImage: coverImageData,
                content: contentData
            }
            await publishSavedPost(_id, history, form);
        } catch (err) {

        }
    }, [titleData, categoryData, summaryData, coverImageData, contentData, setModal, publishSavedPost]);

    const resavePostHandler = useCallback(async (e) => {
        e.preventDefault();
        // validate for if all forms are empty
        if (isEmpty(titleData) && isEmpty(categoryData) && isEmpty(summaryData) && isEmpty(coverImageData) && isEmpty(contentData)) {
            setModal('error', 'form error', 'Please make sure at least one field is filled out', 'okay', () => { });
            return;
        }
        if (titleData === title && categoryData === category && summaryData === summary && coverImageData === coverImage && contentData === content) {
            history.push('/saved');
            setModal('error', 'same content', 'No content has been changed so there is no need to re-save', 'okay', () => { });
            return;
        }
        try {
            let form = {
                title: titleData,
                category: categoryData,
                summary: summaryData,
                coverImage: coverImageData,
                content: contentData
            };

            await resavePost(_id, history, form)
        } catch (err) {
            throw err;
        }
    }, [titleData, categoryData, summaryData, coverImageData, contentData, setModal, resavePost]);

    return (
        <article id="resaveStyles_root">
            <form id="resaveStyles_form">
                <div id="resaveStyles_titleCategoryWrap">
                    <input
                        id="resaveStyles_titleInput"
                        type="text"
                        placeholder="Title"
                        name="titleData"
                        value={titleData}
                        onChange={(e) => onChangeHandler(e)}
                    />
                    <select
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
                    </select>
                </div>
                <Wrapper>
                    <textarea
                        type="text"
                        placeholder="Summary"
                        className="form-control"
                        name="summaryData"
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
                <Wrapper>
                    <Button onClick={(e) => resavePostHandler(e)}>{!loading ? <span>RE-SAVE <AiOutlineDownload className="resaveStyles_icon" /></span> : <SmSpinner />}</Button>
                    <Button type="submit" onClick={(e) => { publishPostHandler(e) }} id="resaveStyles_publishBtn">{!loading ? <span>PUBLISH <AiFillCheckCircle className="resaveStyles_icon" /></span> : <SmSpinner />}</Button>
                </Wrapper>
            </form>
        </article>
    );
};

ReSave.propTypes = {
    resavePost: PropTypes.func.isRequired,
    publishSavedPost: PropTypes.func.isRequired,
    savedPost: PropTypes.object.isRequired,
    setModal: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    history: PropTypes.any,
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