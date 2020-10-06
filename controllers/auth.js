const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// @route    POST api/auth/register
// @desc     Register user
// @access   Public
exports.register = (req, res, next) => {
    const url = req.protocol + '://' + req.get('host');
    bcrypt.hash(req.body.password, 10).then((hash) => {
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hash,
        });
        user.save()
            .then((user) => {
                const payload = {
                    user: {
                        _id: user._id,
                        name: req.body.name,
                    }
                }
                jwt.sign(payload, process.env.SECRET,
                    { expiresIn: 3600 }, (err, token) => {
                        if (err) {
                            console.log(err);
                            throw err;
                        }
                        res.json({ token });
                    });
            })
            .catch((err) => {
                console.log(err)
                res.status(500).json({
                    serverMsg: 'Invalid authentication credentials'
                });
            })
    });
};

// @route    GET api/auth/load_user
// @desc     Load user
// @access   Public
exports.loadUser = (req, res, next) => {
    User.findById(req.user._id).select('-password')
        .then((user) => {
            if (!user) {
                console.log('No user to load');
                return;
            }
            return res.status(200).json(user);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                serverMsg: 'Load user server error'
            });
        });
};


// @route    GET api/auth/login
// @desc     login user
// @access   Public
exports.login = (req, res, next) => {
    let fetchedUser;
    User.findOne({ email: req.body.email })
        .then((user) => {
            if (!user) {
                console.log('User does not exist')
                return res.status(401).json({
                    serverMsg: 'Invalid username or password'
                });
            }
            fetchedUser = user;
            return bcrypt.compare(req.body.password, user.password);
        })
        .then((result) => {
            if (!result) {
                return res.status(401).json({
                    serverMsg: 'Invalid username or password'
                });
            }

            const payload = {
                user: {
                    _id: fetchedUser._id,
                    name: fetchedUser.name
                }
            }

            jwt.sign(payload, process.env.SECRET,
                { expiresIn: 3600 }, (err, token) => {
                    if (err) {
                        console.log(err);
                        throw err;
                    }
                    res.json({ token });
                });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                serverMsg: 'Incorrect username or password'
            });
        });
};