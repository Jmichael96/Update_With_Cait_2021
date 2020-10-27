const router = require('express').Router();
const SubController = require('../controllers/subscribe');
const isAuth = require('../middleware/check-auth');

// @route    POST api/subscribe/new_sub
// @desc     Subscribe
// @access   Public
router.post('/new_sub', SubController.newSub);

// @route    DELETE api/subscribe/unsubscribe
// @desc     Unsubscribe from news letter
// @access   Public
router.delete('/unsubscribe', SubController.unsubscribe);

// @route    GET api/subscribe/fetch_subs
// @desc     Fetching all the subs for the logged in user
// @access   Private
router.get('/fetch_subs', isAuth, SubController.fetchSubs);

// @route    DELETE api/subscribe/delete_sub/:id
// @desc     Delete a sub
// @access   Private
router.delete('/delete_sub/:id', isAuth, SubController.deleteSub);
module.exports = router;