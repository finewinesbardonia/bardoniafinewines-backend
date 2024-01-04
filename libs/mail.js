const nodemailer = require('nodemailer');

let nodeMailerTransporter = nodemailer.createTransport({
    host: process.env.NODEMAILER_HOST,
    secure: true,
    port: 465,
    logger: true,
    debug: true,
    auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASS,
    },
    tls: {
        rejectUnauthorized: false,
    },
});

function sendEmail(requestData) {
    const { to, from, subject, text, html } = requestData;
    return new Promise(async (resolve, reject) => {
        try {
            await nodeMailerTransporter.sendMail(
                {
                    from: from || process.env.NODEMAILER_USER,
                    to,
                    subject: subject || 'Badonia Email System',
                    text: text || 'Badonia Email System Testing Email',
                    html: html || '<b>Badonia Email System Testing Email</b>',
                },
                (err, info) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(info);
                    }
                }
            );
            resolve()
        }
        catch (err) {
            reject(err)
        }

    });
}

function getVerifyEamil({ username, toEmail, url }) {
    return {
        subject: `Please confirm email for Bardonia Fine Wine`,
        html: `
      <p>Dear User,</p>
      <p>Thank you for registering. Please click the link below to verify your email:</p>
      <a href="${url}">Verify Email</a>
      <p>If you didn't register, you can ignore this email.</p>
      <p>Best regards,<br>Direct2Success Development Team</p>
      `,
    };
}


module.exports = {
    sendEmail,
    getVerifyEamil
};