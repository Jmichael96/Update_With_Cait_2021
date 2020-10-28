const router = require('express').Router();
const AuthController = require('../controllers/auth');
const isAuth = require('../middleware/check-auth');

// @route    POST api/auth/register
// @desc     Register user
// @access   Public
router.post('/register', AuthController.register);

// @route    GET api/auth/load_user
// @desc     Load user
// @access   Private
router.get('/load_user', isAuth, AuthController.loadUser);

// @route    POST api/auth/login
// @desc     login user
// @access   Public
router.post('/login', AuthController.login);

// @route    PUT api/auth/logout
// @desc     login user
// @access   Public
router.put('/logout', isAuth, AuthController.logout);

module.exports = router;