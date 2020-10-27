const EMAIL = process.env.EMAIL;
const PASS = process.env.PASS;
const nodemailer = require('nodemailer');

const smtpConfig = {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: EMAIL,
        pass: PASS
    }
};

const transporter = nodemailer.createTransport(smtpConfig);

module.exports = sendMail = (subject, sendingTo, html, isNew) => {
    let mailOptions;
    if (!isNew) {
        mailOptions = {
            from: EMAIL,
            bcc: sendingTo,
            subject: subject,
            html: html
        }
    } else if (isNew) {
        mailOptions = {
            from: EMAIL,
            to: sendingTo,
            subject: subject,
            html: html
        }
    }
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.error(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
};