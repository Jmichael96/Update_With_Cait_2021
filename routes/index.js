const path = require('path');
const router = require('express').Router();
const auth = require('./auth');
const post = require('./post');
const saved = require('./saved');

router.use('/api/auth', auth);
router.use('/api/posts', post);
router.use('/api/save', saved);

// router.use((req, res) => {
//     res.sendFile(path.join(__dirname, '../client/build/index.html'));
// });

module.exports = router;