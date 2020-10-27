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
                serverMsg: 'Uh oh! Looks like the email that was used already exists.'
            });
        }
        sub = new Sub({
            name: req.body.name,
            email: req.body.email
        });

        await sub.save();
        const html = `<p style={{ color: 'red' }}>This is super cool!</p><br /><h1>&copy; Copyright</h1>`;
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
    Sub.findOneAndDelete({ email: req.params.email })
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
            console.log(err);
            return res.status(500).json({
                serverMsg: 'There was a problem with our server while completing your request. Please try again later'
            });
        });
};
