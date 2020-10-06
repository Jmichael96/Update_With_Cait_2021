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

// @route    GET api/posts/fetch_lifestyle
// @desc     Fetch lifestyle posts
// @access   Private