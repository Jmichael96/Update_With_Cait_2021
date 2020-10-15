const Saved = require('../models/Saved');
const Post = require('../models/Post');

// @route    POST api/save/save_post
// @desc     Save a post
// @access   Private
exports.savePost = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({
            serverMsg: 'You are not authorized'
        });
    }

    const newSave = new Saved({
        title: req.body.title,
        coverImage: req.body.coverImage,
        summary: req.body.summary,
        category: req.body.category,
        content: req.body.content,
        authorId: req.user._id,
        authorName: req.user.name,
    });

    newSave.save()
        .then((savedPost) => {
            return res.status(201).json({
                serverMsg: 'Post saved',
                savedPost
            });
        })
        .catch((err) => {
            res.status(500).json({
                serverMsg: 'Server error'
            });
        });
};

// @route    GET api/save/fetch_saved
// @desc     Fetching all the saved posts
// @access   Private
exports.fetchSaved = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({
            serverMsg: 'You are not authorized'
        });
    }
    Saved.find()
        .then((savedPosts) => {
            if (!savedPosts || savedPosts.length <= 0) {
                return res.status(404).json({
                    serverMsg: 'There are no saved posts'
                });
            }
            return res.status(200).json({
                serverMsg: 'Successfully fetched saved posts',
                savedPosts
            });
        })
        .catch((err) => {
            res.status(500).json({
                serverMsg: 'Server error'
            });
        });
};

// @route    DELETE api/save/delete_saved/:id
// @desc     Deleting a saved post
// @access   Private
exports.deleteSaved = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({
            serverMsg: 'You are not authorized'
        });
    }
    Saved.findByIdAndDelete({ _id: req.params.id })
        .then((post) => {
            if (!post) {
                return res.status(404).json({
                    serverMsg: 'Post could not be found'
                });
            }
            return res.status(200).json({
                serverMsg: 'Deleted saved post successfully',
                deletedPost: post
            });
        })
        .catch((err) => {
            res.status(500).json({
                serverMsg: 'Server error'
            });
        });
};

// @route    GET api/save/fetch_saved_post/:id
// @desc     Fetch a the contents of a saved post
// @access   Private
exports.fetchSavedPost = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({
            serverMsg: 'You are not authorized'
        });
    }
    Saved.findById({ _id: req.params.id })
        .then((post) => {
            if (!post) {
                return res.status(404).json({
                    serverMsg: 'Post could not be found'
                });
            }
            return res.status(200).json({
                serverMsg: 'Fetched post successfully',
                savedPost: post
            });
        })
        .catch((err) => {
            res.status(500).json({
                serverMsg: 'Server error'
            });
        });
};

// @route    PUT api/save/resave_post/:id
// @desc     Re-save a post and update it after adding to it again
// @access   Private
exports.resave = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({
            serverMsg: 'You are not authorized'
        });
    }
    const saveFields = {
        title: req.body.title,
        coverImage: req.body.coverImage,
        summary: req.body.summary,
        category: req.body.category,
        content: req.body.content,
        authorId: req.user._id,
        authorName: req.user.name,
        like_number: 0
    };
    Saved.findByIdAndUpdate(
        { _id: req.params.id },
        { $set: saveFields },
        { new: true, upsert: true }
    ).then((savedPost) => {
        if (!savedPost) {
            return res.status(404).json({
                serverMsg: 'Could not find post and update it'
            });
        }
        return res.status(201).json({
            serverMsg: 'Re-saved post successfully',
            savedPost
        });
    })
        .catch((err) => {
            res.status(500).json({
                serverMsg: 'Server error'
            });
        });
};

// @route    POST api/save/publish_saved_post
// @desc     Publish a post that was saved
// @access   Private
exports.publishSavedPost = async (req, res, next) => {
    try {
        const { title, category, summary, coverImage, content } = req.body.formData;
        const post = new Post({
            title: title,
            coverImage: coverImage,
            summary: summary,
            category: category,
            content: content,
            authorId: req.user._id,
            authorName: req.user.name,
            like_number: 0
        });

        // saving new contents to the post model
        const newPost = await post.save();

        // removing saved post
        const deletedPost = await Saved.findByIdAndDelete({ _id: req.body.savedId });

        return res.status(201).json({
            serverMsg: 'Successfully published post',
            newPost: newPost,
            unsavedPost: deletedPost
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            serverMsg: 'Server error. Please try again later.'
        });
    }
};