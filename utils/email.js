const nodemailer = require('nodemailer');
const { emailPass, emailId } = require('./config');

module.exports.sendEmail = async (options) => {
  // 1. Create transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
      user: emailId,
      pass: emailPass,
    },
  });
  const emailOptions = {
    from: '"PlaceHolder 👻" <service@placeholder.com>', // sender address
    to: options.receiverId, // list of receivers
    subject: `${options.subject}✔`, // Subject line
    text: options.message, // plain text body
    // html: "<b>Hello world?</b>" // html body Can be sent too!
  };
  await transporter.sendMail(emailOptions);
};
