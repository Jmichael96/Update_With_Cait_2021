import React, { useState, useCallback } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import PropTypes from 'prop-types';
import { AiOutlineDownload, AiFillCheckCircle } from 'react-icons/ai';

// styles
import './createPost.css';

// components
import Wrapper from '../../Layout/Wrapper/Wrapper';
import validate from '../../../utils/validateForm';
import SmSpinner from '../../Layout/SmSpinner/SmSpinner';
import Button from '../../Button/Button';

const CreatePost = ({ createPost, postLoading, savedLoading, savePost, setModal, history }) => {
    // non react-quill form data
    const [formData, setFormData] = useState({
        title: '',
        summary: '',
        category: '',
    });
    // react quill cover image
    const [coverImage, setCoverImage] = useState('');
    // react quill content 
    const [content, setContent] = useState('');

    // content for formData 
    const { title, summary, category } = formData;

    // on submit function handler
    const submitPostHandler = useCallback(async (e) => {
        e.preventDefault();
        if (!validate(title, category, summary, coverImage, content, setModal)) {
            return;
        }
        try {
            let form = {
                title,
                summary,
                category,
                coverImage,
                content
            };

            await createPost(history, form);
        } catch (err) {

        }
    }, [createPost, title, summary, category, coverImage, content]);

    // on change handler
    const onChangeHandler = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    // save post handler
    const savePostHandler = useCallback(async () => {
        // make sure there is data in at least one field
        if (!title && !summary && !category && !coverImage && !content) {
            setModal('error', 'save error', 'You must have at least one input field filled out in order to save your post', 'okay', () => { });
            return;
        }
        try {
            let form = {
                title,
                summary,
                category,
                coverImage,
                content
            };
            await savePost(form);
        } catch (err) {

        }
    }, [savePost, title, summary, category, coverImage, content]);

    return (
        <section id="createPostStyles_root">
            <h1 id="createPostStyles_pageTitle">Create Post</h1>
            <form>
                <div id="createPostStyles_titleCategoryWrap">
                    <input
                        id="createPostStyles_titleInput"
                        type="text"
                        placeholder="Title"
                        className="form-control"
                        name="title"
                        onChange={(e) => onChangeHandler(e)}
                        value={title}
                    />
                    <select
                        id="createPostStyles_categoryInput"
                        name="category"
                        onChange={(e) => onChangeHandler(e)}
                        value={category}
                        className="browser-default custom-select">
                        <option>Choose Your Category</option>
                        <option value="Lifestyle">Lifestyle</option>
                        <option value="Devotional">Devotional</option>
                        <option value="Wellness">Wellness</option>
                        <option value="Graphics">Graphics</option>
                    </select>
                </div>
                <Wrapper>
                    <textarea
                        type="text"
                        placeholder="Summary"
                        className="form-control"
                        name="summary"
                        id="createPostStyles_summaryInput"
                        rows="5"
                        onChange={(e) => onChangeHandler(e)}
                        value={summary}>
                    </textarea>
                </Wrapper>
                <Wrapper>
                    <ReactQuill
                        id="createPostStyles_coverImgInput"
                        placeholder="Cover Image"
                        name="coverImage"
                        modules={coverImageModules}
                        formats={coverImageFormats}
                        value={coverImage}
                        onChange={(e) => setCoverImage(e)}
                    />
                </Wrapper>
                <Wrapper>
                    <ReactQuill
                        id="createPostStyles_contentInput"
                        modules={modules}
                        formats={formats}
                        placeholder="Body"
                        name="content"
                        value={content}
                        onChange={(e) => setContent(e)}
                    />
                </Wrapper>
                <Wrapper>
                    {!savedLoading ? <Button id="createPostStyles_saveBtn" onClick={savePostHandler}>SAVE <AiOutlineDownload className="createPostStyles_btnIcon" /></Button> : <SmSpinner />}
                    {!postLoading ?
                        <Button onClick={(e) => { submitPostHandler(e) }} id="createPostStyles_submitBtn">POST <AiFillCheckCircle className="createPostStyles_btnIcon" /></Button>
                        :
                        <SmSpinner />
                    }
                </Wrapper>
            </form>
        </section>
    );
};

CreatePost.propTypes = {
    createPost: PropTypes.func.isRequired,
    setModal: PropTypes.func.isRequired,
    savePost: PropTypes.func.isRequired,
    postLoading: PropTypes.bool.isRequired,
    savedLoading: PropTypes.bool.isRequired,
    history: PropTypes.any,
};

// Quill.register('modules/imageResize', ImageResize);

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

export default CreatePost;