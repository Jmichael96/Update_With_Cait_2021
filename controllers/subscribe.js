const sendMail = require('../services/nodemailer');
const Sub = require('../models/Subscribe');

// @route    POST api/subscribe/new_sub
// @desc     Subscribe
// @access   Public
exports.newSub = async (req, res, next) => {
    if (!req.body.name || !req.body.email) {
        return res.status(406).json({
            serverMsg: 'Please enter a name and email'
        });
    }

    try {
        let sub = await Sub.findOne({ email: req.body.email });
        if (sub) {
            return res.status(400).json({
                serverMsg: 'Uh oh! Looks like the email already exists.'
            });
        }
        sub = new Sub({
            name: req.body.name,
            email: req.body.email
        });

        await sub.save();
        const html = `<p>Thank you for subscribing to the Update With Cait blog. From here every time a new blog is posted you will be immediately notified!</p>
                        <br />
                        <p style="text-align:center; color:black; font-size:.7rem;" font-weight:500;>&copy; Copyright</p>
                        <p style="text-align:center; color:black; font-size:.7rem;">To unsubscribe click <a target="_blank" href="http://localhost:3000/unsub?user_email=${sub.email}">HERE</a>
                    </p>`;
        sendMail(`Thank you for subscribing to the Update With Cait`, sub.email, html, true);
        return res.status(200).json({
            serverMsg: `Thank you for subscribing, ${sub.name}`
        });
    } catch (err) {
        return res.status(500).json({
            serverMsg: 'There was a problem with our server while completing your request. Please try again later'
        });
    };
};

// @route    DELETE api/subscribe/unsubscribe
// @desc     Unsubscribe from news letter
// @access   Public
exports.unsubscribe = (req, res, next) => {

    Sub.findOneAndDelete({ email: req.query.email })
        .then((sub) => {
            if (!sub) {
                return res.status(404).json({
                    serverMsg: 'We are sorry, we could not find that email. Please try another email.'
                });
            }

            return res.status(200).json({
                serverMsg: `${sub.name}, you have successfully unsubscribed! We hope to see you again soon.`,
                sub
            });
        })
        .catch((err) => {
            return res.status(500).json({
                serverMsg: 'There was a problem with our server while completing your request. Please try again later'
            });
        });
};

// @route    GET api/subscribe/fetch_subs
// @desc     Fetching all the subs for the logged in user
// @access   Private
exports.fetchSubs = (req, res, next) => {
    Sub.find().sort({ _id: -1 })
        .then((subs) => {
            if (subs.length <= 0) {
                return res.status(404).json({
                    serverMsg: 'There are no subscriptions at this time'
                });
            }
            return res.status(200).json({
                serverMsg: 'Fetched subscriptions',
                subs
            });
        })
        .catch((err) => {
            return res.status(500).json({
                serverMsg: 'There was a problem with our server while completing your request. Please try again later'
            });
        });
};

// @route    DELETE api/subscribe/delete_sub/:id
// @desc     Delete a sub
// @access   Private
exports.deleteSub = (req, res, next) => {
    Sub.findByIdAndDelete({ _id: req.params.id })
        .then((sub) => {
            if (!sub) {
                return res.status(404).json({
                    serverMsg: 'Could not find sub to remove them'
                });
            }
            return res.status(200).json({
                serverMsg: 'Deleted subscription successfully',
                sub
            });
        })
        .catch((err) => {
            return res.status(500).json({
                serverMsg: 'There was a problem with our server while completing your request. Please try again later'
            });
        });
};