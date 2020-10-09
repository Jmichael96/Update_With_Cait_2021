const router = require('express').Router();
const SavedController = require('../controllers/saved');
const isAuth = require('../middleware/check-auth');

// @route    POST api/save/save_post
// @desc     Save a post
// @access   Private
router.post('/save_post', isAuth, SavedController.savePost);

// @route    GET api/save/fetch_saved
// @desc     Fetching all the saved posts
// @access   Private
router.get('/fetch_saved', isAuth, SavedController.fetchSaved);

// @route    DELETE api/save/delete_saved/:id
// @desc     Deleting a saved post
// @access   Private
router.delete('/delete_saved/:id', isAuth, SavedController.deleteSaved);

// @route    GET api/save/fetch_saved_post/:id
// @desc     Fetch a the contents of a saved post
// @access   Private
router.get('/fetch_saved_post/:id', isAuth, SavedController.fetchSavedPost);

// @route    PUT api/save/resave_post/:id
// @desc     Re-save a post and update it after adding to it again
// @access   Private
router.put('/resave_post/:id', isAuth, SavedController.resave);

// @route    POST api/save/publish_saved_post
// @desc     Publish a post that was saved
// @access   Private
router.post('/publish_saved_post', isAuth, SavedController.publishSavedPost);

module.exports = router;