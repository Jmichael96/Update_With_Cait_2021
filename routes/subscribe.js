const router = require('express').Router();
const SubController = require('../controllers/subscribe');

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
router.get('/fetch_subs', SubController.fetchSubs);

module.exports = router;