const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'Gmail', // or any other email provider
    auth: {
        user: 'selfheld491@gmail.com',
        pass: 'zxdxztfpttlogpem'
    }
});

module.exports = transporter;