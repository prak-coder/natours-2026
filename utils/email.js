const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  //1.Create a transporter - Configure your SMTP server or another supported transport method.
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
    //activate in gmail "less secure" app option dont use gmail bcs marked as spammer etc
    //use sendgrid or mailgun
    //mailtrap
  });

  //2.Compose your message - Define the sender, recipient(s), subject, and content.
  const mailOptions = {
    from: 'prakash.io',
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  //3.Send the email - Call transporter.sendMail() with your message options.
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
