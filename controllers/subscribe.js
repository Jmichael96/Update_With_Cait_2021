const sendMail = require('../middleware/nodemailer');
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

        sendMail(`Thank you ${sub.name}, for subscribing to the Update With Cait`, sub.email, 'This is going to be fun!!');
        return res.status(200).json({
            serverMsg: `Thank you for subscribing, ${sub.name}`
        });
    } catch (err) {

    }

    // sub.save()
    //     .then((createdSub) => {
    //         sendMail(`Thank you ${createdSub.name}, for subscribing to the Update With Cait`, createdSub.email, 'This is going to be fun!!');
    //         return res.status(200).json({
    //             serverMsg: `Thank you for subscribing ${createdSub.name}`
    //         });
    //     })
    //     .catch((err) => {
    //         return res.status(500).json({
    //             serverMsg: 'There was a problem with our server while completing your request. Please try again later'
    //         });
    //     });
};