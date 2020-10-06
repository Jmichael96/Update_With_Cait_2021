const path = require('path');
const router = require('express').Router();
const auth = require('./auth');
const post = require('./post');

router.use('/api/auth', auth);
router.use('/api/posts', post);

// router.use((req, res) => {
//     res.sendFile(path.join(__dirname, '../client/build/index.html'));
// });

module.exports = router;