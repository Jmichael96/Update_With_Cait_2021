const validateForm = (title, category, summary, coverImage, content, dispatch, setModal) => {
    if (!title) {
        dispatch(setModal('error', 'title', 'Please make sure to submit a title', 'okay', () => { }));
        return false;
    }
    if (!category) {
        dispatch(setModal('error', 'category', 'Please make sure to select a category', 'okay', () => { }));
        return false;
    }
    if (!summary || summary.length < 3) {
        dispatch(setModal('error', 'summary', 'Please make sure to submit a summary', 'okay', () => { }));
        return false;
    }
    if (!coverImage) {
        dispatch(setModal('error', 'cover image', 'Please make sure to submit a cover image', 'okay', () => { }));
        return false;
    }
    if (!content) {
        dispatch(setModal('error', 'content', 'Please make sure to submit some content', 'okay', () => { }));
        return false;
    }
    return true;
};

export default validateForm;