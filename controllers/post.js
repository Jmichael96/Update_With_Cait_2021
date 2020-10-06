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
    Post.find({ category: 'Lifestyle' })
        .then((posts) => {
            if (posts.length <= 0) {
                return res.status(404).json({
                    serverMsg: 'No posts found'
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