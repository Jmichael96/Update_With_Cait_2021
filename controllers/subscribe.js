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
        const html = `
                <h1 style="color: black; font-size: 30px; text-align: center">Update With Cait</h1>
                <div style="min-height:200px; max-height: 300px; width: 100%; justify-content: center; background: #E7D1B1; padding: 8px 0 8px 0;">
                    <h3 style="font-size:24px; text-align: center; color: black;">Welcome!</h3>
                    <img style="width:100%; max-width: 200px; display: block; margin-left: auto; margin-right: auto; margin-top: 20px;" src="https://codevh.com/uwc/images/cait2.JPG" />
                </div>
                <div style="width: 100%; margin-top: 110px;">
                    <h3 style="text-align:center; font-size: 24px;">Thanks for subscribing to the update!</h3>
                    <p style="text-align:center; font-size: 14px;">You will be notified after each new blog post.</p>
                </div>
                <img style="width: 100%; max-width: 300px; display: block; margin-top: 60px; margin-left: auto; margin-right: auto;" src="https://codevh.com/uwc/images/aboutImg1.JPG" />
                <div style="margin-top: 80px;">
                    <h3 style="text-align:center; font-size: 24px;">Heres a message from Cait:</h3>
                    <div style="width: 300px; margin-left: auto; margin-right: auto;">
                        <p style="text-align:center; font-size: 14px;">Hi friends! I'm so happy you joined The Updates mailing list. Now, you'll never miss a blog.</p>
                        <p style="text-align:center; font-size: 14px;">Thanks again! xoxo,</p>
                        <p style="text-align:center; font-size: 14px;">Cait</p>
                    </div>
                </div>
                <div style="margin-top: 100px">
                    <p style="text-align:center; color:black; font-size: 11px;">&copy; Copyright</p>
                    <p style="text-align:center; color:black; font-size: 12px;">To unsubscribe click <a target="_blank" href="https://updatewithcait.com/unsub?user_email=${sub.email}">here</a></p>
                </div>
                `;
        sendMail(`Thanks for subscribing to Update With Cait`, sub.email, html, true);
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