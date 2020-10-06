const path = require('path');
const router = require('express').Router();
const auth = require('./auth');

router.use('/api/auth', auth);

// router.use((req, res) => {
//     res.sendFile(path.join(__dirname, '../client/build/index.html'));
// });

module.exports = router;