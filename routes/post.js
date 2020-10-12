const router = require('express').Router();
const PostController = require('../controllers/post');
const isAuth = require('../middleware/check-auth');

// @route    POST api/posts/create_post
// @desc     Create a post
// @access   Private
router.post('/create_post', isAuth, PostController.createPost);

// @route    GET api/posts/fetch_post/:id
// @desc     Fetch a single post
// @access   Public
router.get('/fetch_post/:id', PostController.fetchPost);

// @route    GET api/posts/fetch_lifestyle
// @desc     Fetch lifestyle posts
// @access   Public
router.get('/fetch_lifestyle', PostController.fetchLifestyle);

// @route    GET api/posts/fetch_devotional
// @desc     Fetch devotional posts
// @access   Public
router.get('/fetch_devotional', PostController.fetchDevotional);

// @route    GET api/posts/fetch_wellness
// @desc     Fetch devotional posts
// @access   Public
router.get('/fetch_wellness', PostController.fetchWellness);

// @route    GET api/posts/fetch_graphics
// @desc     Fetch devotional posts
// @access   Public
router.get('/fetch_graphics', PostController.fetchGraphics);

// @route    PUT api/posts/update_post/:id
// @desc     Update a post
// @access   Private
router.put('/update_post/:id', isAuth, PostController.updatePost);

// @route    DELETE api/posts/delete_post/:id
// @desc     Delete a post
// @access   Private
router.delete('/delete_post/:id', isAuth, PostController.deletePost);

// @route    PUT api/posts/add_comment/:id
// @desc     Add a comment to a post
// @access   Publish
router.put('/add_comment/:id', PostController.addComment);

module.exports = router;