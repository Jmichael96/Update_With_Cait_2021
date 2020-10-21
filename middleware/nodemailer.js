const EMAIL = process.env.EMAIL;
const PASS = process.env.PASS;
// const CLIENT_EMAIL = process.env.CLIENT_EMAIL;
const nodemailer = require('nodemailer');

const smtpConfig = {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: EMAIL,
        pass: PASS
    }
}
const transporter = nodemailer.createTransport(smtpConfig);

module.exports = sendMail = (subject, sendingTo, html) => {
    const mailOptions = {
        from: EMAIL,
        to: sendingTo,
        subject: subject,
        html: ` <h1>Update With Cait<h1>
                <br /> 
                ${html}`
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.error(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
};