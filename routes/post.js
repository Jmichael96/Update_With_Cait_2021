const router = require('express').Router();
const PostController = require('../controllers/post');
const isAuth = require('../middleware/check-auth');

// @route    POST api/posts/create_post
// @desc     Create a post
// @access   Private
router.post('/create_post', isAuth, PostController.createPost);


// @route    GET api/posts/fetch_lifestyle
// @desc     Fetch lifestyle posts
// @access   Public
router.get('/fetch_lifestyle', PostController.fetchLifestyle);

module.exports = router;