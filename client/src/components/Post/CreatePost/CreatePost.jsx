import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

// styles
import './createPost.css';

// components
import Wrapper from '../../Layout/Wrapper/Wrapper';

const CreatePost = ({ createPost, loading }) => {
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
    // when to render spinner
    const [renderSpinner, setRenderSpinner] = useState(false);
    // set true or false when form is submitted
    const [isSubmitted, setIsSubmitted] = useState(false);

    // content for formData 
    const { title, summary, category } = formData;

    // checking if store is loading and if user submitted form to render spinner accordingly
    useEffect(() => {
        if (loading && isSubmitted) {
            setRenderSpinner(true);
        } else if (loading && !isSubmitted) {
            setRenderSpinner(false);
        }
    }, [loading, isSubmitted]);

    // on submit function handler
    const submitHandler = async (e) => {
        e.preventDefault();
        setIsSubmitted(true);
        try {
            let form = {
                title,
                summary,
                category,
                coverImage,
                content
            };

            await createPost(form);
        } catch (err) {

        }
        setIsSubmitted(false);
    };

    // on change handler
    const onChangeHandler = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });


    return (
        <section id="createPostStyles_root">
            <h1 id="createPostStyles_pageTitle">Create Post</h1>
            <form onSubmit={(e) => submitHandler(e)}>
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
                    <button type="button">SAVE</button>
                    {!renderSpinner ?
                        <button type="submit" id="createPostStyles_submitBtn">POST</button>
                        :
                        <p>LOADING...</p>
                    }
                </Wrapper>
            </form>
        </section>
    );
};

CreatePost.propTypes = {
    createPost: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
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