const router = require('express').Router();
const SubController = require('../controllers/subscribe');

// @route    POST api/subscribe/new_sub
// @desc     Subscribe
// @access   Public
router.post('/new_sub', SubController.newSub);

module.exports = router;