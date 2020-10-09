const Post = require('../models/Post');

// @route    POST api/posts/create_post
// @desc     Create a post
// @access   Private
exports.createPost = (req, res, next) => {
    const post = new Post({
        title: req.body.title,
        coverImage: req.body.coverImage,
        summary: req.body.summary,
        category: req.body.category,
        content: req.body.content,
        authorId: req.user._id,
        authorName: req.user.name,
        like_number: 0
    });
    post.save()
        .then((createdPost) => {
            res.status(201).json({
                serverMsg: 'Created post successfully',
                post: createdPost
            });
        }).catch((err) => {
            res.status(500).json({
                serverMsg: 'Server error'
            });
        });
};

// @route    GET api/posts/fetch_post/:id
// @desc     Fetch a single post
// @access   Public
exports.fetchPost = (req, res, next) => {
    Post.findById({ _id: req.params.id })
        .then((post) => {
            if (!post) {
                return res.status(404).json({
                    serverMsg: 'Post could not be found',
                });
            }
            return res.status(200).json(post);
        })
        .catch((err) => {
            res.status(500).json({
                serverMsg: 'There was a problem with the server'
            });
        });
};

// @route    GET api/posts/fetch_lifestyle
// @desc     Fetch lifestyle posts
// @access   Public
exports.fetchLifestyle = (req, res, next) => {
    Post.find({ category: 'Lifestyle' }).sort({ _id: -1 })
        .then((posts) => {
            if (posts.length <= 0) {
                return res.status(404).json({
                    serverMsg: 'No lifestyle posts were found'
                });
            }
            return res.status(200).json({
                serverMsg: 'Fetched lifestyle posts',
                posts: posts
            });
        })
        .catch((err) => {
            res.status(500).json({
                serverMsg: 'Server error'
            });
        });
};

// @route    GET api/posts/fetch_devotional
// @desc     Fetch devotional posts
// @access   Public
exports.fetchDevotional = (req, res, next) => {
    Post.find({ category: 'Devotional' }).sort({ _id: -1 })
    .then((posts) => {
        if (posts.length <= 0) {
            return res.status(404).json({
                serverMsg: 'No devotional posts were found'
            });
        }
        return res.status(200).json({
            serverMsg: 'Fetched devotional posts',
            posts: posts
        });
    })
    .catch((err) => {
        res.status(500).json({
            serverMsg: 'Server error'
        });
    });
};

// @route    GET api/posts/fetch_wellness
// @desc     Fetch wellness posts
// @access   Public
exports.fetchWellness = (req, res, next) => {
    Post.find({ category: 'Wellness' }).sort({ _id: -1 })
    .then((posts) => {
        if (posts.length <= 0) {
            return res.status(404).json({
                serverMsg: 'No wellness posts were found'
            });
        }
        return res.status(200).json({
            serverMsg: 'Fetched wellness posts',
            posts: posts
        });
    })
    .catch((err) => {
        res.status(500).json({
            serverMsg: 'Server error'
        });
    });
};

// @route    GET api/posts/fetch_graphics
// @desc     Fetch grahpics posts
// @access   Public
exports.fetchGraphics = (req, res, next) => {
    Post.find({ category: 'Graphics' }).sort({ _id: -1 })
    .then((posts) => {
        if (posts.length <= 0) {
            return res.status(404).json({
                serverMsg: 'No posts found'
            });
        }
        return res.status(200).json({
            serverMsg: 'Fetched graphics posts were found',
            posts: posts
        });
    })
    .catch((err) => {
        res.status(500).json({
            serverMsg: 'Server error'
        });
    });
};

