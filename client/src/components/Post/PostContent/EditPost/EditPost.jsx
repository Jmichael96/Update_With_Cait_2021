import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { AiFillEdit } from 'react-icons/ai';

// styles
import './editPost.css';

// components
import Wrapper from '../../../Layout/Wrapper/Wrapper';
import validate from '../../../../utils/validateForm';
import SmSpinner from '../../../Layout/SmSpinner/SmSpinner';
import Button from '../../../Button/Button';

// utils
import isEmpty from '../../../../utils/isEmpty';

const EditPost = ({ post, loading, setModal, updatePost }) => {
    const [formData, setFormData] = useState({
        titleData: '',
        categoryData: '',
        summaryData: ''
    });
    const [coverImageData, setCoverImageData] = useState('');
    const [contentData, setContentData] = useState('');
    // setting modal 
    const [displayModal, setDisplayModal] = useState(false);

    // extracting from the formData state
    const { titleData, categoryData, summaryData } = formData;

    useEffect(() => {
        if (!loading && !isEmpty(post)) {
            const { title, category, summary, coverImage, content } = post;
            setFormData({
                titleData: isEmpty(title) ? '' : title,
                categoryData: isEmpty(category) ? '' : category,
                summaryData: isEmpty(summary) ? '' : summary
            });
            setCoverImageData(isEmpty(coverImage) ? '' : coverImage);
            setContentData(isEmpty(content) ? '' : content);
        }
    }, [post, displayModal]);

    // on change handler 
    const onChangeHandler = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    // submit handler 
    const onSubmitHandler = useCallback(async (e) => {
        e.preventDefault();
        if (!validate(titleData, categoryData, summaryData, coverImageData, contentData, setModal)) {
            return;
        }
        try {
            // extracting from the post
            const { _id, like_number, comments, date } = post;
            let form = {
                title: titleData,
                category: categoryData,
                summary: summaryData,
                coverImage: coverImageData,
                content: contentData,
                likeNumber: like_number === null ? 0 : like_number,
                comments: isEmpty(comments) ? [] : comments,
                date: date
            };
            await updatePost(_id, form);
            setDisplayModal(false);
        } catch (err) {

        }
    }, [post, titleData, categoryData, summaryData, coverImageData, contentData]);

    const renderForm = () => {
        return (
            <form>
                <div id="editPostStyles_titleCategoryWrap">
                    <input
                        id="editPostStyles_titleInput"
                        value={titleData}
                        name="titleData"
                        onChange={onChangeHandler}
                    />
                    <select
                        id="editPostStyles_categoryInput"
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
                        id="editPostStyles_summaryInput"
                        rows="5"
                        onChange={(e) => onChangeHandler(e)}
                        value={summaryData}>
                    </textarea>
                </Wrapper>
                <Wrapper>
                    <ReactQuill
                        id="editPostStyles_coverImgInput"
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
                        id="editPostStyles_contentInput"
                        modules={modules}
                        formats={formats}
                        placeholder="Body"
                        name="contentData"
                        value={contentData}
                        onChange={(e) => setContentData(e)}
                    />
                </Wrapper>
            </form>
        );
    };

    return (
        <article id="editPostStyles_root">
            <Button onClick={() => setDisplayModal(true)}>EDIT <AiFillEdit className="editPostStyles_editIcon" /></Button>
            <div id="editPostStyles_open-modal" className="editPostStyles_modal-window" style={{
                visibility: displayModal ? 'visible' : 'hidden',
                opacity: displayModal ? 1 : 0,
                pointerEvents: displayModal ? 'auto' : 'none',
            }}>
                <div>
                    <div id="editPostStyles_modalHeader">
                        <h4>EDIT POST</h4>
                    </div>
                    <div id="editPostStyles_modalContent">
                        {renderForm()}
                    </div>
                    <div id="editPostStyles_btnWrap">
                        <Button onClick={() => setDisplayModal(false)}>CANCEL</Button>
                        <Button onClick={(e) => onSubmitHandler(e)}>{!loading ? 'UPDATE' : <SmSpinner />}</Button>
                    </div>
                </div>
            </div>
        </article>
    );
};

EditPost.propTypes = {
    setModal: PropTypes.func.isRequired,
    updatePost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
    loading: PropTypes.object.isRequired,
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